import React, { useEffect } from 'react';
import { stringify } from 'query-string';
import PropTypes from 'prop-types';

import s from './GlobalFeed.module.scss';

import {
  Feed,
  Pagination,
  PopularTags,
  ErrorMessage,
  FeedToggler,
  Loading,
} from '../../components';
import useFetch from '../../hooks/useFetch';
import { getPaginator, limit } from '../../utils';

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({ limit, offset });

  const apiUrl = `/articles${match.path === '/feed' ? '/feed' : ''}?${stringifyParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, apiUrl]);

  return (
    <div className={s.homepage}>
      <div className={s.banner}>
        <h1 className={s.title}>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>

      <div className={s.content}>
        <div className={s.left}>
          <FeedToggler />
          <div className={s.articles}>
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
        </div>

        <PopularTags />
      </div>
    </div>
  );
};

GlobalFeed.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default GlobalFeed;
