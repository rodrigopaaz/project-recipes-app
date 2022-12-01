import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Drinks() {
  const { setHandleSearch, handleSearch, setHandleChoice } = useContext(AppContext);

  useEffect(() => {
    setHandleChoice('drinks');
  }, []);

  return (
    <div>
      <Header>
        <h4 data-testid="page-title">Drinks</h4>
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </button>
        <button
          type="button"
          onClick={ () => setHandleSearch(!handleSearch) }
        >
          <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
        </button>
      </Header>
      <Footer />
    </div>
  );
}
