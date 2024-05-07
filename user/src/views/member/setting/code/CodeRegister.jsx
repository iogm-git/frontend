import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

import Layouts from '@root/views/Layouts'
import InputTextComp from '@root/components/form/text/InputTextComp'
import InputSelectComp from '@root/components/form/select/InputSelectComp'
import InputDateComp from '@root/components/form/date/InputDateComp'
import LoadingComp from '@root/components/loading/LoadingComp'
import AlertCloseComp from '@root/components/AlertCloseComp'

import { AuthContext } from '@root/context/AuthProvider'
import { useCodeHooks } from '@root/hooks/Code'

const CodeRegister = () => {
    const navigate = useNavigate()

    const { user, isMemberOnIogmCode } = useContext(AuthContext)
    const { isLoading, register, stateRegister, setRegister } = useCodeHooks()

    useEffect(() => {
        user && user.email === null && navigate('/member/setting')
    }, [])

    useEffect(() => {

    }, [user])

    return (
        <Layouts>
            <section className='view__member__setting__code__register'>
                <h2 className="section-title">Register For IOGM - Code</h2>

                {isMemberOnIogmCode ?
                    <>
                        <div className='badge badge-success'>Your account has been registered as {user.role}</div>
                        <a className='button btn-primary' href={import.meta.env.VITE_APP_URL_CODE}>Visit IOGM - Code</a>
                    </>
                    : user &&
                    <>
                        <div className='grid-custom view__member__setting__code__box'>
                            <h2>Info</h2>
                            <InputTextComp type='text' name='username' value={user.username} disabled={true} />
                            <InputTextComp type='email' name='email' value={user.email} disabled={true} />
                            <InputTextComp type='text' name='name' value={user.name} disabled={true} />
                        </div>
                        <form onSubmit={register().submit} className='grid-custom view__member__setting__code__box'>
                            <h2>Form</h2>
                            <div className='view__member__setting__code__formel'>
                                <InputSelectComp name='Role' value={['student', 'instructor']} handleInputOnChange={value => setRegister(prev => ({ ...prev, role: value }))} />
                                {stateRegister && stateRegister.error && <p className='text-error-msg'>{stateRegister.error && stateRegister.error.role}</p>}
                            </div>
                            <div className='view__member__setting__code__formel'>
                                <InputTextComp type='text' name='address' handleInputOnChange={value => setRegister(prev => ({ ...prev, address: value }))} />
                                {stateRegister && stateRegister.error && <p className='text-error-msg'>{stateRegister.error && stateRegister.error.address}</p>}
                            </div>
                            <div className='view__member__setting__code__formel'>
                                <InputDateComp name='Date of birth' handleInputOnChange={value => setRegister(prev => ({ ...prev, dob: value }))} />
                                {stateRegister && stateRegister.error && <p className='text-error-msg'>{stateRegister.error && stateRegister.error.dob}</p>}
                            </div>
                            {stateRegister && !stateRegister.success &&
                                <>
                                    {isLoading ? <LoadingComp /> : <button className="button badge-primary" type='submit'>Submit</button>}
                                </>
                            }
                        </form>
                        {stateRegister && stateRegister.success &&
                            <>
                                <a className='button btn-primary' href={import.meta.env.VITE_APP_URL_CODE}>Visit IOGM - Code</a>
                                <AlertCloseComp type='success' msg={stateRegister && stateRegister.success} close={register().removeMessage} />
                            </>
                        }
                    </>
                }
            </section>
        </Layouts>
    )
}

export default CodeRegister