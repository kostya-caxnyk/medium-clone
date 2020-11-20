import React from 'react';

import classnames from 'classnames';
import s from './Pagination.module.scss';
import { Link } from 'react-router-dom';

const PaginationItem = ({ page, currentPage, url }) => {
  const classes = classnames(s.item, { [s.active]: currentPage === page });

  return (
    <li className={classes}>
      <Link to={`${url}?page=${page}`} className={s.link}>
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = Array(pagesCount).fill(1);

  if (pages < 2) {
    return null;
  }

  return (
    <div>
      <ul className={s.list}>
        {pages.map((z, idx) => (
          <PaginationItem currentPage={currentPage} page={idx + 1} url={url} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
