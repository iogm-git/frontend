import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useDispatch, useSelector } from 'react-redux'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import StarComp from '@root/components/common/StarComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'


import './Reviews.css'
import { destroyStudentCoursesReviewActions } from '@root/redux/actions/member/student'
import { studentCoursesReviewsActions } from '@root/redux/actions/member/student'
import { _getPageFromUrl } from '@root/utils/helper'

const Reviews = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: reviews, loading } = useSelector(state => state.studentCourseReviewsData)
    const { data: destroySuccess, loading: destroyLoading } = useSelector(state => state.destroyStudentCourseReviewsResult)

    useEffect(() => { }, [reviews, loading, destroySuccess, destroyLoading])

    return (
        <Layouts>
            {destroySuccess &&
                <ModalComp title='Delete Course Review' close={() => { dispatch(destroyStudentCoursesReviewActions.success(null)); dispatch(studentCoursesReviewsActions.init()) }}
                    content={<div className='badge badge-success'>{destroySuccess.message}</div>} />
            }
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{t('my-reviews')}</h1>
                <hr />
                {loading ? <LoadingComp /> :
                    reviews.data.data.length > 0 ?
                        <div className='view__member__student__reviews__container'>
                            {reviews.data.data.map((value, index) => (
                                <div className='view__member__student__reviews__card' key={index}>
                                    <div className='view__member__studnet__reviews__card__heading'>
                                        <div className='view__member__studnet__reviews__card__index'>{index + 1}</div>
                                        <div className='view__member__studnet__reviews__card__date'>{value.created_at}</div>
                                    </div>
                                    <div className='view__member__studnet__reviews__card__title'>{value.course.title}</div>
                                    <div className='view__member__student__reviews__card__review' dangerouslySetInnerHTML={{ __html: value.review }}></div>
                                    <div className='view__member__student__reviews__card__rating'><StarComp rating={value.rating} useForm={false} /></div>
                                    <hr />
                                    <div className="view__member__student__reviews__card__buttons">
                                        <div className="view__member__student__reviews__card__button text-warning"
                                            onClick={() => navigate('edit#top', {
                                                state: {
                                                    course_id: value.course.id,
                                                    course_title: value.course.title,
                                                    prevUrl: '/member/student/reviews#top',
                                                    review: value.review,
                                                    rating: value.rating
                                                }
                                            })}>
                                            {t('edit')}
                                        </div>
                                        {destroyLoading ? <LoadingComp /> :
                                            <div className="view__member__student__reviews__card__button text-danger" onClick={() => confirm(`${t('delete-review')} : ${value.course.title} ? `) && dispatch(destroyStudentCoursesReviewActions.init(value.course.id))}>
                                                {t('delete')}
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <>
                            <div className='bg-gradient' style={{ '--first-gradient-color': 'var(--transred-color)', '--second-gradient-color': 'var(--transgreen-color)' }}></div>
                            <p style={{ placeSelf: 'center', textAlign: 'center' }}>{t('view__member__student__reviews__warning')}</p>
                            <HashLink style={{ placeSelf: 'center' }} className='button btn-primary' smooth to='/member/student/courses#top'>{t('my-courses')}</HashLink>
                        </>
                }
                {loading ? <LoadingComp /> :
                    <PaginationComp data={reviews.data.links} onPageChange={url => studentCoursesReviewsActions.init(_getPageFromUrl(url))} />
                }
            </section>
        </Layouts >
    )
}

export default Reviews