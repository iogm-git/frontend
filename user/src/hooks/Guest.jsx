import { useState } from 'react'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

import { api } from '@root/services/api.js'
import { _isTokenExpired } from '@root/utils/helper'

export const useGuestHooks = () => {
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(false)

    function _setToken(token) {
        if (token) {
            Cookies.set('auth_token', token, { path: '/', domain: import.meta.env.VITE_APP_DOMAIN, expires: 3600 })
        } else {
            Cookies.remove('auth_token')
        }

        let appUrl = Cookies.get('to_url')

        if (!appUrl) {
            navigate('/member/setting#top')
            window.location.reload()
        } else {
            window.location.href = appUrl
            Cookies.remove('to_url')
        }
    }

    const [stateRegister, setRegister] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        error: '',
        success: ''
    })

    const register = () => {

        const submit = (e) => {
            e.preventDefault()

            setRegister(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            setLoading(true)

            api.post('user/guest/auth/register', stateRegister)
                .then(({ data }) => {
                    setLoading(false)
                    alert(data.message)
                    navigate('/login#top')
                })
                .catch(({ response }) => {
                    console.clear()
                    setRegister(prevState => ({
                        ...prevState,
                        error: response.data,
                    }))
                    setLoading(false)
                })
        }

        return {
            submit
        }
    }

    const [stateSendLinkForgotPassword, setSendLinkForgotPasswordState] = useState({
        username: '',
        error: '',
        success: ''
    })

    const sendLinkForgotPassword = () => {

        const removeMessage = () => {
            setSendLinkForgotPasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setSendLinkForgotPasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            setLoading(true)

            api.put('user/guest/auth/password/send-link', stateSendLinkForgotPassword)
                .then(({ data }) => {
                    setSendLinkForgotPasswordState(prevState => ({
                        ...prevState,
                        error: '',
                        success: data.message
                    }))
                    setLoading(false)
                })
                .catch(({ response }) => {
                    console.clear()
                    setSendLinkForgotPasswordState(prevState => ({
                        ...prevState,
                        error: response.data.message
                    }))
                    setLoading(false)
                })
        }

        return {
            removeMessage,
            submit
        }
    }

    const [stateResetPassword, setResetPasswordState] = useState({
        username: '',
        token: '',
        password: '',
        password_confirmation: '',
        error: '',
        success: ''
    })

    const resetPassword = () => {

        const removeMessage = () => {
            setResetPasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setResetPasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            setLoading(true)

            api.post('user/guest/auth/password/reset', stateResetPassword)
                .then(({ data }) => {
                    setResetPasswordState(prevState => ({
                        ...prevState,
                        error: '',
                        success: data.message
                    }))
                    setLoading(false)
                })
                .catch(({ response }) => {
                    console.log(response)
                    setResetPasswordState(prevState => ({
                        ...prevState,
                        error: response.data.message
                    }))
                    setLoading(false)
                })
        }

        return {
            removeMessage,
            submit
        }
    }

    const [stateLogin, setLogin] = useState({
        username: '',
        password: '',
        error: '',
        success: ''
    })

    const login = () => {

        const submit = (e) => {
            e.preventDefault()

            setLogin(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            setLoading(true)

            api.post('user/guest/auth/login', stateLogin)
                .then(({ data }) => {
                    setLogin(prevState => ({
                        ...prevState,
                        error: '',
                        success: data.message
                    }))
                    _setToken(data.access_token)
                })
                .catch(({ response }) => {
                    console.clear()
                    setLogin(prevState => ({
                        ...prevState,
                        error: response.data,
                    }))
                    setLoading(false)
                })
        }

        return {
            submit
        }
    }

    const [stateGoogleLogin, setGoogleLogin] = useState({
        error: '',
    })

    const googleLogin = (res) => {
        setLoading(true)
        setGoogleLogin({ error: '' })

        let data = jwtDecode(res.credential)

        api.post('user/guest/auth/google', {
            id: data.sub,
            email: data.email,
            name: data.name,
            image: data.picture,
        }).then(({ data }) => {
            setGoogleLogin({ error: '' })
            _setToken(data.access_token)
        }).catch(({ response }) => {
            setLoading(false)
            setGoogleLogin({ error: response.data.message })
        })
    }

    return {
        isLoading,

        stateRegister,
        setRegister,
        register,

        stateSendLinkForgotPassword,
        setSendLinkForgotPasswordState,
        sendLinkForgotPassword,

        stateResetPassword,
        setResetPasswordState,
        resetPassword,

        stateLogin,
        setLogin,
        login,

        stateGoogleLogin,
        setGoogleLogin,
        googleLogin,
    }
}