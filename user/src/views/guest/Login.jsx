import React from 'react'
import { HashLink } from 'react-router-hash-link'

import './form.css'
import Layouts from '@root/views/Layouts'
import InputTextComp from '@root/components/form/text/InputTextComp'
import LoadingComp from '@root/components/loading/LoadingComp'
import AlertCloseComp from '@root/components/AlertCloseComp'
import GoogleLoginComp from '@root/components/GoogleLoginComp'

import { useGuestHooks } from '@root/hooks/Guest'

const Login = () => {
    const { isLoading, login, stateLogin, setLogin, stateGoogleLogin, setGoogleLogin, googleLogin } = useGuestHooks()

    return (
        <Layouts>
            <form onSubmit={login().submit} className='guest__form'>
                <h1 className='section-title'>Login</h1>


                {stateGoogleLogin && stateGoogleLogin.error && <AlertCloseComp type='warning' msg={stateGoogleLogin.error.email} close={() => setGoogleLogin({ error: '' })} />}

                {stateLogin && stateLogin.error && <p className="text-error-msg">{stateLogin.error.error}</p>}

                <div className='guest__form__el'>
                    <InputTextComp handleInputOnChange={value => setLogin(prev => ({ ...prev, username: value }))} name='username' />
                    {stateLogin && stateLogin.error && <p className="text-error-msg">{stateLogin.error.username}</p>}
                </div>
                <div className='guest__form__el'>
                    <InputTextComp type='password' handleInputOnChange={value => setLogin(prev => ({ ...prev, password: value }))} name='password' />
                    {stateLogin && stateLogin.error && <p className="text-error-msg">{stateLogin.error.password}</p>}

                </div>
                <HashLink smooth to='/password/forgot' className="guest__form__forgot">Forgot password?</HashLink>

                {isLoading ? <LoadingComp /> :
                    <>
                        <div className="guest__form__question guest__form__el">
                            <HashLink className='button btn-primary' smooth to={'/register#top'}>
                                Register
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

export default Login