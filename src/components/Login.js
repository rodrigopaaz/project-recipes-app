import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);

  const validateInputs = () => {
    const NUMBERSIX = 6;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(login.email);
    const isValisPassword = login.password.trim().length >= NUMBERSIX;
    if (isValidEmail && isValisPassword) {
      setIsDisabled(false);
    } else { setIsDisabled(true); }
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        Login:
        <input
          type="email"
          data-testid="email-input"
          id="email"
          placeholder="email"
          name="email"
          value={ login.email }
          onChange={ ({ target: { name, value } }) => {
            setLogin({ ...login, [name]: value });
            validateInputs();
          } }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          id="password"
          value={ login.password }
          placeholder="password"
          onChange={ ({ target: { name, value } }) => {
            setLogin({ ...login, [name]: value });
            validateInputs();
          } }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
}
