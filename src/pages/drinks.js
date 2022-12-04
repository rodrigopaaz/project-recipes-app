import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import AppContext from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  const { setHandleSearch, handleSearch, setHandleChoice } = useContext(AppContext);

  useEffect(() => {
    setHandleChoice('drinks');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={ () => setHandleSearch(!handleSearch) }
        >
          <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
        </button>
      </Header>
      <Recipes
        urlSearch="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
        urlList="https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
        urlFilter="https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="
      />
      <Footer />
    </div>
  );
}
