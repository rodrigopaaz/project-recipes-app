import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/Context';
import RecipeCard from './RecipeCard';

export default function Recipes({ urlSearch, urlList, urlFilter }) {
  const { handleDish, handleEndPoint } = useContext(AppContext);
  const [recipeApi, setRecipeApi] = useState([]);
  const [categoryApi, setCategoryApi] = useState([]);
  const [slugCategory, setSlugCategory] = useState('');
  const [isCategoryTrue, setIsCategoryTrue] = useState(true);
  const history = useHistory();
  const url = !slugCategory ? urlSearch : (`${urlFilter}${slugCategory}`);

  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(url);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setRecipeApi(recipes);
    };
    fetchRecipes();
    const fetchCategories = async () => {
      const response = await fetch(urlList);
      const results = await response.json();
      const categories = results.meals || results.drinks;
      setCategoryApi(categories);
    };
    fetchCategories();
  }, [url, urlList, slugCategory]);

  const handleChangeCategory = (elem) => {
    if (isCategoryTrue) {
      setSlugCategory((elem.value));
      setIsCategoryTrue(!isCategoryTrue);
    }
    if (!isCategoryTrue) {
      setSlugCategory('');
      setIsCategoryTrue(!isCategoryTrue);
    }
  };

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
            onClick={ ({ target }) => { handleChangeCategory(target); } }
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
        { handleDish
          ? history.push(`./${handleDish}/${handleEndPoint}`)
          : recipeApi && recipeApi
            .filter((e, index) => index <= Number('11')).map((e, index) => (
              <RecipeCard
                key={ e.idMeal || e.idDrink }
                name={ e.strMeal || e.strDrink }
                image={ e.strMealThumb || e.strDrinkThumb }
                index={ index }
                path={ e }
              />
            ))}
      </div>
    </main>
  );
}

Recipes.propTypes = {}.isRequired;
