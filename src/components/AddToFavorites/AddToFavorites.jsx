import React from 'react';
import classnames from 'classnames';

import s from './AddToFavorites.module.scss';
import useFetch from '../../hooks/useFetch';

const AddToFavorites = ({ isFavorited, favoritesCount, slug, hasLabel }) => {
  const apiUrl = `/articles/${slug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;
  const label = hasLabel
    ? `${
        isFavoritedWithResponse ? 'Unfavorite' : 'Favorite'
      } Article (${favoritesCountWithResponse})`
    : favoritesCountWithResponse;

  const handleClick = () => {
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
