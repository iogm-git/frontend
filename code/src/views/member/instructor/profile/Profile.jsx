import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import './Profile.css'
import { _getImage } from '@root/utils/helper'
import { HashLink } from 'react-router-hash-link'

const Profile = () => {
    const { t } = useTranslation()

    const { data: user, loading } = useSelector(state => state.userData)
    const { data: questions, loading: answersLoading } = useSelector(state => state.questionsData)
    const { data: courseReviews, loading: courseReviewsLoading } = useSelector(state => state.courseReviewsData)
    const { data: earnings, loading: earningsLoading } = useSelector(state => state.earningsData)

    useEffect(() => { }, [user, loading, questions, courseReviews, earnings])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className='section-title'>{t('my-profile')}</h1>
                <div className="view__member__instructor__profile grid-custom">
                    {!loading ? <img src={user.image && user.image.includes('http') ? user.image : _getImage(user.image)} alt={user.name} className={`view__member__instructor__profile__image ${user.image === 'profile.svg' ? 'invert' : ''}`} />
                        : <LoadingComp />}
                    <div className="view__member__instructor__profile__detail">
                        <SvgComp rule='svg-m view__member__instructor__profile__detail__svg' path='svg' file='member' icon='profile' />
                        <p>{user.name}</p>
                        <small>{user.username}</small>
                    </div>
                    <div className="view__member__instructor__profile__detail">
                        <SvgComp rule='svg-m view__member__instructor__profile__detail__svg' path='svg' file='member' icon='callendar' />
                        <p>{user.dob ? user.dob : <HashLink smooth to='/member/general/setting#top' className='text-warning'>{t('edit')}</HashLink>}</p>
                    </div>
                    <div className="view__member__instructor__profile__detail">
                        <SvgComp rule='svg-m view__member__instructor__profile__detail__svg' path='svg' file='member' icon='address' />
                        <p>{user.address ? user.address : <HashLink smooth to='/member/general/setting#top' className='text-warning'>{t('edit')}</HashLink>}</p>
                    </div>
                    <br />
                    <div className="view__member__instructor__profile__box">
                        <div className="view__member__instructor__profile__pack">
                            <div className="view__member__instructor__profile__pack__key">{t('answer')}</div>
                            {answersLoading ? <LoadingComp /> : <div className="view__member__instructor__profile__pack__value">{questions && questions.data && questions.data.questions && questions.data.questions.data.length}</div>}
                        </div>
                        <div className="view__member__instructor__profile__pack">
                            <div className="view__member__instructor__profile__pack__key">{t('course-reviews')}</div>
                            {courseReviewsLoading ? <LoadingComp /> : <div className="view__member__instructor__profile__pack__value">{courseReviews && courseReviews.data && courseReviews.data.data.length}</div>}
                        </div>
                        <div className="view__member__instructor__profile__pack">
                            <div className="view__member__instructor__profile__pack__key">{t('earnings')}</div>
                            {earningsLoading ? <LoadingComp /> : <div className="view__member__instructor__profile__pack__value">{earnings && earnings.data && earnings.data.earnings.length}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </Layouts>
    )
}

export default Profile