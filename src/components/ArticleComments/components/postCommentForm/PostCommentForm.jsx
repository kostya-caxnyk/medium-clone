import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './PostCommentForm.module.scss';

import useFetch from '../../../../hooks/useFetch';
import { BackendErrorMessages } from '../../../';

const PostCommentForm = ({ onAddedComment, articleSlug, currentUser }) => {
  const apiUrl = `/articles/${articleSlug}/comments`;
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [body, setBody] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    doFetch({
      method: 'post',
      data: {
        comment: {
          body,
        },
      },
    });
  };

  useEffect(() => {
    if (response) {
      setBody('');
      onAddedComment(response.comment);
      setHasError(false);
    }
  }, [response, onAddedComment]);

  useEffect(() => {
    if (error) {
      setHasError(true);
    }
  }, [error]);

  if (!currentUser.isLoggedIn) {
    return (
      <div className={s.notLogged}>
        <Link to="/login" className={s.link}>
          Sign in
        </Link>{' '}
        or{' '}
        <Link to="/register" className={s.link}>
          {' '}
          sign up{' '}
        </Link>
        to add comments on this article.
      </div>
    );
  }

  return (
    <>
      {hasError && <BackendErrorMessages backendError={error.errors} />}
      <form className={s.postForm} onSubmit={handleSubmit}>
        <textarea
          className={s.postBody}
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className={s.postMeta}>
          <img src={currentUser.currentUser.image} alt="1" className={s.postImg} />
          <input type="submit" className={s.postBtn} value="Post Comment" />
        </div>
      </form>
    </>
  );
};

PostCommentForm.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  onAddedComment: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default PostCommentForm;
