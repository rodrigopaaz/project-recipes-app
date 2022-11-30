import React, { useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from '../context/Context';

export default function SearchBar() {
  const { handleChoice } = useContext(AppContext);
  const [url, setUrl] = useState('');
  const [onChangeInput, setOnChangeInput] = useState('');
  const [radio, setRadio] = useState('');
  const { requiredApi } = useFetch(url);

  function meals() {
    if (radio === 'igredient') {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${onChangeInput}`);
    }
    if (radio === 'name') {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${onChangeInput}`);
    }
    if (radio === 'first-letter') {
      if (radio.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${onChangeInput}`);
    }
  }

  function drinks() {
    if (radio === 'igredient') {
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${onChangeInput}`);
    }
    if (radio === 'name') {
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${onChangeInput}`);
    }
    if (radio === 'first-letter') {
      if (radio.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${onChangeInput}`);
    }
  }

  function handleClick() {
    if (handleChoice === 'meals') {
      return meals();
      // if (radio === 'igredient') {
      //   return setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${onChangeInput}`);
      // }
      // if (radio === 'name') {
      //   return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${onChangeInput}`);
      // }
      // if (radio === 'first-letter') {
      //   if (radio.length > 1) {
      //     global.alert('Your search must have only 1 (one) character');
      //   }
      //   return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${onChangeInput}`);
      // }
    }
    if (handleChoice === 'drinks') {
      return drinks();
      // if (radio === 'igredient') {
      //   return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${onChangeInput}`);
      // }
      // if (radio === 'name') {
      //   return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${onChangeInput}`);
      // }
      // if (radio === 'first-letter') {
      //   if (radio.length > 1) {
      //     global.alert('Your search must have only 1 (one) character');
      //   }
      //   return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${onChangeInput}`);
      // }
    }
  }
  console.log(url);
  return (
    <form>
      <div>
        <label htmlFor="searchFood">
          <input
            type="text"
            name="searchFood"
            data-testid="search-input"
            onChange={ ({ target }) => setOnChangeInput(target.value) }
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            id="igredient"
            name="radioSearch"
            data-testid="ingredient-search-radio"
            value="igredient"
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            id="name"
            name="radioSearch"
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First letter
          <input
            type="radio"
            id="first-letter"
            name="radioSearch"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ ({ target }) => setRadio(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </form>
  );
}
