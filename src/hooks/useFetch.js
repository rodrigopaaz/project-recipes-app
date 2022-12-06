import { useState, useEffect, useContext } from 'react';
import AppContext from '../context/Context';

function useFetch(url) {
  const [requiredApi, setRequiredApi] = useState(null);
  const { setHandleDish, setHandleEndPoint } = useContext(AppContext);

  useEffect(() => {
    if (url) {
      const fetchRepos = async () => {
        const response = await fetch(url);
        const results = await response.json();
        const recipes = results.meals || results.drinks;
        if (!recipes) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setRequiredApi(recipes);
        if (recipes.length === 1) {
          const dish = (Object.keys(recipes[0])[0]) === 'idMeal' ? 'meals' : 'drinks';
          const endPoint = (Object.values(recipes[0])[0]);
          setHandleDish(dish);
          setHandleEndPoint(endPoint);
        }
      };
      fetchRepos();
    }
  }, [url, setHandleDish, setHandleEndPoint]);

  return { requiredApi };
}

export default useFetch;
