import React, { useContext } from 'react';
import AppContext from '../context/Context';
import Search from './Search';

export default function Header({ children }) {
  const { handleSearch } = useContext(AppContext);
  return (
    <div>
      {children}
      {handleSearch && <Search />}
    </div>
  );
}

Header.propTypes = {}.isRequired;
