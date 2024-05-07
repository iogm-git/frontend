import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import './Setting.css'
import { useForm } from '@root/hooks/form'
import { updateDobAddressActions } from '@root/redux/actions/member/general'
import { userActions } from "@root/redux/actions/auth"
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const { t } = useTranslation()

    const { data: user } = useSelector(state => state.userData)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.updateDobAddressResult)
    const dob = user && user.dob ? new Date(user.dob) : null;

    const initialState = {
        dob: dob && !isNaN(dob.getTime()) ? dob.toISOString().split('T')[0] : '',
        address: user && user.address ? user.address : ''
    }

    const { handleChange, handleSubmit, formData } = useForm(initialState)

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => { }, [user, success, loading])

    return (
        <Layouts>
            {success &&
                <ModalComp
                    title={t('updated-dob-and-address')}
                    close={() => { dispatch(updateDobAddressActions.success(null)); dispatch(userActions.init()) }}
                    content={
                        <>
                            <div className="badge badge-success">{success.message}</div>
                            <div className='button bg-primary' onClick={() => { dispatch(updateDobAddressActions.success(null)); dispatch(userActions.init()); navigate(`/member/${user.role}/profile#top`) }}>{t('my-profile')}</div>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{t('setting')}</h1>
                <hr />
                <form className='grid-custom layout__box view__member__setting__form'
                    onSubmit={e => {
                        handleSubmit(e, dispatch(updateDobAddressActions.init(formData)))
                    }}>
                    <div className='view__member__setting__formel'>
                        <label htmlFor="dob" className='view__member__setting__label'>{t('date-of-birth')}</label>
                        <input type="date" id='dob' onChange={value => handleChange(value, 'dob')} max={today} className='view__member__setting__input' defaultValue={initialState.dob} />
                        {error && error.dob && <p className='text-error-msg'>{error.dob[0]}</p>}
                    </div>
                    <div className='view__member__setting__formel'>
                        <label htmlFor="address" className='view__member__setting__label'>{t('address')}</label>
                        <input type="text" id='address' onChange={value => handleChange(value, 'address')} className='view__member__setting__input' defaultValue={initialState.address} />
                        {error && error.address && <p className='text-error-msg'>{error.address[0]}</p>}
                    </div>
                    {loading ? <LoadingComp /> : <button className="button bg-primary" type='submit'>{t('submit')}</button>}
                    <hr />
                    <a href={import.meta.env.VITE_APP_URL_USER + '/member/setting'} className="button btn-primary">{t('advance-setting')}</a>
                </form>
            </section>
        </Layouts>
    )
}

export default Setting