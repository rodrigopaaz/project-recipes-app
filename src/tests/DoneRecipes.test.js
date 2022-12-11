import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
});
describe('Testando o componente Done-Recipes', () => (
  test('Testando o Componente', async () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
    act(() => history.push('./done-recipes'));
    const filterMeal = await screen.findByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    const filterDrink = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    const filterAll = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(filterAll);

    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);
  })
));
