import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

import { _isTokenExpired } from '@root/utils/helper';

export const Protected = ({ children, type }) => {
    const location = useLocation()

    function isAuthenticated() {
        const token = Cookies.get('auth_token');
        return !!token && !_isTokenExpired();
    }

    if (!isAuthenticated()) {
        if (type === 'route') {
            return (
                <>
                    <Navigate to="/login" />
                    {children}
                </>
            )
        } else if (type === 'comp-guest') {
            return <>{children}</>;
        }
    } else {
        if (type === 'route') {
            if (location.pathname === '/login' || location.pathname === '/register') {
                return (
                    <>
                        {Cookies.get('to_url') ? window.location.href = Cookies.get('to_url') :
                            <>
                                <Navigate to={'/member/setting'} />
                                {children}
                            </>
                        }
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