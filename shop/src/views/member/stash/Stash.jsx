import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'

import Layouts from '@root/views/Layouts'

import MenuComp from '@root/components/member/menu/MenuComp'
import CardWebComp from '@root/components/common/card-web/CardWebComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import { MemberContext } from '@root/context/MemberProvider'

const Stash = () => {
    const { useLoading, getStashData, stashData } = useContext(MemberContext)

    return (
        <Layouts>
            <MenuComp />
            <section style={{ placeItems: 'center' }}>
                <h1 className="section-title">Stash</h1>
                <br />
                {useLoading ? <LoadingComp /> : stashData && stashData.length ?
                    <div className="layout__web__container">
                        {stashData.map((value, i) => {
                            const data = {
                                ...value,
                                id: value.id,
                                web_category: value.web.web_category,
                                web_type: value.web.web_type
                            }
                            return (<CardWebComp callback={getStashData} data={data} type='stash' url='shop-member-stash' key={i} />)
                        })
                        }
                    </div>
                    : <>
                        <div className="badge badge-warning">No data</div>
                        <HashLink className='button btn-primary' smooth to='/#website'>See Variety</HashLink>
                    </>}
            </section>
        </Layouts>
    )
}

export default Stash