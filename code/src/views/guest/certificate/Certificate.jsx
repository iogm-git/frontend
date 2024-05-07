import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layouts from '@root/views/Layouts';
import LoadingComp from '@root/components/common/loading/LoadingComp';
import './Certificate.css';
import { certificateActions } from '@root/redux/actions/guest';

const Certificate = () => {
    const { t } = useTranslation();
    const [params, setParams] = useSearchParams();
    const [certificateId, setCertificateId] = useState();
    const [secondsLeft, setSecondsLeft] = useState(0);

    const dispatch = useDispatch();
    const { data: certificate, loading, error } = useSelector(state => state.certificateData);

    useEffect(() => {
        if (params.get('id') != null) {
            dispatch(certificateActions.init(params.get('id')));
            setCertificateId(params.get('id'));
        }
    }, [dispatch]);

    useEffect(() => {

    }, [certificate, loading, error]);

    useEffect(() => {
        if (secondsLeft === 0) return;
        const intervalId = setInterval(() => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    return (
        <Layouts>
            <div className='bg-gradient view__guest__certificate__background'></div>
            <section className='grid-custom'>
                <h1 className="section-title" style={{ textShadow: '3px 4px 7px var(--transblue-color)' }}>{t('view__guest__certificate__section__title')}</h1>
                {secondsLeft !== 0 && loading ? (
                    <>
                        <LoadingComp />
                        <span>{secondsLeft}</span>
                    </>
                ) : error ? (
                    <div>
                        <div className="view__guest__certificate__errors">
                            {error && error.id.map((value, index) => (
                                <p className='badge badge-danger' key={index}>{value}</p>
                            ))}
                        </div>
                    </div>
                ) : certificate && certificate.image ? (
                    <img className='view__guest__certificate__image' src={`data:image/jpeg;base64,${certificate.image}`} alt="Certificate" />
                ) : null}
                <fieldset>
                    <legend>Id</legend>
                    <input className='view__guest__certificate__input' type="text" placeholder='...' defaultValue={certificateId} onChange={event => {
                        setCertificateId(event.target.value);
                        setParams({ id: event.target.value });
                    }} />
                </fieldset>
                {loading ? <LoadingComp /> :
                    <div className="button bg-primary view__guest__certificate__button" onClick={() => {
                        dispatch(certificateActions.init(certificateId));
                        setSecondsLeft(60);
                    }}>{t('search')}</div>
                }
            </section>
        </Layouts>
    );
};

export default Certificate;
