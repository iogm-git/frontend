import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './AnswerComp.css'
import ModalComp from '@root/components/common/ModalComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import { useForm } from '@root/hooks/form'

import {
    questionsActions,
    storeAnswerActions,
    updateAnswerActions
} from "@root/redux/actions/member/instructor"

const AnswerComp = (props) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    const { data: success, loading, error } = useSelector(state => state.storeAnswerResult)
    const { data: updateSuccess, loading: updateLoading, error: updateError } = useSelector(state => state.updateAnswerResult)

    const initialState = {
        id: props && 'id' in props ? props.id : '',
        question_id: props && 'questionId' in props && props.questionId !== null ? props.questionId : props.id,
        answer: props && 'answer' in props ? props.answer : '',
    }

    const { handleChange, handleSubmit, formData } = useForm(initialState)

    useEffect(() => {

    }, [success, loading, error, updateSuccess, updateLoading, updateError])

    return (
        <>
            {(success || updateSuccess) &&
                <ModalComp title={t('updated-answer')} close={() => { dispatch(storeAnswerActions.success(null)); dispatch(updateAnswerActions.success(null)) }}
                    content={
                        <>
                            <div className="badge badge-success">{success ? success.message : updateSuccess && updateSuccess.message}</div>
                            <div className='button bg-primary' onClick={() => {
                                dispatch(storeAnswerActions.success(null))
                                dispatch(updateAnswerActions.success(null))
                                dispatch(questionsActions.init());
                            }}>
                                {t('refresh-my-answer')}
                            </div>
                        </>
                    }
                />
            }
            <div className="comp__member__instructor__answer__card">
                <div className="comp__member__instructor__answer__card__number">{props.index}</div>
                <div className="comp__member__instructor__answer__card__date">{t('question-date')} : {props.createdAt}</div>
                <div className="comp__member__instructor__answer__card__name">{props.questionName}</div>
                <div className="comp__member__instructor__answer__card__text">
                    <small className='comp__member__instructor__answer__card__label'>{t('question')}</small>
                    <div dangerouslySetInnerHTML={{ __html: props.question }}></div></div>
                <div className="comp__member__instructor__answer__card__text">
                    {editMode ?
                        <form className='comp__member__instructor__answer__card__form'
                            onSubmit={e => {
                                handleSubmit(e,
                                    props.questionId === null ?
                                        dispatch(storeAnswerActions.init(formData))
                                        : dispatch(updateAnswerActions.init(formData)))
                            }}>
                            <textarea onChange={value => handleChange(value, 'answer')} className='comp__member__instructor__answer__card__text' cols={30} rows={10} defaultValue={props.answer}></textarea>
                            {error && error.answer && <p className='text-error-msg'>{error.answer[0]}</p>}
                            {updateError && updateError.answer && <p className='text-error-msg'>{updateError.answer[0]}</p>}
                            {loading ? <LoadingComp /> : <button type='submit' className='comp__member__instructor__answer__card__button text-primary'>{t('submit')}</button>}
                            <div className='comp__member__instructor__answer__card__button text-warning' onClick={() => {
                                setEditMode(prev => !prev)
                                props.questionId === null ? dispatch(storeAnswerActions.failure(null)) : dispatch(updateAnswerActions.failure(null))
                            }}>{t('cancel')}</div>
                        </form>
                        : <>
                            <small className='comp__member__instructor__answer__card__label'>{t('answer')}</small>
                            {props.questionId === null ? <div className='badge badge-warning'>{t('view__member__instructor__answer__warning')}</div> :
                                <div dangerouslySetInnerHTML={{ __html: props.answer }}></div>
                            }
                        </>
                    }
                </div>
                <div className="comp__member__instructor__answer__card__tag">{props.iconSvg}</div>
                <div className='comp__member__instructor__answer__card__button text-success' onClick={() => {
                    setEditMode(prev => !prev)
                    props.questionId === null ? dispatch(storeAnswerActions.failure(null)) : dispatch(updateAnswerActions.failure(null))
                }}>{t('edit')}</div>
            </div >
        </>
    )
}

export default AnswerComp