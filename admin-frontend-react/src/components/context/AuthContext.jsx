import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    signIn: () => {},
    logout: () => {}
});

export default AuthContext;