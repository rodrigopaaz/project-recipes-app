import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinks.svg';
import mealIcon from '../images/meals.svg';
import AppContext from '../context/Context';

export default function Footer() {
  const { setHandleChoice, setFilteredApi } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    setFilteredApi(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHandleChoice]);

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
      <div className="container-footer">
        <button
          type="button"
          onClick={ handleClick }
          className="drinks"
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
          className="meals"
        >
          <img
            src={ mealIcon }
            id="meals"
            alt="meals-bottom-btn"
            data-testid="meals-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}
