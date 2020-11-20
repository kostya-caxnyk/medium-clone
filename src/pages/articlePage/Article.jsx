import React, { useEffect, useContext, useState } from 'react';
import classnames from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import s from './Article.module.scss';

import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  AddToFollowing,
  AddToFavorites,
  ErrorMessage,
  TagList,
  Loading,
  ArticleComments,
} from '../../components';
import { isAuthor } from '../../utils';

const Article = ({ match }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (deleteArticleResponse) {
      setIsSuccessfullDelete(true);
    }
  }, [deleteArticleResponse]);

  const handleDeleteArticle = () => {
    doDeleteArticle({
      method: 'DELETE',
    });
  };

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading || !fetchArticleResponse) {
    return <Loading />;
  }

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  const {
    title,
    createdAt,
    tagList,
    body,
    favoritesCount,
    favorited,
    author: { username, image, following },
  } = fetchArticleResponse.article;

  return (
    <div className={s.page}>
      <div className={s.banner}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.row}>
          <div className={s.meta}>
            <Link to={`/profiles/${username}`} className={s.photo}>
              <img src={image} alt="" />
            </Link>
            <div className={s.info}>
              <Link to={`/profiles/${username}`} className={s.author}>
                {username}
              </Link>
              <span className={s.date}>{createdAt.split('T')[0]}</span>
            </div>
          </div>
          {isAuthor(currentUserState, username) ? (
            <div className={s.buttons}>
              <Link to={`/articles/${slug}/edit`} className={s.btn}>
                <i className={classnames('fas fa-pencil-alt', s.icon)}></i>
                Edit Article
              </Link>
              <button className={classnames(s.btn, s.btnRed)} onClick={handleDeleteArticle}>
                <i className={classnames('fas fa-trash-alt', s.icon)}></i>
                Delete Article
              </button>
            </div>
          ) : (
            <div className={s.buttons}>
              <AddToFollowing isFollowing={following} userSlug={username} />
              <AddToFavorites
                favoritesCount={favoritesCount}
                isFavorited={favorited}
                articleSlug={slug}
                hasLabel
              />
            </div>
          )}
        </div>
      </div>

      <div className={s.content}>
        <div>
          <p className={s.body}>{body}</p>
        </div>
        <TagList tags={tagList} />
      </div>

      <ArticleComments articleSlug={slug} />
    </div>
  );
};

export default Article;
