import React, { useContext } from 'react';
import AppContext from '../context/Context';
import SearchBar from './SearchBar';

export default function Header({ children }) {
  const { handleSearch } = useContext(AppContext);
  return (
    <div>
      {children}
      {handleSearch && <SearchBar />}
    </div>
  );
}

Header.propTypes = {}.isRequired;
