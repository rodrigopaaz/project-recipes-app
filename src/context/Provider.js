import React from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  return (
    <AppContext.Provider>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
