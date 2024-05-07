import React, { useEffect, useRef, useState } from 'react'

import './InputSelectComp.css'

const InputSelectComp = (props) => {
    const [showOption, setShowOption] = useState(false)
    const [option, setOption] = useState('')
    const selectRef = useRef()

    function _setShowOption() {
        if (showOption) {
            setShowOption(false)
        } else {
            setShowOption(true)
        }
    }

    function handleInputChange(data) {
        props.handleInputOnChange(data)
        setOption(data)
        setShowOption(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShowOption(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='comp__form__select__input'>
            <div className={`comp__form__select__input__label ${option && 'hasValue'}`} ref={selectRef} onClick={_setShowOption}>
                {option ? <p>{option}</p> : <p>Select {props.name}</p>}
                <div className={`comp__form__select__input__label__icon ${showOption && 'active'}`}>
                    &#129170;
                </div>
            </div>
            {showOption &&
                <div className="comp__form__select__input__values">
                    {props.value.map((value, i) => (
                        <div className="comp__form__select__input__option" key={i} onClick={() => handleInputChange(value)}>
                            {value}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default InputSelectComp