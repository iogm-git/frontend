import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import CardCourseComp from '@root/components/common/card/CardCourseComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'
import ModalComp from '@root/components/common/ModalComp'

import { studiesActions, destroyCourseActions } from '@root/redux/actions/member/instructor'

import './Courses.css'
import { _getPageFromUrl } from '@root/utils/helper'

const Course = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: studies, loading } = useSelector(state => state.studiesData)
    const { data: success, error, loading: destroyCourseLoading } = useSelector(state => state.destroyCourseResult)

    const [filter, setFilter] = useState('old')

    useEffect(() => { }, [studies, success, error, destroyCourseLoading])

    return (
        <Layouts>
            {(success || error) && <ModalComp title={t('delete-course')} close={() => {
                if (error) {
                    dispatch(destroyCourseActions.failure(null))
                } else if (success) {
                    dispatch(destroyCourseActions.success(null))
                    dispatch(studiesActions.init(undefined, filter))
                }
            }} content={
                error ? <>
                    <div className="badge badge-danger">{error}</div>
                </> : success && <div className="badge badge-success">{success.message}</div>
            } />}
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{t('my-courses')}</h1>
                <hr />
                <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/member/instructor/courses/add#top'>{t('view__member__instructor__studies__courses__add__new')}</HashLink>
                <hr />
                <div className='view__member__instructor__studies__courses__filter'>
                    {loading ? <LoadingComp /> :
                        <>
                            <div className={`view__member__instructor__studies__courses__filter__button ${filter === 'new' ? 'active' : ''}`} onClick={() => {
                                setFilter('new')
                                dispatch(studiesActions.init(undefined, 'new'))
                            }}>
                                {t('new')}
                            </div>
                            <div className={`view__member__instructor__studies__courses__filter__button ${filter === 'old' ? 'active' : ''}`} onClick={() => {
                                setFilter('old')
                                dispatch(studiesActions.init(undefined, 'old'))
                            }}>
                                {t('old')}
                            </div></>
                    }
                </div>
                {loading ? <LoadingComp /> : studies && studies.data && studies.data.data.length > 0 ?
                    <>
                        <div className="comp__layout__for__card__courses__box">
                            {studies.data.data.map((value, index) => (
                                <CardCourseComp key={index} element={
                                    <>
                                        <div className='comp__card__course__button text-primary' onClick={() => navigate('/member/instructor/courses/sections#top', {
                                            state: {
                                                id: value.id,
                                                title: value.title,
                                                price: value.price,
                                                description: value.description,
                                                icon_svg: value.icon_svg,
                                                level: value.level,
                                                status: value.status
                                            }
                                        })}>{t('see-section')}</div>
                                        <div className="comp__card__course__button text-warning" onClick={() => navigate('/member/instructor/courses/edit', {
                                            state: {
                                                id: value.id,
                                                title: value.title,
                                                price: value.price,
                                                description: value.description,
                                                icon_svg: value.icon_svg,
                                                level: value.level,
                                                status: value.status
                                            }
                                        })}>{t('edit')}</div>
                                        {destroyCourseLoading ? <LoadingComp /> : <div className="comp__card__course__button text-danger" onClick={() => { confirm(`${t('delete-course')}, title: ${value.title} ?`) && dispatch(destroyCourseActions.init(value.id)) }}>{t('delete')}</div>}
                                    </>
                                } title={value.title} desc={value.description} price={value.price} level={value.level} status={value.status} instructor={value.instructor.name} icon={value.icon_svg} />
                            ))}
                        </div>
                        {loading ? <LoadingComp /> : <PaginationComp data={studies.data.links} onPageChange={url => studiesActions.init(_getPageFromUrl(url), filter)} />}
                    </>
                    : <div className="badge badge-danger" style={{ placeSelf: 'center' }}>{t('no-data')}</div>}
            </section>
        </Layouts>
    )
}

export default Course