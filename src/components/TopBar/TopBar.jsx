import React from 'react';

import s from './TopBar.module.scss';
import { Link, NavLink } from 'react-router-dom';

const TopBar = () => {
  return (
    <nav className={s.navbar}>
      <Link to="/" className={s.logo}>
        Conduit
      </Link>

      <NavLink to="/" className={s.link} exact>
        Home
      </NavLink>
      <NavLink to="/login" className={s.link}>
        Sign in
      </NavLink>
      <NavLink to="/register" className={s.link}>
        Sign up
      </NavLink>
    </nav>
  );
};

export default TopBar;
