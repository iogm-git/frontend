import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import InputTextareaComp from '@root/components/common/form/InputTextareaComp'

import { useForm } from '@root/hooks/form'

import './Ask.css'
import { answersActions, storeQuestionActions } from '@root/redux/actions/member/student'

const Ask = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.storeQuestionResult)

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    const initialState = {
        course_id: state && 'course_id' in state ? state.course_id : '',
        question: ''
    }

    const { handleCustomChange, handleSubmit, formData } = useForm(initialState)

    useEffect(() => {
        if (state === null) {
            return navigate('/member/student/courses#top')
        }
    }, [])

    useEffect(() => {

    }, [state, success, loading, error])


    return (
        <Layouts>
            {success &&
                <ModalComp
                    title={t('store-question')}
                    close={() => { dispatch(storeQuestionActions.success(null)); dispatch(answersActions.init()) }}
                    content={
                        <>
                            <div className="badge badge-success">{success.message}</div>
                            <HashLink
                                smooth
                                to='/member/student/answers#top'
                                className='button bg-primary'
                                onClick={() => {
                                    dispatch(storeQuestionActions.success(null))
                                    dispatch(answersActions.init())
                                }}>
                                {t('see-my-answers')}
                            </HashLink>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className="view__layout__member">
                <h1 className='section-title'>{t('ask')} : {state && state.course_title}</h1>
                <hr />
                <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/member/student/courses#top'>{t('back')}</HashLink>
                <hr />
                <form className='view__member__student__studies__courses__ask__form' onSubmit={e => {
                    handleSubmit(e, dispatch(storeQuestionActions.init(formData)))
                }}>
                    <div className='view__member__student__studies__courses__ask__formel'>
                        <label htmlFor="title" className='view__member__student__studies__courses__ask__formel__label'>{t('title')}</label>
                        <input defaultValue={state && state.course_title} type="text" id='title' disabled />
                    </div>
                    <div className='view__member__student__studies__courses__ask__formel'>
                        <label htmlFor="title" className='view__member__student__studies__courses__ask__formel__label'>{t('my-question')}</label>
                        <InputTextareaComp oldValue={initialState.question} handleInputOnChange={value => { handleCustomChange(value, 'question') }} />
                        {error && error.question && <p className='text-error-msg'>{error.question[0]}</p>}
                    </div>
                    {loading ? <LoadingComp /> : <button type='submit' className='button bg-primary'>{t('submit')}</button>}
                </form>
            </section>
        </Layouts>
    )
}

export default Ask