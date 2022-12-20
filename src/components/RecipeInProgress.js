/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import heartOn from '../images/whiteHeart.png';
import heartOff from '../images/blackHeart.svg';
import share from '../images/share.svg';
import doneRecipesLocalStorage from './doneRecipesLocalStorage';
import '../styles/recipes-in-progress.css';
import addOrRemoveFavorite from './addOrRemoveFavorite';

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
  const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';

  const { saveFavorite, removeFavorite } = addOrRemoveFavorite();

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ [isMeal]: {} }));
    }
    if (localStorage.inProgressRecipes.includes(id)) {
      const checkMeal = pathname.includes('meals') ? 'meals' : 'drinks';
      const updatedChecked = JSON.parse(localStorage.inProgressRecipes)[checkMeal][id];
      setIsChecked([...updatedChecked]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMealUrl = pathname.includes('meals') ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMealUrl);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchMealOrDrink(recipes || []);
      const selectIngredients = Object.entries(recipes[0])
        .filter(([key, value]) => key.includes('Ingredient') && value);
      setIngredients(selectIngredients);
      const updatedChecked = JSON.parse(localStorage.inProgressRecipes)[isMeal][id];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecipies = () => {
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
  }, [isChecked]);

  const handleChange = (position) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
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
            <div className="share__favorite__btn">
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
                <img
                  src={ share }
                  className="favorite_btn"
                  alt="share__btn"
                />
              </button>
              {isCopy && <p>Link copied!</p>}
              <button
                type="button"
                onClick={ (() => {
                  if (!isFavorite) { saveFavorite(e); }
                  if (isFavorite) { removeFavorite(id); }
                  setIsFavorite(!isFavorite);
                }
                ) }
              >
                <img
                  className="favorite_btn"
                  data-testid="favorite-btn"
                  src={ !isFavorite
                    ? heartOn
                    : heartOff }
                  alt="favorites"
                />
              </button>
            </div>
            <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
            <h3 data-testid="recipe-category">{e.strCategory}</h3>
            {/*   <img
            data-testid="recipe-photo"
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
          /> */}
          </div>
          <div className="div__inProgress">
            <h5>Ingredients</h5>
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
            <div className="btn__finish">
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
        </div>
      ))}
    </div>
  );
}
