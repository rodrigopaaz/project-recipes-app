import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

export default function Recipes({ urlSearch, urlList, urlFilter }) {
  const [recipeApi, setRecipeApi] = useState([]);
  const [categoryApi, setCategoryApi] = useState([]);
  const [slugCategory, setSlugCategory] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!slugCategory) {
        const request = await fetch(urlSearch);
        const response = await request.json();
        const recipes = response.meals || response.drinks;
        setRecipeApi(recipes);
      } else {
        const request = await fetch(`${urlFilter}${slugCategory}`);
        const response = await request.json();
        const recipes = response.meals || response.drinks;
        setRecipeApi(recipes);
      }
    };
    fetchRecipes();
    const fetchCategories = async () => {
      const response = await fetch(urlList);
      const results = await response.json();
      const categories = results.meals || results.drinks;
      setCategoryApi(categories);
    };
    fetchCategories();
  }, [urlSearch, urlList, urlFilter, slugCategory]);

  return (
    <main>
      <div>
        { categoryApi.filter((e, index) => index <= Number('4')).map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            name={ e.strCategory }
            value={ e.strCategory }
            onClick={ (elem) => {
              setSlugCategory((elem.target.value));
            } }
          >
            {e.strCategory}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setSlugCategory('') }
        >
          All
        </button>
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
    </main>
  );
}

Recipes.propTypes = {}.isRequired;
