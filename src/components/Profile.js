import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();

  const emailStorage = JSON.parse(localStorage.getItem('user')).email;

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
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
    </form>
  );
}

export default Profile;
