import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './CardCourseComp.css'

import SvgComp from '@root/components/common/SvgComp'
import { _formatCurrency } from '@root/utils/helper'

const CardCourseComp = (props) => {
    const { t } = useTranslation()

    const [isActive, setActive] = useState(false)

    return (
        <div className={`comp__card__course ${isActive ? 'active' : ''}`}>
            <div className="comp__card__course__title">
                <div className='comp__card__course__title__box'>
                    <p className='comp__card__course__title__label'>{props.title.substring(0, 15)} {props.title.length > 15 && '...'}</p>
                    <div dangerouslySetInnerHTML={{ __html: props.desc.length > 150 ? `${props.desc.substring(0, 150)}...` : props.desc }}></div>
                    <div className='comp__card__course__title__level'>
                        <p>Tingkatan </p>
                        <div className='comp__card__course__title__level__text'>{t(props.level)}</div>
                    </div>
                    <div className='comp__card__course__title__level'>
                        <p>Status </p>
                        <div className={`comp__card__course__title__level__text ${props.status === 'public' ? 'free' : ''}`}>{props.status == 'public' ? t('free') : t('paid')}</div>
                    </div>
                </div>
                <div className='comp__card__course__title__icon'>
                    <img className='comp__card__course__title__image' src="/images/background.png" alt={"IOGM - Code " + props.title} />
                    <SvgComp rule='comp__card__course__title__svg' path='svg' file='programming' icon={props.icon} />
                    <div className='comp__card__course__title__details'>
                        <SvgComp rule='svg-m' path='svg' file='member' icon='profile' />
                        <p>{props.instructor}</p>
                        <SvgComp rule='svg-m' path='svg' file='member' icon='paid' />
                        <p>{_formatCurrency(props.price)}</p>
                    </div>
                    <div className={`comp__card__course__title__button ${isActive ? 'active' : ''}`} onClick={() => setActive(value => !value)}>
                        <SvgComp rule='svg-m comp__card__course__title__click' path='svg' file='common' icon='click' />
                    </div>
                </div>
            </div>
            <div className="comp__card__course__desc">
                {props.element &&
                    <div className='comp__card__course__buttons'>
                        {props.element}
                    </div>
                }
                <h1 className='comp__card__course__desc__title' dangerouslySetInnerHTML={{ __html: props.title }}></h1>
                <div className='comp__card__course__title__desc__p' dangerouslySetInnerHTML={{ __html: props.desc }}></div>
            </div>
        </div>
    )
}

export default CardCourseComp