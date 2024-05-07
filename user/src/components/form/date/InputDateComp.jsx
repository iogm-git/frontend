import React, { useState } from 'react'

import './InputDateComp.css'

const InputDateComp = (props) => {
    const today = new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState(today);

    function handleInputChange(e) {
        props.handleInputOnChange(e.target.value)
        setSelectedDate(e.target.value)
    };

    return (
        <div className={`comp__form__date ${selectedDate && 'active'}`}>
            <label className={`comp__form__date__label ${selectedDate && 'active'}`} htmlFor={props.name}>
                {props.name}
            </label>
            <input className={`comp__form__date__input ${selectedDate && 'active'}`} id={props.name} type="date" max={today} onChange={handleInputChange} />
        </div>
    )
}

export default InputDateComp