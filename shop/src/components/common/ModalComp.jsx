import React from 'react'

import SvgComp from './SvgComp'

const ModalComp = (props) => {
    return (
        <div className="modal">
            <div className="modal-box">
                <div className="modal-header">
                    <h2>{props.title}</h2>
                    <div className="badge-button-close" onClick={props.close}>
                        <SvgComp path='svg' file='guest' icon='close' />
                    </div>
                </div>

                <div className="modal-content">
                    {props.content}
                </div>

                <div className="modal-footer">
                    <small>IOGM - Shop</small>
                </div>
            </div>
        </div>
    )
}

export default ModalComp