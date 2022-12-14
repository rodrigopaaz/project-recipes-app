import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';
import logo from '../images/logo Recipes App.svg';

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
    <div className="main__login">
      <div className="form__login">
        <div className="div__login__img">
          <img src={ logo } alt="login_image" />
        </div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="email-input"
              id="email"
              placeholder="Email"
              name="email"
              value={ login.email }
              onChange={ ({ target: { name, value } }) => {
                setLogin({ ...login, [name]: value });
                validateInputs();
              } }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              id="password"
              value={ login.password }
              placeholder="Password"
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
      </div>
    </div>
  );
}
