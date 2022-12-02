import React, { useState, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from '../context/Context';

export default function SearchBar() {
  const { handleChoice, setFilteredApi } = useContext(AppContext);
  const [url, setUrl] = useState('');
  const [onChangeInput, setOnChangeInput] = useState('');
  const [radio, setRadio] = useState('');
  const { requiredApi } = useFetch(url);
  console.log(requiredApi);
  setFilteredApi(url);

  function meals() {
    if (radio === 'igredient') {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${onChangeInput}`);
    }
    if (radio === 'name') {
      return setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${onChangeInput}`);
    }
    if (radio === 'first-letter') {
      if (onChangeInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
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
      if (onChangeInput.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${onChangeInput}`);
    }
  }
  console.log(onChangeInput.length);
  function handleClick() {
    if (handleChoice === 'meals') {
      return meals();
    }
    if (handleChoice === 'drinks') {
      return drinks();
    }
  }
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
        <label htmlFor="ingredient">
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
        <label htmlFor="name">
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
        <label htmlFor="first-letter">
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
          onClick={ () => {
            handleClick();
            setFilteredApi(url);
          } }
        >
          Search
        </button>
      </div>
    </form>
  );
}
