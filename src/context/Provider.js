import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [handleSearch, setHandleSearch] = useState(false);
  const [handleChoice, setHandleChoice] = useState('meals');
  const [filteredApi, setFilteredApi] = useState(null);
  const [handleDish, setHandleDish] = useState(null);
  const [handleEndPoint, setHandleEndPoint] = useState('');

  const data = useMemo(
    () => ({ handleSearch,
      setHandleSearch,
      handleChoice,
      setHandleChoice,
      setFilteredApi,
      filteredApi,
      handleDish,
      setHandleDish,
      handleEndPoint,
      setHandleEndPoint }),
    [handleSearch, setHandleSearch, handleChoice,
      setHandleChoice, setFilteredApi, filteredApi, handleDish,
      setHandleDish, handleEndPoint, setHandleEndPoint],
  );

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
