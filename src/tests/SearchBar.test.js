import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

describe(
  'Testando o componente Login',
  () => (
    it('Testando IngredientsRadio', () => {
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

      const searchBtn1 = screen.getByRole('button', {
        name: 'search-icon',
      });

      userEvent.click(searchBtn1);

      const searchImput = screen.getByTestId('search-input');
      expect(searchImput).toBeInTheDocument();

      const ingredientRadio = screen.getByTestId('ingredient-search-radio');
      expect(ingredientRadio).toBeInTheDocument();

      const nameRadio = screen.getByTestId('name-search-radio');
      expect(nameRadio).toBeInTheDocument();

      const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
      expect(firstLetterRadio).toBeInTheDocument();

      userEvent.type(searchImput, 'carrot');
      userEvent.click(ingredientRadio);

      const searchBtn = screen.queryByTestId('exec-search-btn');
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);
    })),
  it('Testando nameRadio', () => {
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

    const searchBtn1 = screen.getByRole('button', {
      name: 'search-icon',
    });

    userEvent.click(searchBtn1);

    const searchImput = screen.getByTestId('search-input');
    expect(searchImput).toBeInTheDocument();

    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();

    userEvent.type(searchImput, 'carrot');
    userEvent.click(nameRadio);

    const searchBtn = screen.queryByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
  }),
);
