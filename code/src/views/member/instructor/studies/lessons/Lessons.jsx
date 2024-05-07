import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import { _getPageFromUrl } from '@root/utils/helper'

import './Lessons.css'
import { lessonsActions, destroyLessonActions } from '@root/redux/actions/member/instructor'

const Lessons = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { state } = location
    const { data: lessons, loading } = useSelector(state => state.lessonsData)
    const { data: success, error, loading: destroyLessonLoading } = useSelector(state => state.destroyLessonResult)

    useEffect(() => {
        if (state === null) {
            navigate('/member/instructor/courses#top')
        } else {
            dispatch(lessonsActions.init(state && state.section_id))
        }
    }, [])

    useEffect(() => {

    }, [lessons, loading])
    return (
        <Layouts>
            {(success || error) && <ModalComp title={t('delete-lesson')} close={() => {
                if (error) {
                    dispatch(destroyLessonActions.failure(null))
                } else if (success) {
                    dispatch(destroyLessonActions.success(null))
                    dispatch(lessonsActions.init(state && state.section_id))
                }
            }} content={
                error ? <>
                    <div className="badge badge-danger">{error}</div>
                </> : success && <div className="badge badge-success">{success.message}</div>
            } />}
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{state && state.section_title}</h1>
                <hr />
                <div className="view__member__instructor__lessons__buttons">
                    <div className='button btn-warning' onClick={() => navigate('/member/instructor/courses/sections#top', {
                        state: {
                            id: state && state.id,
                            title: state && state.title,
                            price: state && state.price,
                            description: state && state.description,
                            icon_svg: state && state.icon_svg,
                            status: state && state.status
                        }
                    })}>{t('back')}</div>
                    <div className='button btn-primary' onClick={() => navigate('add#top', {
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
                    })}>{t('view__member__instructor__lessons__buttons__add')}</div>
                </div>
                <hr />
                {loading ? <LoadingComp />
                    : lessons && lessons.data && lessons.data.data.length > 0 ?
                        <>
                            <div className="table-box">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>{t('title')}</th>
                                            <th>{t('view__member__instructor__lessons__form__label')}</th>
                                            <th>{t('created-at')}</th>
                                            <th>{t('updated-at')}</th>
                                            <th>{t('actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessons.data.data.map((value, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.title}</td>
                                                <td style={{ textAlign: 'center' }}>{value.order_in_section}</td>
                                                <td>{value.created_at}</td>
                                                <td>{value.updated_at}</td>
                                                <td className='view__member__instructor__lessons__buttons'>
                                                    <div className="view__member__instructor__lessons__button" onClick={() => navigate('edit#top', {
                                                        state: {
                                                            section_id: state && state.section_id,
                                                            section_title: state && state.section_title,
                                                            lesson_id: value.id,
                                                            lesson_title: value.title,
                                                            lesson_description: value.description,
                                                            lesson_code: value.code,
                                                            lesson_order_in_section: value.order_in_section,
                                                            id: state && state.id,
                                                            title: state && state.title,
                                                            price: state && state.price,
                                                            description: state && state.description,
                                                            icon_svg: state && state.icon_svg,
                                                            status: state && state.status
                                                        }
                                                    })}>{t('edit')}</div>
                                                    {destroyLessonLoading ? <LoadingComp />
                                                        : <div className="view__member__instructor__lessons__button" onClick={() => { confirm(`${t('delete-lesson')}, title: ${value.title} ?`) && dispatch(destroyLessonActions.init(value.id, state && state.section_id)) }}>{t('delete')}</div>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <PaginationComp data={lessons.data.links} onPageChange={url => lessonsActions.init(state && state.section_id, _getPageFromUrl(url))} />
                        </>
                        : <div className='badge badge-danger' style={{ placeSelf: 'center' }}>{t('no-data')}</div>}

            </section>
        </Layouts>
    )
}

export default Lessons