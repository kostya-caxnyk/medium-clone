import React, { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';

import s from './UserProfile.module.scss';

import useFetch from '../../hooks/useFetch';
import { AddToFollowing, ErrorMessage, Loading } from '../../components';
import { UserArticles } from './components';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { isAuthor } from '../../utils';

const UserProfile = ({ match, location }) => {
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = `/profiles/${match.params.slug}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  useEffect(() => {
    doFetch();
  }, [doFetch, match.params.slug]);

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading || !response) {
    return <Loading />;
  }

  const { image, username, following, bio } = response.profile;

  return (
    <div className={s.profile}>
      <div className={s.banner}>
        <div className={s.userPhoto}>
          <img src={image} alt="" className={s.img} />
        </div>
        <h3 className={s.name}>{username}</h3>
        <div className={s.bio}>
          <p>{bio}</p>
        </div>
        <span className={s.btn}>
          {isAuthor(currentUserState, username) ? (
            <Link to={`/settings`} className={s.btnEdit}>
              <i className={classnames('fas fa-cog', s.icon)}></i>
              Edit Profile Settings
            </Link>
          ) : (
            <AddToFollowing isFollowing={following} userSlug={username} />
          )}
        </span>
      </div>

      <div className={s.toggler}>
        <ul className={s.links}>
          <li className={s.li}>
            <NavLink
              to={apiUrl}
              className={s.link}
              activeStyle={{ borderBottom: '2px solid green', color: 'green' }}
              exact>
              User's Posts
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to={apiUrl + '/favorites'}
              className={s.link}
              activeStyle={{ borderBottom: '2px solid green', color: 'green' }}>
              Favorited Posts
            </NavLink>
          </li>
        </ul>
      </div>
      <UserArticles username={username} location={location} isFavorites={isFavorites} />
    </div>
  );
};

export default UserProfile;
