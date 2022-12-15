import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/Context';
import RecipeCard from './RecipeCard';
import all from '../images/all.svg';
import Breakfast from '../images/breakfast.svg';
import Chicken from '../images/chicken.svg';
import Dessert from '../images/dessert.svg';
import ordinary from '../images/drink.svg';
import Cocktail from '../images/cocktail.svg';
import Shake from '../images/shake.svg';
import other from '../images/other.svg';
import Cocoa from '../images/cocoa.svg';
import Beef from '../images/beef.svg';
import Goat from '../images/goat.svg';

export default function Recipes({ urlSearch, urlList, urlFilter }) {
  const { handleDish, handleEndPoint } = useContext(AppContext);
  const [recipeApi, setRecipeApi] = useState([]);
  const [categoryApi, setCategoryApi] = useState([]);
  const [slugCategory, setSlugCategory] = useState('');
  const [isCategoryTrue, setIsCategoryTrue] = useState(true);
  const history = useHistory();
  const url = !slugCategory ? urlSearch : (`${urlFilter}${slugCategory}`);
  const images = {
    Beef,
    Breakfast,
    Chicken,
    Dessert,
    Goat,
    'Ordinary Drink': ordinary,
    Cocktail,
    Shake,
    'Other / Unknown': other,
    Cocoa,
  };

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
      <div className="main__recipes">
        <input
          type="image"
          alt="all_recipes"
          data-testid="All-category-filter"
          onClick={ () => setSlugCategory('') }
          src={ all }
        />
        { categoryApi.filter((e, index) => index <= Number('4')).map((e, index) => (
          <input
            key={ index }
            type="image"
            alt={ e.strCategory }
            data-testid={ `${e.strCategory}-category-filter` }
            name={ e.strCategory }
            value={ e.strCategory }
            onClick={ ({ target }) => { handleChangeCategory(target); } }
            src={ images[e.strCategory] }
          />
        ))}
      </div>
      <div className="main__meals">
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
