import React, { useEffect, useState } from 'react';

export default function DrinksRecomendation() {
  const [recomendation, setRecomendation] = useState();
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
    <div>DrinksRecomendation</div>
  );
}
