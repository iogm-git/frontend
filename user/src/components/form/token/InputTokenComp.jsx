import React, { useState, useRef } from 'react';

import './InputTokenComp.css'

const InputTokenComp = (props) => {
    const [token, setToken] = useState(Array(props.length).fill(''));
    const inputRefs = Array(props.length).fill(null).map(() => useRef());

    function handleInputChange(e, index) {
        const value = e.target.value;

        const newToken = [...token];
        newToken[index] = value;
        setToken(newToken);

        // Move focus to the previous input
        if (e.key === 'Backspace' && index > 0) {
            inputRefs[index - 1].current.focus();
            inputRefs[index].current.value = '';
        } else {
            if (value !== '' && index < props.length - 1) {
                inputRefs[index + 1].current.focus();
            }
            inputRefs[index].current.value = value
        }

        if (inputRefs[props.length - 1].current.value != '') {
            props.handleToken(newToken)
        }
    };

    return (
        <>
            {token && token.map((digit, index) => (
                <input
                    className='comp__form__token__input'
                    key={index}
                    type="text"
                    defaultValue={digit}
                    onKeyUp={(e) => handleInputChange(e, index)}
                    ref={inputRefs[index]}
                    maxLength={1}
                />
            ))}
        </>
    );
};
export default InputTokenComp
