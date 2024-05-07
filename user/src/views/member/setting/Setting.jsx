import React, { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Setting.css';

import Layouts from '@root/views/Layouts';
import AlertCloseComp from '@root/components/AlertCloseComp'
import InputImageComp from '@root/components/form/image/InputImageComp'
import InputTextComp from '@root/components/form/text/InputTextComp'
import InputTokenComp from '@root/components/form/token/InputTokenComp';
import LoadingComp from '@root/components/loading/LoadingComp'
import ModalComp from '@root/components/ModalComp'

import { _getImage, _countryPhoneCodes, _getFromData, _searchData } from '@root/utils/helper';
import { AuthContext } from '@root/context/AuthProvider'
import { useMemberHooks } from '@root/hooks/Member';

const Setting = () => {
    const { user, userLoading } = useContext(AuthContext)
    const [verify, setVerify] = useState('email')

    const {
        isLoading,

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
    } = useMemberHooks()

    const [phoneCodes, setPhoneCodes] = useState({ show: false, value: _countryPhoneCodes })
    const [codePhone, setCodePhone] = useState('')

    useEffect(() => { }, [
        user,
        codePhone,

        isLoading,

        stateUploadImage,
        stateUpdateAuthentication,
        stateChangePassword,
        stateSendTokenViaEmail,
        stateVerifyToken,
        errorContinueRegister
    ])

    useEffect(() => { }, [userLoading])

    return (
        <Layouts>
            <section className='view__member__setting__personalize'>
                <h1 className='section-title view__member__setting__personalize__title'>Personalize</h1>

                {userLoading ? <LoadingComp /> : user &&

                    <>
                        {user.role === 'instructor' &&
                            <div className='view__member__setting__personalize__warning'>
                                <p>You are registered as an instructor in the IOGM - Code application, if you want to set up a <span style={{ color: 'var(--blue-color)' }}>bank account</span>, please click the button below</p>
                                <Link to='code/instructor#top' className="view__member__setting__personalize__warning__button">Instructor</Link>
                            </div>}

                        <div className='view__member__setting__form'>
                            <h2>Update Image</h2>
                            <div className='view__member__setting__personalize__update__image__div'>
                                <div className='view__member__setting__personalize__update__image__box'>
                                    {stateUploadImage.error && <AlertCloseComp msg={stateUploadImage.error} type='danger' close={uploadImage().removeMessage} />}
                                    {stateUploadImage.success && <AlertCloseComp msg={stateUploadImage.success} type='success' close={uploadImage().removeMessage} />}
                                    <h4>Your Image</h4>
                                    {user && !isLoading ?
                                        <img
                                            referrerPolicy='no-referrer'
                                            className='view__member__setting__personalize__update__image__picture'
                                            src={user.image && user.image.includes('https') ? user.image : _getImage(user.image)} alt={user.name} /> :
                                        <div className="view__member__setting__personalize__update__image__loading">
                                            <LoadingComp />
                                        </div>
                                    }
                                </div>
                                {stateUploadImage.data !== '' && user && stateUploadImage.data !== user.image &&
                                    <div className='view__member__setting__personalize__update__image__box'>
                                        <h4>New Image</h4>
                                        <img className='view__member__setting__personalize__update__image__picture' src={stateUploadImage.data} alt={user.name} />
                                    </div>
                                }
                                {user && stateUploadImage.data == '' ?
                                    <InputImageComp oldImage={user.image && user.image.includes('http') ? user.image : _getImage(user.image)} handleInputOnChange={uploadImage().setNewImage} />
                                    : <>
                                        {isLoading ? <LoadingComp /> : <div className='button btn-warning' onClick={uploadImage().setEmptyNewImage}>Cancel Update</div>}
                                        {isLoading ? <LoadingComp /> : <div className="button btn-success" onClick={uploadImage().submit}>Upload Image</div>}
                                    </>
                                }
                                {user.image !== 'profile.svg' && stateUploadImage.data == '' && (isLoading ? <LoadingComp /> : <div className="button btn-warning" onClick={() => uploadImage().submit('profile.svg')}>Remove Image</div>)}
                            </div>
                        </div>

                        <form onSubmit={updateAuthentication().submit} className='view__member__setting__form'>
                            <h2>Update Authentication</h2>
                            {stateUpdateAuthentication.success && <AlertCloseComp msg={stateUpdateAuthentication.success} type='success' close={updateAuthentication().removeMessage} />}
                            <div>
                                <InputTextComp handleInputOnChange={value => setUpdateAuthenticationState(prevState => ({ ...prevState, username: value }))} name='username' value={user.username} />
                                {stateUpdateAuthentication && stateUpdateAuthentication.error && <p className='text-error-msg'>{stateUpdateAuthentication.error.username}</p>}
                            </div>
                            <div>
                                <InputTextComp handleInputOnChange={value => setUpdateAuthenticationState(prevState => ({ ...prevState, name: value }))} name='name' value={user.name} />
                                {stateUpdateAuthentication && stateUpdateAuthentication.error && <p className='text-error-msg'>{stateUpdateAuthentication.error.name}</p>}
                            </div>

                            {!isLoading ? <button className="button bg-primary" type='submit'>Submit</button> : <LoadingComp />}
                        </form>

                        <form onSubmit={changePassword().submit} className='view__member__setting__form'>
                            <h2>Change Password</h2>
                            {stateChangePassword.success && <AlertCloseComp msg={stateChangePassword.success} type='success' close={changePassword().removeMessage} />}
                            <div>
                                <InputTextComp type='password' handleInputOnChange={value => setChangePasswordState(prevState => ({ ...prevState, password: value }))} name='password' />
                            </div>
                            <div>
                                <InputTextComp type='password' handleInputOnChange={value => setChangePasswordState(prevState => ({ ...prevState, password_confirmation: value }))} name='password confirmation' />
                                {stateChangePassword.error && stateChangePassword.error.password && stateChangePassword.error.password.map((value, i) => (
                                    <div key={i} className="text-error-msg text-danger">{value}</div>
                                ))}
                            </div>

                            {!isLoading ? <button className="button bg-primary" type='submit'>Submit</button> : <LoadingComp />}
                        </form>

                        <form onSubmit={(e) => { sendTokenViaEmail().submit(e); setVerify('email') }} className='view__member__setting__form'>
                            <h2>Verify Email</h2>
                            {stateSendTokenViaEmail.success && <AlertCloseComp msg={stateSendTokenViaEmail.success} type='success' close={sendTokenViaEmail().removeMessage} />}
                            <div className="view__member__setting__send__otp__email__div">
                                <div style={{ width: '100%' }}>
                                    <InputTextComp handleInputOnChange={value => setSendTokenViaEmailState(prevState => ({ ...prevState, email: value }))} name='email' value={user.email} type='email' />
                                    {stateSendTokenViaEmail && stateSendTokenViaEmail.error && <p className='text-error-msg'>{stateSendTokenViaEmail.error.email}</p>}
                                </div>
                                {!isLoading ? <button className="button bg-primary" type='submit'>Send Token</button> : <LoadingComp />}
                            </div>
                        </form>

                        {phoneCodes.show &&
                            <ModalComp title='Phone Codes' handleClose={() => setPhoneCodes({ show: false, value: _countryPhoneCodes })}
                                content={
                                    <div style={{ display: 'grid', gap: 'var(--xx)', gridTemplateRows: 'max-content 1fr' }}>
                                        <div style={{ position: 'sticky', top: 0, zIndex: 3 }}>
                                            <InputTextComp type='text' name='search...' handleInputOnChange={value => _searchData(value.toLowerCase(), _countryPhoneCodes, result => setPhoneCodes(prev => ({ ...prev, value: result })))} />
                                        </div>
                                        {phoneCodes.value.map((value, index) => (
                                            <div onClick={() => { setSendTokenViaWhatsappState(prev => ({ ...prev, code: Object.values(value)[0] })), setPhoneCodes({ show: false, value: _countryPhoneCodes }), setCodePhone(Object.keys(value)[0] + ' ' + Object.values(value)[0]) }} key={index} className='hover-progress' style={{ cursor: 'pointer', width: 'max-content', backgroundColor: 'var(--transblue-color)', color: 'var(--blue-color)', padding: 'var(--xs) var(--m)', borderRadius: 'var(--radius-s)' }}>
                                                {Object.values(value)[0]} {Object.keys(value)[0]}
                                            </div>
                                        ))}
                                    </div>
                                } />
                        }
                        <form onSubmit={(e) => { sendTokenViaWhatsapp().submit(e); setVerify('phone-number') }} className='view__member__setting__form'>
                            <h2>Verify Phone Number</h2>
                            {user && user.phone && <InputTextComp type='text' name='old number' value={user.phone} disabled={true} />}
                            {stateSendTokenViaWhatsapp.success && <AlertCloseComp msg={stateSendTokenViaWhatsapp.success} type='success' close={sendTokenViaWhatsapp().removeMessage} />}
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--m)' }}>
                                <InputTextComp type='text' name='Code' value={codePhone} disabled={true} />
                                <div className="button btn-primary" onClick={() => setPhoneCodes(prev => ({ ...prev, show: true }))}>Show</div>
                                {stateSendTokenViaWhatsapp && stateSendTokenViaWhatsapp.error && stateSendTokenViaWhatsapp.error && <p className='text-error-msg'>{stateSendTokenViaWhatsapp.error.code}</p>}
                            </div>
                            <div className="view__member__setting__send__otp__email__div">
                                <div style={{ width: '100%' }}>
                                    <InputTextComp handleInputOnChange={value => setSendTokenViaWhatsappState(prevState => ({ ...prevState, number: value }))} name='number' type='number' />
                                    {stateSendTokenViaWhatsapp && stateSendTokenViaWhatsapp.error && <p className='text-error-msg'>{stateSendTokenViaWhatsapp.error.number}</p>}
                                </div>
                                <small style={{ color: 'var(--link-color)' }}>Ignore [0] in your phone number . Ex: 81272369357</small>
                                {!isLoading ? <button className="button bg-primary" type='submit'>Send Token</button> : <LoadingComp />}
                            </div>
                        </form>

                        {user && user.token !== null &&
                            <div className='view__member__setting__form'>
                                <h2>Verify Token</h2>
                                {stateVerifyToken.success && <AlertCloseComp msg={stateVerifyToken.success} type='success' close={verifyToken(verify).removeMessage} />}
                                {stateVerifyToken.error && <AlertCloseComp msg={stateVerifyToken.error} type='danger' close={verifyToken(verify).removeMessage} />}
                                <div className='view__member__setting__personalize__box__otp'>
                                    <InputTokenComp length={4} handleToken={(data) => verifyToken(verify).submit(data)} />
                                </div>
                            </div>
                        }

                        <div>
                            {user && user.verification_at === null ?
                                <>
                                    {errorContinueRegister && <p className="badge text-error-msg badge-danger">{errorContinueRegister}</p>}
                                    <div className="button badge-danger" onClick={continueRegister}>
                                        Continue Register
                                    </div>
                                </>
                                :
                                <div className='view__member__setting__personalize__redirect'>
                                    {Cookies.get('to_url') &&
                                        <>
                                            <a className='button badge-success' href={Cookies.get('to_url')}>Back to Shop</a>
                                            <a className='button badge-success' href={Cookies.get('to_url')}>Back to Code</a>
                                        </>
                                    }
                                    <HashLink className='button btn-primary' smooth to={'/member/ballot#top'}>
                                        Continue Register
                                    </HashLink>
                                </div>
                            }
                        </div>
                    </>
                }
            </section>
        </Layouts>
    );
};

export default Setting;
