import React, { useContext, useEffect, useState } from 'react'

import SvgComp from '@root/components/SvgComp'
import { AuthContext } from '@root/context/AuthProvider'

import './SetThemeComp.css'

const SetThemeComp = () => {
    const [mode, setMode] = useState('')
    const { setThemeButtonGoogleLogin } = useContext(AuthContext)

    function initTheme() {
        let theme = localStorage.getItem('theme-' + import.meta.env.VITE_APP_NAME)
        if (!theme) {
            setTheme('light')
            setThemeButtonGoogleLogin('outline')
        } else {
            setTheme(theme)
            setThemeButtonGoogleLogin('filled_black')
        }
    }

    function setTheme(param) {
        let body = document.getElementsByTagName('body')[0]
        if (param === 'light') {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode')
            }
            localStorage.setItem('theme-' + import.meta.env.VITE_APP_NAME, 'light')
            setMode('right')
            setThemeButtonGoogleLogin('outline')
        } else if (param === 'dark') {
            if (!body.classList.contains('dark-mode')) {
                body.classList.add('dark-mode')
            }
            localStorage.setItem('theme-' + import.meta.env.VITE_APP_NAME, 'dark')
            setMode('left')
            setThemeButtonGoogleLogin('filled_black')
        }
    }

    useEffect(() => {
        initTheme()
    }, [])

    return (
        <div className='comp__button__set__theme'>
            <div className='comp__button__set__theme__box'>
                <div className={`comp__button__set__theme__circle ${mode}`}></div>
                <div onClick={() => { setTheme('dark') }} className='comp__button__set__theme__div'>
                    <SvgComp rule='comp__button__set__theme__svg' path='svg' file='guest' icon='dark' />
                </div>
                <div onClick={() => { setTheme('light') }} className='comp__button__set__theme__div'>
                    <SvgComp rule='comp__button__set__theme__svg' path='svg' file='guest' icon='light' />
                </div>
            </div>
        </div>
    )
}

export default SetThemeComp