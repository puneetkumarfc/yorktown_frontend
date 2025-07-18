import React, { createContext, useContext, useState, useCallback } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const showLoader = useCallback((msg = '') => {
    setMessage(msg);
    setLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setLoading(false);
    setMessage('');
  }, []);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader, message }}>
      {children}
    </LoaderContext.Provider>
  );
}; 