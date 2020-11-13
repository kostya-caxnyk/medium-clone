import React, { useContext } from 'react';

import s from './TopBar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className={s.navbar}>
      <Link to="/" className={s.logo}>
        Medium
      </Link>

      <NavLink to="/" className={s.link} exact>
        Home
      </NavLink>
      {!currentUserState.isLoggedIn && (
        <>
          <NavLink to="/login" className={s.link}>
            Sign in
          </NavLink>
          <NavLink to="/register" className={s.link}>
            Sign up
          </NavLink>
        </>
      )}
      {currentUserState.isLoggedIn && (
        <>
          <NavLink to="/articles/new" className={s.link}>
            <i className="far fa-edit"></i>
            New Post
          </NavLink>
          <NavLink to={`/profiles/${currentUserState.currentUser.username}`} className={s.link}>
            {currentUserState.currentUser.username}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default TopBar;
