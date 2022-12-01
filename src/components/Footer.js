import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import AppContext from '../context/Context';

export default function Footer() {
  const { setHandleChoice } = useContext(AppContext);
  const history = useHistory();

  function handleClick({ target }) {
    if (target.id === 'drinks') {
      history.push('/drinks');
      setHandleChoice(target.id);
    }
    if (target.id === 'meals') {
      history.push('/meals');
      setHandleChoice(target.id);
    }
  }

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ drinkIcon }
          id="drinks"
          alt="drinks-bottom-btn"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ mealIcon }
          id="meals"
          alt="meals-bottom-btn"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
