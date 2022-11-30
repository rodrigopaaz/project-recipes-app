import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Drinks</h4>
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
        <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
      </Header>
    </div>
  );
}
