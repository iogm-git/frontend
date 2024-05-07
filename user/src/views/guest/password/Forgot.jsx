import React from 'react'

import '@root/views/guest/form.css'
import Layouts from '@root/views/Layouts'
import AlertCloseComp from '@root/components/AlertCloseComp'
import LoadingComp from '@root/components/loading/LoadingComp'
import InputTextComp from '@root/components/form/text/InputTextComp'

import { useGuestHooks } from '@root/hooks/Guest'

const Forgot = () => {
    const { isLoading, stateSendLinkForgotPassword, setSendLinkForgotPasswordState, sendLinkForgotPassword } = useGuestHooks()

    return (
        <Layouts>
            <form onSubmit={sendLinkForgotPassword().submit} className='guest__form' style={{ placeItems: 'center' }}>
                <h1 className='section-title'>Forgot Password</h1>

                {stateSendLinkForgotPassword && (
                    (stateSendLinkForgotPassword.error && (!stateSendLinkForgotPassword.error.hasOwnProperty('username'))) ||
                    stateSendLinkForgotPassword.success) &&
                    <AlertCloseComp
                        type={stateSendLinkForgotPassword.error ? 'warning' : 'primary'}
                        msg={stateSendLinkForgotPassword.error ? stateSendLinkForgotPassword.error : stateSendLinkForgotPassword.success}
                        close={sendLinkForgotPassword().removeMessage}
                    />
                }

                <div className='guest__form__el'>
                    <InputTextComp handleInputOnChange={value => setSendLinkForgotPasswordState(prev => ({ ...prev, username: value }))} name='username' />
                    {stateSendLinkForgotPassword && stateSendLinkForgotPassword.error && <p className="text-error-msg">{stateSendLinkForgotPassword.error.username}</p>}
                </div>
                <p className='guest__form__el'>Enter your username that was used when registering for this application</p>

                {isLoading ? <LoadingComp /> :
                    <button className="button bg-primary" type='submit' style={{ placeSelf: 'center' }}>Submit</button>
                }

            </form>
        </Layouts>
    )
}

export default Forgot