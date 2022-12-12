import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';
import App from '../App';

describe('Testando o componente Profile', () => (
  test('Verifica se os botões estão no Profile', () => {
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

    const btnProfile = screen.getByRole('button', { name: /profile-icon/i });

    userEvent.click(btnProfile);

    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    const btnLogout = screen.getByRole('button', { name: /logout/i });
    const btnFavorite = screen.getByRole('button', { name: /favorite recipes/i });

    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  })

));
