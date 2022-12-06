import React from 'react';
// import { useParams } from 'react-router-dom';
// import RecipeCard from './RecipeCard';

export default function Details() {
/*   const [fetchSingleDish, setFetchSingleDish] = useState([]);

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const drinksUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const isMeal = page === 'meals' ? mealsUrl : drinksUrl;
    const fetchDish = async () => {
      const request = await fetch(isMeal);
      const response = await request.json();
      const recipes = response.meals || response.drinks;
      setFetchSingleDish(recipes || []);
    };
    fetchDish();
  }, [id]); */

  return (
    <div>
      <h1>teste</h1>
      {/*   { fetchSingleDish.map((e, index) => (
        <RecipeCard
          key={ e.idMeal || e.idDrink }
          name={ e.strMeal || e.strDrink }
          image={ e.strMealThumb || e.strDrinkThumb }
          index={ index }
        />
      ))} */}
    </div>
  );
}

Details.propTypes = {}.isRequired;
