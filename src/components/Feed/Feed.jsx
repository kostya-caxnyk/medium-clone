import React from 'react';
import { Link } from 'react-router-dom';
import AddToFavorites from '../AddToFavorites/AddToFavorites';
import TagList from '../TagList/TagList';

import s from './Feed.module.scss';

const Feed = ({ articles = [] }) => {
  return (
    <div>
      {articles.map((article, idx) => {
        return (
          <div className={s.article} key={idx}>
            <div className={s.row}>
              <div className={s.meta}>
                <Link to={`/profiles/${article.author.username}`} className={s.photo}>
                  <img src={article.author.image} alt="" />
                </Link>
                <div className={s.info}>
                  <Link to={`/profiles/${article.author.username}`} className={s.author}>
                    <span>{article.author.username}</span>
                  </Link>
                  <span className={s.date}>{article.createdAt.split('T')[0]}</span>
                </div>
              </div>
              <AddToFavorites
                favoritesCount={article.favoritesCount}
                isFavorited={article.favorited}
                slug={article.slug}
                hasLabel={false}
              />
            </div>

            <Link to={`/articles/${article.slug}`}>
              <h1 className={s.title}>{article.title}</h1>
              <p className={s.description}>{article.description}</p>
              <span className={s.more}>Read more...</span>
              <TagList tags={article.tagList} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
