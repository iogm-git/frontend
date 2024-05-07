import React from 'react'

import SvgComp from '@root/components/common/SvgComp'

const BadgeAlertCloseComponent = ({ type, msg, close }) => {
    return (
        <div className={'badge badge-close badge-' + type}>
            <p>{msg}</p>
            <div onClick={(close)} className='badge-button-close'>
                <SvgComp path='svg' file='common' icon='close' />
            </div>
        </div>
    )
}

export default BadgeAlertCloseComponent