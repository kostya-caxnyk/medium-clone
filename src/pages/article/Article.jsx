import React, { useEffect, useContext, useState } from 'react';

import s from './Article.module.scss';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import useFetch from '../../hooks/useFetch';
import { Link, Redirect } from 'react-router-dom';
import TagList from '../../components/TagList/TagList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import classnames from 'classnames';
import AddToFavorites from '../../components/AddToFavorites/AddToFavorites';

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

  const isAuthor = () => {
    if (currentUserState.isLoggedIn === null || !fetchArticleResponse) {
      return false;
    }

    return currentUserState.currentUser.username === fetchArticleResponse.article.author.username;
  };

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading || !fetchArticleResponse) {
    return <Loading />;
  }

  if (isSuccessfullDelete) {
    return <Redirect tp="/" />;
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
          {isAuthor() ? (
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
              <button
                onClick={() => console.log()}
                className={classnames(s.btn, { [s.btnFollowing]: following })}>
                <i className={classnames('fas fa-plus', s.icon)}></i>
                {`${favorited ? 'Unfollow' : 'Follow'} ${username}`}
              </button>
              <AddToFavorites
                favoritesCount={favoritesCount}
                isFavorited={favorited}
                slug={slug}
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
    </div>
  );
};

export default Article;
