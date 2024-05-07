import React, { useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

import './Layouts.css'

import { useMemberHooks } from '@root/hooks/Member'

import Protected from '@root/utils/Protected'

import SetThemeComp from '@root/components/button/SetThemeComp'
import GetMenuComp from '@root/components/button/GetMenuComp'
import LoadingComp from '@root/components/loading/LoadingComp'

import { AuthContext } from '@root/context/AuthProvider'

const Layouts = ({ children }) => {
    const { user } = useContext(AuthContext)

    const { Logout, isLoading } = useMemberHooks()

    useEffect(() => {

    }, [user])

    return (
        <>
            <header>
                <HashLink smooth to='/' className="header__logo">
                    <img className='header__logo__img' src={import.meta.env.VITE_APP_BASE_URL + '/logo.svg'} alt="IOGM - User" />
                    <p>IOGM - User</p>
                </HashLink>
                <SetThemeComp />
                <GetMenuComp />
                <nav className='header__nav'>
                    <Protected type='comp-guest'>
                        <>
                            <HashLink className={`header__nav__link hover-progress ${location.pathname.includes('login') ? 'active' : null}`} smooth to={'/login#top'}>
                                <p>Login</p>
                            </HashLink>
                            <HashLink className={`header__nav__link hover-progress ${location.pathname.includes('register') ? 'active' : null}`} smooth to={'/register#top'}>
                                <p>Register</p>
                            </HashLink>
                        </>
                    </Protected>
                    <Protected type='comp-auth'>
                        <>
                            <HashLink className={`header__nav__link hover-progress ${location.pathname.includes('setting') ? 'active' : null}`} smooth to={'/member/setting#top'}>
                                <p>Setting</p>
                            </HashLink>
                            {user && user.verification_at !== null &&
                                <HashLink className={`header__nav__link hover-progress ${location.pathname.includes('ballot') ? 'active' : null}`} smooth to={'/member/ballot#top'}>
                                    <p>Ballot</p>
                                </HashLink>
                            }
                            {isLoading ? <LoadingComp /> :
                                <a className='header__nav__link hover-progress' onClick={() => { Logout(); }}>
                                    <p>Logout</p>
                                </a>
                            }
                        </>
                    </Protected>
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