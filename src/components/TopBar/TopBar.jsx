import React, { useContext } from 'react';

import s from './TopBar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  const activeLink = {
    color: '#000',
  };

  return (
    <nav className={s.navbar}>
      <Link to="/" className={s.logo}>
        Medium
      </Link>

      <NavLink to="/" className={s.link} activeStyle={activeLink} exact>
        Home
      </NavLink>
      {currentUserState.isLoggedIn === false && (
        <>
          <NavLink to="/login" className={s.link} activeStyle={activeLink}>
            Sign in
          </NavLink>
          <NavLink to="/register" className={s.link} activeStyle={activeLink}>
            Sign up
          </NavLink>
        </>
      )}
      {currentUserState.isLoggedIn && (
        <>
          <NavLink to="/articles/new" className={s.link} activeStyle={activeLink}>
            <i className="far fa-edit"></i>
            New Post
          </NavLink>
          <NavLink to="/settings" className={s.link} activeStyle={activeLink}>
            <i className="fas fa-cog"></i>
            Settings
          </NavLink>
          <NavLink
            to={`/profiles/${currentUserState.currentUser.username}`}
            className={s.link}
            activeStyle={activeLink}>
            <img src={currentUserState.currentUser.image} alt="" className={s.photo} />
            {currentUserState.currentUser.username}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default TopBar;
