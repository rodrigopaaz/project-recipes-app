import React, { useContext } from 'react';
import AppContext from '../context/Context';

export default function Login() {
  return (
    <form>
      <label htmlFor="email">
        Login:
        <input
          type="email"
          data-testid="email-input"
          id="email"
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          data-testid="password-input"
          id="password"
          placeholder="password"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
};
