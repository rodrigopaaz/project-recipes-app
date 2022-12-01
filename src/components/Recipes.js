import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes({ urlSearch, urlCategories }) {
  const [recipeApi, setRecipeApi] = useState([]);
  const [categoryApi, SetCategoryApi] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(urlSearch);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setRecipeApi(recipes);
    };
    fetchRecipes();
    const fetchCategories = async () => {
      const response = await fetch(urlCategories);
      const results = await response.json();
      const categories = results.meals || results.drinks;
      SetCategoryApi(categories);
    };
    fetchCategories();
  }, [urlSearch, urlCategories]);

  return (
    <section>
      <div>
        { categoryApi.filter((e, index) => index <= Number('4')).map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
          >
            {e.strCategory}
          </button>
        ))}
      </div>
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
    </section>

  );
}

Recipes.propTypes = {}.isRequired;
