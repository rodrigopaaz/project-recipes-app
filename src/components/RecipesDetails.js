import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DrinksRecomendation from './DrinksRecomendation';
import MealsRecomendation from './MealsRecomendation copy';

export default function RecipeDetails() {
  const params = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = params;
  const [fetchMealOrDrink, setFetchMealOrDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

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
    };
    fetchDish();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      { fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <img
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
          <h3 data-testid="recipe-category">{e.strCategory}</h3>
          { pathname.includes('drinks') && (
            <h4 data-testid="recipe-category">
              {e.strAlcoholic}
            </h4>
          )}
          <ul>
            { ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {item[1]}
              </li>
            ))}
          </ul>
          <ul>
            { measures.map((item, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {item[1]}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{ e.strInstructions }</p>
          { pathname.includes('meals') && (
            <div className="div-video">
              <iframe
                data-testid="video"
                width="100%"
                height="425"
                title={ e.strMeal }
                src={ e.strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>)}
          {pathname.includes('meals') ? <DrinksRecomendation />
            : <MealsRecomendation />}
        </div>
      ))}
    </div>
  );
}

RecipeDetails.propTypes = {}.isRequired;
