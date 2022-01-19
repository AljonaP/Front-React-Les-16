import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

// 1. De context ZELF maken en exporteren

export const AuthContext = createContext({});
// 2. De custom ContextProvider maken (als functie) en die ook exporteren
function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
   const history = useHistory();

       function login(JWT){
        // Ik verwacht een JWT(token) als ik aangeroepen word
        localStorage.setItem('token', JWT);
        // console.log("Gebruiker is ingelogd!");
        const decode = jwt_decode(JWT);

        // console.log(decode.sub);
        getUserData(decode.sub,JWT, '/profile');
    }
    useEffect(() => {
        console.log('context wordt gerefresht!')
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwt_decode(token)
            getUserData(decode.sub, token)
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done'
            })
        }


    }, []);
    function logout(){
           localStorage.clear();
        console.log("Gebruiker is uitgelogd!");
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });
        history.push('/');
    }

    async function getUserData(id, token){

        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`,
            {headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }})
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: result.data.email,
                    username: result.data.username,
                    id: result.data.id,
                },
                status: 'done'
            });


            history.push('/profile');
        } catch (e) {
            console.error(e)
        }
    }

    const ContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    }

    return (

            <AuthContext.Provider value={ContextData}>
                {isAuth.status === 'done' ? children : <p>Loading...</p>}
            </AuthContext.Provider>
    );
}

export default AuthContextProvider;
