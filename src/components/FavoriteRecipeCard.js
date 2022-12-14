import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import share from '../images/share.svg';
import whiteHeartIcon from '../images/whiteHeart.svg';
import blackHeartIcon from '../images/blackHeart.svg';
import AppContext from '../context/Context';
import '../styles/FavoriteRecipeCard.css';

export default function FavoriteRecipeCard({ element, index }) {
  const { id, image, name, category, type,
    nationality, alcoholicOrNot, tags } = element;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <section className="middle-section">
          <button
            className="button-share"
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
              className="image-share"
            />
          </button>
          {isCopied && <p className="link-paragraph">Link copied!</p>}
          <button
            className="button-favorite"
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
              className="image-favorite"
            />
          </button>
          <ul>
            {tags && tags.map((tagName, ind) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ ind }
                className="tags"
              >
                {tagName}
              </li>))}
          </ul>
        </section>
      </section>
    </div>

  );
}

FavoriteRecipeCard.propTypes = {}.isRequired;
