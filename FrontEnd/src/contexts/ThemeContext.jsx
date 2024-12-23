import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    primary: 'bg-blue-600 hover:bg-blue-700',
    header: 'bg-white'
  },
  dark: {
    name: 'dark',
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    primary: 'bg-blue-500 hover:bg-blue-600',
    header: 'bg-gray-800'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme.name === 'light' ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);