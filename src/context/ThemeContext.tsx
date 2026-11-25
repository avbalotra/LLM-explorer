import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'beige' | 'espresso';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isEspresso: boolean;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'beige',
  toggleTheme: () => {},
  isEspresso: false,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme');
      if (urlTheme === 'espresso' || urlTheme === 'dark') return 'espresso';
      if (urlTheme === 'beige' || urlTheme === 'light') return 'beige';

      const saved = localStorage.getItem('aether-theme');
      if (saved === 'espresso' || saved === 'dark') return 'espresso';
      if (saved === 'beige' || saved === 'light') return 'beige';
    }
    return 'beige'; // Default to Warm Beige ("Parchment & Sandstone Glass")
  });

  useEffect(() => {
    localStorage.setItem('aether-theme', theme);
    const root = document.documentElement;
    if (theme === 'espresso') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'espresso');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'beige');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'beige' ? 'espresso' : 'beige'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isEspresso: theme === 'espresso', setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
