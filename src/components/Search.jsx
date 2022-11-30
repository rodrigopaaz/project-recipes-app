import React from 'react';

export default function Search() {
  return (
    <form>
      <div>
        <label htmlFor="searchFood">
          <input
            type="text"
            name="searchFood"
            data-testid="search-input"
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            name="radioSearch"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            name="radioSearch"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First Letter
          <input
            type="radio"
            name="radioSearch"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
    </form>
  );
}
