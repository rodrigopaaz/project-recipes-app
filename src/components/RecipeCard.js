import React from 'react';

export default function RecipeCard({ index, image, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;
