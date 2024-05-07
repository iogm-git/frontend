import React from 'react'

import './LoadingComp.css'

const LoadingComp = (props) => {
    return (
        <div className={"comp__loading " + props.class}>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingComp