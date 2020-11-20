import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import s from './UserArticles.module.scss';

import { ErrorMessage, Feed, Loading, Pagination } from '../../../../components';
import { getPaginator, limit } from '../../../../utils';
import useFetch from '../../../../hooks/useFetch';

const UserArticles = ({ location, isFavorites, username }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({ limit, offset });

  const apiUrl = `/articles?${isFavorites ? 'favorited' : 'author'}=${username}&${stringifyParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, apiUrl]);

  return (
    <div className={s.articles}>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={location.pathname}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserArticles;
