import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileComponent from '../components/Profile';
import profileIcon from '../images/profileIcon.svg';

export default function ProfilePage() {
  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Profile</h4>
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
      </Header>
      <ProfileComponent />
      <Footer />
    </div>
  );
}
