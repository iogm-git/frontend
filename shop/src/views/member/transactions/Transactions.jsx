import React, { useContext, useEffect } from 'react'

import Layouts from '@root/views/Layouts'

import './Transactions.css'

import MenuComp from '@root/components/member/menu/MenuComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import { MemberContext } from '@root/context/MemberProvider'
import { HashLink } from 'react-router-hash-link'

const Transactions = () => {
    const { transactionData, handleDownloadTransaction, useLoading } = useContext(MemberContext)


    useEffect(() => {

    }, [])

    return (
        <Layouts>
            <MenuComp />
            <section style={{ placeItems: 'center' }}>
                <div>
                    <h2>History Transactions</h2>
                    <small>This is your transaction record.</small>
                </div>
                {useLoading ? <LoadingComp /> : transactionData && transactionData.length > 0 ?
                    <>
                        <div className="button btn-primary" onClick={handleDownloadTransaction}>Download Transactions</div>
                        <div className="table-box view__member__transactions__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Web Id</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionData.map((value, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{value.id}</td>
                                            <td>{value.category}</td>
                                            <td>{value.type}</td>
                                            <td>{value.date}</td>
                                            <td>{value.amount}</td>
                                            <td className={value.status == 'settlement' ? 'badge-success' : 'badge-danger'}>{value.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <>
                        <div className='badge badge-warning'>
                            You don't have transactions
                        </div>
                        <HashLink className='button btn-primary' smooth to='/#website'>
                            See Variety
                        </HashLink>
                    </>
                }
            </section>
        </Layouts>
    )
}

export default Transactions