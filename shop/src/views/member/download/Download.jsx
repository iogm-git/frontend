import React, { useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

import './Download.css'

import Layouts from '@root/views/layouts'

import MenuComp from '@root/components/member/menu/MenuComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ImageComp from '@root/components/common/card-web/image/ImageComp'

import { MemberContext } from '@root/context/MemberProvider'

const Download = () => {
    const { downloadWebData, useLoading, handleDownloadFileZipWeb } = useContext(MemberContext)

    useEffect(() => {

    }, [useLoading])

    return (
        <Layouts>
            <MenuComp />
            <section style={{ placeItems: 'center' }}>
                <div>
                    <h1 className="section-title">Download</h1>
                </div>
                <br />
                {useLoading ? <LoadingComp /> : downloadWebData && downloadWebData.length > 0 ?
                    <div className="layout__web__container">
                        {downloadWebData.map((value, i) => (
                            <div className='view__member__download__card' key={i}>
                                <ImageComp picture={`${value.web.web_category.name}-${value.web.web_type.name}`} />
                                <div className="view__member__download__card__button" onClick={() => handleDownloadFileZipWeb(value.id)}>Download Web</div>
                            </div>))}
                    </div> : <>
                        <div className="badge badge-warning">No data</div>
                        <HashLink className='button btn-primary' smooth to='/#website'>See Variety</HashLink>
                    </>
                }
            </section>
        </Layouts>
    )
}

export default Download