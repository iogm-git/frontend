import React from 'react';
import Editor from '@monaco-editor/react';

import './MonacoComp.css';

const MonacoComp = (props) => {
    return (
        <div className='comp__code-block__monaco'>
            <Editor
                theme='vs-dark'
                onChange={props.handleInputOnChange}
                defaultLanguage={props.language}
                defaultValue={props.defaultValue}
            />
        </div>
    );
};

export default MonacoComp;
