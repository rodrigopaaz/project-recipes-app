import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';

export default function Recipes({ url }) {
  const [recipeApi, setRecipeApi] = useState([]);
  const history = useHistory();
  const [handleDish, setHandleDish] = useState(null);
  const [handleEndPoint, setHandleEndPoint] = useState('');
  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(url);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      if (!recipes) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }

      setRecipeApi(recipes);
      if (recipes.length === 1) {
        const dish = (Object.keys(recipes[0])[0]) === 'idMeal' ? 'meals' : 'drinks';
        const endPoint = (Object.values(recipes[0])[0]);
        setHandleDish(dish);
        setHandleEndPoint(endPoint);
        if (recipes.length === 0) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      }
    };
    fetchRecipes();
  }, [url]);

  return (
    <div>
      { handleDish
        ? history.push(`./${handleDish}/${handleEndPoint}`)
        : recipeApi.filter((e, index) => index <= Number('11')).map((e, index) => (
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
