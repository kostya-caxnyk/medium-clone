import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './ArticleComments.module.scss';

import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loading';
import PostCommentForm from './components/postCommentForm/PostCommentForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { isAuthor } from '../../utils';

const ArticleComments = ({ articleSlug }) => {
  const apiCommentsUrl = `/articles/${articleSlug}/comments`;
  const [
    { response: fetchCommentsResponse, error: fetchCommentsError, loading: commentsLoading },
    getComments,
  ] = useFetch(apiCommentsUrl);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);
  const [currentUserState] = useContext(CurrentUserContext);

  const apiDeleteCommentUrl = `/articles/${articleSlug}/comments/${deletedCommentId}`;
  const [{ response: deleteCommentResponse }, doDeleteComment] = useFetch(apiDeleteCommentUrl);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    if (fetchCommentsResponse) {
      setComments(fetchCommentsResponse.comments);
    }
  }, [fetchCommentsResponse]);

  useEffect(() => {
    if (newComment) {
      setComments((comments) => [newComment, ...comments]);
    }
  }, [setComments, newComment]);

  useEffect(() => {
    if (deletedCommentId === null) {
      return;
    }
    doDeleteComment({
      method: 'delete',
    });
  }, [doDeleteComment, deletedCommentId]);

  //vopros
  useEffect(() => {
    if (deleteCommentResponse) {
      setComments((comments) => comments.filter(({ id }) => id !== deletedCommentId));
    }
  }, [deleteCommentResponse]);

  return (
    <div className={s.commentsPage}>
      <PostCommentForm
        onAddedComment={setNewComment}
        articleSlug={articleSlug}
        currentUser={currentUserState}
      />
      {fetchCommentsError && <ErrorMessage />}
      {(commentsLoading || !fetchCommentsResponse) && <Loading />}
      {!commentsLoading && fetchCommentsResponse && (
        <ul className={s.comments}>
          {comments.map(({ body, id, createdAt, author: { username, image } }) => (
            <li key={id} className={s.comment}>
              <div className={s.commentBody}>{body}</div>
              <div className={s.commentMeta}>
                <Link to={`/profiles/${username}`}>
                  <img src={image} alt="2" className={s.img} />
                </Link>
                <Link to={`/profiles/${username}`} className={s.name}>
                  {username}
                </Link>
                <span className={s.date}>{createdAt.split('T')[0]}</span>
                {isAuthor(currentUserState, username) && (
                  <span className={s.delete} onClick={() => setDeletedCommentId(id)}>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ArticleComments.propTypes = {
  articleSlug: PropTypes.string.isRequired,
};

export default ArticleComments;
