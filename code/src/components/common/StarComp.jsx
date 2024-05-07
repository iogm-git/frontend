import React, { useEffect, useState } from 'react'

const StarComp = ({ rating, useForm = true, handleInputOnChange }) => {
    const [point, setPoint] = useState(rating)
    const [rate, setRate] = useState(0)
    const stars = [];

    function onChange(value) {
        handleInputOnChange(value)
    }

    function changeRate(i) {
        if (rate === i * 2) {
            setRate(0)
        } else {
            setRate(i * 2)
        }
        setPoint(i * 2)
        onChange(i * 2)
    }

    if (useForm) {
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(point / 2)) {
                stars.push(
                    <span
                        key={i}
                        onClick={() => changeRate(i)}
                        style={{ color: 'var(--orange-color)', cursor: 'pointer' }}
                    >
                        &#9733;
                    </span>);
            } else {
                stars.push(<span
                    key={i}
                    onClick={() => changeRate(i)} style={{ color: 'var(--orange-color)', cursor: 'pointer' }}>&#9734;</span>);
            }
        }
    } else {
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(point / 2)) {
                stars.push(<span key={i} style={{ color: 'var(--orange-color)' }}>&#9733;</span>);
            } else {
                stars.push(<span key={i} style={{ color: 'var(--orange-color)' }}>&#9734;</span>);
            }
        }
    }

    useEffect(() => { }, [point, stars])

    return (
        <>
            {stars}
        </>
    );
}

export default StarComp