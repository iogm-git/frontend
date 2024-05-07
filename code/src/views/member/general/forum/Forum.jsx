import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'

import Layouts from '@root/views/Layouts'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import InputTextareaComp from '@root/components/common/form/InputTextareaComp'
import MenuComp from '@root/components/member/MenuComp'

import { storeDiscussionForumActions, discussionForumsActions } from '@root/redux/actions/member/general'

import './Forum.css'

const Forum = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const { data: chat, loading } = useSelector(state => state.discussionForumsData)
    const { data: success, loading: storeLoading, error } = useSelector(state => state.storeDiscussionForumResult)
    const { data: user } = useSelector(state => state.userData)

    const [data, setData] = useState({
        course_id: 1,
        message: '',
    })

    const [echo, setEcho] = useState(null)
    const [messages, setMessages] = useState()

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    };

    useEffect(() => {
        const config = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
            encrypted: true,
            wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST :
                `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
            wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
            wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });

        setEcho(config)

        return () => {
            config.disconnect();
        };
    }, []);

    useEffect(() => {
        if (echo) {
            echo.channel('store')
                .listen('.receive', (data) => {
                    setMessages(prevMsg => [...prevMsg, data.message])
                })
        }
    }, [echo])

    useEffect(() => {
        scrollToBottom()
    }, [loading, success, storeLoading, error, user, data, messages])

    useEffect(() => {
        if (chat && chat.data && chat.data.data) setMessages(chat.data.data)
    }, [chat])

    return (
        <Layouts>
            <MenuComp />
            <section className='view__layout__member view__member__general__forum'>
                <h1 className="section-title">{t('forum')}</h1>
                <hr style={{ width: '96%', placeSelf: 'center' }} />
                <div className='view__member__general__forum__filters'>
                    <div>{t('categories')} :</div>
                    <div className="view__member__general__forum__categories">
                        {chat && chat.data && Object.entries(chat.data.categories).map((value, index) => (
                            <div className={`view__member__general__forum__category ${value[1] === data.course_id ? 'active' : ''}`} key={index}
                                onClick={() => { dispatch(discussionForumsActions.init(value[1])); setData({ course_id: value[1], message: '' }) }}>
                                {value[0]}
                            </div>
                        ))}
                    </div>
                </div>
                {loading ? <LoadingComp /> :
                    <div className="view__member__general__forum__container">
                        <div className="view__member__general__forum__chat">
                            {messages && messages.length > 0 ?
                                <>
                                    <div className="view__member__general__forum__chat__header">
                                        {t('view__member__general__forum__chat__header')}
                                    </div>
                                    <div className="view__member__general__forum__chat__body">
                                        {messages && messages.map((message, index) => (
                                            <React.Fragment key={index}>
                                                {(index === 0 || messages[index].created_at.substring(0, 11) !== messages[index - 1].created_at.substring(0, 11)) &&
                                                    <small style={{ placeSelf: 'center' }}>{message.created_at.substring(0, 11)}</small>
                                                }
                                                {message.user_id === user.username ?
                                                    <div className="view__member__general__forum__chat__body__msg" aria-label='me'>
                                                        <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
                                                        <p className='view__member__general__forum__chat__body__msg__date'>{message.created_at.substring(15, 23)}</p>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p className='view__member__general__forum__chat__body__msg__name'>{('student' in message) ? message.student.name : message.instructor.name}</p>
                                                        <div className="view__member__general__forum__chat__body__msg">
                                                            <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
                                                            <p className='view__member__general__forum__chat__body__msg__date'>{message.created_at.substring(15, 23)}</p>
                                                        </div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                </> : <p className='view__member__general__forum__chat__warning'>{t('view__member__general__forum__chat__warning')}</p>}
                            <form className="view__member__general__forum__chat__message" onSubmit={e => { e.preventDefault(); dispatch(storeDiscussionForumActions.init(data)) }}>
                                <InputTextareaComp rule='view__member__general__forum__chat__message__input' handleInputOnChange={value => setData(prev => ({ ...prev, message: value }))} />
                                {error && error.message && <p className='text-error-msg'>{error.message[0]}</p>}
                                {storeLoading ? <LoadingComp /> : <button type='submit' className="view__member__general__forum__chat__message__button"><span>{t('send')}</span></button>}
                            </form>
                        </div>
                    </div>}
            </section>
        </Layouts>
    )
}

export default Forum