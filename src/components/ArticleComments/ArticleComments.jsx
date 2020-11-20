import React, { useEffect } from 'react';

import s from './ArticleComments.module.scss';

import useFetch from '../../hooks/useFetch';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loading';

const ArticleComments = ({ articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/comments`;
  const [{ response, error, loading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (error) {
    return <ErrorMessage />;
  }

  if (loading || !response) {
    return <Loading />;
  }

  return (
    <div className={s.commentsPage}>
      <form className={s.postForm}>
        <textarea className={s.postBody} placeholder="Write a comment..." />
        <div className={s.postMeta}>
          <img
            src="https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg"
            alt="1"
            className={s.postImg}
          />
          <input type="submit" className={s.postBtn} value="Post Comment" />
        </div>
      </form>
      <ul className={s.comments}>
        {response.comments.map(({ body, id, createdAt, author: { username, image } }) => (
          <li key={id} className={s.comment}>
            <div className={s.commentBody}>{body}</div>
            <div className={s.commentMeta}>
              <img src={image} alt="2" className={s.img} />
              <span className={s.name}>{username}</span>
              <span className={s.date}>{createdAt.split('T')[0]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleComments;
