import React, { useEffect, useState, useContext } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
import Header from '../components/Header';
import AppContext from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import '../styles/favorite-recipes.css';
import all from '../images/allcard.svg';
import drink from '../images/drinkscard.svg';
import meal from '../images/foodscard.svg';

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
    <div className="main__favorites">
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
        <div className="favorite__btn">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilterFavoriteRecipes('all') }
          >
            <img src={ all } alt="all_btn" />
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setFilterFavoriteRecipes('meals') }
          >
            <img src={ meal } alt="meal_btn" />
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilterFavoriteRecipes('drinks') }
          >
            <img src={ drink } alt="drink_btn" />
          </button>
        </div>
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
