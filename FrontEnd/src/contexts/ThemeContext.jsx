import React, { createContext, useContext, useState } from 'react';

const themes = {
  light: {
    name: 'light',
    background: 'bg-white',
    text: 'text-black',
    textSecondary: 'text-gray-700',
    card: 'bg-gray-100'
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    card: 'bg-gray-800'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme.name === 'light' ? themes.dark : themes.light);
  };

  const isLightMode = theme.name === 'light';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);