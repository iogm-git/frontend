import React from 'react'

import { HashLink } from 'react-router-hash-link'

import SvgComp from '@root/components/common/SvgComp'
import ImageComp from '@root/components/common/card-web/image/ImageComp'
import ButtonAddComp from '@root/components/member/stash/ButtonAddComp'
import ButtonRemoveComp from '@root/components/member/stash/ButtonRemoveComp'

import './CardWebComp.css'

const CardWebComp = (props) => {
    return (
        <div className="comp__card__web">
            <ImageComp picture={`${props.data.web_category.name}-${props.data.web_type.name}`} />
            <div className="comp__card__web__action">
                <HashLink className='comp__card__web__action__link' smooth to={`/guest/show?category=${props.data.web_category.name}&type=${props.data.web_type.name}#top`} data-tooltip="see">
                    <SvgComp rule='svg-l' path='svg' file='guest' icon='web-see' />
                </HashLink>
                {
                    props.type && props.type == 'stash' ?
                        <ButtonRemoveComp webId={props.data.id} callback={props.callback} />
                        :
                        <ButtonAddComp webId={props.data.id} />
                }
                <a className='comp__card__web__action__link' href={`${import.meta.env.VITE_APP_BASE_URL_DEMO}category=${props.data.web_category.name}&type=${props.data.web_type.name}&url=${props.url}`} data-tooltip='demo'>
                    <SvgComp rule='svg-l' path='svg' file='guest' icon='web-demo' />
                </a>
            </div>
        </div>
    )
}

export default CardWebComp