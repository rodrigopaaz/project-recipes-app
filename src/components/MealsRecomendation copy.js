import React, { useEffect, useState } from 'react';

export default function MealsRecomendation() {
  const [recomendation, setRecomendation] = useState([]);
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(URL);
      const response = await request.json();
      setRecomendation(response.meals);
    };
    fetchRecipes();
  }, [URL]);
  return (
    <div style={ { width: '100%', display: 'flex', overflow: 'scroll' } }>
      <div style={ { width: '100%', display: 'flex', overflow: 'scroll' } }>
        {recomendation.filter((e, index) => index <= Number('5'))
          .map((meal, index) => (
            <div
              key={ meal.strMeal }
              style={ { width: '60%' } }
            >
              <img
                data-testid={ `${index}-recommendation-card` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
