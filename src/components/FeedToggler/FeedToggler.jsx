import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './FeedToggler.module.scss';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const activeStyle = { borderBottom: '2px solid green', color: 'green' };

const FeedToggler = ({ tagName }) => {
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

FeedToggler.propTypes = {
  tagName: PropTypes.string,
};

export default FeedToggler;
