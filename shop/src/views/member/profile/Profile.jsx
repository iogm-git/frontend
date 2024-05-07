import React, { useContext, useEffect } from 'react'

import './Profile.css'

import Layouts from '@root/views/Layouts'

import MenuComp from '@root/components/member/menu/MenuComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import { AuthContext } from '@root/context/AuthProvider'
import { MemberContext } from '@root/context/MemberProvider'
import { getImage } from '@root/utils/helper'

const Profile = () => {
    const { user } = useContext(AuthContext)
    const { stashData, latestTransactionData, goSetting, useLoading } = useContext(MemberContext)

    useEffect(() => {

    }, [user, latestTransactionData])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__member__profile'>
                <div className='view__member__photo'>
                    <img src={user && user.image && user.image.includes('http') ? user.image : getImage(user.image)} alt={user.name} className="view__member__dashboard__img__profile" />
                    <a onClick={goSetting} className='view__member__dashboard__set_photo'>
                        <SvgComp rule='svg-m' path='svg' file='member' icon='photo' />
                    </a>
                </div>
                <h1 className="section-title view__member__dashboard__profile__great">Welcome, {user.name}<SvgComp rule='svg-m' path='svg' file='member' icon='verified' /></h1>
                <div className='view__member__dashboard__profile__details layout__box'>
                    <div className='view__member__dashboard__profile__detail__box'>
                        <h3 className='view__member__dashboard__profile__detail__title'>Username</h3>
                        <p>{user.username}</p>
                    </div>
                    <div className='view__member__dashboard__profile__detail__box'>
                        <h3 className='view__member__dashboard__profile__detail__title'>Email</h3>
                        <div className='view__member__dashboard__box__email'>{user && user.email != null ? user.email :
                            <>
                                <p>Need Verify Email</p>
                                <a className='view__member__dashboard__edit__link' href={import.meta.env.VITE_APP_URL_USER}>
                                    <SvgComp rule='svg-m badge-primary view__member__dashboard__edit__icon' path='svg' file='member' icon='edit' />
                                </a>
                            </>
                        }
                        </div>
                    </div>
                    <div className='view__member__dashboard__profile__detail__box'>
                        <h3 className='view__member__dashboard__profile__detail__title'>Name</h3>
                        <div className='view__member__dashboard__box__email'>{user && user.name != 'User' ? user.name :
                            <>
                                <p>{user.name}</p>
                                <a className='view__member__dashboard__edit__link' href={import.meta.env.VITE_APP_URL_USER}>
                                    <SvgComp rule='svg-m badge-primary view__member__dashboard__edit__icon' path='svg' file='member' icon='edit' />
                                </a>
                            </>
                        }
                        </div>
                    </div>
                    <div className='view__member__dashboard__profile__detail__box'>
                        <h3 className='view__member__dashboard__profile__detail__title'>Stash</h3>
                        <p>{stashData ? stashData.length : 0}</p>
                    </div>

                    <div className='view__member__dashboard__profile__detail__box'>
                        <h3 className='view__member__dashboard__profile__detail__title'>Last Transaction Unpaid</h3>
                        {useLoading ? <LoadingComp /> :
                            <>
                                {latestTransactionData ?
                                    <p>{latestTransactionData.web_id} | {latestTransactionData.amount} | {latestTransactionData.date}</p>
                                    : <p>No Transaction</p>}
                            </>
                        }
                    </div>
                </div>

            </section>
        </Layouts>
    )
}

export default Profile