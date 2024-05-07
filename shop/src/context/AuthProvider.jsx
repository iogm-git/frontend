import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { api } from "@root/services/api.js"
import { isTokenExpired, useHeadersConfig } from "@root/utils/helper";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(Cookies.get('auth_token'));

    function initUser() {
        if (!!token) {
            if (!isTokenExpired(token)) {
                api.post('/user/guest/auth/me', null, useHeadersConfig(token))
                    .then(({ data }) => {
                        setUser(data)
                    })
            }
        }
    }

    useEffect(() => {
        initUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, token }}>
            {children}
        </AuthContext.Provider>
    );
}
