import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/menu/MenuComp'
import ImageComp from '@root/components/common/card-web/image/ImageComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import SvgComp from '@root/components/common/SvgComp'

import { MemberContext } from '@root/context/MemberProvider'

import './Purchase.css'

const Purchase = () => {
    const { transactionData, useLoading } = useContext(MemberContext)
    const navigate = useNavigate()
    // Check if transactionData is defined before filtering
    const paidTransactions = transactionData ? transactionData.filter(transaction => transaction.status === 'unpaid') : [];

    useEffect(() => {

    }, [transactionData, useLoading])

    return (
        <Layouts>
            <MenuComp />
            <section style={{ placeItems: 'center' }}>
                <h1>Purchase</h1>
                <br />
                {useLoading ? <LoadingComp /> : paidTransactions && paidTransactions.length > 0 ?
                    <div className="layout__web__container">
                        {paidTransactions.map((value, i) => (
                            <div className="view__member__purchase__card" key={i}>
                                <ImageComp picture={`${value.category}-${value.type}`} />
                                <div className="view__member__purchase__button button btn-primary" onClick={() => {
                                    navigate('payment', {
                                        state: {
                                            name: value.customer_name,
                                            email: value.customer_email,
                                            web_id: value.id,
                                            type: value.type,
                                            category: value.category,
                                            price: value.amount,
                                            order_id: value.order_id,
                                            token_midtrans: value.token && value.token.slice(1, -1),
                                            date: value.date,
                                        }
                                    })
                                }} >
                                    <p>Pay Now</p>
                                    <SvgComp rule='view__member__purchase__card__svg svg-m' path='svg' file='member' icon='pay' />
                                </div>
                            </div>))}
                    </div>
                    : <>
                        <div className='badge badge-warning'>There are no transactions to pay.</div>
                        <HashLink smooth to='/#website' className="button bg-primary">See Anothers Website</HashLink>
                    </>}
            </section>
        </Layouts>
    )
}

export default Purchase