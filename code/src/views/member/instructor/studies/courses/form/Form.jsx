import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import SvgComp from '@root/components/common/SvgComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import InputTextareaComp from '@root/components/common/form/InputTextareaComp'

import './Form.css'
import { useForm } from '@root/hooks/form'

import { storeCourseActions, updateCourseActions, studiesActions } from '@root/redux/actions/member/instructor'

const Form = (props) => {
    const { t } = useTranslation()

    const programming = ['html', 'css', 'javascript', 'laravel', 'mysql', 'postgresql', 'php', 'restapi', 'react', 'github', 'svg', 'expressjs', 'mongodb', 'firebase', 'vuejs', 'ajax', 'git', 'cpp', 'python', 'sql-server', 'docker'];

    const dispatch = useDispatch()

    const { data: success, loading, error } = useSelector(state => state.storeCourseResult)
    const { data: updateSuccess, loading: updateLoading, error: updateError } = useSelector(state => state.updateCourseResult)

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location || {};
    const initialState = {
        id: state && 'id' in state ? state.id : '',
        title: state && 'title' in state ? state.title : '',
        price: state && 'price' in state ? state.price : '',
        description: state && 'description' in state ? state.description : '',
        icon_svg: state && 'icon_svg' in state ? state.icon_svg : '',
        level: state && 'level' in state ? state.level : '',
        status: state && 'status' in state ? state.status : ''
    }

    const { handleChange, handleCustomChange, handleSubmit, formData } = useForm(initialState)

    const [option, setOption] = useState({ value: state && 'icon_svg' in state ? state.icon_svg : 'Choise Logo', show: false })
    const [selectedLevel, setSelectedLevel] = useState(state && 'level' in state ? state.level : '')
    const [selectedStatus, setSelectedStatus] = useState(state && 'status' in state ? state.status : '')

    useEffect(() => {
        if (location.pathname.includes('edit')) {
            if (!(state && 'id' in state)) {
                navigate('/member/instructor/courses#top')
            }
        }
    }, [success, updateSuccess, error, updateError, loading, updateLoading])

    useEffect(() => {
        if (location.pathname.includes('edit')) {
            dispatch(storeCourseActions.success(null))
            dispatch(storeCourseActions.failure(null))
        } else {
            dispatch(updateCourseActions.success(null))
            dispatch(updateCourseActions.failure(null))
        }
    }, [])

    return (
        <Layouts>
            {(success || updateSuccess) &&
                <ModalComp
                    title={props.type === 'Edit' ? t('edit-course') : t('add-course')}
                    close={() => props.type === 'Edit' ? dispatch(updateCourseActions.success(null)) : dispatch(storeCourseActions.success(null))}
                    content={
                        <>
                            <div className="badge badge-success">{props.type === 'Edit' ? updateSuccess.message : success.message}</div>
                            <HashLink
                                smooth
                                to='/member/instructor/courses#top'
                                className='button bg-primary'
                                onClick={() => {
                                    props.type === 'Edit' ? dispatch(updateCourseActions.success(null))
                                        : dispatch(storeCourseActions.success(null))
                                    dispatch(studiesActions.init())
                                }}>
                                {t('see-my-courses')}
                            </HashLink>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{props.type === 'Edit' ? t('edit-course') : t('add-course')}</h1>
                <hr />
                <HashLink className='button btn-warning' smooth to='/member/instructor/courses#top' onClick={() => dispatch(studiesActions.init())}>{t('cancel')} {props.type === 'Add' ? t('add') : t('edit')}</HashLink>
                <hr />
                <form className='view__member__instructor__course__form'
                    onSubmit={e => {
                        handleSubmit(e,
                            props.type === 'Edit' ?
                                dispatch(updateCourseActions.init(formData))
                                : dispatch(storeCourseActions.init(formData)))
                    }}
                >
                    <label htmlFor="title" className='view__member__instructor__course__form__label'>{t('title')}</label>
                    <input onChange={value => handleChange(value, 'title')} defaultValue={initialState.title} type="text" id='title' className='view__member__instructor__course__form__input' />
                    {error && error.title && <p className='text-error-msg'>{error.title[0]}</p>}
                    {updateError && updateError.title && <p className='text-error-msg'>{updateError.title[0]}</p>}
                    <br />
                    <label className='view__member__instructor__course__form__label'>{t('description')}</label>
                    <InputTextareaComp oldValue={initialState.description} handleInputOnChange={value => { handleCustomChange(value, 'description') }} />
                    {error && error.description && <p className='text-error-msg'>{error.description[0]}</p>}
                    {updateError && updateError.description && <p className='text-error-msg'>{updateError.description[0]}</p>}
                    <br />
                    <br />
                    <label htmlFor="price" className='view__member__instructor__course__form__label'>{t('price')}</label>
                    <input onChange={value => handleChange(value, 'price')} defaultValue={initialState.price} type="number" id='price' className='view__member__instructor__course__form__input' />
                    {error && error.price && <p className='text-error-msg'>{error.price[0]}</p>}
                    {updateError && updateError.price && <p className='text-error-msg'>{updateError.price[0]}</p>}
                    <br />
                    <label htmlFor="icon_svg" className='view__member__instructor__course__form__label'>{t('icon')} Svg</label>
                    <div className="view__member__instructor__course__form__input" onClick={() => setOption(prev => ({ ...prev, show: !prev.show }))} style={{ padding: 'var(--s)', border: 'var(--border)', height: 'max-content' }}>
                        {option.value.includes('Choise') ? <p>{option.value}</p> : <SvgComp rule='view__member__instructor__course__form__input__svg' path='svg' file='programming' icon={option.value} />}
                        <SvgComp rule={`view__member__instructor__course__form__input__arrow ${option.show ? 'rotate' : ''}`} path='svg' file='common' icon='arrow' />
                    </div>

                    {option.show &&
                        <div className='view__member__instructor__course__form__select'>
                            <div className="view__member__instructor__course__form__select__box">
                                <div className="view__member__instructor__course__form__option__close" onClick={() => setOption(prev => ({ ...prev, show: !prev.show }))}>
                                    &times;
                                </div>
                                <div className='view__member__instructor__course__form__option'>
                                    {programming && programming.map((value, index) => (
                                        <div className={`view__member__instructor__course__form__option__icon ${option.value === value ? 'active' : ''}`} key={index} onClick={() => { handleCustomChange(value, 'icon_svg'), setOption(prev => ({ ...prev, value: value, show: !prev.show })); }}>
                                            <SvgComp rule='svg-x' path='svg' file='programming' icon={value} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    {error && error.icon_svg && <p className='text-error-msg'>{error.icon_svg[0]}</p>}
                    {updateError && updateError.icon_svg && <p className='text-error-msg'>{updateError.icon_svg[0]}</p>}
                    <br />
                    <label htmlFor="status" className='view__member__instructor__course__form__label'>Level</label>
                    <div className="view__member__instructor__course__form__input" style={{ justifyContent: 'start', flexWrap: 'wrap', gap: 'var(--m)' }}>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedLevel === 'junior' ? 'active' : ''}`} onClick={() => { handleCustomChange('junior', 'level'); setSelectedLevel('junior') }}>
                            {t('junior')}
                        </div>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedLevel === 'middle' ? 'active' : ''}`} onClick={() => { handleCustomChange('middle', 'level'); setSelectedLevel('middle') }}>
                            {t('middle')}
                        </div>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedLevel === 'senior' ? 'active' : ''}`} onClick={() => { handleCustomChange('senior', 'level'); setSelectedLevel('senior') }}>
                            {t('senior')}
                        </div>
                    </div>
                    {error && error.level && <p className='text-error-msg'>{error.level[0]}</p>}
                    {updateError && updateError.level && <p className='text-error-msg'>{updateError.level[0]}</p>}
                    <br />
                    <label htmlFor="status" className='view__member__instructor__course__form__label'>Status</label>
                    <div className="view__member__instructor__course__form__input" style={{ justifyContent: 'start', flexWrap: 'wrap', gap: 'var(--m)' }}>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedStatus === 'public' ? 'active' : ''}`} onClick={() => { handleCustomChange('public', 'status'); setSelectedStatus('public') }}>
                            {t('public')}
                        </div>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedStatus === 'student' ? 'active' : ''}`} onClick={() => { handleCustomChange('student', 'status'); setSelectedStatus('student') }}>
                            {t('student')}
                        </div>
                        <div className={`view__member__instructor__course__form__input__radio ${selectedStatus === 'private' ? 'active' : ''}`} onClick={() => { handleCustomChange('private', 'status'); setSelectedStatus('private') }}>
                            {t('private')}
                        </div>
                    </div>
                    {error && error.status && <p className='text-error-msg'>{error.status[0]}</p>}
                    {updateError && updateError.status && <p className='text-error-msg'>{updateError.status[0]}</p>}
                    <br />
                    {(loading || updateLoading) ? <LoadingComp /> : <button type="submit" className='button bg-primary'>{props.type === 'Edit' ? t('edit') : t('add')}</button>}
                </form>
            </section>
        </Layouts>
    )
}

export default Form