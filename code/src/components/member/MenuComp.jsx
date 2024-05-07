import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import SvgComp from '@root/components/common/SvgComp'
import './MenuComp.css'
import { handleLogout } from '@root/services/auth'
import { useSelector } from 'react-redux'

const MenuComp = () => {
    const { t } = useTranslation()

    const [isMenuHide, setMenuHide] = useState(false)
    const { data: user } = useSelector(state => state.userData)
    useEffect(() => { }, [user])

    return (
        <menu className={`comp__member__menu ${isMenuHide ? 'hidden' : ''}`}>
            <div className="comp__member__menu__icon" onClick={() => setMenuHide(value => !value)}>
                <p>Menu</p>
                <SvgComp rule='svg-s' path='svg' file='common' icon='click' />
            </div>
            <div className="comp__member__menu__links">
                <HashLink className={`comp__member__menu__link ${location.pathname.includes('profile') && 'hidden'}`} smooth to={`/member/${user && user.role}/profile#top`}>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='home' />
                    <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('profile')}</p>
                </HashLink>
                <HashLink className={`comp__member__menu__link ${location.pathname.includes('courses') && !location.pathname.includes('review') && 'hidden'}`} smooth to={`/member/${user && user.role}/courses#top`}>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='courses' />
                    <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('courses')}</p>
                </HashLink>
                {user && user.role === 'student' ?
                    <>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('stash') && 'hidden'}`} smooth to={`/member/student/stash#top`}>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='stash' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('stashes')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('certificates') && 'hidden'}`} smooth to={`/member/student/certificates#top`}>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='certificates' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('certificates')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('answers') && 'hidden'}`} smooth to={`/member/student/answers#top`}>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='answers' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('answers')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('transactions') && 'hidden'}`} smooth to={`/member/student/transactions#top`}>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='transactions' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('transactions')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('reviews') && 'hidden'}`} smooth to={`/member/student/reviews#top`}>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='review' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('reviews')}</p>
                        </HashLink>
                    </>
                    : <>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('questions') && 'hidden'}`} smooth to='/member/instructor/questions#top'>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='questions' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('questions')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('earnings') && 'hidden'}`} smooth to='/member/instructor/earnings#top'>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='earnings' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('earnings')}</p>
                        </HashLink>
                        <HashLink className={`comp__member__menu__link ${location.pathname.includes('reviews') && 'hidden'}`} smooth to='/member/instructor/courses/reviews#top'>
                            <SvgComp rule='svg-l' path='svg' file='member' icon='review' />
                            <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('reviews')}</p>
                        </HashLink>
                    </>}

                <HashLink className={`comp__member__menu__link ${location.pathname.includes('setting') && 'hidden'}`} smooth to='/member/general/setting#top'>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='setting' />
                    <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('setting')}</p>
                </HashLink>
                <HashLink className={`comp__member__menu__link ${location.pathname.includes('forum') && 'hidden'}`} smooth to='/member/general/forum#top'>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='forum' />
                    <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('forum')}</p>
                </HashLink>
                <div className={`comp__member__menu__link`} onClick={() => handleLogout()}>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='logout' />
                    <p className={`${isMenuHide ? 'comp__member__menu__link__hidden' : 'comp__member__menu__link__p'}`}>{t('logout')}</p>
                </div>
            </div>
        </menu>
    )
}

export default MenuComp