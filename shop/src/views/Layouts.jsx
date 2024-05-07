import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'

import '@root/views/Layouts.css'
import Protected from '@root/utils/Protected'
import { useRedirectToLogin, getImage } from '@root/utils/helper'
import { AuthContext } from '@root/context/AuthProvider'
import SetThemeComp from '@root/components/common/button/SetThemeComp'
import GetMenuComp from '@root/components/common/button/GetMenuComp'
import { useLocation } from 'react-router-dom'

const Layouts = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation();

    return (
        <>
            <header>
                <HashLink smooth to={'/#top'} className="header__logo">
                    <img className='header__logo__img' src={import.meta.env.VITE_APP_BASE_URL + '/logo.svg'} alt="IOGM - Shop Logo" />
                    <p>IOGM - Shop</p>
                </HashLink>

                <SetThemeComp />
                <GetMenuComp />

                <nav className='header__nav'>
                    <HashLink to={'/#top'} className={`hover-progress`}>
                        Index
                    </HashLink>
                    <HashLink to={'/#website'} className={`hover-progress ${location.pathname.includes('website')}`}>
                        Website
                    </HashLink>
                    <HashLink to={'/guest/about#top'} className={`hover-progress ${location.pathname.includes('about')}`}>
                        About
                    </HashLink>
                    <Protected type='comp-guest'>
                        <a onClick={useRedirectToLogin} className='hover-progress'>Login</a>
                    </Protected>
                    <Protected type='comp-auth'>
                        <HashLink className='header__auth' to='/member/profile'>
                            <p className='header__auth__username'>{user.username}</p>
                            <img src={user && user.image && user.image.includes('http') ? user.image : getImage(user.image)} alt={user.name} className="header__auth__img" />
                        </HashLink>
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