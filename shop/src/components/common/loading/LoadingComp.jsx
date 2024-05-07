import React from 'react'

import './LoadingComp.css'

const LoadingComp = (props) => {
    return (
        <div className={"lds-ripple " + props.class}>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingComp