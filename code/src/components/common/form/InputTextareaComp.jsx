import React from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"

const modules = {
    toolbar: [
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // [{ font: [] }],
        // [{ size: [] }],
        ["bold", "italic", "underline"],
        // [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ]
}

const InputTextareaComp = ({ handleInputOnChange, oldValue, rule }) => {

    return (
        <ReactQuill className={rule} theme='snow' defaultValue={oldValue} onChange={handleInputOnChange} modules={modules} />
    )
}

export default InputTextareaComp