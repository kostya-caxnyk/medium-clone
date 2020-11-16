import React, { useEffect } from 'react';

import s from './PopularTags.module.scss';

import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

const Tags = () => {
  const apiUrl = '/tags';
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading || !response) {
    return <Loading />;
  }

  return (
    <div className={s.sidebar}>
      <p>Popular tags</p>
      <div className={s.tagsList}>
        {response.tags.map((tag, idx) => (
          <Link to={`/tags/${tag}`} key={tag + idx} className={s.item}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
