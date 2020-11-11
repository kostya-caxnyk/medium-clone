import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      axios(`https://conduit.productionready.io/api${url}`, options)
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
  }, [isLoading, url, options]);

  return [{ isLoading, error, response }, doFetch];
};

export default useFetch;
