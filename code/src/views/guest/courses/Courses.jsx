import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'
import CardCourseComp from '@root/components/common/card/CardCourseComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import { coursesActions } from '@root/redux/actions/guest'
import { transactionsActions, storeTransactionActions, storeTransactionFreeActions, studentCoursesActions, storeStashActions } from '@root/redux/actions/member/student'

import './Courses.css'

const Course = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const [isModal, setModal] = useState({ show: false })
    const [category, setCategory] = useState('all')
    const [filter, setFilter] = useState('all')
    const [instructor, setInstructor] = useState({ show: false, username: '', name: '' })

    const { data, loading } = useSelector(state => state.coursesData)
    const { data: user, loading: userLoading } = useSelector(state => state.userData)
    const { data: success, loading: transactionLoading, error } = useSelector(state => state.storeTransactionResult)
    const { data: transactionFreeSuccess, loading: transactionFreeLoading, error: transactionFreeError } = useSelector(state => state.storeTransactionFreeResult)
    const { data: stashSuccess, loading: stashLoading, error: stashError } = useSelector(state => state.storeStashResult)

    const coursesData = data && data.data;

    const { courses, course_categories, instructors } = coursesData || {};

    useEffect(() => {
        dispatch(coursesActions.init());
    }, []);

    useEffect(() => {

    }, [data, user, success, error, transactionLoading, transactionFreeSuccess, transactionFreeLoading, transactionFreeError, stashLoading, stashError])

    return (
        <Layouts>
            <div className='bg-gradient view__guest__courses__background'></div>
            {isModal.show &&
                <ModalComp close={() => setModal({ show: false })} title={isModal.title} content={isModal.content} />
            }
            {(success || error) &&
                <ModalComp
                    close={() => {
                        success ? dispatch(storeTransactionActions.success(null)) : dispatch(storeTransactionActions.failure(null))
                        dispatch(transactionsActions.init())
                    }}
                    title={t('transactions')}
                    content={
                        <>
                            <div className={`badge badge-${success ? 'success' : 'warning'}`}>{success ? success.message : error}</div>
                            {!error && <HashLink smooth to='/member/student/transactions#top' className='button bg-primary'
                                onClick={() => {
                                    success ? dispatch(storeTransactionActions.success(null)) : dispatch(storeTransactionActions.failure(null))
                                    dispatch(transactionsActions.init())
                                }}>{t('see-my-transactions')}</HashLink>
                            }
                        </>
                    }
                />
            }
            {(stashSuccess || stashError) &&
                <ModalComp
                    close={() => {
                        stashSuccess ? dispatch(storeStashActions.success(null)) : dispatch(storeStashActions.failure(null))
                        dispatch(stashesActions.init())
                    }}
                    title={t('transactions')}
                    content={
                        <>
                            <div className={`badge badge-${stashSuccess ? 'success' : 'warning'}`}>{stashSuccess ? stashSuccess.message : stashError}</div>
                            {!stashError && <HashLink smooth to='/member/student/stash#top' className='button bg-primary'
                                onClick={() => {
                                    stashSuccess ? dispatch(storeStashActions.success(null)) : dispatch(storeStashActions.failure(null))
                                    dispatch(stashesActions.init())
                                }}>{t('see-my-stashes')}</HashLink>
                            }
                        </>
                    }
                />
            }
            {(transactionFreeSuccess || transactionFreeError) &&
                <ModalComp
                    close={() => {
                        transactionFreeSuccess ? dispatch(storeTransactionFreeActions.success(null)) : dispatch(storeTransactionFreeActions.failure(null))
                        dispatch(transactionsActions.init())
                    }}
                    title={t('free-course')}
                    content={
                        <>
                            <div className={`badge badge-${transactionFreeSuccess ? 'success' : 'warning'}`}>{transactionFreeSuccess ? transactionFreeSuccess.message : transactionFreeError}</div>
                            <HashLink smooth to='/member/student/courses#top' className='button bg-primary'
                                onClick={() => {
                                    transactionFreeSuccess ? dispatch(storeTransactionFreeActions.success(null)) : dispatch(storeTransactionFreeActions.failure(null))
                                    dispatch(transactionsActions.init())
                                    dispatch(studentCoursesActions.init())
                                }}>{t('see-my-courses')}</HashLink>
                        </>
                    }
                />
            }
            <section className='grid-custom'>
                <h1 className='section-title' style={{ textShadow: '3px 4px 7px var(--transblue-color)' }}>{t('courses')}</h1>
                <div className='view__guest__courses__search__input'>
                    <input
                        type="text"
                        placeholder='Search..'
                        className='view__guest__courses__search__input__form'
                        onChange={event => {
                            dispatch(coursesActions.init(event.target.value, filter, instructor.username))
                            setCategory(event.target.value)
                        }} />
                    <SvgComp rule='svg-l view__guest__courses__search__input__svg' path='svg' file='common' icon='search' />
                </div>
                <div className="view__guest__courses__categories">
                    <div className={`view__guest__courses__category ${category == 'all' ? 'active' : ''}`} onClick={() => { dispatch(coursesActions.init('all', filter, instructor.username)); setCategory('all') }}>{t('all')}</div>
                    {loading ? <LoadingComp /> :
                        course_categories && course_categories.map((value, index) => (
                            <div className={`view__guest__courses__category ${category == value.icon_svg ? 'active' : ''}`} key={index} onClick={() => { dispatch(coursesActions.init(value.icon_svg, filter, instructor.username)); setCategory(value.icon_svg) }}>
                                {value.icon_svg == 'cpp' ? 'c++' : value.icon_svg}
                            </div>
                        ))}
                </div>
                <div className="view__guest__courses__strain">
                    <div className="view__guest__courses__filters">
                        <p className='view__guest__courses__filters__title'>{t('filter')}</p>
                        <div className="view__guest__courses__filters__box">
                            {loading ? <LoadingComp /> : <>
                                <div className={`view__guest__courses__filter ${filter === 'all' ? 'active' : ''}`} onClick={() => {
                                    dispatch(coursesActions.init(category, 'all', instructor.username))
                                    setFilter('all')
                                }}>{t('all')}</div>
                                <div className={`view__guest__courses__filter ${filter === 'free' ? 'active' : ''}`} onClick={() => {
                                    dispatch(coursesActions.init(category, 'free', instructor.username))
                                    setFilter('free')
                                }}>{t('free')}</div>
                                <div className={`view__guest__courses__filter ${filter === 'paid' ? 'active' : ''}`} onClick={() => {
                                    dispatch(coursesActions.init(category, 'paid', instructor.username))
                                    setFilter('paid')
                                }}>{t('paid')}</div>
                            </>}
                        </div>
                    </div>
                    <div className="view__guest__courses__instructors">
                        <p className='view__guest__courses__instructors__title'>{t('instructor')}</p>
                        {loading ? <LoadingComp /> : <div className={`view__guest__courses__instructors__label ${instructor.username !== '' ? 'active' : ''}`} onClick={() => setInstructor(prev => ({ ...prev, show: !prev.show }))}>
                            <p>{instructor.name === '' ? t('select') : instructor.name}</p>
                            <SvgComp rule='svg-m' path='svg' file='common' icon='click' />
                        </div>}
                        {instructor.show &&
                            <div className='view__guest__courses__instructors__box'>
                                <div className="view__guest__courses__instructors__div">
                                    <div className="view__guest__courses__instructors__close" onClick={() => setInstructor(prev => ({ ...prev, show: !prev.show }))}>
                                        <SvgComp rule='svg-s' path='svg' file='common' icon='close' />
                                    </div>
                                    <div className={`view__guest__courses__instructor ${instructor.username === 'all' ? 'active' : ''}`} onClick={() => {
                                        dispatch(coursesActions.init(category, filter, 'all'))
                                        setInstructor(prev => ({ ...prev, username: 'all', name: 'All', show: !prev.show }))
                                    }}>All</div>
                                    {instructors && instructors.map((value, index) => (
                                        <div className={`view__guest__courses__instructor ${instructor.username === value.name ? 'active' : ''}`} key={index} onClick={() => {
                                            dispatch(coursesActions.init(category, filter, value.username))
                                            setInstructor(prev => ({ ...prev, username: value.username, name: value.name, show: !prev.show }))
                                        }}>{value.name}</div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="comp__layout__for__card__courses__box">
                    {loading ? <LoadingComp /> : courses && courses.data && courses.data.length > 0 ? courses.data.map((course, index) => (
                        <CardCourseComp key={index} title={course.title} desc={course.description} price={course.price} level={course.level} status={course.status} icon={course.icon_svg} instructor={course.instructor.name}
                            element={
                                userLoading ? <LoadingComp /> : user && ('role' in user) ?
                                    user.role === 'student' && (transactionLoading || stashLoading) ? <LoadingComp />
                                        : <>
                                            {course.status === 'public' ?
                                                transactionFreeLoading ? <LoadingComp /> : <div className='text-primary comp__card__course__button' onClick={() => dispatch(storeTransactionFreeActions.init({ course_id: course.id }))}>{t('see-now')}</div>
                                                : <div className='text-primary comp__card__course__button' onClick={() => dispatch(storeTransactionActions.init({ course_id: course.id }))}>{t('buy')}</div>}
                                            <div className='text-warning comp__card__course__button' onClick={() => dispatch(storeStashActions.init({ course_id: course.id }))}>{t('save')}</div>
                                        </>
                                    : <>
                                        <div className='text-primary comp__card__course__button' onClick={() => setModal({
                                            show: true, title: 'Status User', content:
                                                <>
                                                    <p>{t('warning-not-yet-joined-as-a-member')}</p>
                                                    <a className='button bg-primary' href={import.meta.env.VITE_APP_URL_USER + '/member/setting/code/register'}>{t('go-register')}</a>
                                                </>
                                        })}>{course.status === 'public' ? t('see-now') : t('buy')}</div>
                                        <div className='text-success comp__card__course__button' onClick={() => setModal({
                                            show: true, title: 'Status User', content:
                                                <>
                                                    <p>{t('warning-not-yet-joined-as-a-member')}</p>
                                                    <a className='button bg-primary' href={import.meta.env.VITE_APP_URL_USER + '/member/setting/code/register'}>{t('go-register')}</a>
                                                </>
                                        })}>{t('save')}</div>
                                    </>
                            }
                        />
                    )) : <div className='badge badge-danger' style={{ placeSelf: 'center' }}>{t('course-not-found')}</div>}
                </div>
                {loading ? <LoadingComp /> :
                    <PaginationComp data={courses && courses.links} onPageChange={(url) => coursesActions.init('', filter, instructor.username, url)} />
                }
            </section>
        </Layouts>
    );
};

export default Course;
