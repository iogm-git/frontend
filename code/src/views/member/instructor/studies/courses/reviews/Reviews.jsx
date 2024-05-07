import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import StarComp from '@root/components/common/StarComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import { courseReviewsActions } from '@root/redux/actions/member/instructor'

import './Reviews.css'

const Reviews = () => {
    const { t } = useTranslation()

    const { data: course_reviews, loading } = useSelector(state => state.courseReviewsData)

    useEffect(() => { }, [course_reviews, loading])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{t('course-reviews')}</h1>
                <hr />
                {loading ? <LoadingComp /> : course_reviews.data.data.length > 0 ?
                    <>
                        <div className="view__member__instructor__reviews__container">
                            {course_reviews.data.data.map((value, index) => (
                                <div className="view__member__instructor__review__card" key={index}>
                                    <div className="view__member__instructor__reviews__name">{value.student.name}</div>
                                    <div className="view__member__instructor__reviews__course">{value.course.title}</div>
                                    <div className="view__member__instructor__reviews__text" dangerouslySetInnerHTML={{ __html: value.review }}></div>
                                    <div className="view__member__instructor__reviews__rating"><StarComp rating={value.rating} useForm={false} /></div>
                                    <div className='view__member__instructor__reviews__date'>{value.created_at}</div>
                                </div>
                            ))}
                        </div>
                        <PaginationComp data={course_reviews.data.links} onPageChange={url => courseReviewsActions.init(_getPageFromUrl(url))} />
                    </>
                    : <div className='badge badge-danger' style={{ placeSelf: 'center' }}>{t('no-data')}</div>}
            </section>
        </Layouts>
    )
}

export default Reviews