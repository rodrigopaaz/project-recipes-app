import React, { useState, useContext, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from '../context/Context';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const { handleChoice, setFilteredApi } = useContext(AppContext);
  const [url, setUrl] = useState('');
  const [onChangeInput, setOnChangeInput] = useState('');
  const [radio, setRadio] = useState('');
  const { requiredApi } = useFetch(url);
  console.log(requiredApi);

  useEffect(() => {
    setFilteredApi(url);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

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
      <div className="container-search">
        <label htmlFor="searchFood">
          <input
            className="inputSearch"
            type="text"
            name="searchFood"
            data-testid="search-input"
            onChange={ ({ target }) => setOnChangeInput(target.value) }
            placeholder="Search"
          />
        </label>
        <div className="container-options">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="igredient"
              name="radioSearch"
              data-testid="ingredient-search-radio"
              value="igredient"
              onChange={ ({ target }) => setRadio(target.value) }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="radioSearch"
              data-testid="name-search-radio"
              value="name"
              onChange={ ({ target }) => setRadio(target.value) }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              name="radioSearch"
              data-testid="first-letter-search-radio"
              value="first-letter"
              onChange={ ({ target }) => setRadio(target.value) }
            />
            First letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            handleClick();
            setFilteredApi(url);
          } }
          className="btn-search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
