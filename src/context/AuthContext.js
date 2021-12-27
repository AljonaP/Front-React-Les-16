import React, { createContext, useState } from 'react';
import {useHistory} from "react-router-dom";
// 1. De context ZELF maken en exporteren

export const AuthContext = createContext({});
// 2. De custom ContextProvider maken (als functie) en die ook exporteren


function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    function login(){
        console.log("Gebruiker is ingelogd!");
        toggleIsAuth(true); //!isAuth is gelijk aan 'true'
        history.push('/profile');
    }

    function logout(){
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        history.push('/');
    }

    const data = {
        authorized: isAuth,
        login: login,
        logout: logout,
    }

    return (

            <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>
    );
}

export default AuthContextProvider;
