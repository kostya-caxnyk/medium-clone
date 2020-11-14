import React, { useEffect } from 'react';

import s from './GlobalFeed.module.scss';

import { Feed } from '../../components';
import useFetch from '../../hooks/useFetch';

const GlobalFeed = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch('/articles?limit=10&offset=0');
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className={s.homepage}>
      <div className={s.banner}>
        <h1 className={s.title}>Medium clone</h1>
        <p>A place to share knowledge</p>
      </div>

      <div className={s.content}>
        <div className={s.articles}>
          {isLoading && <div>Loading...</div>}
          {error && <div>Some error has occured</div>}
          {!isLoading && response && <Feed articles={response.articles} />}
        </div>
        <div className={s.tags}>Popular tags</div>
      </div>
    </div>
  );
};

export default GlobalFeed;
