import '../styles/header.css';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/Context';
import SearchBar from './SearchBar';
import headerRecipesImg from '../images/header_recipes_img.svg';
import logoRecipesApp from '../images/logo Recipes app.svg';
import meals from '../images/Meals.svg';
import drinks from '../images/Drinks.svg';

export default function Header({ children }) {
  const { handleSearch } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const food = pathname.includes('meal') ? meals : drinks;

  return (
    <div className="main__header">
      <div className="div__header">
        <img src={ headerRecipesImg } alt="header_img" />
        <img src={ logoRecipesApp } alt="logo_img" />
        <div className="div__meal__drink">
          <img src={ food } alt="food_img" />
        </div>
        {children}
      </div>
      {handleSearch && <SearchBar />}
    </div>
  );
}

Header.propTypes = {}.isRequired;
