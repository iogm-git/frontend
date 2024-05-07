import React, { useState } from 'react'

import SvgComp from '@root/components/common/SvgComp'

import './SetThemeComp.css'

const SetThemeComp = () => {
    const [mode, setMode] = useState('')

    function initTheme() {
        let theme = localStorage.getItem('theme-' + import.meta.env.VITE_APP_NAME)
        if (!theme) {
            setTheme('light')
        } else {
            setTheme(theme)
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
        } else if (param === 'dark') {
            if (!body.classList.contains('dark-mode')) {
                body.classList.add('dark-mode')
            }
            localStorage.setItem('theme-' + import.meta.env.VITE_APP_NAME, 'dark')
            setMode('left')
        }
    }

    useState(() => {
        initTheme()
    }, [mode])

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