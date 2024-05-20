import React, { useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import { _redirectToLogin, _isTokenExpired } from "./helper"
import { useSelector } from "react-redux"

const Protected = ({ children, type }) => {
    const { data: user } = useSelector(state => state.userData)
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    useEffect(() => {

    }, [user])

    if (!_isTokenExpired()) {
        if (user !== undefined) {
            if (user.hasOwnProperty('status')) {
                if (type === 'route') {
                    _redirectToLogin()
                } else if (type === 'comp-guest') {
                    return <>{children}</>
                }
            } else {
                if (type === 'route') {
                    if (currentPath.includes(user.role) || currentPath.includes('general')) {
                        return <>{children}</>
                    } else {
                        navigate(`/member/${user.role}/profile`)
                    }
                } else if (type === 'comp-auth') {
                    return <>{children}</>
                }

            }
        }
    } else {
        if (type === 'route') {
            _redirectToLogin()
        } else if (type === 'comp-guest') {
            return <>{children}</>
        }
    }

}

export default Protected

