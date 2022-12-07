import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ index, image, name, path }) {
  const dish = path.idMeal ? 'meals' : 'drinks';
  const endPoint = path.idMeal ? path.idMeal : path.idDrink;
  return (

    <div
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `./${dish}/${endPoint}` }>
        <img src={ image } alt={ name } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ name }</p>
      </Link>
    </div>

  );
}

RecipeCard.propTypes = {}.isRequired;
