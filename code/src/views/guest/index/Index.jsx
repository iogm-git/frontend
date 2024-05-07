import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import './Index.css'
import Layouts from '@root/views/Layouts'
import TypewriterComp from '@root/components/common/TypewriterComp'
import SvgComp from '@root/components/common/SvgComp'

const Index = () => {
    const { t } = useTranslation()

    const programming = ['html', 'css', 'javascript', 'laravel', 'mysql', 'postgresql', 'php', 'restapi', 'react', 'github', 'svg']
    const programming2 = ['expressjs', 'mongodb', 'firebase', 'vuejs', 'ajax', 'git', 'cpp', 'python', 'sql-server', 'docker']

    return (
        <Layouts>
            <ul className="view__guest__index__background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <section className='view__guest__index__great'>
                <div className='view__guest__index__great__title'>
                    <h1 className='view__guest__index__great__title__h1'>Hi , <TypewriterComp data={['Visitor', 'Student', 'Instructor']} />.</h1>
                    <p></p>
                    <p>{t('view__guest__index__great__title')}</p>
                    <br />
                    <div className='view__guest__index__great__box'>
                        <div className='view__guest__index__great__pack'>
                            <span className='view__guest__index__great__pack__title'>6+</span>
                            <p>{t('course')}</p>
                        </div>
                        <div className='view__guest__index__great__pack'>
                            <span className='view__guest__index__great__pack__title'>1+</span>
                            <p>{t('Instructor')}</p>
                        </div>
                        <div className='view__guest__index__great__pack'>
                            <span className='view__guest__index__great__pack__title'>1+</span>
                            <p>{t('student')}</p>
                        </div>
                    </div>
                    <br />
                    <a href='#info' className="button bg-primary view__guest__index__great__button">
                        <p>{t('view__guest__index__great__button')}</p>
                        <SvgComp rule='svg-m view__guest__index__great__button__svg' path='svg' file='common' icon='mouse' />
                    </a>
                </div>
                <img className='view__guest__index__great__img' src='/images/user.svg' alt="IOGM - Code" />
            </section>
            <section className='view__guest__index__banner'>
                <div className="view__guest__index__banner__container">
                    <div className="view__guest__index__banner__box">
                        {programming && programming.map((value, i) => (
                            <div className="view__guest__index__banner__pack" key={i}>
                                <SvgComp rule='view__guest__index__banner__pack__svg' path='svg' file='programming' icon={value} />
                            </div>
                        ))}
                        {programming && programming.map((value, i) => (
                            <div className="view__guest__index__banner__pack" key={i}>
                                <SvgComp rule='view__guest__index__banner__pack__svg' path='svg' file='programming' icon={value} />
                            </div>
                        ))}
                    </div>
                    <br />
                    <div className="view__guest__index__banner__box">
                        {programming2 && programming2.map((value, i) => (
                            <div className="view__guest__index__banner__pack" key={i}>
                                <SvgComp rule='view__guest__index__banner__pack__svg' path='svg' file='programming' icon={value} />
                            </div>
                        ))}
                        {programming2 && programming2.map((value, i) => (
                            <div className="view__guest__index__banner__pack" key={i}>
                                <SvgComp rule='view__guest__index__banner__pack__svg' path='svg' file='programming' icon={value} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id='info' className='view__guest__index__info'>
                <div className="grid-custom">
                    <h2 className='view__guest__index__info__title'>{t('student')}</h2>
                    <div className='view__guest__index__info__box'>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__student__title__1')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__student__desc__1')}</p>
                        </div>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__student__title__2')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__student__desc__2')}</p>
                        </div>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__student__title__3')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__student__desc__3')}</p>
                        </div>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__student__title__4')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__student__desc__4')}</p>
                        </div>
                    </div>
                </div>
                <div className="grid-custom">
                    <h2 className='view__guest__index__info__title'>{t('instructor')}</h2>
                    <div className='view__guest__index__info__box'>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__instructor__title__1')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__instructor__desc__1')}</p>
                        </div>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__instructor__title__2')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__instructor__desc__2')}</p>
                        </div>
                        <div className='view__guest__index__info__pack'>
                            <div className='view__guest__index__info__pack__title'>
                                <SvgComp rule='view__guest__index__info__pack__svg' path='svg' file='common' icon='checklist' />
                                <p>{t('view__guest__index__info__instructor__title__3')}</p>
                                <SvgComp rule='view__guest__index__info__pack__click' path='svg' file='common' icon='click' />
                            </div>
                            <p className='view__guest__index__info__pack__desc'>{t('view__guest__index__info__instructor__desc__3')}</p>
                        </div>
                    </div>
                </div>
            </section >
            <section className='view__guest__index__instructor'>
                <img className='view__guest__index__instructor__image' src="/images/member.svg" alt="IOGM - Code" />
                <div >
                    <h1 className='view__guest__index__instructor__title'>{t('view__guest__index__instructor__title')}</h1>
                    <p>{t('view__guest__index__instructor__desc')}</p>
                </div>
            </section>
            <section className='view__guest__index__student'>
                <div className='view__guest__index__student__box'>
                    <div className="view__guest__index__student__pack">
                        <div className="view__guest__index__student__key">&#10003;</div>
                        <div className="view__guest__index__student__value">{t('view__guest__index__student__value__1')}</div>
                    </div>
                    <div className="view__guest__index__student__pack">
                        <div className="view__guest__index__student__key">&#10003;</div>
                        <div className="view__guest__index__student__value">{t('view__guest__index__student__value__2')}</div>
                    </div>
                    <div className="view__guest__index__student__pack">
                        <div className="view__guest__index__student__key">&#10003;</div>
                        <div className="view__guest__index__student__value">{t('view__guest__index__student__value__3')}</div>
                    </div>
                    <div className="view__guest__index__student__pack">
                        <div className="view__guest__index__student__key">&#10003;</div>
                        <div className="view__guest__index__student__value">{t('view__guest__index__student__value__4')}</div>
                    </div>
                    <div className="view__guest__index__student__pack">
                        <div className="view__guest__index__student__key">&#10003;</div>
                        <div className="view__guest__index__student__value">{t('view__guest__index__student__value__5')}</div>
                    </div>
                </div>
                <img className='view__guest__index__student__image' src="/images/student.svg" alt="IOGM - Code" />
            </section>

            <section>
                <p style={{ textAlign: 'center' }}>{t('view__guest__index__next__step')}</p>
                <HashLink smooth to='courses#top' className='view__guest__index__search__button'>
                    {t('see-courses')}
                </HashLink>
            </section>
        </Layouts >
    )
}

export default Index