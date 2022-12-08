import React, { useEffect, useState } from 'react';

export default function DrinksRecomendation() {
  const [recomendation, setRecomendation] = useState([]);
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(URL);
      const response = await request.json();
      setRecomendation(response.drinks);
    };
    fetchRecipes();
  }, [URL]);
  return (
    <div style={ { width: '100%', display: 'flex', overflow: 'scroll' } }>
      <div style={ { width: '100%', display: 'flex', overflow: 'scroll' } }>
        {recomendation.filter((e, index) => index <= Number('5'))
          .map((drink, index) => (
            <div
              key={ drink.strDrink }
              style={ { width: '60%' } }
            >
              <img
                data-testid={ `${index}-recommendation-card` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</p>

            </div>
          ))}
      </div>
    </div>
  );
}
