import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import { studentSectionsActions, updateCompletedLecturesActions, certificatesActions } from '@root/redux/actions/member/student'

const Sections = () => {
    const { t } = useTranslation()

    const [complete, setComplete] = useState(false)

    const dispatch = useDispatch()
    const { data: sections, loading, error } = useSelector(state => state.studentSectionsData)
    const { data: courseProgress, loading: courseProgressLoading, error: courseProgressError } = useSelector(state => state.courseProgressData)
    const { loading: certificatesDataLoading } = useSelector(state => state.certificatesData)

    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    useEffect(() => {
        if (state === null || state.course_id === null) {
            return navigate('/member/student/courses#top')
        } else {
            dispatch(studentSectionsActions.init(state && state.course_id))
        }

    }, [])

    useEffect(() => {
        if ((courseProgress && courseProgress.data) && (sections && sections.data)) {
            let cp = courseProgress.data.reduce((acc, obj) => obj.course_id === (state && state.course_id) ? acc + 1 : acc, 0)
            let s = sections.data.length

            if (cp === s) setComplete(true)
        }
    }, [sections, courseProgress])

    useEffect(() => {

    }, [complete, loading, error, courseProgressLoading, courseProgressError])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{state && state.course_title}</h1>
                <div dangerouslySetInnerHTML={{ __html: state && state.course_desc }}
                    style={{ overflow: 'auto' }}></div>
                <hr />
                <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/member/student/courses#top'>{t('my-courses')}</HashLink>
                <hr />
                <small>{t('view__member__student__sections__warning')}</small>
                {loading ? <LoadingComp /> :
                    complete && certificatesDataLoading ? <LoadingComp /> :
                        <div className='button bg-success' onClick={() => {
                            dispatch(updateCompletedLecturesActions.init({
                                course_id: state && state.course_id,
                                section: sections && sections.data && sections.data[sections.data.length - 1].title
                            }))
                            dispatch(updateCompletedLecturesActions.success(null))
                            dispatch(updateCompletedLecturesActions.failure(null))
                            setTimeout(() => {
                                dispatch(certificatesActions.init())
                                navigate('/member/student/certificates#top')
                            }, 1000)
                        }}>{t('download-certificate')}</div>
                }
                {loading ? <LoadingComp /> :
                    sections && sections.data.length > 0 ?
                        <div className="table-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>{t('title')}</th>
                                        <th>{t('actions')}</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sections.data.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.title}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className='text-primary' style={{ fontFamily: 'Medium', fontSize: 'var(--s)', textDecoration: 'underline' }} onClick={() => navigate('lessons#top', {
                                                    state: {
                                                        course_id: value.course_id,
                                                        course_title: value.course.title,
                                                        course_desc: value.course.description,
                                                        section_id: value.id,
                                                        section_title: value.title
                                                    }
                                                })}>{t('see')}</div></td>
                                            <td style={{ display: 'flex', justifyContent: 'center', textTransform: 'capitalize' }}><p className={`badge badge-${courseProgress && courseProgress.data[index] && courseProgress.data[index].completed_lectures && courseProgress.data[index].completed_lectures.status === 'completed' ? 'success' : 'danger'}`} style={{ fontSize: 'var(--xs)' }}>{courseProgress && courseProgress.data[index] && courseProgress.data[index].completed_lectures && courseProgress.data[index].completed_lectures.status === 'completed' ? 'completed' : 'uncompleted'}</p></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> : <div className='badge badge-warning'>{t('no-data')}</div>}
            </section>
        </Layouts >
    )
}

export default Sections