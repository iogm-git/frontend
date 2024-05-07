import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Layouts from '@root/views/Layouts'
import SvgComp from '@root/components/common/SvgComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import MenuComp from '@root/components/member/MenuComp'
import './Paid.css'
import { HashLink } from 'react-router-hash-link'
import { useLocation, useNavigate } from 'react-router-dom'

import { transactionsActions, destroyTransactionActions } from '@root/redux/actions/member/student'

const Paid = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const { data: success, loading, error } = useSelector(state => state.destroyTransactionResult)

    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location

    useEffect(() => {
        const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SNAP_JS;

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;

        const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }
    }, []);

    useEffect(() => {

    }, [state, success, loading, error])

    useEffect(() => {
        if (state === null || state.order_id === null) {
            return navigate('/member/student/transactions#top')
        }
    }, [])

    const handlePaidNow = () => {
        if (window.snap && window.snap.embed) {
            window.snap.embed(state.token, {
                embedId: 'snap-container',
                onSuccess: function (result) {
                    alert('Payment successful:', result);
                },
                onError: function (result) {
                    alert('Payment failed:', result);
                },
                onClose: function () {
                    alert('Payment closed');
                }
            });
        } else {
            alert('Snap is not available or not properly initialized.');
        }
    };

    const handleClosePopup = () => {
        if (window.snap && window.snap.hide) {
            window.snap.hide();
        } else {
            alert('Snap is not available or not properly initialized.');
        }
    };


    return (
        <Layouts>
            {(success || error) &&
                <ModalComp
                    close={() => {
                        dispatch(destroyTransactionActions.success(null))
                        dispatch(destroyTransactionActions.failure(null))
                        dispatch(transactionsActions.init())
                        navigate('/member/student/transactions#top')
                    }}
                    title={t('transactions')}
                    content={
                        <>
                            <div className={`badge badge-${success ? 'success' : 'warning'}`}>{success ? success.message : error}</div>
                            {!error && <HashLink smooth to='/member/student/transactions#top' className='button bg-primary'
                                onClick={() => {
                                    success ? dispatch(destroyTransactionActions.success(null)) : dispatch(destroyTransactionActions.failure(null))
                                    dispatch(transactionsActions.init())
                                }}>{t('see-my-transactions')}</HashLink>
                            }
                        </>
                    }
                />
            }
            <MenuComp />
            <section className='view__layout__member view__member__student__transaction__paid'>
                <h1 className="section-title">{t('paid')}</h1>
                <hr />
                <HashLink className='button btn-warning' smooth to='/member/student/transactions#top' onClick={handleClosePopup}>{t('back')}</HashLink>
                {state && state.status !== 'settlement' &&
                    <>
                        <hr />
                        <div className="button bg-primary view__member__student__transaction__paid__button" onClick={handlePaidNow}>
                            <p>{t('paid-now')}</p>
                            <SvgComp rule='svg-l view__member__student__transaction__paid__svg' path='svg' file='member' icon='paid' />
                        </div>
                    </>
                }
                <div className='view__member__student__transaction__paid__snap' id='snap-container'></div>
                <p>{t('view__member__student__paid__warning_1')}</p>
                {state && loading ? <LoadingComp /> :
                    <div className='button bg-danger' onClick={() => confirm(t('view__member__student__paid__warning_2')) && dispatch(destroyTransactionActions.init(state.order_id, state.course_id))}>Cancel Paid</div>}
                <hr />
                {state &&
                    <div className="view__member__student__transaction__paid__container">
                        <strong>{t('order-id')}</strong>
                        <p>{state.order_id}</p>
                        <strong>{t('course')}</strong>
                        <p>{state.course}</p>
                        <strong>{t('instructor')}</strong>
                        <p>{state.instructor}</p>
                        <strong>{t('created-at')}</strong>
                        <p>{state.created_at}</p>
                        <strong>{t('amount')}</strong>
                        <p>{state.amount}</p>
                        <strong>{t('on-behalf-of')}</strong>
                        <p>{state.name}</p>
                        <strong>{t('role')}</strong>
                        <p>{state.role}</p>
                        <strong>Status</strong>
                        <p className={`${state.status === 'settlement' ? 'text-success' : state.status === 'pending' ? 'text-warning' : 'text-danger'}`}>{state && state.status}</p>
                    </div>}
            </section>
        </Layouts>
    )
}

export default Paid
