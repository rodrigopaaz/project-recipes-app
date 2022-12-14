import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/mealsRecomendation.css';

export default function DrinksRecomendation() {
  const [recomendation, setRecomendation] = useState([]);
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    const fetchRecipes = async () => {
      const request = await fetch(URL);
      const response = await request.json();
      setRecomendation(response.drinks);
    };
    fetchRecipes();
  }, [URL]);
  return (
    <div className="div__meal__recomendation">
      <Carousel>
        {recomendation.filter((e, index) => index <= Number('5'))
          .map((drink, index) => (
            <Carousel.Item key={ drink.strDrink }>
              <div className="recomendation">
                <img
                  className="d-block w-100"
                  data-testid={ `${index}-recommendation-card` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <Carousel.Caption>
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}
