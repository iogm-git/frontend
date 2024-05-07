import React, { useEffect, useRef, useState } from 'react';

import SvgComp from '@root/components/SvgComp';
import './InputTextComp.css';


const InputTextComponent = (props) => {
    let value = ''
    if (props.value) value = props.value

    const labelRef = useRef();
    const inputRef = useRef();
    const [hasFocus, setHasFocus] = useState(false);

    function checkClass() {
        if (inputRef.current && labelRef.current) {
            const hasValue = inputRef.current.value.trim() !== '';

            if (hasValue || hasFocus) {
                labelRef.current.classList.add('active');
                inputRef.current.classList.add('active');
            } else {
                labelRef.current.classList.remove('active');
                inputRef.current.classList.remove('active');
            }
        }
    }

    function handleInputChange(e) {
        checkClass();
        props.handleInputOnChange(e.target.value);
    }

    function handleInputFocus() {
        setHasFocus(true);
        checkClass();
    }

    function handleInputBlur() {
        setHasFocus(false);
        checkClass();
    }

    function togglePasswordVisibility() {
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    };

    useEffect(() => {
        checkClass();
    }, [hasFocus, props.value]);

    return (
        <div className="comp__form__input__text">
            <label className='comp__form__input__text__label' ref={labelRef} htmlFor={props.name}>
                {props.name}
            </label>
            <input
                className='comp__form__input__text__input'
                id={props.name}
                name={props.name}
                type={props.type}
                defaultValue={value}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                autoComplete="off"
                disabled={props.disabled}
            />
            {props.type === 'password' && (
                <div onClick={togglePasswordVisibility} className='comp__form__input__text__input__icon__password see-password'>
                    <SvgComp rule='comp__form__input__text__input__icon__password__svg svg-l' path='svg' file='guest' icon='password' />
                </div>
            )}
        </div>
    );
};

export default InputTextComponent;
