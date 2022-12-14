import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import share from '../images/share.svg';
import '../styles/DoneRecipeCard.css';

export default function DoneRecipeCard({ element, index }) {
  const { id, image, name, category, type,
    nationality, alcoholicOrNot, doneDate, tags } = element;
  const [isCopied, setIsCopied] = useState(false);
  const isMeal = type === 'meal' ? 'meals' : 'drinks';
  return (

    <div
      className="container-recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <section>
        <Link to={ `./${isMeal}/${id}` }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
            className="image-card"
          />
        </Link>
      </section>
      <section className="right-section">
        <Link to={ `./${isMeal}/${id}` }>
          <p className="title" data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>
        <p className="category" data-testid={ `${index}-horizontal-top-text` }>
          {
            alcoholicOrNot !== ''
              ? alcoholicOrNot
              : `${nationality} - ${category}`
          }
        </p>
        <p
          className="date"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        <ul>
          {tags.map((tagName, ind) => (
            <li
              data-testid={ `${index}-${tagName}-horizontal-tag` }
              key={ ind }
              className="tags"
            >
              {tagName}
            </li>))}
        </ul>
      </section>
      <section>
        <button
          className="button-share"
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
            className="image-share"
          />
        </button>
        {isCopied && <p className="link-paragraph">Link copied!</p>}
      </section>
    </div>

  );
}

DoneRecipeCard.propTypes = {}.isRequired;
