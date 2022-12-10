export default function doneRecipesLocalStorage(e) {
  if (!localStorage.doneRecipes) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  console.log(e);
  const ID = e.idMeal || e.idDrink;
  const type = e.idMeal ? 'meal' : 'drink';
  const nationality = e.strArea || '';
  const category = e.strCategory || '';
  const alcoholicOrNot = e.strAlcoholic || '';
  const name = e.strDrink || e.strMeal;
  const image = e.strDrinkThumb || e.strMealThumb;
  console.log(e.strTags);
  const tags = !e.strTags ? [] : e.strTags.split(',');
  const doneDate = new Date();
  const saved = JSON.parse(localStorage.doneRecipes);
  const newData = { id: ID,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    tags,
    doneDate };
  const updated = [...saved, newData];
  if (!saved.find((el) => el.id === newData.id)) {
    localStorage.setItem('doneRecipes', JSON.stringify(updated));
  }
}
