import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import '@root/views/guest/form.css'
import Layouts from '@root/views/Layouts'
import LoadingComp from '@root/components/loading/LoadingComp'
import AlertCloseComp from '@root/components/AlertCloseComp'
import InputTextComp from '@root/components/form/text/InputTextComp'

import { useGuestHooks } from '@root/hooks/Guest'

const Reset = () => {
    const [param, setParam] = useSearchParams()
    const navigate = useNavigate()

    const { isLoading, stateResetPassword, setResetPasswordState, resetPassword } = useGuestHooks()

    useEffect(() => {
        if (!param.get('token') || !param.get('username')) {
            navigate('/login')
        } else {
            setResetPasswordState(prev => ({
                ...prev,
                username: param.get('username'),
                token: param.get('token')
            }))
        }

    }, [])

    return (
        <Layouts>
            <form onSubmit={resetPassword().submit} className='guest__form'>
                <h1 className='section-title'>Reset Password</h1>

                {stateResetPassword && stateResetPassword.error ?
                    ((!stateResetPassword.error.hasOwnProperty('password')) &&
                        <AlertCloseComp
                            type='warning'
                            msg={stateResetPassword.error}
                            close={resetPassword().removeMessage}
                        />
                    ) : stateResetPassword.success &&
                    <div className='button btn-primary' onClick={() => {
                        navigate('/login')
                        resetPassword().removeMessage
                    }}>Go Login</div>
                }

                <div className='guest__form__el'>
                    <InputTextComp type='password' handleInputOnChange={value => setResetPasswordState(prev => ({ ...prev, password: value }))} name='password' />
                </div>
                <div className='guest__form__el'>
                    <InputTextComp type='password' handleInputOnChange={value => setResetPasswordState(prev => ({ ...prev, password_confirmation: value }))} name='password confirmation' />
                    {stateResetPassword && stateResetPassword.error && stateResetPassword.error.password && stateResetPassword.error.password.map((value, i) => (
                        <div key={i} className="text-error-msg text-danger">{value}</div>
                    ))}
                </div>

                {isLoading ? <LoadingComp /> :
                    <button className="button bg-primary" type='submit' style={{ placeSelf: 'center' }}>Submit</button>
                }

            </form>
        </Layouts>
    )
}

export default Reset