import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

describe('Testando o componente Header', () => (
  test('Testando os Inputs', () => {
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

    const headerTitle = screen.getByText(/meal/i);
    expect(headerTitle).toBeInTheDocument();

    const btnPerfil = screen.getAllByRole('button')[0];
    const btnSearch = screen.getAllByRole('button')[1];

    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(btnSearch);
    userEvent.click(btnPerfil);
  })

));
