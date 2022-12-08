import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';

export default function RecipeInProgress() {
  const params = useParams();
  const { id } = params;
  const history = useHistory();
  const { location: { pathname } } = history;
  const [fetchMealOrDrink, setFetchMealOrDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  // const [localCheckedState, setlocalCheckedState] = useState([]);

  const handleRecipies = () => {
    const isInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isMeal = pathname.includes('meals') ? 'meals' : 'drinks';
    const addIngredient = {
      [isInProgressRecipes[isMeal]]: { [id]: [isChecked] },
    };
    const addIngredient2 = {
      [isMeal]: { [id]: [isChecked] },
    };
    if (!isInProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify([addIngredient]),
      );
      console.log(1);
    }
    if (isInProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify([...isInProgressRecipes, addIngredient2]),
      );
      console.log(2);
    }
  };

  // //{
  //   drinks: {
  //     id-da-bebida: [lista-de-ingredientes-utilizados],
  //     ...
  // },
  // meals: {
  //     id-da-comida: [lista-de-ingredientes-utilizados],
  //     ...
  // }

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
      setIsChecked(new Array(selectIngredients.length).fill(false));
      // setlocalCheckedState(localStorage.getItem('inProgressRecipes'));
    };
    fetchDish();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   handleRecipies();
  //   console.log('entrou');
  // }, [isChecked]);

  // useEffect(() => {
  //   setlocalCheckedState(localStorage.getItem('inProgressRecipes'));
  //   const setLocal = (position) => {
  //     const teste = localCheckedState
  //       .map((item, index) => (index === position ? !item : item));
  //     setIsChecked(teste);
  //   };
  //   setLocal();
  // }, []);

  // https://www.freecodecamp.org/portuguese/news/tutorial-de-react-como-trabalhar-com-varias-caixas-de-selecao/
  const handleChange = (position) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
    handleRecipies();
    // localStorage.setItem('inProgressRecipes', (`${updatedCheckedState}`));
  };

  return (
    <div>
      { fetchMealOrDrink.map((e) => (
        <div key={ e.idMeal || e.idDrink }>
          <button
            data-testid="share-btn"
            type="button"
          >
            Compartilhar
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
          >
            Favoritar
          </button>
          <img
            data-testid="recipe-photo"
            src={ e.strMealThumb || e.strDrinkThumb }
            alt={ e.strMeal || e.strDrink }
          />
          <h2 data-testid="recipe-title">{e.strMeal || e.strDrink}</h2>
          <h3 data-testid="recipe-category">{e.strCategory}</h3>
          { ingredients.map((elem, index) => (
            <li key={ index }>
              <label
                htmlFor={ `${index}-ingredient-step` }
                data-testid={ `${index}-ingredient-step` }
                style={ { textDecoration: isChecked[index]
                    && 'line-through solid rgb(0, 0, 0)' } }
              >
                <input
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
          >
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
