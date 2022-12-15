import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import heartOn from '../images/whiteHeartIcon.svg';
import heartOff from '../images/blackHeartIcon.svg';
import doneRecipesLocalStorage from './doneRecipesLocalStorage';

export default function RecipeInProgress() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { location: { pathname } } = history;

  const [fetchMealOrDrink, setFetchMealOrDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setIsChecked] = useState(null);
  const [isCopy, setIsCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';
      localStorage.setItem('inProgressRecipes', JSON.stringify({ [isMeal]: {} }));
    }
    if (localStorage.inProgressRecipes.includes(id)) {
      const checkMeal = pathname.includes('meals') ? 'meals' : 'drinks';
      const updatedChecked = JSON.parse(localStorage.inProgressRecipes)[checkMeal][id];
      setIsChecked([...updatedChecked]);
    }
  }, []);

  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMeal = pathname.includes('meals') ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMeal);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchMealOrDrink(recipes || []);
      const selectIngredients = Object.entries(recipes[0])
        .filter(([key, value]) => key.includes('Ingredient') && value);
      setIngredients(selectIngredients);
      const isMeal2 = pathname.includes('meals') ? 'meals' : 'drinks';
      const updatedChecked = JSON.parse(localStorage.inProgressRecipes)[isMeal2][id];
      if (!updatedChecked) {
        setIsChecked(new Array(selectIngredients.length)
          .fill(false));
      }
    };
    const saved = localStorage.favoriteRecipes
      ? JSON.parse(localStorage.favoriteRecipes) : [];
    if (saved.find((el) => el.id === id)) {
      setIsFavorite(true);
    }
    fetchDish();
  }, []);

  const handleRecipies = () => {
    const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';
    if (isChecked) {
      if (!isChecked.includes(false)) {
        setIsDisabled(false);
      }
      if (isChecked.includes(false)) {
        setIsDisabled(true);
      }
    }
    if (localStorage.inProgressRecipes) {
      const parseRecipes = JSON.parse(localStorage.inProgressRecipes);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ ...parseRecipes,
          [isMeal]: { ...parseRecipes[isMeal], [id]: isChecked } }),
      );
    }
  };

  useEffect(() => {
    handleRecipies();
    /*     if (!isChecked.includes(false)) {
      setIsDisabled(false);
    } */
  }, [isChecked]);

  const handleChange = (position) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
  };

  const saveFavorite = (e) => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const ID = e.idMeal || e.idDrink;
    const type = e.idMeal ? 'meal' : 'drink';
    const nationality = e.strArea || '';
    const category = e.strCategory || '';
    const alcoholicOrNot = e.strAlcoholic || '';
    const name = e.strDrink || e.strMeal;
    const image = e.strDrinkThumb || e.strMealThumb;
    const saved = JSON.parse(localStorage.favoriteRecipes);
    const newData = { id: ID,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image };
    const updated = [...saved, newData];
    if (!saved.find((el) => el.ID === newData.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
    }
  };

  const removeFavorite = () => {
    const saved = JSON.parse(localStorage.favoriteRecipes) || '';
    const removeItem = saved.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  };

  return (
    <div className="recipe__details__main">
      { fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <div
            className="g-col-6 recipe__img"
            style={ { backgroundImage: `url( 
         ${e.strMealThumb || e.strDrinkThumb})`,
            with: '100%',
            height: '400px',
            } }

          >
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => {
                if (navigator.clipboard) {
                  const recipeUrl = window.location.href;
                  navigator.clipboard.writeText(recipeUrl.replace('/in-progress', ''));
                }
                setIsCopy(true);
              } }
            >
              Compartilhar
            </button>
            {isCopy && <p>Link copied!</p>}
            <button
              type="button"
              onClick={ (() => {
                if (!isFavorite) { saveFavorite(e); }
                if (isFavorite) { removeFavorite(); }
                setIsFavorite(!isFavorite);
              }
              ) }
            >
              <img
                data-testid="favorite-btn"
                src={ !isFavorite
                  ? heartOn
                  : heartOff }
                alt="favorites"
              />
            </button>
            <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
            <h3 data-testid="recipe-category">{e.strCategory}</h3>
            {/*   <img
            data-testid="recipe-photo"
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
          /> */}
          </div>
          <div className="div__inProgress">
            { ingredients.map((elem, index) => (
              <li key={ index }>
                <label
                  htmlFor={ `${index}-ingredient-step` }
                  data-testid={ `${index}-ingredient-step` }
                  style={ { textDecoration: isChecked[index]
                    && 'line-through solid rgb(0, 0, 0)' } }
                >
                  <input
                    className="check__recipe"
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                    checked={ isChecked[index] }
                    onChange={ () => handleChange(index) }
                  />
                  {elem[1]}
                </label>
              </li>
            ))}
            <p data-testid="instructions">{ e.strInstructions }</p>
            <button
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ isDisabled }
              onClick={ () => {
                doneRecipesLocalStorage(e);
                history.push('/done-recipes');
              } }
            >
              Finalizar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
