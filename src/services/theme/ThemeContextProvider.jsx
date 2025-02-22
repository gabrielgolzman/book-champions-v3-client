import { useEffect, useState } from "react";

import { ThemeContext } from "./theme.context";
import { DARK_THEME, LIGHT_THEME } from "../consts";

const themeValue = localStorage.getItem('theme');

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(themeValue);

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", themeValue);
    }, []);

    const toggleTheme = () => {
        if (theme === LIGHT_THEME) {
            document.documentElement.setAttribute("data-bs-theme", DARK_THEME);
            localStorage.setItem("theme", DARK_THEME);
            setTheme(DARK_THEME);
        } else {
            document.documentElement.setAttribute("data-bs-theme", LIGHT_THEME);
            localStorage.setItem("theme", LIGHT_THEME);
            setTheme(LIGHT_THEME);
        }
    };

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    );
}

export default ThemeContextProvider;