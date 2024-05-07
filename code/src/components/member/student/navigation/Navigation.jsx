import React, { useState, useEffect } from 'react';
import SvgComp from '@root/components/common/SvgComp';
import './Navigation.css';

const Navigation = ({ handleOnChange, sections }) => {
    const [show, setShow] = useState(false);
    const [activeSection, setActiveSection] = useState({ index: 0, title: '' });

    useEffect(() => {
        if (sections) {
            const handleScroll = () => {
                const scrollPosition = window.scrollY;

                sections.forEach((value, index) => {
                    const sectionElement = document.getElementById(value.title);
                    if (sectionElement) {
                        const { offsetTop, offsetHeight } = sectionElement;
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            setActiveSection({ index: index, title: value.title });
                        }
                    }
                });
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [sections]);

    // function handleOnHashChange(index, len) {
    //     handleOnChange(index === 0 ? 0 : index - 1, index === len - 1 ? len - 1 : index + 1)
    // }

    useEffect(() => {
        // handleOnHashChange(activeSection.index, sections && sections.length)
        window.history.replaceState(null, null, `#${activeSection.title}`);
    }, [activeSection])

    return (
        <div className={`comp__member__student__navigation ${show ? 'active' : ''}`}>
            <div className={`comp__member__student__navigation__button ${show ? 'active' : ''}`} onClick={() => setShow(prev => !prev)}>
                <SvgComp rule='svg-m' path='svg' file='common' icon='click' />
                <small>{show ? 'Close' : 'Open'}</small>
            </div>
            <div className='comp__member__student__navigation__box'>
                <h3 className='comp__member__student__navigation__box__title'>Navigation</h3>
                <div className="comp__member__student__navigation__links">
                    {sections && sections.map((value, index) => (
                        <a key={index} href={`#${value.title}`}
                            className={`comp__member__student__navigation__link ${activeSection.title === value.title ? 'active' : ''}`}
                            onClick={() => {
                                // handleOnHashChange(index, sections.length)
                                setActiveSection({ index: index, title: value.title })
                            }}>
                            {value.order_in_section + '. ' + value.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navigation;
