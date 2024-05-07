import React from 'react'

const SvgComponent = (props) => {
    return (
        <svg className={props.rule}>
            <use xlinkHref={`/${props.path}/${props.file}.svg#${props.icon}`}></use>
        </svg>
    )
}

export default SvgComponent