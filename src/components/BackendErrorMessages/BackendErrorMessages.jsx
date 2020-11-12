import React from 'react';

import s from './BackendErrorMessages.module.scss';

const BackendErrorMessages = ({ backendError }) => {
  return (
    <ul className={s.errors}>
      {Object.entries(backendError).map(([name, messages]) => {
        return messages.map((message, idx) => (
          <li key={name + idx}>
            {name} {message}
          </li>
        ));
      })}
    </ul>
  );
};

export default BackendErrorMessages;
