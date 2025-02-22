import { useContext } from "react";
import { Button } from "react-bootstrap";

import { ThemeContext } from "../../../../services/theme/theme.context";
import { LIGHT_THEME } from "../../../../services/consts";
import { useTranslate } from "../../../../custom/useTranslate/useTranslate";

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const t = useTranslate();

    return (
        <Button onClick={toggleTheme} className="me-3 my-3">
            {theme === LIGHT_THEME ? t("dark_theme_change") : t("light_theme_change")}
        </Button>
    );
};

export default ToggleTheme;