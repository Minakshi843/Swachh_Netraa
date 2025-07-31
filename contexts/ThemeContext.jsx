import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const lightColors = {
  background: '#f8fffe',
  cardBackground: '#fff',
  text: '#333',
  textSecondary: '#666',
  primary: '#2E7D32',
  primaryLight: '#2E7D32',
  headerBackground: ['#2E7D32', '#2E7D32', '#2E7D32'],
  border: '#f0f0f0',
  iconBackground: 'rgba(46, 125, 50, 0.1)',
};

const darkColors = {
  background: '#121212',
  cardBackground: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  primary: '#2E7D32',
  primaryLight: '#2E7D32',
  headerBackground: ['#2E7D32', '#2E7D32', '#2E7D32'],
  border: '#333',
  iconBackground: 'rgba(46, 125, 50, 0.2)',
};





