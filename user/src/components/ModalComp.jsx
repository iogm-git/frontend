import React from 'react'

import SvgComp from '@root/components/SvgComp'

const ModalComp = ({ title, content, handleClose }) => {
    return (
        <div className='modal'>
            <div className="modal-box">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <div className="badge-button-close" onClick={handleClose}>
                        <SvgComp path='svg' file='guest' icon='close' />
                    </div>
                </div>
                <div className="modal-content">
                    {content}
                </div>
                <div className="modal-footer">
                    IOGM - User - Personalize
                </div>
            </div>
        </div>
    )
}

export default ModalComp