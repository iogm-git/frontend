import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import './Ballot.css'
import Layouts from '@root/views/Layouts'
import { AuthContext } from '@root/context/AuthProvider'

const Ballot = () => {
    const { user, isMemberOnIogmCode } = useContext(AuthContext)

    if (user.verification_at === null) {
        return <Navigate to={'/member/setting'} />
    }

    useState(() => { }, [user, isMemberOnIogmCode])

    return (
        <Layouts>
            <section className='view__member__ballot__section'>
                <div className="view__member__ballot__title">
                    <h1 className='section-title'>Hello {user.name},</h1>
                    {isMemberOnIogmCode && isMemberOnIogmCode ? <p>Please choose to visit.</p> : <p>Below you can choose to register an account according to your needs.</p>}
                </div>
                <div className="view__member__ballot__card">
                    <div className="view__member__ballot__card__title">Shop</div>
                    <div className="view__member__ballot__card__description">Application that sells various kinds of landing page templates.</div>
                    <a className='button btn-primary' href={import.meta.env.VITE_APP_URL_SHOP}>Visit</a>
                </div>
                <div className="view__member__ballot__card">
                    <div className="view__member__ballot__card__title">Code</div>
                    <div className="view__member__ballot__card__description">Online programming course application.</div>
                    {isMemberOnIogmCode && isMemberOnIogmCode ? <a className='button btn-primary' href={import.meta.env.VITE_APP_URL_CODE}>Visit</a> : <HashLink smooth className='button btn-primary' to='/member/setting/code/register#top'>Register</HashLink>}
                </div>
            </section>
        </Layouts>
    )
}

export default Ballot