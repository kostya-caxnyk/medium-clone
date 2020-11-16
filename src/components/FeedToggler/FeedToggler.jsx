import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import s from './FeedToggler.module.scss';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const activeStyle = {
  color: 'green',
};

const FeedToggle = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const path = currentUserState.isLoggedIn ? '/feed' : '/login';

  return (
    <div className={s.feedBar}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to={path} className={s.link} activeStyle={activeStyle}>
            Your Feed
          </NavLink>
        </li>

        <li className={s.item}>
          <NavLink to="/" className={s.link} activeStyle={activeStyle} exact>
            Global Feed
          </NavLink>
        </li>

        {tagName && (
          <li className={s.item}>
            <NavLink to={`/tags/${tagName}`} activeStyle={activeStyle} className={s.link} exact>
              #{tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
