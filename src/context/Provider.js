import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [handleSearch, setHandleSearch] = useState(false);
  const [handleChoice, setHandleChoice] = useState('');

  const data = useMemo(
    () => ({ handleSearch, setHandleSearch, handleChoice, setHandleChoice }),
    [handleSearch, setHandleSearch, handleChoice, setHandleChoice],
  );

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
