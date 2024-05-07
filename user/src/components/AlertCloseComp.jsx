import React from 'react'

import SvgComp from '@root/components/SvgComp'

const AlertCloseComp = ({ type, msg, close }) => {
    return (
        <div className={'badge badge-close badge-' + type}>
            <p>{msg}</p>
            <div onClick={(close)} className='badge-button-close'>
                <SvgComp path='svg' file='guest' icon='close' />
            </div>
        </div>
    )
}

export default AlertCloseComp