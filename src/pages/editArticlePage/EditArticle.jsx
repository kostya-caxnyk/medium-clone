import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleForm } from '../../components';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFetch from '../../hooks/useFetch';

const EditArticle = ({ match }) => {
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [currentUserState] = useContext(CurrentUserContext);

  const apiUrl = `/articles/${match.params.slug}`;
  const [{ response: fetchArticleResponse }, doArticleFetch] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);

  useEffect(() => {
    doArticleFetch();
  }, [doArticleFetch]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (updateArticleResponse) {
      setIsSuccessfullSubmit(true);
    }
  }, [updateArticleResponse]);

  const onSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    });
  };

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <ArticleForm
      errors={updateArticleError && updateArticleError.errors}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

export default EditArticle;
