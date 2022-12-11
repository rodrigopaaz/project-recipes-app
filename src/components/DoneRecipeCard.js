import React, { useState } from 'react';
import share from '../images/shareIcon.svg';

export default function DoneRecipeCard({ element, index }) {
  const { id, image, name, category, type,
    nationality, alcoholicOrNot, doneDate, tags } = element;
  const [isCopied, setIsCopied] = useState(false);
  const isMeal = type === 'meal' ? 'meals' : 'drinks';
  console.log(type);
  return (

    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          alcoholicOrNot !== ''
            ? alcoholicOrNot
            : `${nationality} - ${category}`
        }

      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button
        type="button"
        onClick={ () => {
          if (navigator.clipboard) {
            const recipeUrl = window.location.href;
            navigator.clipboard.writeText(recipeUrl
              .replace('done-recipes', `${isMeal}/${id}`));
          }
          setIsCopied(true);
        } }
      >
        <img
          src={ share }
          alt="share-recipe"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {isCopied && <p>Link copied!</p>}
      <ul>
        {tags.map((tagName, ind) => (
          <li
            data-testid={ `${index}-${tagName}-horizontal-tag` }
            key={ ind }
          >
            {tagName}
          </li>))}
      </ul>
    </div>

  );
}

DoneRecipeCard.propTypes = {}.isRequired;
