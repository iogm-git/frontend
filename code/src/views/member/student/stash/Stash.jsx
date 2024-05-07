import React, { useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'
import MenuComp from '@root/components/member/MenuComp'
import CardCourseComp from '@root/components/common/card/CardCourseComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import { stashesActions, destroyStashActions } from '@root/redux/actions/member/student'
import { transactionsActions, storeTransactionActions, storeTransactionFreeActions, studentCoursesActions } from '@root/redux/actions/member/student'

import { _getPageFromUrl } from '@root/utils/helper'

const Stash = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const { data: stashes, loading } = useSelector(state => state.stashesData)
    const { data: destroyStashSuccess, loading: destroyStashLoading, error } = useSelector(state => state.destroyStashResult)
    const { data: transactionSuccess, loading: transactionLoading, error: transactionError } = useSelector(state => state.storeTransactionResult)
    const { data: transactionFreeSuccess, loading: transactionFreeLoading, error: transactionFreeError } = useSelector(state => state.storeTransactionFreeResult)

    useEffect(() => { }, [stashes, loading, destroyStashSuccess, destroyStashLoading, error])

    return (
        <Layouts>
            {(transactionSuccess || transactionError) &&
                <ModalComp
                    close={() => {
                        dispatch(storeTransactionActions.success(null))
                        dispatch(storeTransactionActions.failure(null))
                        dispatch(storeTransactionFreeActions.success(null))
                        dispatch(storeTransactionFreeActions.failure(null))
                        dispatch(transactionsActions.init())
                    }}
                    title={t('transactions')}
                    content={
                        <>
                            <div className={`badge badge-${transactionSuccess ? 'success' : 'warning'}`}>{transactionSuccess ? transactionSuccess.message : transactionError}</div>
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
            {(destroyStashSuccess || error) &&
                <ModalComp title='Delete Stash' close={() => {
                    destroyStashSuccess ? dispatch(destroyStashActions.success(null)) : dispatch(destroyStashActions.failure(null))
                    if (destroyStashSuccess) dispatch(stashesActions.init())
                }}
                    content={
                        <>
                            <div className={`badge badge-${destroyStashSuccess ? 'success' : 'warning'}`}>{destroyStashSuccess ? destroyStashSuccess.message : error}</div>
                        </>
                    }
                />
            }
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{t('my-stashes')}</h1>
                <hr />
                {loading ? <LoadingComp />
                    : stashes.data.data.length > 0 ? stashes.data.data.map((value, index) => (
                        <CardCourseComp key={index} element={
                            <>
                                {transactionLoading ? <LoadingComp />
                                    : <>
                                        {value.course.status === 'public' ?
                                            transactionFreeLoading ? <LoadingComp /> : <div className='text-primary comp__card__course__button' onClick={() => dispatch(storeTransactionFreeActions.init({ course_id: value.course_id }))}>{t('see-now')}</div>
                                            : <div className='text-primary comp__card__course__button' onClick={() => dispatch(storeTransactionActions.init({ course_id: value.course_id }))}>Buy</div>}
                                    </>}
                                {destroyStashLoading ? <LoadingComp /> : <div className='text-warning comp__card__course__button' onClick={() => { confirm(`Delete ? course : ${value.course.title}`); dispatch(destroyStashActions.init(value.course_id)) }}>{t('delete')}</div>}
                            </>
                        } title={value.course.title} level={value.course.level} status={value.course.status} desc={value.course.description} icon={value.course.icon_svg} price={value.course.price} instructor={value.course.instructor.name} />
                    )) : <>
                        <div className='bg-gradient' style={{ '--first-gradient-color': 'var(--transorange-color)', '--second-gradient-color': 'var(--transblue-color)' }}></div>
                        <p style={{ placeSelf: 'center', textAlign: 'center' }}>{t('view__member__student__stashes__warning')}</p>
                        <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/courses#top'>{t('see-courses')}</HashLink>
                    </>}
                {loading ? <LoadingComp />
                    : <PaginationComp data={stashes.data.links} onPageChange={url => stashesActions.init(_getPageFromUrl(url))} />
                }
            </section>
        </Layouts>
    )
}

export default Stash