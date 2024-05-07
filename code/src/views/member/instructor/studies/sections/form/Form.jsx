import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import './Form.css'
import { useForm } from '@root/hooks/form'

import { storeSectionActions, updateSectionActions, sectionsActions } from '@root/redux/actions/member/instructor'

const Form = (props) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.storeSectionResult)
    const { data: updateSuccess, loading: updateLoading, error: updateError } = useSelector(state => state.updateSectionResult)

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    const initialState = {
        course_id: state && 'id' in state ? state.id : '',
        id: state && 'section_id' in state ? state.section_id : '',
        title: state && 'section_title' in state ? state.section_title : '',
        order_in_course: state && 'section_order_in_course' in state ? state.section_order_in_course : '',
    }

    const { handleChange, handleSubmit, formData } = useForm(initialState)

    useEffect(() => {

    }, [success, updateSuccess, error, updateError, loading, updateLoading, initialState])

    return (
        <Layouts>
            {(success || updateSuccess) &&
                <ModalComp
                    title={props.type === 'Edit' ? t('edit-section') : t('add-section')}
                    close={() => props.type === 'Edit' ? dispatch(updateSectionActions.success(null)) : dispatch(storeSectionActions.success(null))}
                    content={
                        <>
                            <div className="badge badge-success">{props.type === 'Edit' ? updateSuccess.message : success.message}</div>
                            <div className='button bg-primary' onClick={() => {
                                navigate('/member/instructor/courses/sections#top', {
                                    state: {
                                        id: state.id,
                                        title: state.section_title,
                                        price: state.price,
                                        description: state.description,
                                        icon_svg: state.icon_svg,
                                        status: state.status
                                    }
                                })
                                props.type === 'Edit' ? dispatch(updateSectionActions.success(null))
                                    : dispatch(storeSectionActions.success(null))
                                dispatch(sectionsActions.init(state && state.id))
                            }}>{t('see-my-sections')}</div>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className="view__layout__member grid-custom">
                <h1 className="section-title">{props.type === 'Edit' ? t('edit-section') : t('add-section')}</h1>
                <form className='view__member__instructor__section__form'
                    onSubmit={e => {
                        handleSubmit(e,
                            props.type === 'Edit' ?
                                dispatch(updateSectionActions.init(formData))
                                : dispatch(storeSectionActions.init(formData)))
                    }}>
                    <div className="view__member__instructor__section__form__element">
                        <label htmlFor="title" className="view__member__instructor__section__form__label">{t('title')}</label>
                        <input onChange={value => handleChange(value, 'title')} defaultValue={initialState && initialState.title} type="text" id='title' />
                    </div>
                    {error && error.title && <p className='text-error-msg'>{error.title[0]}</p>}
                    {updateError && updateError.title && <p className='text-error-msg'>{updateError.title[0]}</p>}
                    <div className="view__member__instructor__section__form__element">
                        <label htmlFor="order_in_course" className='view__member__instructor__section__form__label'>{t('view__member__instructor__section__form__label')}</label>
                        <input onChange={value => handleChange(value, 'order_in_course')} defaultValue={initialState && initialState.order_in_course} type="number" id='order_in_course' />
                    </div>
                    {error && error.order_in_course && <p className='text-error-msg'>{error.order_in_course[0]}</p>}
                    {updateError && updateError.order_in_course && <p className='text-error-msg'>{updateError.order_in_course[0]}</p>}
                    <hr />
                    <div className="view__member__instructor__section__form__element">
                        <div className='button btn-warning' onClick={() => navigate('/member/instructor/courses/sections#top', {
                            state: {
                                id: state.id,
                                title: state.title,
                                price: state.price,
                                description: state.description,
                                icon_svg: state.icon_svg,
                                status: state.status
                            }
                        })}>{`${t('cancel')} ${props.type === 'Edit' ? t('edit') : t('add')}`}</div>
                        {(loading || updateLoading) ? <LoadingComp /> : <button type="submit" className='button bg-primary'>{props.type === 'Edit' ? t('edit') : t('add')}</button>}
                    </div>
                </form>
            </section>
        </Layouts >
    )
}

export default Form