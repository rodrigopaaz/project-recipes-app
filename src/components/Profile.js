import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/profile.css';
import done from '../images/done.svg';
import favorite from '../images/favorite.svg';
import logout from '../images/Logout.svg';

function Profile() {
  const history = useHistory();

  const emailStorage = localStorage.user ? JSON.parse(localStorage.getItem('user')).email
    : '';

  return (
    <form>
      <p data-testid="profile-email">
        {emailStorage}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img src={ done } alt="doner_img" />

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img src={ favorite } alt="favorite_img" />

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        <img src={ logout } alt="logout_img" />

      </button>
    </form>
  );
}

export default Profile;
