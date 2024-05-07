import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@root/services/api.js'
import { AuthContext } from '@root/context/AuthProvider'
import { _isTokenExpired } from '@root/utils/helper'
import { useEffect } from 'react'
import Cookies from 'js-cookie';

export const useMemberHooks = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)

    const [isLoading, setLoading] = useState(false)

    const reloadData = () => {
        setLoading(true)
        api.post('user/guest/auth/me', null, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
            .then(({ data }) => {
                setLoading(false)
                setUser(prev => ({
                    ...prev,
                    email: data.email,
                    image: data.image,
                    name: data.name,
                    token: data.token,
                    phone: data.phone,
                    username: data.username,
                    verification_at: data.verification_at
                }))
            })
    }

    const Logout = () => {
        setLoading(true)
        if (!_isTokenExpired()) {
            api.post('user/guest/auth/logout', null, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                .then(res => {
                    Cookies.remove('auth_token', { domain: import.meta.env.VITE_APP_DOMAIN })
                    setTimeout(() => {
                        setLoading(false)
                        setUser(null)
                        navigate('/login#top')
                    }, 1000);
                })
        } else {
            Cookies.remove('auth_token', { domain: import.meta.env.VITE_APP_DOMAIN })
            setTimeout(() => {
                setLoading(false)
                setUser(null)
                navigate('/login#top')
            }, 1000);
        }
    }

    const [stateUploadImage, setUploadImageState] = useState({
        data: '',
        error: '',
        success: ''
    })

    const uploadImage = () => {

        const setNewImage = (data) => {
            setUploadImageState(prevState => ({
                ...prevState,
                data: data
            }))
        }

        const setEmptyNewImage = () => {
            setUploadImageState(prevState => ({
                ...prevState,
                data: ''
            }))
        }

        const removeMessage = () => {
            setUploadImageState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = async (image) => {
            setUploadImageState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)

                await api.post('user/member/upload-profile-image', {
                    image: typeof (image) === 'object' ? stateUploadImage.data : image
                }, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                    .then(({ data }) => {
                        setUploadImageState(prevState => ({
                            ...prevState,
                            data: '',
                            error: '',
                            success: data.message
                        }))
                        reloadData()
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        console.clear()
                        setUploadImageState(prevState => ({
                            ...prevState,
                            error: response.data.message
                        }))
                        setLoading(false)
                    })
            } else {
                navigate('/login')
            }
        }

        return {
            setNewImage,
            setEmptyNewImage,
            removeMessage,
            submit
        }
    }

    const [stateUpdateAuthentication, setUpdateAuthenticationState] = useState({
        username: '',
        name: '',
        error: '',
        success: ''
    })

    const updateAuthentication = () => {

        const removeMessage = () => {
            setUpdateAuthenticationState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setUpdateAuthenticationState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)

                api.put('user/member/authentication', stateUpdateAuthentication, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                    .then(({ data }) => {
                        setUpdateAuthenticationState(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))

                        Cookies.set('auth_token', data.data.access_token, { path: '/', domain: import.meta.env.VITE_APP_DOMAIN, expires: 3600 })

                        setTimeout(() => {
                            reloadData()
                        }, 500)
                    })
                    .catch(({ response }) => {
                        console.log(response)
                        setUpdateAuthenticationState(prevState => ({
                            ...prevState,
                            error: response.data.message
                        }))
                        setLoading(false)
                    })
            } else {
                navigate('/login')
            }
        }

        return {
            removeMessage,
            submit
        }
    }

    const [stateChangePassword, setChangePasswordState] = useState({
        password: '',
        password_confirmation: '',
        error: '',
        success: ''
    })

    const changePassword = () => {

        const removeMessage = () => {
            setChangePasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setChangePasswordState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)

                api.put('user/member/password/change', stateChangePassword, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                    .then(({ data }) => {
                        setChangePasswordState(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        console.log(response)
                        setChangePasswordState(prevState => ({
                            ...prevState,
                            error: response.data.message
                        }))
                        setLoading(false)
                    })
            } else {
                navigate('/login')
            }
        }

        return {
            removeMessage,
            submit
        }
    }


    const [stateSendTokenViaEmail, setSendTokenViaEmailState] = useState({
        email: '',
        error: '',
        success: ''
    })

    const sendTokenViaEmail = () => {

        const removeMessage = () => {
            setSendTokenViaEmailState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setSendTokenViaEmailState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)
                api.post('user/member/email/send-token', stateSendTokenViaEmail, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                    .then(({ data }) => {
                        setSendTokenViaEmailState(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))
                        reloadData()
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        setSendTokenViaEmailState(prevState => ({
                            ...prevState,
                            error: response.data.message,
                            success: ''
                        }))
                        setLoading(false)
                    })
            } else {
                navigate('/login')
            }
        }

        return {
            removeMessage,
            submit
        }

    }

    const [stateSendTokenViaWhatsapp, setSendTokenViaWhatsappState] = useState({
        code: '',
        number: '',
        error: '',
        success: ''
    })

    const sendTokenViaWhatsapp = () => {

        const removeMessage = () => {
            setSendTokenViaWhatsappState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setSendTokenViaWhatsappState(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)
                api.post('user/member/phone-number/send-token', stateSendTokenViaWhatsapp, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                    .then(({ data }) => {
                        setSendTokenViaWhatsappState(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))
                        reloadData()
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        console.clear();
                        setSendTokenViaWhatsappState(prevState => ({
                            ...prevState,
                            error: response.data.message,
                            success: ''
                        }))
                        setLoading(false)
                    })
            } else {
                navigate('/login')
            }
        }

        return {
            removeMessage,
            submit
        }

    }

    const [stateVerifyToken, setVerifyTokenState] = useState({
        error: '',
        success: ''
    })

    const verifyToken = (type) => {
        const removeMessage = () => {
            setVerifyTokenState({
                error: '',
                success: ''
            })
        }
        const submit = (data) => {
            if (data.join('').length == 4) {
                if (!_isTokenExpired()) {

                    let info = {
                        token: data.join('')
                    }

                    type === 'email' ?
                        info.email = stateSendTokenViaEmail.email :
                        info.phone = stateSendTokenViaWhatsapp.code + stateSendTokenViaWhatsapp.number

                    setLoading(true)

                    api.put(`user/member/${type}/verify`, info, { headers: { Authorization: 'Bearer ' + Cookies.get("auth_token") } })
                        .then(({ data }) => {
                            setVerifyTokenState(prevState => ({
                                ...prevState,
                                error: '',
                                success: data.message
                            }))
                            reloadData()
                            setLoading(false)
                        })
                        .catch(({ response }) => {
                            setVerifyTokenState(prevState => ({
                                ...prevState,
                                error: response.data.message,
                                success: ''
                            }))
                            setLoading(false)
                        })
                } else {
                    navigate('/login')
                }
            } else {
                setVerifyTokenState(prevState => ({
                    ...prevState,
                    error: 'Complete your token'
                }))
            }
        }

        return {
            removeMessage,
            submit
        }
    }

    const [errorContinueRegister, setErrorContinueRegister] = useState('')

    const continueRegister = () => {
        setErrorContinueRegister('Verify email first')

        setTimeout(() => {
            setErrorContinueRegister('')
        }, 2000)
    }

    useEffect(() => {
        if (user) {
            setUpdateAuthenticationState(prev => ({
                ...prev,
                username: user.username,
                name: user.name
            }))

            setSendTokenViaEmailState(prev => ({
                ...prev,
                email: user.email
            }))
        }
    }, [user])

    return {
        isLoading,

        Logout,

        stateUploadImage,
        uploadImage,

        stateUpdateAuthentication,
        setUpdateAuthenticationState,
        updateAuthentication,

        stateChangePassword,
        setChangePasswordState,
        changePassword,

        stateSendTokenViaEmail,
        setSendTokenViaEmailState,
        sendTokenViaEmail,

        stateSendTokenViaWhatsapp,
        setSendTokenViaWhatsappState,
        sendTokenViaWhatsapp,

        stateVerifyToken,
        verifyToken,

        errorContinueRegister,
        continueRegister
    }
}