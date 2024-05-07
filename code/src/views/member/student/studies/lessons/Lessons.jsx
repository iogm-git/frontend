import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import HighlightJsComp from '@root/components/common/code-block/HighlightJsComp';
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import MenuComp from '@root/components/member/MenuComp'
import Navigation from '@root/components/member/student/navigation/Navigation';
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import {
    studentLessonsActions,
    courseProgressActions,
    certificatesActions,
    updateCompletedLecturesActions
} from '@root/redux/actions/member/student'

import './Lessons.css'

import { _getPageFromUrl } from '@root/utils/helper';

const Lessons = () => {
    const { t } = useTranslation()

    const [course, setCourse] = useState(null)
    const [lessonsData, setLessons] = useState(null)

    // const [prev, setPrev] = useState({ index: 0, anchor: '' })
    // const [next, setNext] = useState({ index: 1, anchor: '' })

    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    const dispatch = useDispatch()
    const { data: lessons, loading, error } = useSelector(state => state.studentLessonsData);
    const { data: courseProgress } = useSelector(state => state.courseProgressData);
    const { data: updateCompletedLecturesSuccess, loading: updateCompletedLecturesLoading } = useSelector(state => state.updateCompletedLecturesResult);

    // const setAnchor = (index) => {
    //     let len = lessonsData && lessonsData.length - 1
    //     if (len > 0) {
    //         if (index > 0) {
    //             if (next.index + index < len) {
    //                 if (next.index === index) {
    //                     setPrev(value => ({ ...value, index: 0, anchor: lessonsData[0].title }))
    //                 } else {
    //                     setPrev(value => ({ ...value, index: value.index + index, anchor: lessonsData[value.index + index].title }))
    //                 }
    //                 setNext(value => ({ ...value, index: value.index + index, anchor: lessonsData[value.index + index].title }))
    //             } else {
    //                 setPrev(value => ({ ...value, index: len - 1, anchor: lessonsData[len - 1].title }))
    //                 setNext(value => ({ ...value, index: len, anchor: lessonsData[len].title }))
    //             }
    //         } else if (index < 0) {
    //             if (prev.index + index < 0) {
    //                 setPrev(value => ({ ...value, index: 0, anchor: lessonsData[0].title }))
    //                 setNext(value => ({ ...value, index: 1, anchor: lessonsData[1].title }))
    //             } else {
    //                 if (prev.index === len - 1) {
    //                     setNext(value => ({ ...value, index: len, anchor: lessonsData[len].title }))
    //                 } else {
    //                     setNext(value => ({ ...value, index: value.index + index, anchor: lessonsData[value.index + index].title }))
    //                 }
    //                 setPrev(value => ({ ...value, index: value.index + index, anchor: lessonsData[value.index + index].title }))
    //             }
    //         }
    //     }
    // }

    useEffect(() => {
        if (state === null || state && state.course_id === null) {
            navigate('/member/student/courses#top')
        } else {
            dispatch(studentLessonsActions.init(state && state.course_id, state && state.section_id))
        }
    }, [])

    useEffect(() => {
        if (lessons && lessons.data && lessons.data.data && lessons.data.data.length > 0) {
            setLessons(lessons.data.data)
            // setPrev(val => ({ ...val, anchor: lessons.data.data[prev.index].title }))
            // setNext(val => ({ ...val, anchor: lessons.data.data[next.index].title }))
        }
    }, [lessons, loading, error]);

    useEffect(() => {
    }, [
        // prev, next, 
        courseProgress, updateCompletedLecturesSuccess])

    useEffect(() => {
        if (course === null) {
            setCourse({
                course_id: state && state.course_id,
                course_title: state && state.course_title,
                course_desc: state && state.course_desc,
                section_id: state && state.section_id,
                section_title: state && state.section_title
            })
        }
    }, [state])

    return (
        <Layouts>
            <Navigation sections={lessonsData && lessonsData}
            // handleOnChange={(prev, next) => {
            //     setPrev(val => ({ ...val, index: prev, anchor: lessonsData && lessonsData[prev].title }))
            //     setNext(val => ({ ...val, index: next, anchor: lessonsData && lessonsData[next].title }))
            // }}
            />
            <MenuComp />
            {updateCompletedLecturesSuccess && <ModalComp title={t('finished-lectures')} close={() => dispatch(updateCompletedLecturesActions.success(null))} content={
                <>
                    <div className='badge badge-success'>{updateCompletedLecturesSuccess && updateCompletedLecturesSuccess.message}</div>
                    {updateCompletedLecturesSuccess && updateCompletedLecturesSuccess.message && updateCompletedLecturesSuccess.message.includes('certificate') ?
                        <HashLink className='button bg-primary' smooth to='/member/student/certificates#top' onClick={() => { dispatch(certificatesActions.init()); dispatch(courseProgressActions.init()); }}>{t('see-my-certificates')}</HashLink> :
                        <div className='button bg-primary' onClick={() => {
                            navigate('/member/student/courses/sections#top', {
                                state: {
                                    course_id: course && course.course_id,
                                    course_title: course && course.course_title,
                                    course_description: course && course.course_desc
                                }
                            }); dispatch(courseProgressActions.init()); dispatch(updateCompletedLecturesActions.success(null))
                        }}>{t('see-my-progress')}</div>
                    }
                </>
            } />}
            <section className='view__layout__member grid-custom view__member__student__studies__lessons'>
                <div className='view__member__student__studies__lessons__title'>
                    <div className='button btn-primary' onClick={() => {
                        navigate('/member/student/courses/sections#top', {
                            state: {
                                course_id: course && course.course_id,
                                course_title: course && course.course_title,
                                course_description: course && course.course_desc
                            }
                        });
                    }}>{t('back')}</div>
                    <h1 className="section-title">{course && course.section_title}</h1>
                </div>
                <hr />
                <p style={{ textAlign: 'center', placeSelf: 'center' }}>
                    {t('view__member__student__lesson__warning')}</p>
                {/* <hr /> */}
                {/* <div className="view__member__student__studies__lessons__buttons__scroll">
                    <HashLink className='button bg-primary' smooth to={`#${prev.anchor}`} onClick={() => setAnchor(-1)}>
                        Previous
                    </HashLink>
                    <HashLink className='button bg-primary' smooth to={`#${next.anchor}`} onClick={() => setAnchor(1)}>
                        Next
                    </HashLink>
                </div> */}
                {loading ? <LoadingComp /> :
                    lessonsData && lessonsData.length > 0 ?
                        <div className='view__member__student__studies__lessons__container'>
                            {lessonsData.map((value, index) => (
                                <div key={index} id={value.title} className='view__member__student__studies__lessons__content'>
                                    <div className="view__member__student__studies__lessons__box">
                                        <h2 className='view__member__student__studies__lessons__box__title'>{value.title}</h2>
                                        <p className='view__member__student__studies__lessons__box__description'>{value.description}</p>
                                        <HighlightJsComp code={value.code} language={value.section.course.icon_svg} />
                                    </div>
                                </div>))}
                        </div>
                        : <div className='badge badge-warning'>{t('no-data')}</div>
                }
                {loading ? <LoadingComp />
                    : <PaginationComp data={lessonsData && lessons.data.links} onPageChange={(url) => studentLessonsActions.init(course && course.course_id, course && course.section_id, _getPageFromUrl(url))} />
                }
                {loading ? <LoadingComp /> : lessonsData &&
                    lessons.data.current_page === lessons.data.last_page && (updateCompletedLecturesLoading ? <div className='comp__loading'><LoadingComp /></div> :
                        <div className='button bg-success' onClick={() => dispatch(updateCompletedLecturesActions.init({ course_id: course && course.course_id, section: course && course.section_title }))}>{t('finish')}</div>
                    )}
            </section>
        </Layouts>
    )
}

export default Lessons