import React from 'react';

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

export default TagList;
