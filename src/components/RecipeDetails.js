import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksRecomendation from './DrinksRecomendation';
import MealsRecomendation from './MealsRecomendation';
import heartOn from '../images/whiteHeart.png';
import heartOff from '../images/blackHeart.svg';
import share from '../images/share.svg';
import '../styles/RecipeDetails.css';
import addOrRemoveFavorite from './addOrRemoveFavorite';

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

  const { saveFavorite, removeFavorite } = addOrRemoveFavorite();

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

  return (
    <div className="recipe__details__main">
      {isCopy && <p>Link copied!</p>}

      {fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <div className="container-xxl">
            <div
              className="g-col-6 recipe__img"
              style={ { backgroundImage: `url( 
            ${e.strMealThumb || e.strDrinkThumb})`,
              with: '100%',
              height: '400px',
              } }
            >
              <button
                className="favorite_btn"
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(recipeUrl);
                  }
                  setIsCopy(true);
                } }
              >
                <img
                  className="favorite_btn"
                  data-testid="favorite-btn"
                  src={ share }
                  alt="share_btn"
                />
              </button>
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
                  data-testid="favorite-btn"
                  src={ !isFavorite
                    ? heartOn
                    : heartOff }
                  alt="favorites"
                />
              </button>
              <h3 data-testid="recipe-category">{e.strCategory}</h3>

              <h2
                data-testid="recipe-title"
              >
                {e.strMeal || e.strDrink}
              </h2>
            </div>
            <div>

              {pathname.includes('drinks') && (
                <h4 data-testid="recipe-category">
                  {e.strAlcoholic}
                </h4>
              )}
              <h5>Ingredients</h5>
              <div className="container-1 row list">
                <ul className="col">
                  { ingredients.map((item, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${item[1]} - `}
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
            <h5>Instructions</h5>
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
