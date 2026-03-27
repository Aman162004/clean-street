import React, { createContext, useContext, useEffect, useState } from "react";
import { colorSystem } from "../lib/colorSystem";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Force dark theme only; light mode disabled
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        // Set Bootstrap's data-bs-theme attribute and custom data-theme
        root.setAttribute('data-bs-theme', theme);
        root.setAttribute('data-theme', theme);
        localStorage.setItem('bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        // No-op toggle: lock to dark mode
        setTheme('dark');
    };

    return (
        <ThemeContext.Provider 
            value={{ 
                theme, 
                toggleTheme,
                colors: colorSystem // Export color system for use in components
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

