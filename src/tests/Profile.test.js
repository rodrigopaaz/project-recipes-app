import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';
import App from '../App';

describe('Testando o componente Profile', () => {
  test('Verifica se os botões estão no Profile', () => {
    renderWithRouter(<AppProvider><App /></AppProvider>);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

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
  });

  test('Verifica a funcionalidade dos botões', () => {
    const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'emailValido@outlook.com');
    userEvent.type(password, '1234567');
    userEvent.click(loginButton);

    const buttonProfile = screen.getByRole('button', { name: /profile-icon/i });
    global.localStorage.clear();
    // global.localStorage.setItem('user', JSON.stringify({ email: 'test@email.com' }));
    userEvent.click(buttonProfile);

    // expect(screen.getByText('test@email.com')).toBeInTheDocument();

    const buttonDone = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(buttonDone);

    const titleDone = screen.getByRole('heading', { name: /done recipes/i });

    expect(titleDone).toBeInTheDocument();

    act(() => history.push('/profile'));

    const buttnFavorite = screen.getByRole('button', { name: /favorite recipes/i });

    userEvent.click(buttnFavorite);

    const titleFavorite = screen.getByRole('heading', { name: /favorite recipes/i });

    expect(titleFavorite).toBeInTheDocument();

    act(() => history.push('/profile'));

    const buttnLogout = screen.getByRole('button', { name: /logout/i });

    userEvent.click(buttnLogout);

    global.localStorage.clear();

    const inptEmail = screen.getByRole('textbox', { name: /login:/i });

    expect(inptEmail).toBeInTheDocument();
  });
});
