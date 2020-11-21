import React from 'react';
import PropTypes from 'prop-types';

import s from './TagList.module.scss';

const TagList = ({ tags }) => {
  return (
    <ul className={s.tagList}>
      {tags.map((tag) => (
        <li className={s.tag} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default TagList;
