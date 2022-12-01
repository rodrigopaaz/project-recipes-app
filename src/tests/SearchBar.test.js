import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

const email = 'email-input';
const password = 'password-input';
const submitBtn = 'login-submit-btn';
const inputUserEmail = 'emailValido@outlook.com';
const searchIcon = 'search-icon';
const searchInput = 'search-input';
const ingredientSearch = 'ingredient-search-radio';
const nameSearch = 'name-search-radio';
const firstLetter = 'first-letter-search-radio';
const execBtn = 'exec-search-btn';
const drinksBottonBtn = 'drinks-bottom-btn';
describe(
  'Testando o componente Login',
  () => (
    it('Testando IngredientsRadio', () => {
      renderWithRouter(<AppProvider><App /></AppProvider>);

      const inputEmail = screen.getByTestId(email);
      expect(inputEmail).toBeInTheDocument();

      const inputPassword = screen.getByTestId(password);
      expect(inputPassword).toBeInTheDocument();

      const loginBtn = screen.getByTestId(submitBtn);
      expect(loginBtn).toBeDisabled();

      userEvent.type(inputEmail, inputUserEmail);
      userEvent.type(inputPassword, '1234567');
      userEvent.click(loginBtn);

      const drinksBtn = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(drinksBtn);

      const searchBtn1 = screen.getByRole('button', {
        name: searchIcon,
      });

      userEvent.click(searchBtn1);

      const searchImput = screen.getByTestId(searchInput);
      expect(searchImput).toBeInTheDocument();

      const ingredientRadio = screen.getByTestId(ingredientSearch);
      expect(ingredientRadio).toBeInTheDocument();

      const nameRadio = screen.getByTestId(nameSearch);
      expect(nameRadio).toBeInTheDocument();

      const firstLetterRadio = screen.getByTestId(firstLetter);
      expect(firstLetterRadio).toBeInTheDocument();

      userEvent.type(searchImput, 'carrot');
      userEvent.click(ingredientRadio);

      const searchBtn = screen.queryByTestId(execBtn);
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);

      const ingredientsRadio = screen.getByTestId(ingredientSearch);
      userEvent.click(ingredientsRadio);
    })),
  it('Testando nameRadio', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const inputEmail = screen.getByTestId(email);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId(password);
    expect(inputPassword).toBeInTheDocument();

    const loginBtn = screen.getByTestId(submitBtn);
    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, inputUserEmail);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(loginBtn);

    const searchBtn1 = screen.getByRole('button', {
      name: searchIcon,
    });

    userEvent.click(searchBtn1);

    const searchImput = screen.getByTestId(searchInput);
    expect(searchImput).toBeInTheDocument();

    const nameRadio = screen.getByTestId(nameSearch);
    expect(nameRadio).toBeInTheDocument();

    userEvent.type(searchImput, 'carrot');
    userEvent.click(nameRadio);

    const searchBtn = screen.queryByTestId(execBtn);
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
  }),
  it('Testando nameRadio', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const inputEmail = screen.getByTestId(email);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId(password);
    expect(inputPassword).toBeInTheDocument();

    const loginBtn = screen.getByTestId(submitBtn);
    expect(loginBtn).toBeDisabled();

    userEvent.type(inputEmail, inputUserEmail);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(loginBtn);

    const drinksBtn = screen.getByTestId(drinksBottonBtn);
    userEvent.click(drinksBtn);

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
    userEvent.click(searchBtn);

    expect(searchBtn).toBeInTheDocument();

    const ingredientsRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientsRadio);
    userEvent.click(searchBtn);
    userEvent.clear(searchImput);

    const firtLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firtLetter);
    userEvent.type(searchImput, 'c');
    userEvent.click(searchBtn);

    userEvent.type(searchImput, 'carrot');
    userEvent.click(searchBtn);
  }),
);
