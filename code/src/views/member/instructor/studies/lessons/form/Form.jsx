import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import MonacoComp from '@root/components/common/code-block/MonacoComp'

import './Form.css'
import { useForm } from '@root/hooks/form'
import { storeLessonActions, updateLessonActions, lessonsActions } from '@root/redux/actions/member/instructor'


const Form = (props) => {
    const { t } = useTranslation()

    const programming = ['html', 'css', 'javascript', 'laravel', 'mysql', 'postgresql', 'php', 'restapi', 'react', 'github', 'svg', 'expressjs', 'mongodb', 'firebase', 'vuejs', 'ajax', 'git', 'cpp', 'python', 'sql-server', 'docker'];
    const [option, setOption] = useState({ language: 'Choise Language', show: false, })

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.storeLessonResult)
    const { data: updateSuccess, loading: updateLoading, error: updateError } = useSelector(state => state.updateLessonResult)

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location

    const initialState = {
        section_id: state && 'section_id' in state ? state.section_id : '',
        id: state && 'lesson_id' in state ? state.lesson_id : '',
        title: state && 'lesson_title' in state ? state.lesson_title : '',
        description: state && 'lesson_description' in state ? state.lesson_description : '',
        code: state && 'lesson_code' in state ? state.lesson_code : '',
        order_in_section: state && 'lesson_order_in_section' in state ? state.lesson_order_in_section : '',
    }

    const { handleChange, handleCustomChange, handleSubmit, formData } = useForm(initialState)

    useEffect(() => {

    }, [success, updateSuccess, error, updateError, loading, updateLoading, initialState])


    return (
        <Layouts>
            {(success || updateSuccess) &&
                <ModalComp
                    title={props.type === 'Edit' ? t('edit-lesson') : t('add-lesson')}
                    close={() => props.type === 'Edit' ? dispatch(updateLessonActions.success(null)) : dispatch(storeLessonActions.success(null))}
                    content={
                        <>
                            <div className="badge badge-success">{props.type === 'Edit' ? updateSuccess.message : success.message}</div>
                            <div className='button bg-primary' onClick={() => {
                                navigate('/member/instructor/courses/sections/lessons#top', {
                                    state: {
                                        section_id: state && state.section_id,
                                        section_title: state && state.section_title,
                                        id: state && state.id,
                                        title: state && state.title,
                                        price: state && state.price,
                                        description: state && state.description,
                                        icon_svg: state && state.icon_svg,
                                        status: state && state.status
                                    }
                                })
                                props.type === 'Edit' ? dispatch(updateLessonActions.success(null))
                                    : dispatch(storeLessonActions.success(null))
                                dispatch(lessonsActions.init(state && state.section_id))
                            }}>{t('see-my-lessons')}</div>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{props.type === 'Edit' ? t('edit-lesson') : t('add-lesson')}</h1>
                <hr />
                <div className='button btn-warning' onClick={() => navigate('/member/instructor/courses/sections/lessons#top', {
                    state: {
                        section_id: state && state.section_id,
                        section_title: state && state.section_title,
                        id: state && state.id,
                        title: state && state.title,
                        price: state && state.price,
                        description: state && state.description,
                        icon_svg: state && state.icon_svg,
                        status: state && state.status
                    }
                })}>{t('back')}</div>
                <hr />
                <form className='grid-custom' onSubmit={e => {
                    handleSubmit(e,
                        props.type === 'Edit' ?
                            dispatch(updateLessonActions.init(formData))
                            : dispatch(storeLessonActions.init(formData)))
                }}>
                    <div style={{ width: '100%' }}>
                        <label htmlFor="title" className='view__member__instructor__lessons__form__label'>{t('title')}</label>
                        <input type="text" id="title" defaultValue={initialState.title} onChange={value => handleChange(value, 'title')} />
                    </div>
                    {error && error.title && <p className='text-error-msg'>{error.title[0]}</p>}
                    {updateError && updateError.title && <p className='text-error-msg'>{updateError.title[0]}</p>}
                    <div style={{ width: '100%' }}>
                        <label htmlFor="description" className='view__member__instructor__lessons__form__label'>{t('description')}</label>
                        <textarea type="text" id="description" defaultValue={initialState.description} onChange={value => handleChange(value, 'description')} />
                    </div>
                    {error && error.description && <p className='text-error-msg'>{error.description[0]}</p>}
                    {updateError && updateError.description && <p className='text-error-msg'>{updateError.description[0]}</p>}
                    <div style={{ width: '100%' }}>
                        <label htmlFor="code" className='view__member__instructor__lessons__form__label'>Code</label>
                        <div className="view__member__instructor__lessons__form__select">
                            {option.language.includes('Choise') &&
                                <div className="view__member__instructor__lessons__form__select__label" onClick={() => setOption(prevState => ({ ...prevState, show: !prevState.show }))}>
                                    <p>{option.language}</p>
                                    <SvgComp rule={`view__member__instructor__lessons__form__select__svg ${option.show ? 'rotate' : ''}`} path='svg' file='common' icon='arrow' />
                                </div>}
                            <div className={`view__member__instructor__lessons__form__options ${option.show ? 'active' : ''}`}>
                                {programming && programming.map((value, index) => (
                                    <div className={`view__member__instructor__lessons__form__option ${option.language === value ? 'active' : ''}`} onClick={() => setOption(({ language: value, show: false }))} key={index}>{value}</div>
                                ))}
                            </div>
                        </div>
                        {!option.language.includes('Choise') && <MonacoComp handleInputOnChange={value => handleCustomChange(value, 'code')} defaultValue={initialState.code} language={option.language} />}
                    </div>
                    {error && error.code && <p className='text-error-msg'>{error.code[0]}</p>}
                    {updateError && updateError.code && <p className='text-error-msg'>{updateError.code[0]}</p>}
                    <div style={{ width: '100%' }}>
                        <label htmlFor="order_in_section" className='view__member__instructor__lessons__form__label'>{t('view__member__instructor__lessons__form__label')}</label>
                        <input type="number" id="order_in_section" defaultValue={initialState.order_in_section} onChange={value => handleChange(value, 'order_in_section')} />
                    </div>
                    {error && error.order_in_section && <p className='text-error-msg'>{error.order_in_section[0]}</p>}
                    {updateError && updateError.order_in_section && <p className='text-error-msg'>{updateError.order_in_section[0]}</p>}
                    <br />
                    {(loading || updateLoading) ? <LoadingComp /> : <button type='submit' className='button bg-primary'>{t('submit')}</button>}
                </form>
            </section>
        </Layouts>
    )
}

export default Form