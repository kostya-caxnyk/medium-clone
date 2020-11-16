import React, { useEffect } from 'react';

import s from './GlobalFeed.module.scss';

import { Feed, Pagination } from '../../components';
import useFetch from '../../hooks/useFetch';
import { getPaginator, limit } from '../../utils';
import { stringify } from 'query-string';
import Tags from '../../components/PopularTags/PopularTags';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FeedToggle from '../../components/FeedToggler/FeedToggler';

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
        <div>
          <FeedToggle />
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

        <Tags />
      </div>
    </div>
  );
};

export default GlobalFeed;
