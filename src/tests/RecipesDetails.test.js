import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

describe('Testando o componente RecipeDetais', () => (
  test('Testando a funcionalidade do componente', async () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, 'emailValido@outlook.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(loginBtn);

    const drinkBtn = screen.queryByTestId('drinks-bottom-btn');

    userEvent.click(drinkBtn);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);

    const firstImage = await screen.findByTestId('0-card-name');
    userEvent.click(firstImage);

    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);

    const shareBtn = screen.queryByTestId('share-btn');

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);

    userEvent.click(shareBtn);
    userEvent.click(shareBtn);
  })

));
