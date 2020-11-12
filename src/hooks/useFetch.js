import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const requestOptions = {
        ...options,
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      };

      axios(`https://conduit.productionready.io/api${url}`, requestOptions)
        .then((res) => {
          setIsLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data);
          console.log('error', err);
        });
    }
  }, [isLoading, url, options, token]);

  return [{ isLoading, error, response }, doFetch];
};

export default useFetch;
