import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    // Проверяем токен при монтировании
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, []);

    // Логин — сохраняем токен
    const signIn = (token) => {
        localStorage.setItem("token", token);
        setIsAuth(true);
    };

    // Логаут — удаляем токен
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;