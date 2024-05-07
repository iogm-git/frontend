import React from 'react'

import './ImageComp.css'

const ImageComp = (props) => {
    return (
        <div className={`comp__card__web__img ${props.rule && props.rule}`}>
            <div className="comp__card__web__img__blur" style={{ backgroundImage: `url(/img/${props.picture}.webp)` }}></div>
            <img className='comp__card__web__img__serenely' src={`/img/${props.picture}.webp`} alt='IOGM Shop' />
        </div>
    )
}

export default ImageComp