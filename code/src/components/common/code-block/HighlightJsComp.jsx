import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import './HighlightJsComp.css';

const HighlightJsComp = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (codeRef.current) {
        codeRef.current.removeAttribute('data-highlighted');
        hljs.highlightElement(codeRef.current);
        console.clear();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleCopy = () => {
    if (codeRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeRef.current);
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand('copy');

      selection.removeAllRanges();

      alert('Code copied to clipboard');
    }
  };

  return (
    <div className='comp__code-block__HighlightJs'>
      <div className='comp__code-block__HighlightJs__header'>
        <p>{language}</p>
        <div className='comp__code-block__HighlightJs__copy' onClick={handleCopy}>
          Copy
        </div>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        <code ref={codeRef} className={language === 'git' ? 'bash' : language}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default HighlightJsComp;

