import React from 'react';
import { Link } from 'react-router-dom';

import s from './Feed.module.scss';

const Feed = ({ articles = [] }) => {
  return (
    <div>
      {articles.map((article, idx) => {
        return (
          <div className={s.article} key={idx}>
            <div className={s.meta}>
              <Link to={`/profiles/${article.author.username}`} className={s.photo}>
                <img src={article.author.image} alt="" />
              </Link>
              <div className={s.info}>
                <Link to={`/profiles/${article.author.username}`} className={s.author}>
                  <span>{article.author.username}</span>
                </Link>
                <span className={s.date}>{article.createdAt}</span>
              </div>
            </div>
            <Link to={`/articles/${article.slug}`}>
              <h1 className={s.title}>{article.title}</h1>
              <p className={s.description}>{article.description}</p>
              <span className={s.more}>Read more...</span>
              <ul className={s.tagList}>
                {article.tagList.map((tag) => (
                  <li className={s.tag} key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
