import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import InvoiceComp from '@root/components/member/student/pdf/InvoiceComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import PaginationComp from '@root/components/common/pagination/PaginationComp'

import './Transactions.css'
import { _getPageFromUrl } from '@root/utils/helper'

const Transactions = () => {
    const { t } = useTranslation()

    const { data: user } = useSelector(state => state.userData)
    const { data: transactions, loading } = useSelector(state => state.transactionsData)
    const [modal, setModal] = useState({ show: false })
    const navigate = useNavigate()

    useEffect(() => { }, [transactions])

    const now = new Date()
    const date = `${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${(now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}/${now.getFullYear()}`

    return (
        <Layouts>
            {modal.show && <ModalComp title={`Status ${t('transaction')}`} close={() => setModal({ show: false })} content={
                <>
                    <PDFDownloadLink document={
                        <InvoiceComp
                            date={date}
                            customer_name={user && user.name}
                            customer_email={user && user.email}
                            customer_dob={user && user.dob}
                            customer_address={user && user.address}
                            course_name={modal && modal.course}
                            course_instructor_name={modal && modal.instructor}
                            course_amount={modal && modal.amount}
                            transaction_id={modal && modal.order_id}
                            transaction_created_at={modal && modal.created_at}
                            transaction_updated_at={modal && modal.updated_at}
                            transaction_status={modal && modal.status}
                        />} fileName={`Transaction - Course ${modal.course} - ${modal.name}.pdf`} className='button bg-primary'>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : `${t('download')} ${t('transaction')}`
                        }
                    </PDFDownloadLink>
                    <div className='view__member__student__transaction__modal__content'>
                        <p>{t('order-id')}</p>
                        <p>: {modal.order_id}</p>
                        <p>{t('course')}</p>
                        <p>: {modal.course}</p>
                        <p>{t('instructor')}</p>
                        <p>: {modal.instructor}</p>
                        <p>{t('created-at')}</p>
                        <p>: {modal.created_at}</p>
                        <p>{t('paid-on-date')}</p>
                        <p>: {modal.updated_at}</p>
                        <p>{t('amount')}</p>
                        <p>: {modal.amount}</p>
                        <p>{t('customer-name')}</p>
                        <p>: {modal.name}</p>
                        <p>Status</p>
                        <div className='badge badge-success' style={{ textTransform: 'capitalize' }}>{modal.status}</div>
                    </div>
                    <HashLink className='button bg-success' smooth to='/member/student/courses#top'>{t('see-my-courses')}</HashLink>
                </>
            } />}
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{t('my-transactions')}</h1>
                <hr />
                {loading ? <LoadingComp /> :
                    transactions.data.data.length === 0 ?
                        <>
                            <div className='bg-gradient view__member__student__transaction__background'></div>
                            <p style={{ placeSelf: 'center', textAlign: 'center' }}>
                                {t('view__member__student__transactions__warning')}
                            </p>
                            <HashLink style={{ placeSelf: 'center' }} smooth to='/courses#top' className='button btn-primary'>Choise Course</HashLink>
                        </> :
                        <div className="table-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Id</th>
                                        <th>{t('course')}</th>
                                        <th>{t('amount')}</th>
                                        <th>{t('amount')}</th>
                                        <th>Status</th>
                                        <th>{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.data.data.map((value, index) => (
                                        <tr style={{ textAlign: 'center' }} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.order_id}</td>
                                            <td>{value.course.title}</td>
                                            <td>{value.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                            <td>{value.created_at}</td>
                                            <td style={{ fontFamily: 'Medium', backgroundColor: value.status === 'unpaid' ? 'var(--transred-color)' : value.status === 'pending' ? 'var(--transorange-color)' : 'var(--transgreen-color)', color: value.status === 'unpaid' ? 'var(--red-color)' : value.status === 'pending' ? 'var(--orange-color)' : 'var(--green-color)' }}>{value.status}</td>
                                            <td>{value.status !== 'settlement' ?
                                                <div className='text-primary view__member__student__transaction__button'
                                                    onClick={() => {
                                                        navigate('paid#top', {
                                                            state: {
                                                                order_id: value.order_id,
                                                                course: value.course.title,
                                                                course_id: value.course.id,
                                                                instructor: value.course.instructor.name,
                                                                created_at: value.created_at,
                                                                amount: value.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
                                                                name: value.student.name,
                                                                role: value.student.role,
                                                                status: value.status,
                                                                token: value.midtrans_data.token
                                                            }
                                                        })
                                                    }}>{t('paid')}</div>
                                                : <div className='text-primary view__member__student__transaction__button' onClick={() => setModal({
                                                    show: true,
                                                    order_id: value.order_id,
                                                    course: value.course.title,
                                                    instructor: value.course.instructor.name,
                                                    created_at: value.created_at,
                                                    updated_at: value.updated_at,
                                                    amount: value.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
                                                    name: value.student.name,
                                                    role: value.student.role,
                                                    status: value.status,
                                                })}>{t('check')}</div>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                }
                {loading ? <LoadingComp />
                    : <PaginationComp data={transactions.data.links} onPageChange={url => _getPageFromUrl(url)} />
                }
            </section>
        </Layouts>
    )
}

export default Transactions