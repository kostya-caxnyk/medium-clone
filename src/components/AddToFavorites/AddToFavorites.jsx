import React, { useContext } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import s from './AddToFavorites.module.scss';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug, hasLabel }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const history = useHistory();

  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;
  const label = hasLabel
    ? `${
        isFavoritedWithResponse ? 'Unfavorite' : 'Favorite'
      } Article (${favoritesCountWithResponse})`
    : favoritesCountWithResponse;

  const handleClick = () => {
    if (currentUserState.isLoggedIn === false) {
      history.push('/login');
      return;
    }

    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };

  return (
    <button
      className={classnames(s.btn, s.btnGreen, { [s.btnFavorited]: isFavoritedWithResponse })}
      onClick={handleClick}>
      <i className={classnames('fas fa-heart', s.icon)}></i>
      {label}
    </button>
  );
};

export default AddToFavorites;
