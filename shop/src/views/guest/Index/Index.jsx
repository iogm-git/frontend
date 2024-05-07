import React, { useContext, useEffect, useRef, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

import './Index.css'

import '@root/utils/slider/slider.css'
import { moveSlide } from '@root/utils/slider/slider.js'

import Layouts from '@root/views/Layouts'

import CardWebComp from '@root/components/common/card-web/CardWebComp'
import ImageComp from '@root/components/common/card-web/image/ImageComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import { GuestContext } from '@root/context/GuestProvider'



const Index = () => {
    const { webDetailsData, webCategoriesData, webPaginationsData, getWebDetailsData, getWebDataByCategory,
        getWebDataBySearch, getStashData, useLoading } = useContext(GuestContext)
    const nextRef = useRef()
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState('all')

    useEffect(() => {

        const autoClick = setInterval(() => {
            nextRef.current.click()
        }, 2000);

        return (() => clearInterval(autoClick))
    }, [useLoading])

    return (
        <Layouts>
            <section className='view__guest__index__great'>
                <div className="custom-slider-wrapper">
                    <div className="custom-slider-prev" onClick={() => moveSlide(-1)}>&#171;</div>
                    <div className="custom-slider-box">
                        <ImageComp rule='custom-slider-item' picture='sport-app_a' />
                        <ImageComp rule='custom-slider-item' picture='portfolio-app_b' />
                        <ImageComp rule='custom-slider-item display-none' picture='car-app_a' />
                    </div>
                    <div ref={nextRef} className="custom-slider-next" onClick={() => moveSlide(1)}>&#187;</div>
                </div>
                <h1 className='view__guest__index__great__title'>There are a wide variety of landing pages available.</h1>
                <p className='view__guest__index__great__p'>Easy to use, make transactions and download files.</p>
                <br />
                <HashLink smooth to={'/#website'} className='view__guest__index__great__button button bg-primary'>See Products</HashLink>
            </section>
            <section id='website'>
                <h1 className='view__guest__index__title section-title'>Your choice</h1>
                <div className='view__guest__index__search'>
                    <input
                        className='view__guest__index__search__input'
                        type="text"
                        placeholder='Search...'
                        name='search' id='search'
                        autoComplete='off'
                        onKeyUp={(event) => {
                            if (event.target.value !== '') {
                                getWebDataBySearch(event); setPage(null); setCategory(null)
                            } else {
                                getWebDataBySearch(event); setPage(1); setCategory('all')
                            }
                        }} />
                    <SvgComp rule='view__guest__index__search__svg svg-l' path='svg' file='guest' icon='search' />
                </div>
                <div className="view__guest__index__web__categories__box">
                    {useLoading ? <LoadingComp /> :
                        <>
                            <div className={`view__guest__index__web__category ${page == 1 ? 'active' : null}`} onClick={() => { getWebDetailsData(1); setPage(1); setCategory('all') }}>all</div>
                            {webCategoriesData && webCategoriesData.map((value, i) => (
                                <div className={`view__guest__index__web__category ${category == value ? 'active' : null}`} onClick={() => { getWebDataByCategory(value); setCategory(value); setPage() }} key={i}>{value}</div>
                            ))}
                        </>
                    }
                </div>
                <div className="layout__web__container">
                    {useLoading ? <LoadingComp /> :
                        <>
                            {webDetailsData.length > 0 ? webDetailsData.map((value, i) => (
                                <CardWebComp callback={getStashData} data={value} url='shop-guest-index' key={i} />
                            )) : <p className='badge badge-danger' style={{ placeSelf: 'center' }}>Not Found</p>}
                        </>
                    }
                </div>

                <div className="views__guest__index__web__paginations__box">
                    {useLoading ? <LoadingComp /> :
                        <>
                            {webPaginationsData && webPaginationsData.map((value, i) => (
                                <HashLink smooth to='/#website' className={!value.label.includes('quo') ? ` views__guest__index__web__page__order__by ${value.active ? 'active' : null}` : null}
                                    onClick={() => {
                                        let url = new URL(value.url)
                                        getWebDetailsData(url.searchParams.get('page'));
                                        setPage(url.searchParams.get('page'))
                                        setCategory()
                                    }}
                                    key={i}>
                                    {
                                        value.label.includes('la') ? '<'
                                            : value.label.includes('ra') ? '>'
                                                : value.label
                                    }
                                </HashLink>
                            ))}
                        </>
                    }
                </div>
            </section>
        </Layouts>
    )
}

export default Index