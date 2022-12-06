import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';

export default function RecipeDetails() {
  const params = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = params;
  const [fetchSingleDish, setFetchMealOrDrink] = useState([]);
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
      <h1>teste</h1>
      { fetchSingleDish.map((e, index) => (
        <RecipeCard
          path={ e }
          name={ e.strMeal || e.strDrink }
          image={ e.strMealThumb || e.strDrinkThumb }
          index={ index }
          key={ index }
        />
      ))}
    </div>
  );
}
RecipeDetails.propTypes = {}.isRequired;
