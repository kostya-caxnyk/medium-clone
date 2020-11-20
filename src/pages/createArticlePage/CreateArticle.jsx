import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ArticleForm } from '../../components';
import useFetch from '../../hooks/useFetch';

const initialValues = {
  title: '',
  body: '',
  description: '',
  tagList: [],
};

const CreateArticle = () => {
  const [{ response, error }, doFetch] = useFetch('/articles');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const onSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (response) {
      setIsSuccessfullSubmit(true);
    }
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <ArticleForm errors={error && error.errors} initialValues={initialValues} onSubmit={onSubmit} />
  );
};

export default CreateArticle;
