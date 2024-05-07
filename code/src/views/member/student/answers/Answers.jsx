import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import './Answers.css'
import { useDispatch, useSelector } from 'react-redux'

import { answersActions } from '@root/redux/actions/member/student'
import { _getPageFromUrl } from '@root/utils/helper'

const Answers = () => {
    const { t } = useTranslation()

    const [filter, setFilter] = useState('new')
    const [category, setCategory] = useState('all')

    const dispatch = useDispatch()

    const { data: answers, loading } = useSelector(state => state.answersData)

    useEffect(() => { }, [answers])

    return (
        <Layouts>
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{t('my-answers')}</h1>
                <hr />
                {loading ? <LoadingComp />
                    : answers.data && answers.data.answers.data.length > 0 ?
                        <>
                            <small>{t('categories')}</small>
                            <div className="view__member__student__answers__filters">
                                <div className={`view__member__student__answers__category ${category === 'all' ? 'active' : ''}`} onClick={() => {
                                    dispatch(answersActions.init('all', filter))
                                    setCategory('all')
                                }}>{t('all')}</div>
                                {loading ? <LoadingComp /> : answers.data.categories.map((value, index) => (
                                    <div className={`view__member__student__answers__category ${category === value ? 'active' : ''}`} key={index} onClick={() => {
                                        dispatch(answersActions.init(value, filter))
                                        setCategory(value)
                                    }}>{value}</div>
                                ))}
                            </div>
                            <hr />
                            <small>{t('filter')}</small>
                            <div className="view__member__student__answers__filters">
                                <div className={`view__member__student__answers__category ${filter === 'new' ? 'active' : ''}`} onClick={() => {
                                    dispatch(answersActions.init(category, 'new'))
                                    setFilter('new')
                                }}>{t('new')}</div>
                                <div className={`view__member__student__answers__category ${filter === 'old' ? 'active' : ''}`} onClick={() => {
                                    dispatch(answersActions.init(category, 'old'))
                                    setFilter('old')
                                }}>{t('old')}</div>
                            </div>
                            <hr />
                            <div className="view__member__student__answers__container">
                                {answers.data.answers.data.map((value, index) => (
                                    <div className="view__member__student__question__card" key={index}>
                                        <div className="view__member__student__question__key">{t('course')}</div>
                                        <div className="view__member__student__question__value">{value.title}</div>
                                        <div className="view__member__student__question__key">{t('instructor')}</div>
                                        <div className="view__member__student__question__value">{value.name}</div>
                                        <div className="view__member__student__question__key">{t('created-at')}</div>
                                        <div className="view__member__student__question__value">{value.created_at}</div>
                                        <div className="view__member__student__question__key">{t('question')}</div>
                                        <div className="view__member__student__question__value" dangerouslySetInnerHTML={{ __html: value.question }}></div>
                                        <div className="view__member__student__question__key">{t('answer')}</div>
                                        {value.answer ? <div className="view__member__student__question__value" dangerouslySetInnerHTML={{ __html: value.answer }}></div> : <div className='badge badge-warning'>{t('view__member__student__question__value')}</div>}
                                    </div>
                                ))}
                            </div>
                        </>
                        : <>
                            <div className='bg-gradient' style={{ '--first-gradient-color': 'var(--transred-color)', '--second-gradient-color': 'var(--transgreen-color)' }}></div>
                            <p style={{ placeSelf: 'center', textAlign: 'center' }}>{t('view__member__student__question__warning')}</p>
                            <HashLink style={{ placeSelf: 'center' }} className='button btn-primary' smooth to='/member/student/courses#top'>{t('my-courses')}</HashLink>
                        </>}

                {loading ? <LoadingComp /> :
                    <PaginationComp data={answers.data.answers.links} onPageChange={url => answersActions.init(category, filter, _getPageFromUrl(url))} />}
            </section>
        </Layouts>
    )
}

export default Answers