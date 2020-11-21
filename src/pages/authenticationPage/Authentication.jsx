import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import s from './Authentication.module.scss';

import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { BackendErrorMessages } from '../../components';

const Authentication = ({ match }) => {
  const isLogin = match.path === '/login';

  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descrioptionLink = isLogin ? '/register' : '/login';
  const descrioptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token');
  const [, dispatch] = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = isLogin ? { email, password } : { username, email, password };

    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (response) {
      setToken(response.user.token);
      setIsSuccessfullSubmit(true);
      setUsername('');
      setEmail('');
      setPassword('');
      dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
    }
  }, [response, setToken, dispatch]);

  if (isSuccessfullSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className={s.auth}>
      <h1 className={s.title}>{pageTitle}</h1>
      <Link to={descrioptionLink} className={s.ref}>
        {descrioptionText}
      </Link>
      <form className={s.form} onSubmit={handleSubmit}>
        {error && <BackendErrorMessages backendError={error.errors} />}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className={s.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className={s.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={s.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={classnames(s.submit)} disabled={isLoading}>
          {pageTitle}
        </button>
      </form>
    </div>
  );
};

Authentication.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Authentication;
