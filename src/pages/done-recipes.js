import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

export default function Done() {
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Done Recipes</h4>
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      </Header>
    </div>
  );
}
