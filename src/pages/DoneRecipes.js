import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

export default function Done() {
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
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
      </Header>
      <main>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterDoneRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterDoneRecipes('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterDoneRecipes('drinks') }
        >
          Drinks
        </button>
        <section>
          { getDoneRecipes.map((e, index) => (
            <div key={ index + e.id }>
              <DoneRecipeCard
                element={ e }
                index={ index }
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
