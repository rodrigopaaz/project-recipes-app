import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

export default function Done() {
  const [getDoneRecipes, setGetDoneRecipes] = useState([]);
  useEffect(() => {
    const getDone = () => {
      const getFromLocalStorage = JSON.parse(localStorage.doneRecipes);
      /*       setGetDoneRecipes([{
        meals: getFromLocalStorage.filter((e) => e.type === 'meal'),
        drinks: getFromLocalStorage.filter((e) => e.type === 'drink'),
      }]); */
      setGetDoneRecipes(getFromLocalStorage);
    };
    getDone();
  }, []);
  console.log(getDoneRecipes);
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
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
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
