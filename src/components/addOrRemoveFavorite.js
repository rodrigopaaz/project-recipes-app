export default function addOrRemoveFavorite() {
  const saveFavorite = (e) => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const ID = e.idMeal || e.idDrink;
    const type = e.idMeal ? 'meal' : 'drink';
    const nationality = e.strArea || '';
    const category = e.strCategory || '';
    const alcoholicOrNot = e.strAlcoholic || '';
    const name = e.strDrink || e.strMeal;
    const image = e.strDrinkThumb || e.strMealThumb;
    const saved = JSON.parse(localStorage.favoriteRecipes);
    const newData = { id: ID,
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

  const removeFavorite = (id) => {
    const saved = JSON.parse(localStorage.favoriteRecipes) || '';
    const removeItem = saved.filter((el) => el.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  };
  return { saveFavorite, removeFavorite };
}
