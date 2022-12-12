import React from 'react';

function ProfileComponent() {
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

export default ProfileComponent;
