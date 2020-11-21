import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BackendErrorMessages from '../BackendErrorMessages/BackendErrorMessages';

import s from './ArticleForm.module.scss';

const ArticleForm = ({ initialValues, errors, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setBody(initialValues.body);
      setTagList(initialValues.tagList);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, body, tagList });
  };

  const handleEnterTag = (e) => {
    if (e.code !== 'Enter') {
      return;
    }

    e.preventDefault();
    setTag('');
    if (tagList.indexOf(tag) >= 0) {
      return;
    }
    setTagList([...tagList, e.target.value]);
  };

  const deleteTag = (idx) => {
    const newTagList = [...tagList.slice(0, idx), ...tagList.slice(idx + 1)];
    setTagList(newTagList);
  };

  return (
    <div className={s.page}>
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
              <i className="fas fa-times" onClick={() => deleteTag(idx)}></i>
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

ArticleForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ArticleForm;
