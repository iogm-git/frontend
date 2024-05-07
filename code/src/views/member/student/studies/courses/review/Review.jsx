import React, { useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import SvgComp from '@root/components/common/SvgComp'
import StarComp from '@root/components/common/StarComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import InputTextareaComp from '@root/components/common/form/InputTextareaComp'
import MenuComp from '@root/components/member/MenuComp'

import './Review.css'
import { useForm } from '@root/hooks/form'

import { studentCoursesReviewsActions, storeStudentCoursesReviewActions, updateStudentCoursesReviewActions } from '@root/redux/actions/member/student'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const Review = (props) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.storeStudentCourseReviewResult)
    const { data: updateSuccess, updateLoading, error: updateError } = useSelector(state => state.updateStudentCourseReviewResult)

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    const initialState = {
        course_id: state && 'course_id' in state ? state.course_id : '',
        review: state && 'review' in state ? state.review : '',
        rating: ''
    }

    const { handleCustomChange, handleSubmit, formData } = useForm(initialState)

    useEffect(() => {
        if (state === null) {
            return navigate('/member/student/courses#top')
        }
    }, [])

    useEffect(() => {

    }, [state, success, updateSuccess, loading, updateLoading, error, updateError])

    return (
        <Layouts>
            {(success || updateSuccess) &&
                <ModalComp
                    title={`${props.type === 'add' ? t('add') : t('edit')} ${t('course-reviews')}`}
                    close={() => {
                        dispatch(storeStudentCoursesReviewActions.success(null))
                        dispatch(updateStudentCoursesReviewActions.success(null))
                        dispatch(studentCoursesReviewsActions.init())
                    }}
                    content={
                        <>
                            <div className="badge badge-success">{props.type === 'add' ? success.message : updateSuccess.message}</div>
                            <HashLink
                                smooth
                                to='/member/student/reviews#top'
                                className='button bg-primary'
                                onClick={() => {
                                    dispatch(storeStudentCoursesReviewActions.success(null))
                                    dispatch(updateStudentCoursesReviewActions.success(null))
                                    dispatch(studentCoursesReviewsActions.init())
                                }}>
                                {t('see-my-reviews')}
                            </HashLink>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className='section-title'>{t('review-course')} : {state && state.course_title}</h1>
                <hr />
                <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to={state && state.prevUrl}>{t('back')}</HashLink>
                <hr />
                <form className='view__member__student__studies__courses__review__form' onSubmit={e => {
                    handleSubmit(e, props.type === 'add' ? dispatch(storeStudentCoursesReviewActions.init(formData)) : dispatch(updateStudentCoursesReviewActions.init(formData)))
                }}>
                    <div className='view__member__student__studies__courses__review__formel'>
                        <label htmlFor="title" className='view__member__student__studies__courses__review__formel__label'>{t('title')}</label>
                        <input defaultValue={state && state.course_title} type="text" id='title' disabled />
                    </div>
                    <div className='view__member__student__studies__courses__review__formel'>
                        <label htmlFor="title" className='view__member__student__studies__courses__review__formel__label'>{t('my-reviews')}</label>
                        <InputTextareaComp oldValue={initialState.review} handleInputOnChange={value => handleCustomChange(value, 'review')} />
                        {error && error.review && <p className='text-error-msg'>{error.review[0]}</p>}
                        {updateError && updateError.review && <p className='text-error-msg'>{updateError.review[0]}</p>}
                    </div>
                    <div className='view__member__student__studies__courses__review__formel'>
                        <div className='view__member__student__studies__courses__review__formel__label'>Rating</div>
                        <hr />
                        {props.type === 'add' ?
                            <>
                                <small>{t('new-rating')}</small>
                                <div className="view__member__student__studies__courses__review__rating">
                                    <StarComp rating={0} handleInputOnChange={value => handleCustomChange(value, 'rating')} />
                                </div>
                            </> :
                            <>
                                <small>{t('old-rating')}</small>
                                <div className="view__member__student__studies__courses__review__rating">
                                    <StarComp rating={state && state.rating ? state.rating : 0} useForm={false} />
                                </div>

                                <small>{t('new-rating')}</small>
                                <div className="view__member__student__studies__courses__review__rating">
                                    <StarComp rating={0} handleInputOnChange={value => handleCustomChange(value, 'rating')} />
                                </div>
                                <hr />
                            </>}
                        {error && error.rating && <p className='text-error-msg'>{error.rating[0]}</p>}
                        {updateError && updateError.rating && <p className='text-error-msg'>{updateError.rating[0]}</p>}
                    </div>
                    {loading ? <LoadingComp /> : <button type='submit' className='button bg-primary'>Submit</button>}
                    {error && !error.rating && !error.review &&
                        <div className='badge badge-close badge-danger'>
                            <p>{error}</p>
                            <div className='badge-button-close' onClick={() => dispatch(storeStudentCoursesReviewActions.failure(null))}>
                                <SvgComp path='svg' file='common' icon='close' />
                            </div>
                        </div>}
                </form>
            </section>
        </Layouts>
    )
}

export default Review