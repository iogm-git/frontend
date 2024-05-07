import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './PaginationComp.css'

const PaginationComp = ({ data, onPageChange }) => {
    const dispatch = useDispatch()

    function handlePageClick(value) {
        if (value.url !== null) {
            dispatch(onPageChange(value.url));
        }
    }

    useEffect(() => { }, [])

    return (
        data && data.length > 3 && <div className='comp__pagination'>
            {data.map((value, index) => (
                <a href='#top'
                    className={`comp__pagination__page ${value.active && 'active'}`}
                    key={index}
                    onClick={() => handlePageClick(value)}
                >
                    {value.label.includes('la') ? '<' : value.label.includes('ra') ? '>' : value.label}
                </a>
            ))}
        </div>
    )
}

export default PaginationComp