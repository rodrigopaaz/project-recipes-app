import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import AppContext from '../context/Context';

export default function Footer() {
  const { setHandleChoice } = useContext(AppContext);
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        id="drinks"
        onClick={ ({ target }) => {
          history.push('/drinks');
          setHandleChoice(target.id);
        } }
      >
        <img
          src={ drinkIcon }
          alt="drinks-bottom-btn"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        id="meals"
        onClick={ ({ target }) => {
          history.push('/meals');
          setHandleChoice(target.id);
        } }
      >
        <img
          src={ mealIcon }
          alt="meals-bottom-btn"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
