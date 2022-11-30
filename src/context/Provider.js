import React, { useMemo, useState } from 'react';
import AppContext from './Context';

export default function AppProvider({ children }) {
  const [handleSearch, setHandleSearch] = useState(false);

  const data = useMemo(
    () => ({ handleSearch, setHandleSearch }),
    [handleSearch, setHandleSearch],
  );

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {}.isRequired;
