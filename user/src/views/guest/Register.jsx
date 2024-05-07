import React from 'react'
import { HashLink } from 'react-router-hash-link'

import './form.css'
import Layouts from '@root/views/Layouts'
import InputTextComp from '@root/components/form/text/InputTextComp'
import LoadingComp from '@root/components/loading/LoadingComp'
import GoogleLoginComp from '@root/components/GoogleLoginComp'

import { useGuestHooks } from '@root/hooks/Guest'

const Register = () => {
    const { isLoading, register, stateRegister, setRegister, googleLogin } = useGuestHooks()

    return (
        <Layouts>
            <form onSubmit={register().submit} className='guest__form'>
                <h1 className='section-title'>Register</h1>

                <div className='guest__form__el'>
                    <InputTextComp handleInputOnChange={value => setRegister(prev => ({ ...prev, username: value }))} name='username' />
                    {stateRegister && stateRegister.error && <p className="text-error-msg text-danger">{stateRegister.error.errors.username}</p>}
                </div>
                <div className='guest__form__el'>
                    <InputTextComp type='password' handleInputOnChange={value => setRegister(prev => ({ ...prev, password: value }))} name='password' />
                </div>
                <div className='guest__form__el'>
                    <InputTextComp type='password' handleInputOnChange={value => setRegister(prev => ({ ...prev, password_confirmation: value }))} name='password confirmation' />
                    {stateRegister && stateRegister.error && stateRegister.error.errors.password && stateRegister.error.errors.password.map((value, i) => (
                        <div key={i} className="text-error-msg text-danger">{value}</div>
                    ))}
                </div>
                {isLoading ? <LoadingComp /> :
                    <>
                        <div className="guest__form__question guest__form__el">
                            <HashLink className='button btn-primary' smooth to={'/login#top'}>
                                Login
                            </HashLink>
                            <button className="button bg-primary" type='submit'>Submit</button>
                        </div>
                        <GoogleLoginComp handleInputOnChange={value => googleLogin(value)} />
                    </>
                }

            </form>
        </Layouts>
    )
}

export default Register