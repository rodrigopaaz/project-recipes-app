import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

export default function RecipeCard({ index, image, name, path }) {
  const dish = path.idMeal ? 'meals' : 'drinks';
  const endPoint = path.idMeal ? path.idMeal : path.idDrink;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <div className="recipeCardDiv">
        <Link to={ `./${dish}/${endPoint}` }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-card-img` }
            className="imageCard"
          />
          <div>
            <p data-testid={ `${index}-card-name` } className="titleCard">{ name }</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {}.isRequired;
