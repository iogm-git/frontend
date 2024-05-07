import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import CardCourseComp from '@root/components/common/card/CardCourseComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import MenuComp from '@root/components/member/MenuComp'

import { studentCoursesActions } from '@root/redux/actions/member/student'
import { _getPageFromUrl } from '@root/utils/helper'

const Courses = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const { data: courses, loading } = useSelector(state => state.studentCoursesData)

    useEffect(() => { }, [courses])

    return (
        <Layouts>
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{t('my-courses')}</h1>
                <hr />
                {loading ? <div className='comp__loading' style={{ placeSelf: 'center' }}><LoadingComp /></div> : courses.data.data.length > 0 ?
                    <div className="comp__layout__for__card__courses__box">
                        {courses.data.data.map((value, index) => (
                            <CardCourseComp key={index}
                                element={
                                    <>
                                        <div className='text-primary comp__card__course__button'
                                            onClick={() => navigate('sections#top', {
                                                state: {
                                                    course_id: value.course.id,
                                                    course_title: value.course.title,
                                                    course_desc: value.course.description
                                                }
                                            })}>{t('see')}</div>
                                        <div className='text-success comp__card__course__button'
                                            onClick={() => navigate('ask#top', {
                                                state: {
                                                    course_id: value.course.id,
                                                    course_title: value.course.title,
                                                }
                                            })}>{t('ask')}</div>
                                        <div className='text-warning comp__card__course__button'
                                            onClick={() => navigate('review/add#top', {
                                                state: {
                                                    course_id: value.course.id,
                                                    course_title: value.course.title,
                                                    prevUrl: '/member/student/courses#top'
                                                }
                                            })}>{t('review')}</div>
                                    </>}
                                title={value.course.title}
                                desc={value.course.description}
                                price={value.course.price}
                                level={value.course.level}
                                status={value.course.status}
                                instructor={value.course.instructor.name}
                                icon={value.course.icon_svg}
                            />
                        ))}
                    </div>
                    : <>
                        <div className='bg-gradient' style={{ '--first-gradient-color': 'var(--transgreen-color)', '--second-gradient-color': 'var(--transorange-color)' }}></div>
                        <p style={{ placeSelf: 'center', textAlign: 'center' }}>{t('view__member__student__courses__warning')}</p>
                        <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/courses#top'>{t('see-courses')}</HashLink>
                    </>}
                {loading ? <div className='comp__loading' style={{ placeSelf: 'center' }}><LoadingComp /></div>
                    : <PaginationComp data={courses.data.links} onPageChange={url => studentCoursesActions.init(_getPageFromUrl(url))} />
                }
            </section>
        </Layouts>
    )
}

export default Courses