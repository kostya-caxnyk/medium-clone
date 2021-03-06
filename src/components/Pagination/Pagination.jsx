import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import s from './Pagination.module.scss';

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

  if (pagesCount < 2) {
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

PaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
