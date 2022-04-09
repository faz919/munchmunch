import React, { useReducer, createContext, useContext } from 'react';
import { appStateReducer, appData } from './appState';

const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext)
};