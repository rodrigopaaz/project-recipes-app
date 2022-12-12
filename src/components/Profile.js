import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();

  return (
    <form>
      <input
        type="email"
        name="email"
        id="email"
        data-testid="profile-email"
        placeholder={ JSON.parse(localStorage.getItem('user')).email }
      />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </form>
  );
}

export default Profile;
