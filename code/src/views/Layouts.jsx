import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import GetMenuComp from '@root/components/common/button/GetMenuComp'
import TranslateComp from '@root/components/common/button/TranslateComp'
import SetThemeComp from '@root/components/common/button/SetThemeComp'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'


import Protected from '@root/utils/Protected'
import { _redirectToLogin, _getImage } from '@root/utils/helper'

import './Layouts.css'
import { _isActiveLink } from '@root/utils/helper'

const Layouts = ({ children }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const [isModal, setModal] = useState({ show: false })
    const { data: user, loading } = useSelector(state => state.userData)

    useEffect(() => {

    }, [user, loading]);

    return (
        <>
            {isModal.show &&
                <ModalComp close={() => setModal({ show: false })} title={isModal.title} content={isModal.content} />
            }
            <header>
                <HashLink smooth to='/#top' className="header__logo">
                    <img src={import.meta.env.VITE_APP_BASE_URL + '/logo.svg'} alt={import.meta.env.VITE_APP_NAME} className='header__logo__img' />
                    <p>{import.meta.env.VITE_APP_NAME}</p>
                </HashLink>
                <SetThemeComp />
                <TranslateComp />
                <GetMenuComp />
                <nav>
                    <HashLink smooth to='/#top' className={`hover-progress ${_isActiveLink(import.meta.env.VITE_APP_URL_CODE + '/#') ? 'active' : ''}`}>Index</HashLink>
                    <HashLink smooth to='/courses#top' className={`hover-progress ${_isActiveLink(import.meta.env.VITE_APP_URL_CODE + '/courses#top') ? 'active' : ''}`}>{t('courses')}</HashLink>
                    <HashLink smooth to='/certificate#top' className={`hover-progress ${_isActiveLink(import.meta.env.VITE_APP_URL_CODE + '/certificate#top') ? 'active' : ''}`}>{t('certificate')}</HashLink>
                    <Protected type='comp-guest'><a onClick={_redirectToLogin} className='hover-progress'>Login</a></Protected>
                    {loading ? <LoadingComp /> :
                        <Protected type='comp-auth'>
                            {user &&
                                <a className='header__auth' onClick={() => {
                                    if ('role' in user) {
                                        navigate(`/member/${user && user.role}/profile`)
                                    } else {
                                        setModal({
                                            show: true, title: 'Status User', content:
                                                <>
                                                    <p>{t('warning-not-yet-joined-as-a-member')}</p>
                                                    <a className='button bg-primary' href={import.meta.env.VITE_APP_URL_USER + '/member/setting/code/register'}>{t('go-register')}</a>
                                                </>
                                        })
                                    }
                                }}>
                                    <p className='header__auth__username'>{user.username}</p>
                                    <img src={user.image && user.image.includes('http') ? user.image : _getImage(user.image)} alt={user.name} className={`header__auth__img ${user.image === 'profile.svg' ? 'invert' : ''}`} />
                                </a>
                            }
                        </Protected>
                    }
                </nav>
            </header>

            <main id='top'>
                {children}
            </main>
            <footer>
                <div className="footer__box">
                    <img src={import.meta.env.VITE_APP_BASE_URL + '/logo.svg'} alt={import.meta.env.VITE_APP_NAME} className='footer__bio__img' />
                    <p className='footer__bio__title'>IOGM</p>
                    <p>Senen, Jakarta Pusat</p>
                    <p>copyright &copy; <a className='footer__bio__link' href={import.meta.env.VITE_APP_URL_PROFILE}>Ilham Rahmat Akbar</a> 2024</p>
                </div>

                <div className="footer__box">
                    <h2 className='footer__box__title'>My App</h2>
                    <div className='footer__box__pack'>
                        <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_APP_URL_USER + '/member/setting'}>IOGM User</a>
                        <small>User data settings</small>
                    </div>
                    <div className='footer__box__pack'>
                        <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_APP_URL_SHOP}>IOGM Shop</a>
                        <small>Sells UI templates</small>
                    </div>
                    <div className='footer__box__pack'>
                        <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_APP_URL_CODE}>IOGM Code</a>
                        <small>Learn to code</small>
                    </div>
                </div>

                <div className="footer__box">
                    <h2 className='footer__box__title'>My Contact</h2>
                    <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_LINK_GITHUB}>Github</a>
                    <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_LINK_EMAIL}>Email</a>
                    <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_LINK_INSTAGRAM}>Instagram</a>
                    <a className='footer__box__link' target='_blank' href={import.meta.env.VITE_LINK_WHATSAPP}>Whatsapp</a>

                </div>

            </footer >
        </>
    )
}

export default Layouts