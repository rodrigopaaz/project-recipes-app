import { useState, useEffect } from 'react';

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [requiredApi, setRequiredApi] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const newError = await data.json();
          throw newError.message;
        }
        const results = await response.json();
        setRequiredApi(results);
      } catch (e) {
        setErrors(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepos();
  }, [url]);

  return { requiredApi, isLoading, errors };
}

export default useFetch;
