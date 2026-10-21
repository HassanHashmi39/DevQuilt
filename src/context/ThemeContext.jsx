import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultTheme = {
    isDarkMode: true,
    toggleTheme: () => {}
};

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('devquilt-theme');
            if (saved !== null) {
                return saved === 'dark';
            }
        } catch (e) {
            // fallback
        }
        return true; // default dark mode
    });

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            try {
                localStorage.setItem('devquilt-theme', next ? 'dark' : 'light');
            } catch (e) {}
            return next;
        });
    };

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (isDarkMode) {
            html.setAttribute('data-theme', 'dark');
            html.classList.add('dark');
            html.classList.remove('light');
            body.style.backgroundColor = '#0a0a0a';
            body.style.color = '#ffffff';
            // CSS custom properties for theme-aware components
            html.style.setProperty('--page-bg', '#0a0a0a');
            html.style.setProperty('--page-bg-2', '#111111');
            html.style.setProperty('--page-bg-3', '#1a1a1a');
            html.style.setProperty('--text-primary', '#ffffff');
            html.style.setProperty('--text-secondary', 'rgba(255,255,255,0.6)');
            html.style.setProperty('--border-color', 'rgba(255,255,255,0.1)');
        } else {
            html.setAttribute('data-theme', 'light');
            html.classList.add('light');
            html.classList.remove('dark');
            body.style.backgroundColor = '#f5f5f7';
            body.style.color = '#111827';
            html.style.setProperty('--page-bg', '#f5f5f7');
            html.style.setProperty('--page-bg-2', '#ebebef');
            html.style.setProperty('--page-bg-3', '#e0e0e8');
            html.style.setProperty('--text-primary', '#111827');
            html.style.setProperty('--text-secondary', 'rgba(17,24,39,0.6)');
            html.style.setProperty('--border-color', 'rgba(0,0,0,0.1)');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context || defaultTheme;
};
