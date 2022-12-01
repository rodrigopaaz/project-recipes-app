import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes({ url }) {
  const [recipeApi, setRecipeApi] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(url);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setRecipeApi(recipes);
    };
    fetchRecipes();
  }, [url]);

  return (
    <div>
      { recipeApi.filter((e, index) => index <= Number('11')).map((e, index) => (
        <RecipeCard
          key={ e.idMeal || e.idDrink }
          name={ e.strMeal || e.strDrink }
          image={ e.strMealThumb || e.strDrinkThumb }
          index={ index }
        />
      ))}
    </div>

  );
}

Recipes.propTypes = {}.isRequired;
