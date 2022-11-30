import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Drinks</h4>
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
        <button
          type="button"
        >
          <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
        </button>
      </Header>
      <Recipes url={'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='}/>
      <Footer />
    </div>
  );
}
