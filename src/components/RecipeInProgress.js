import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function RecipeInProgress() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { location: { pathname } } = history;
  const [fetchMealOrDrink, setFetchMealOrDrink] = useState([]);

  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMeal = pathname.includes('meals') ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMeal);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchMealOrDrink(recipes || []);
    };
    fetchDish();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      { fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <button
            data-testid="share-btn"
            type="button"
          >
            Compartilhar
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
          >
            Favoritar
          </button>
          <img
            data-testid="recipe-photo"
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
          />
          <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
          <h3 data-testid="recipe-category">{e.strCategory}</h3>
          <p data-testid="instructions">{ e.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
