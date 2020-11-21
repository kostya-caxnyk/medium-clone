import React from 'react';
import PropTypes from 'prop-types';

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

BackendErrorMessages.propTypes = {
  backendError: PropTypes.object.isRequired,
};

export default BackendErrorMessages;
