import { useState, useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@root/services/api.js'
import { AuthContext } from '@root/context/AuthProvider'
import { _isTokenExpired } from '@root/utils/helper'
import Cookies from 'js-cookie'

export const useCodeHooks = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)

    const [isLoading, setLoading] = useState(false)

    const reloadData = () => {
        setLoading(true)
        api.get(`code/member/general/me`, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
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
                setLoading(false)
            })
    }

    const [stateRegister, setRegister] = useState({
        username: '',
        name: '',
        role: '',
        dob: '',
        address: '',
        error: '',
        success: ''
    })

    const register = () => {

        const removeMessage = () => {
            setRegister(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setRegister(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)

                api.post('user/code/member/register', stateRegister, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
                    .then(({ data }) => {
                        setRegister(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))
                        reloadData()
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        console.clear()
                        setRegister(prevState => ({
                            ...prevState,
                            error: response.data.message,
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

    const [stateBanksAccount, setBanksAccount] = useState({
        account: '',
        bank: '',
        alias_name: '',
        error: '',
        success: ''
    })

    const banksAccount = () => {

        const removeMessage = () => {
            setBanksAccount(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))
        }

        const submit = (e) => {
            e.preventDefault()

            setBanksAccount(prevState => ({
                ...prevState,
                error: '',
                success: ''
            }))

            if (!_isTokenExpired()) {
                setLoading(true)

                api.post('user/code/instructor/beneficiary', stateBanksAccount, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
                    .then(({ data }) => {
                        setBanksAccount(prevState => ({
                            ...prevState,
                            error: '',
                            success: data.message
                        }))
                        reloadData()
                        setLoading(false)
                    })
                    .catch(({ response }) => {
                        console.clear()
                        setBanksAccount(prevState => ({
                            ...prevState,
                            error: response.data.message,
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

    useEffect(() => {
        if (user) {
            setBanksAccount(prev => ({
                ...prev,
                account: user.account,
                bank: user.bank,
                alias_name: user.alias_name,
            }))
        }
    }, [user])

    return {
        isLoading,

        stateRegister,
        setRegister,
        register,

        stateBanksAccount,
        setBanksAccount,
        banksAccount
    }
}