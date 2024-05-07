import { createContext, useEffect, useState } from "react";
import { api } from '@root/services/api.js'
import { _isTokenExpired } from '@root/utils/helper'
import Cookies from 'js-cookie'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false)
    const [isMemberOnIogmCode, setIsMemberOnIogmCode] = useState(false)
    const [themeButtonGoogleLogin, setThemeButtonGoogleLogin] = useState('outline')

    const initUser = () => {
        setUserLoading(true);

        if (_isTokenExpired()) {
            setUserLoading(false);
            return;
        }

        api.post('user/guest/auth/me', null, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
            .then(({ data }) => {
                setUser(data)
                api.post('user/code/member/register', null, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
                    .then(({ data }) => {
                        if (data.message.includes('Your account is already registered')) {
                            setIsMemberOnIogmCode(true);
                            api.get('code/member/general/me', { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
                                .then(({ data }) => {
                                    setUser(prev => ({
                                        ...prev,
                                        account: data.data.account,
                                        address: data.data.address,
                                        alias_name: data.data.alias_name,
                                        bank: data.data.bank,
                                        dob: data.data.dob,
                                        role: data.data.role
                                    }))
                                })
                        } else {
                            setIsMemberOnIogmCode(false)
                        }
                        setUserLoading(false)
                    })
            }).catch((res) => console.log(res))
        setUserLoading(false)
    };

    useEffect(() => {
        initUser()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            userLoading,
            isMemberOnIogmCode,
            setIsMemberOnIogmCode,
            themeButtonGoogleLogin,
            setThemeButtonGoogleLogin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}