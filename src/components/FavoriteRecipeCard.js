import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/Context';

export default function FavoriteRecipeCard({ element, index }) {
  const { id, image, name, category, type,
    nationality, alcoholicOrNot, doneDate, tags } = element;
  const [isCopied, setIsCopied] = useState(false);
  const isMeal = type === 'meal' ? 'meals' : 'drinks';
  const [isFavorite, setIsFavorite] = useState(false);
  const { setFilterFavoriteRecipes } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const saved = JSON.parse(localStorage.favoriteRecipes);
      if (saved.find((el) => el.id === id)) {
        setIsFavorite(true);
      }
    }
  }, [isFavorite]);

  const saveFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const saved = JSON.parse(localStorage.favoriteRecipes);
    const newData = { id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image };
    const updated = [...saved, newData];
    if (!saved.find((el) => el.ID === newData.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updated));
    }
  };

  const removeFavorite = () => {
    const saved = JSON.parse(localStorage.favoriteRecipes) || '';
    const removeItem = saved.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  };

  return (

    <div
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `./${isMeal}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
          height="100px"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          {
            alcoholicOrNot !== ''
              ? alcoholicOrNot
              : `${nationality} - ${category}`
          }

        </p>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>

        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      </Link>
      <button
        type="button"
        onClick={ () => {
          if (navigator.clipboard) {
            const recipeUrl = window.location.href;
            navigator.clipboard.writeText(recipeUrl
              .replace('favorite-recipes', `${isMeal}/${id}`));
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
      <button
        type="button"
        onClick={ (() => {
          if (!isFavorite) { saveFavorite(); }
          if (isFavorite) {
            removeFavorite();
            setFilterFavoriteRecipes(id);
          }
          setIsFavorite(!isFavorite);
        }
        ) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ !isFavorite
            ? whiteHeartIcon
            : blackHeartIcon }
          alt="favorites"
        />
      </button>
      <ul>
        {tags && tags.map((tagName, ind) => (
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

FavoriteRecipeCard.propTypes = {}.isRequired;
