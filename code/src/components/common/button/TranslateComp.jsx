import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import SvgComp from '@root/components/common/SvgComp'

import './Button.css'

const TranslateComp = () => {
    const { i18n } = useTranslation();
    const [active, setActive] = useState('left')

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='comp__button'>
            <div className='comp__button__box'>
                <div className={`comp__button__circle ${active}`}></div>
                <div onClick={() => { changeLanguage('en'); setActive('left') }} className='comp__button__div'>
                    <SvgComp rule='comp__button__svg lang' path='svg' file='common' icon='lang-en' />
                </div>
                <div onClick={() => { changeLanguage('id'); setActive('right') }} className='comp__button__div'>
                    <SvgComp rule='comp__button__svg lang' path='svg' file='common' icon='lang-id' />
                </div>
            </div>
        </div>
    );
}

export default TranslateComp