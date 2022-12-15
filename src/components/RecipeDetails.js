import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksRecomendation from './DrinksRecomendation';
import MealsRecomendation from './MealsRecomendation copy';
import heartOn from '../images/whiteHeartIcon.svg';
import heartOff from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const params = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = params;
  const [isCopy, setIsCopy] = useState(false);
  const [fetchMealOrDrink, setFetchMealOrDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMeal = pathname.includes('meals') ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMeal);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchMealOrDrink(recipes || []);
      setIngredients(Object.entries(recipes[0])
        .filter(([key, value]) => key.includes('Ingredient') && value));
      // .reduce((acc, atual) => {
      //   acc = acc[atual];
      //   return acc;
      // }, {}));
      setMeasures(Object.entries(recipes[0])
        .filter(([key, value]) => key.includes('Measure') && value && value !== ' '));

      const saved = localStorage.favoriteRecipes
        ? JSON.parse(localStorage.favoriteRecipes) : [];
      if (saved.find((el) => el.id === id)) {
        setIsFavorite(true);
      }
    };
    fetchDish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isInProgress = localStorage.inProgressRecipes
    ? 'Continue Recipe' : 'Start Recipe';
  const recipeUrl = window.location.href;

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
    if (!saved.find((el) => el.ID === newData.ID)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
    }
  };

  const removeFavorite = () => {
    const saved = JSON.parse(localStorage.favoriteRecipes) || '';
    const removeItem = saved.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  };

  return (
    <div style={ { display: 'flex', justifyContent: 'center', width: '100%' } }>
      {fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <div className="container-xxl">
            <div className="g-col-6">
              <img
                src={ e.strMealThumb || e.strDrinkThumb }
                alt={ e.strMeal || e.strDrink }
                data-testid="recipe-photo"
                className="img-fluid"
              />
            </div>
            <div>
              {isCopy && <p>Link copied!</p>}
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(recipeUrl);
                  }
                  setIsCopy(true);
                } }
              >
                Share
              </button>
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
            </div>
            <div>
              <h2
                data-testid="recipe-title"
              >
                {e.strMeal || e.strDrink}
              </h2>
              <h3 data-testid="recipe-category">{e.strCategory}</h3>
              {pathname.includes('drinks') && (
                <h4 data-testid="recipe-category">
                  {e.strAlcoholic}
                </h4>
              )}
              <div className="container-1 row list">
                <ul className="col">
                  { ingredients.map((item, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {item[1]}
                    </li>
                  ))}
                </ul>
                <ul className="col">
                  { measures.map((item, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {item[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="container-xx lad text">
            {pathname.includes('meals') && (
              <div className="container-xx ">
                <iframe
                  data-testid="video"
                  width="100%"
                  height="425"
                  title={ e.strMeal }
                  src={ e.strYoutube.replace('watch?v=', 'embed/') }
                />
              </div>)}
            <p
              data-testid="instructions"
              className="container-xxl"
            >
              {e.strInstructions}
            </p>
          </div>
          <div className="container-xxl">
            {pathname.includes('meals') ? <DrinksRecomendation />
              : <MealsRecomendation />}
          </div>
          <button
            style={ { position: 'fixed', bottom: '0px' } }
            className="button-start"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ (() => {
              history.push(`${pathname}/in-progress`);
            }) }
          >
            {isInProgress}
          </button>
        </div>
      ))}
    </div>
  );
}

RecipeDetails.propTypes = {}.isRequired;
