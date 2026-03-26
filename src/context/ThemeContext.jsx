import React, { createContext, useContext, useEffect, useState } from "react";
import { colorSystem } from "../lib/colorSystem";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('bs-theme') || 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Set Bootstrap's data-bs-theme attribute and custom data-theme
        root.setAttribute('data-bs-theme', theme);
        root.setAttribute('data-theme', theme);
        localStorage.setItem('bs-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
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

