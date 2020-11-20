import React, { useContext } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import s from './AddToFollowing.module.scss';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const AddToFollowing = ({ isFollowing, userSlug }) => {
  const apiUrl = `/profiles/${userSlug}/follow`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const history = useHistory();
  const [currentUserState] = useContext(CurrentUserContext);

  const isFollowingWithResponse = response ? response.profile.following : isFollowing;

  const handleClick = () => {
    if (currentUserState.isLoggedIn === false) {
      history.push('/login');
      return;
    }

    doFetch({
      method: isFollowingWithResponse ? 'delete' : 'post',
    });
  };

  return (
    <button
      onClick={handleClick}
      className={classnames(s.btn, { [s.btnFollowing]: isFollowingWithResponse })}>
      <i className={classnames('fas fa-plus', s.icon)}></i>
      {`${isFollowingWithResponse ? 'Unfollow' : 'Follow'} ${userSlug}`}
    </button>
  );
};

export default AddToFollowing;
