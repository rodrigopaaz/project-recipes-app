import React from 'react';

export default function Search() {
  return (
    <div>
      <label htmlFor="searchFood">
        <input
          type="text"
          name="searchFood"
          data-testid="search-input"
        />
      </label>
    </div>
  );
}
