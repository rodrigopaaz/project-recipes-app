import React, { useEffect, useState, useContext } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';
import AppContext from '../context/Context';
import profileIcon from '../images/profileIcon.svg';

export default function Favorite() {
  const [getFavoriteRecipes, setGetFavoriteRecipes] = useState([]);
  const { filterFavoriteRecipes, setFilterFavoriteRecipes } = useContext(AppContext);
  useEffect(() => {
    const getDone = () => {
      if (localStorage.favoriteRecipes) {
        const getFromLocalStorage = JSON.parse(localStorage.favoriteRecipes);
        switch (filterFavoriteRecipes) {
        case 'drinks':
          return setGetFavoriteRecipes(
            getFromLocalStorage.filter((e) => e.type === 'drink'),
          );
        case 'meals':
          return setGetFavoriteRecipes(
            getFromLocalStorage.filter((e) => e.type === 'meal'),
          );
        default:
          return setGetFavoriteRecipes(getFromLocalStorage);
        }
      }
      return setGetFavoriteRecipes([]);
    };
    getDone();
  }, [filterFavoriteRecipes]);
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Favorite Recipes</h4>
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
          onClick={ () => setFilterFavoriteRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterFavoriteRecipes('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterFavoriteRecipes('drinks') }
        >
          Drinks
        </button>
        <section>
          { getFavoriteRecipes.map((e, index) => (
            <div key={ index + e.id }>
              <FavoriteRecipeCard
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
