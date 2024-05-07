import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import MenuComp from '@root/components/member/MenuComp'
import AnswerComp from '@root/components/member/card/AnswerComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'
import Layouts from '@root/views/Layouts'

import './Questions.css'
import { questionsActions } from '@root/redux/actions/member/instructor'

import { _getPageFromUrl } from '@root/utils/helper'

const Questions = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const { data: questions, loading } = useSelector(state => state.questionsData)
    const [filter, setFilter] = useState('latest')

    useEffect(() => { }, [questions, loading])

    return (
        <Layouts>
            <MenuComp />
            <section className="view__layout__member">
                <h1 className='section-title'>{t('my-questions')}</h1>
                <hr />
                <div className="view__member__instructor__questions__heading">
                    <div className="view__member__instructor__questions__categories comp__loading">
                        {loading ? <LoadingComp /> :
                            questions && questions.data && questions.data.categories.map((value, index) => (
                                <div className="badge badge-primary view__member__instructor__questions__category" key={index}
                                    onClick={() => dispatch(questionsActions.init(value))}>{value}</div>
                            ))}
                    </div>
                    <div className="view__member__instructor__questions__filter">
                        <div className={`view__member__instructor__questions__filter__option ${filter === 'old' ? 'active' : ''}`}
                            onClick={() => { setFilter('old'); dispatch(questionsActions.init('', filter)) }}>{t('old')}</div>/
                        <div className={`view__member__instructor__questions__filter__option ${filter === 'latest' ? 'active' : ''}`}
                            onClick={() => { setFilter('latest'); dispatch(questionsActions.init('', filter)) }}>{t('new')}</div>
                    </div>
                </div>
                {loading ? <LoadingComp />
                    : questions && questions.data && questions.data.questions
                        && questions.data.questions.data.length > 0 ?
                        <>
                            <div className="view__member__instructor__questions__body comp__loading">
                                {questions.data.questions.data.map((value, index) => (
                                    <AnswerComp
                                        key={index}
                                        index={index + 1}
                                        id={value.id}
                                        createdAt={value.created_at}
                                        questionName={value.student.name}
                                        questionId={value.question_id}
                                        question={value.question}
                                        answer={value.answer}
                                        iconSvg={value.course.icon_svg}
                                    />
                                ))}
                            </div>

                            <PaginationComp data={questions.data.questions.links} onPageChange={url => questionsActions.init('', 'latest', _getPageFromUrl(url))} />

                        </>
                        : <div className='badge badge-danger' style={{ placeSelf: 'center' }}>{t('no-data')}</div>}
                <hr />
                <HashLink smooth to='#top' className='button btn-primary' style={{ placeSelf: 'center' }}>{t('go-top')}</HashLink>
            </section>
        </Layouts>
    )
}

export default Questions