import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import MenuComp from '@root/components/member/MenuComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import Layouts from '@root/views/Layouts'

import './Profile.css'
import { useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'
import { _getImage } from '@root/utils/helper'

const Profile = () => {
    const { t } = useTranslation()

    const { data: user, loading: userLoading } = useSelector(state => state.userData)
    const { data: course_progress, loading: courseProgressLoading } = useSelector(state => state.courseProgressData)
    const { data: courses, loading: coursesLoading } = useSelector(state => state.studentCoursesData)
    const { data: certificates, loading: certificatesLoading } = useSelector(state => state.certificatesData)
    const { data: stashes, loading: stashesLoading } = useSelector(state => state.stashesData)
    const { data: transactions, loading: transactionsLoading } = useSelector(state => state.transactionsData)

    useEffect(() => {

    }, [
        user, userLoading,
        course_progress, courseProgressLoading,
        courses, coursesLoading,
        certificates, certificatesLoading,
        stashes, stashesLoading,
        transactions, transactionsLoading
    ])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__layout__member'>
                <h1 className="section-title">{t('my-profile')}</h1>
                <div className="view__member__student__profile__container">
                    {userLoading ? <LoadingComp />
                        : <img src={user.image && user.image.includes('http') ? user.image : _getImage(user.image)} alt={user.name} className={`view__member__student__profile__image ${user.image === 'profile.svg' ? 'invert' : ''}`} />}
                    <div className="view__member__student__profile__box">
                        <div className="view__member__student__profile__pack">
                            <SvgComp rule='view__member__student__profile__svg' path='svg' file='member' icon='profile' />
                            {userLoading ? <LoadingComp />
                                : <p>{user.name}</p>}
                            <div className="view__member__student__profile__divider"></div>
                            {userLoading ? <LoadingComp />
                                : <p>{user.username}</p>}
                        </div>
                        {userLoading ? <LoadingComp />
                            : <div className="view__member__student__profile__pack">
                                <SvgComp rule='view__member__student__profile__svg' path='svg' file='member' icon='callendar' />
                                <div>{user.dob ? user.dob :
                                    <HashLink smooth to='/member/general/setting#top' className='text-warning'>edit</HashLink>}
                                </div>
                            </div>}
                        {userLoading ? <LoadingComp />
                            : <div className="view__member__student__profile__pack">
                                <SvgComp rule='view__member__student__profile__svg' path='svg' file='member' icon='address' />
                                <div className='view__member__student__profile__address'>{user.address ? user.address :
                                    <HashLink smooth to='/member/general/setting#top' className='text-warning'>edit</HashLink>}</div>
                            </div>}
                    </div>
                </div>

                <div className="view__member__student__profile__data">
                    <div className="view__member__student__profile__div">
                        <h3>{t('courses')}</h3>
                        {coursesLoading ? <LoadingComp />
                            : <p>{courses.data.data.length}</p>}
                    </div>
                    <div className="view__member__student__profile__div">
                        <h3>{t('certificates')}</h3>
                        {certificatesLoading ? <LoadingComp />
                            : <p>{certificates.data.length}</p>}
                    </div>
                    <div className="view__member__student__profile__div">
                        <h3>{t('stashes')}</h3>
                        {stashesLoading ? <LoadingComp />
                            : <p>{stashes.data.data.length}</p>}
                    </div>
                    <div className="view__member__student__profile__div">
                        <h3>{t('transactions')}</h3>
                        {transactionsLoading ? <LoadingComp />
                            : <p>{transactions.data.data.length}</p>}
                    </div>
                </div>
            </section>
        </Layouts>
    )
}

export default Profile