import React, { useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

import './Show.css'

import Layouts from '@root/views/Layouts'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'

import { GuestContext } from '@root/context/GuestProvider'
import { MemberContext } from '@root/context/MemberProvider'
import { useSearchParams } from 'react-router-dom'

const Show = () => {
    const { getWebDataByShow, webShowData } = useContext(GuestContext)
    const { useModal, setModal, getTransactionData, handleStoreTransaction, useLoading } = useContext(MemberContext)
    const [param] = useSearchParams()

    useEffect(() => {
        getWebDataByShow(param.get('category'), param.get('type'))
    }, [useLoading])

    return (
        <Layouts>
            <section className='view__guest__show'>
                {useLoading ? <LoadingComp /> :
                    <img className='view__guest__show__img' src={`/img/${param.get('category')}-${param.get('type')}.webp`} alt={`IOGM - Shop ( ${param.get('category')} )`} />
                }
                <div className="view__guest__show__box">
                    {useLoading ? <LoadingComp /> :
                        <>
                            <HashLink className='button btn-primary' smooth to={'/#website'}>See Another</HashLink>
                            <a className='button btn-primary' href={`${import.meta.env.VITE_APP_BASE_URL_DEMO}category=${webShowData.web_category && webShowData.web_category.name}&type=${webShowData.web_type && webShowData.web_type.name}&url=shop-guest-show`}>Demo</a>
                            <div className='button btn-primary' onClick={() => handleStoreTransaction(webShowData.id)}>Buy</div>
                        </>
                    }
                    {useModal.show && <ModalComp title={`Purchase Web ${webShowData.id}`} content={
                        <>
                            <div className={useModal && useModal.msg && useModal.msg.includes('successfully') ? 'badge badge-success' : 'badge badge-warning'}>{useModal.msg}</div>
                            <HashLink smooth to={'/member/purchase'} className="button btn-primary" onClick={() => { getTransactionData(); setModal({ show: false }) }}>See Purchase</HashLink>
                        </>
                    } close={() => setModal({ show: false })} />}
                </div>
                <div className="view__guest__show__box">
                    <h2 className='view__guest__show__h2'>Description</h2>
                    {useLoading ? <LoadingComp /> :
                        <div className="view__guest__show__content">
                            <div className="key">Id</div>
                            <div className="value">: {webShowData.id}</div>
                            <div className="key">Category</div>
                            <div className="value">: {webShowData.web_category && webShowData.web_category.name}</div>
                            <div className="key">Type</div>
                            <div className="value">: {webShowData.web_type && webShowData.web_type.name}</div>
                            <div className="key">Price</div>
                            <div className="value">: {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(webShowData.price)}</div>
                        </div>
                    }
                </div>
                <div className="view__guest__show__box">
                    <h2 className='view__guest__show__h2'>What will you get?</h2>
                    <div className="view__guest__show__content">
                        <ul className='view__guest__show__ul'>
                            <li><p>Assets</p>
                                <ul className='view__guest__show__ul'>
                                    <li>Image</li>
                                    <li>Data</li>
                                    <li>Style</li>
                                    <li>Font</li>
                                </ul>
                            </li>
                        </ul>
                        <ul className='view__guest__show__ul'>
                            <li><p>Build</p>
                                <ul className='view__guest__show__ul'>
                                    <li>Html</li>
                                    <li>Css</li>
                                    <li>Javascript</li>
                                    <li>PHP</li>
                                    <li>SVG</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="view__guest__show__box">
                    <h2 className='view__guest__show__h2'>For who buy this?</h2>
                    <p>For those of you who want to buy or need a landing page UI template, please click the buy button on this page. or if you already have a UI design, you can send the file to my email address.</p>
                </div>
            </section>
        </Layouts >
    )
}

export default Show