import { useState } from "react";

import { TOKEN_NAME } from "../consts";
import { AuthenticationContext } from "./auth.context";

const tokenValue = localStorage.getItem(TOKEN_NAME);

const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);

    const handleUserLogin = (token) => {
        localStorage.setItem(TOKEN_NAME, token);
        setToken(token);
    };


    const handleUserLogout = () => {
        localStorage.removeItem(TOKEN_NAME);
        setToken(null);
    };

    return (
        <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext>
    );
};

export default AuthenticationContextProvider;