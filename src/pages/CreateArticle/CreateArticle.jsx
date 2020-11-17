import React from 'react';
import { ArticleForm } from '../../components';

const errors = {};
const initialValues = {};
const onSubmit = (data) => {
  console.log(data);
};

const CreateArticle = () => {
  return (
    <div>
      <ArticleForm errors={errors} initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateArticle;
