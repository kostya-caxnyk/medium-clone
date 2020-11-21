import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';

import s from './GlobalFeed.module.scss';

import {
  Feed,
  Pagination,
  PopularTags,
  Loading,
  ErrorMessage,
  FeedToggler,
} from '../../components';
import useFetch from '../../hooks/useFetch';
import { getPaginator, limit } from '../../utils';

const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;

  const { offset, currentPage } = getPaginator(location.search);
  const stringifyParams = stringify({ limit, offset, tag: tagName });
  const apiUrl = `/articles?${stringifyParams}`;

  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <div className={s.homepage}>
      <div className={s.banner}>
        <h1 className={s.title}>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>

      <div className={s.content}>
        <div>
          <FeedToggler tagName={tagName} />
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

TagFeed.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default TagFeed;
