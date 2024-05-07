import React from 'react';
import { useLocation } from "react-router-dom";

import { isTokenExpired, useRedirectToLogin } from '@root/utils/helper';
import Cookies from 'js-cookie';

export const Protected = ({ children, type }) => {
    const location = useLocation()

    function isAuthenticated() {
        const token = Cookies.get('auth_token');
        return !!token && !isTokenExpired(token);
    }

    if (!isAuthenticated()) {
        if (type === 'route') {
            useRedirectToLogin()
        } else if (type === 'comp-guest') {
            return <>{children}</>;
        }
    } else {
        if (type === 'route') {
            if (location.pathname === import.meta.env.VITE_APP_URL_USER + '/login' || location.pathname === import.meta.env.VITE_APP_URL_USER + '/register') {
                return (
                    <>
                        {window.location.href = location.pathname + location.search}
                        {children}
                    </>
                );
            }
            return <>{children}</>;
        } else if (type === 'comp-auth') {
            return <>{children}</>
        }
    }
};

export default Protected;