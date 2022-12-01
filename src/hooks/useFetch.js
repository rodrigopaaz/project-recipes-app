import { useState, useEffect } from 'react';

function useFetch(url) {
  const [requiredApi, setRequiredApi] = useState(null);

  useEffect(() => {
    if (url) {
      const fetchRepos = async () => {
        const response = await fetch(url);
        const results = await response.json();
        setRequiredApi(results);
      };
      fetchRepos();
    }
  }, [url]);

  return { requiredApi };
}

export default useFetch;
