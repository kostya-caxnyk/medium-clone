import React, { useEffect } from 'react';

import s from './Article.module.scss';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import TagList from '../../components/TagList/TagList';

const Article = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;

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
  console.log(response);
  const {
    title,
    createdAt,
    tagList,
    body,
    author: { username, image },
  } = response.article;

  return (
    <div className={s.page}>
      <div className={s.banner}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.meta}>
          <Link to={`/profiles/${username}`} className={s.photo}>
            <img src={image} alt="" />
          </Link>
          <div className={s.info}>
            <Link to={`/profiles/${username}`} className={s.author}>
              {username}
            </Link>
            <span className={s.date}>{createdAt}</span>
          </div>
        </div>
      </div>

      <div className={s.content}>
        <div>
          <p className={s.body}>{body}</p>
        </div>
        <TagList tags={tagList} />
      </div>
    </div>
  );
};

export default Article;
