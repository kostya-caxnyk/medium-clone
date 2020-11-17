import React, { useState } from 'react';
import BackendErrorMessages from '../BackendErrorMessages/BackendErrorMessages';

import s from './ArticleForm.module.scss';

const CreateArticle = ({ initialValues, errors, onSubmit }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [body, setBody] = useState(initialValues.body || '');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState(initialValues.tagList || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    console.log(title, description, body, tagList);
  };

  const handleEnterTag = (e) => {
    if (e.code !== 'Enter') {
      return;
    }

    e.preventDefault();
    setTag('');
    setTagList([...tagList, e.target.value]);
  };

  // реализовать удаление тега по клику на крестик, сделать валидацию добавления тега (одинаковый тег не должен добавляться)

  return (
    <div>
      {errors && <BackendErrorMessages backendError={errors} />}
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.title}
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={s.description}
          type="text"
          placeholder="What's this article about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          className={s.body}
          placeholder="Write your article"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          className={s.tags}
          type="text"
          placeholder="Enter tags"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleEnterTag}
        />

        <ul className={s.tagList}>
          {tagList.map((tag, idx) => (
            <li className={s.tag} key={tag + idx}>
              <i className="fas fa-times"></i>
              {tag}
            </li>
          ))}
        </ul>

        <input
          className={s.button}
          type="submit"
          placeholder="Article Title"
          value="Publish Article"
        />
      </form>
    </div>
  );
};

export default CreateArticle;
