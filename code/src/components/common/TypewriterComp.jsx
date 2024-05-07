import React, { useState, useEffect } from 'react';

const TypewriterComp = ({ data }) => {
    const [text, setText] = useState('');
    const [counter, setCounter] = useState(0);
    const [isDeleting, setDeleting] = useState(false);
    const [delay, setDelay] = useState(100);
    const [delta, setDelta] = useState(delay);

    useEffect(() => {
        function tick() {
            const index = counter % data.length;
            const element = data[index];

            if (isDeleting) {
                setText(prevText => element.substring(0, prevText.length - 1));
            } else {
                setText(prevText => element.substring(0, prevText.length + 1));
            }

            if (isDeleting) {
                setDelta(50);
            }

            if (!isDeleting && text === element) {
                setDelta(1000);
                setDeleting(true);
            } else if (isDeleting && text === '') {
                setDeleting(false);
                setCounter(prevCounter => (prevCounter + 1) % data.length);
                setDelta(delay);
            }
        }

        const timer = setTimeout(() => {
            tick();
        }, delta);

        // Clean up the timeout on component unmount
        return () => clearTimeout(timer);
    }, [text, counter, isDeleting, delay, delta, data]);

    return (
        <span>{text}</span>
    );
};

export default TypewriterComp;
