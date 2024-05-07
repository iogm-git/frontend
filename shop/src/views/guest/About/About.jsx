import React from 'react'

import Layouts from '@root/views/Layouts'

import SvgComp from '@root/components/common/SvgComp'

import './About.css'

const About = () => {
    const technologies = ['html', 'css', 'javascript', 'php', 'mysql', 'postgresql', 'laravel', 'react', 'restapi', 'svg', 'github', 'coreldrawx7', 'photosop']
    const portfolios = [['Management App', 'Learn', 'utilize : html | css | javascript | mongodb | express | nodejs', 'Website owners can manage data such as add, change and delete.', 'https://famous-hem-foal.cyclic.app/'],
    ['Web App Blogger', 'Learn', 'utilize : html | css | javascript | php | mysql | svg', 'Serves to share data / information that the website owner wants to share.', 'https://irykomara1.000webhostapp.com/'],
    ['Comforta', 'Redesign', 'utilize : html | css | javascript | svg', 'From https://www.comforta.co.id', 'https://iogm-comforta.github.io'],
    ['Springair', 'Redesign', 'utilize : html | css | javascript | svg', 'From https://www.springair.co.id', 'https://iogm-springair.github.io']]

    return (
        <Layouts>
            <section className='view__guest__about'>
                <div className="view__guest__about__great">
                    <h1 className='section-title'>Welcome to my site</h1>
                    <br />
                    <p className='view__guest__about__great__p'>This site is designed to showcase my skills as a Full Stack Developer and also sells various website templates. Built using react and laravel. Below are several websites that I have created.</p>
                </div>
                <br />
                <br />
                <div className="view__guest__about__portfolios">
                    {portfolios.map((value, i) => (
                        <div className="view__guest__about__portfolio__card" key={i}>
                            <div className="view__guest__about__portfolio__card__title">
                                <h3>{value[0]}</h3>
                                <h5 className='view__guest__about__portfolio__card__title__h5'>{value[1]}</h5>
                            </div>
                            <small className='view__guest__about__portfolio__card__small'>{value[2]}</small>
                            <p>{value[3]}</p>
                            <a href={value[4]} className="view__guest__about__portfolio__card__button button btn-primary">Visit</a>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <div className="view__guest__about__profile">
                    <div className="view__guest__about__profile__card__linkedin">
                        <SvgComp rule='view__guest__about__profile__card__linkedin__svg' path='svg' file='guest' icon='linkedin' />
                        <img className='view__guest__about__profile__card__linkedin__img' src={`${import.meta.env.VITE_APP_BASE_URL}/blog/iogm.webp`} alt="Ilham Rahmat Akbar" />
                        <h3>Ilham Rahmat Akbar</h3>
                        <p>Fullstack Developer</p>
                        <small><i>Laravel & React</i></small>
                        <a className='view__guest__about__profile__card__linkedin__a' href="https://www.linkedin.com/in/ilhamrhmtkbr">See Profile</a>
                    </div>
                    <div className="view__guest__about__technologies">
                        <h1>Technologies</h1>
                        <div className="view__guest__about__technologies__box">
                            {technologies.map((value, i) => (
                                <SvgComp rule='view__guest__about__technologies__box__svg' path='svg' file='guest' icon={value} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="view__guest__about__reaction">
                    <h2 className="section-title">Reaction</h2>
                    <br />
                    <p>The following is the reaction of a popular YouTuber lecturer who discusses programming on this website <i>(before changing it to react-laravel)</i>.</p>
                    <br />
                    <iframe className='view__guest__about__iframe' src="https://www.youtube-nocookie.com/embed/h4D0oqbHF-o?si=RA5cWJGLkqSmPLJB&amp;start=2402" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </section>
        </Layouts>
    )
}

export default About