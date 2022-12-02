import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [handleSearch, setHandleSearch] = useState(false);
  const [handleChoice, setHandleChoice] = useState('meals');
  const [filteredApi, setFilteredApi] = useState(null);

  const data = useMemo(
    () => ({ handleSearch,
      setHandleSearch,
      handleChoice,
      setHandleChoice,
      setFilteredApi,
      filteredApi }),
    [handleSearch, setHandleSearch, handleChoice, setHandleChoice,
      setFilteredApi, filteredApi],
  );

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
