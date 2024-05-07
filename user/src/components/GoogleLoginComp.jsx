import React, { useContext, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { AuthContext } from '@root/context/AuthProvider'

const GoogleLoginComp = ({ handleInputOnChange }) => {
    const { themeButtonGoogleLogin } = useContext(AuthContext)

    useEffect(() => { }, [])

    return (
        <GoogleLogin
            onSuccess={(res) => handleInputOnChange(res)}
            onError={() => {
                alert('Login Failed');
            }}
            locale='en'
            theme={themeButtonGoogleLogin}
            size={window.matchMedia('(max-width: 253px)').matches ? 'medium' : 'large'}
        />
    );
};

export default GoogleLoginComp;
