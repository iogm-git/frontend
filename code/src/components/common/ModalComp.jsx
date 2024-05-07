import React from 'react'

import SvgComp from './SvgComp'

const ModalComp = (props) => {
    return (
        <div className="modal">
            <div className="modal-box">
                <div className="modal-header">
                    <p>{props.title}</p>
                    <div className="badge-button-close" onClick={props.close}>
                        <SvgComp path='svg' file='common' icon='close' />
                    </div>
                </div>

                <div className="modal-content">
                    {props.content}
                </div>

                <div className="modal-footer">
                    <small>{import.meta.env.VITE_APP_NAME}</small>
                </div>
            </div>
        </div>
    )
}

export default ModalComp