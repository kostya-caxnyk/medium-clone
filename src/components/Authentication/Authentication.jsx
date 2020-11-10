import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import s from './Authentication.module.scss';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    axios('https://conduit.production.ready.io/api/users/login', {
      method: 'post',
    });
  }, []);

  return (
    <div className={s.auth}>
      <h1 className={s.title}>Login</h1>
      <Link to="/register" className={s.ref}>
        Need an account?
      </Link>
      <form className={s.form} onSubmit={handleSubmit}>
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
        <button type="submit" className={s.submit}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Authentication;
