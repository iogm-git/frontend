import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/menu/MenuComp'

import './Payment.css'
import { MemberContext } from '@root/context/MemberProvider'

const Payment = () => {
    const navigate = useNavigate()

    const { getTransactionData, getLatestTransactionData, getDownloadWebData } = useContext(MemberContext)
    const location = useLocation()
    const { state } = location

    useEffect(() => {
        if (state === null) {
            navigate('/member/purchase')
        }
    }, [])

    return (
        <Layouts>
            <MenuComp />
            <section>
                <div style={{ textAlign: 'center' }}>
                    <h1 className="section-title">Payment Details</h1>
                    <small>This is the payment page for your order details. Please pay close attention.</small>
                </div>
                <br />
                <div className='view__member__payment__box layout__box'>
                    <h2>Customer</h2>
                    <div className="view__member__payment__details">
                        <div className="view__member__payment__key">Name</div>
                        <div className="view__member__payment__value">: {state && state.name}</div>
                        <div className="view__member__payment__key">Email</div>
                        <div className="view__member__payment__value">: {state && state.email}</div>
                    </div>
                </div>
                <div className='view__member__payment__box layout__box'>
                    <h2>Web</h2>
                    <div className="view__member__payment__details">
                        <div className="view__member__payment__key">Id</div>
                        <div className="view__member__payment__value">: {state && state.name}</div>
                        <div className="view__member__payment__key">Category</div>
                        <div className="view__member__payment__value">: {state && state.category}</div>
                        <div className="view__member__payment__key">Type</div>
                        <div className="view__member__payment__value">: {state && state.type}</div>
                        <div className="view__member__payment__key">Price</div>
                        <div className="view__member__payment__value">: {state && state.price}</div>
                    </div>
                </div>
                <div className='view__member__payment__box layout__box'>
                    <h2>Order</h2>
                    <div className="view__member__payment__details">
                        <div className="view__member__payment__key">Id</div>
                        <div className="view__member__payment__value">: {state && state.order_id}</div>
                        <div className="view__member__payment__key">Date</div>
                        <div className="view__member__payment__value">: {state && state.date}</div>
                    </div>
                </div>
                <div className="button bg-primary" onClick={() => {
                    window.snap.pay(state && state.token_midtrans, {
                        onSuccess: function () {
                            alert("payment success!");
                            getTransactionData()
                            getLatestTransactionData()
                            getDownloadWebData()
                        },
                        onPending: function (result) {
                            alert("wating your payment!");
                            getTransactionData()
                            getLatestTransactionData()
                            getDownloadWebData()
                        },
                        onError: function () {
                            alert("payment failed!");
                            getTransactionData()
                            getLatestTransactionData()
                            getDownloadWebData()
                        },
                        onClose: function () {
                            alert('you closed the popup without finishing the payment');
                            getTransactionData()
                            getLatestTransactionData()
                            getDownloadWebData()
                        }
                    })
                }}>Paid</div>
            </section>
        </Layouts>
    )
}

export default Payment