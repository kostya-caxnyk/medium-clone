import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import s from './Settings.module.scss';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { BackendErrorMessages } from '../../components';

const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [, setToken] = useLocalStorage('token');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [{ response, error }, doFetch] = useFetch('/user');

  const handleSumbit = (e) => {
    e.preventDefault();

    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };

  const logout = () => {
    setToken('');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    if (currentUserState.currentUser) {
      const user = currentUserState.currentUser;
      setImage(user.image);
      setUsername(user.username);
      setBio(user.bio);
      setEmail(user.email);
    }
  }, [currentUserState]);

  useEffect(() => {
    if (response) {
      setIsSuccessfullSubmit(true);
      dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
    }
  }, [response, dispatch]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/profiles/${username}`} />;
  }

  return (
    <div className={s.settings}>
      <h1 className={s.title}>Your Settings</h1>
      {error && <BackendErrorMessages backendError={error.errors} />}
      <form className={s.form} onSubmit={handleSumbit}>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className={classnames(s.input, s.imageUrl)}
          placeholder="URL of profile picture"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={classnames(s.input, s.username)}
          placeholder="Username"
        />
        <textarea
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
          className={classnames(s.input, s.bio)}
          placeholder="Short bio about you"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classnames(s.input, s.email)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classnames(s.input, s.password)}
          placeholder="New Password"
        />
        <input type="submit" className={s.submit} value="Update Settings" />
      </form>
      <button className={s.logout} onClick={logout}>
        Or click here to logout
      </button>
    </div>
  );
};

export default Settings;
