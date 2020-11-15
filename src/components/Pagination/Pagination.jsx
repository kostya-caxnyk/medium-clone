import React from 'react';

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  console.log(pagesCount);
  return <div>Pagination</div>;
};

export default Pagination;
