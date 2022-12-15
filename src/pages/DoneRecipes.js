import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import '../styles/DoneRecipes.css';
import iconFastFood from '../images/iconFastFood.svg';
import meals from '../images/meals.svg';
import drinks from '../images/drinks.svg';

export default function Done() {
  const history = useHistory();
  const [getDoneRecipes, setGetDoneRecipes] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('all');
  useEffect(() => {
    const getDone = () => {
      if (localStorage.doneRecipes) {
        const getFromLocalStorage = JSON.parse(localStorage.doneRecipes);
        switch (filterDoneRecipes) {
        case 'drinks':
          return setGetDoneRecipes(
            getFromLocalStorage.filter((e) => e.type === 'drink'),
          );
        case 'meals':
          return setGetDoneRecipes(
            getFromLocalStorage.filter((e) => e.type === 'meal'),
          );
        default:
          return setGetDoneRecipes(getFromLocalStorage);
        }
        /*       setGetDoneRecipes([{
        meals: getFromLocalStorage.filter((e) => e.type === 'meal'),
        drinks: getFromLocalStorage.filter((e) => e.type === 'drink'),
      }]); */
      }
      return setGetDoneRecipes([]);
    };
    getDone();
  }, [filterDoneRecipes]);
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Done Recipes</h4>
        <button
          type="button"
          onClick={ () => history.push('./profile') }
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
      </Header>
      <main>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterDoneRecipes('all') }
            className="button-all"
          >
            <img src={ iconFastFood } alt="fast-food-icon" />
            <p className="link-paragraph">All</p>
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilterDoneRecipes('meals') }
            className="button-meals"
          >
            <img src={ meals } alt="meals-icon" />
            <p className="link-paragraph">Meals</p>
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilterDoneRecipes('drinks') }
            className="button-drinks"
          >
            <img src={ drinks } alt="drinks-icon" />
            <p className="link-paragraph">Drinks</p>
          </button>
        </div>
        <div className="div__done__recipes">
          { getDoneRecipes.map((e, index) => (
            <div key={ index + e.id }>
              <DoneRecipeCard
                element={ e }
                index={ index }
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
