import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

describe('Testando o componente Recipes', () => {
  test('Testando a aplicação', async () => {
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

    const beefCategory = await screen.findByTestId('Beef-category-filter');
    expect(beefCategory).toBeInTheDocument();
    const imageMeal = await screen.findByTestId('0-card-img');
    expect(imageMeal).toBeInTheDocument();

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);

    const shakeCategory = await screen.findByTestId('Shake-category-filter');
    expect(shakeCategory).toBeInTheDocument();
    const imageDrink = await screen.findByTestId('0-recipe-card');
    expect(imageDrink).toBeInTheDocument();
  });
});
