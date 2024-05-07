import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'

import { sectionsActions, destroyCourseActions, destroySectionActions } from '@root/redux/actions/member/instructor'
import { _formatCurrency } from '@root/utils/helper'

import './Sections.css'

const Sections = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { state } = location
  const { data: sections, loading } = useSelector(state => state.sectionsData)
  const { data: success, error, loading: destroySectionLoading } = useSelector(state => state.destroySectionResult)
  const { data: successDestroyCourse, error: errorDestroyCourse, loading: destroyCourseLoading } = useSelector(state => state.destroyCourseResult)

  useEffect(() => {
    if (state === null) {
      navigate('/member/instructor/courses#top')
    } else {
      dispatch(sectionsActions.init(state && state.id))
    }
  }, [])

  useEffect(() => {

  }, [sections, success, error, loading, destroySectionLoading])

  return (
    <Layouts>
      {(successDestroyCourse || errorDestroyCourse) && <ModalComp title={t('delete-course')} close={() => {
        if (errorDestroyCourse) {
          dispatch(destroyCourseActions.failure(null))
        } else if (successDestroyCourse) {
          dispatch(destroyCourseActions.success(null))
          dispatch(studiesActions.init(undefined, filter))
          navigate('/member/instructor/courses#top')
        }
      }} content={
        errorDestroyCourse ? <>
          <div className="badge badge-danger">{errorDestroyCourse}</div>
        </> : successDestroyCourse && <div className="badge badge-success">{successDestroyCourse.message}</div>
      } />}
      {(success || error) && <ModalComp title={t('delete-section')} close={() => {
        if (error) {
          dispatch(destroySectionActions.failure(null))
        } else if (success) {
          dispatch(destroySectionActions.success(null))
          dispatch(sectionsActions.init(state && state.id))
        }
      }} content={
        error ? <>
          <div className="badge badge-danger">{error}</div>
        </> : success && <div className="badge badge-success">{success.message}</div>
      } />}
      <MenuComp />
      <section className='view__layout__member'>
        <SvgComp rule='view__member__instructor__sections__svg' path='svg' file='programming' icon={state && state.icon_svg} />
        <hr />
        <div className="view__member__instructor__sections__details">
          <p>{t('title')} : {state && state.title}</p>
          <p>{t('status')} : {state && t(state.status)}</p>
          <p>{t('price')} : {_formatCurrency(state && state.price)}</p>
        </div>
        <hr />
        <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: state && state.description }}></div>
        <hr />
        <div className="view__member__instructor__sections__buttons">
          <HashLink smooth to='/member/instructor/courses#top' className='button btn-warning'>
            {t('back')}
          </HashLink>
          <div className="button btn-success" onClick={() =>
            navigate('/member/instructor/courses/edit#top', {
              state: {
                id: state && state.id,
                title: state && state.title,
                price: state && state.price,
                description: state && state.description,
                icon_svg: state && state.icon_svg,
                status: state && state.status
              }
            })}>{t('view__member__instructor__sections__button__edit')}</div>
          <div className='button btn-primary' onClick={() =>
            navigate('add#top', {
              state: {
                id: state && state.id,
                title: state && state.title,
                price: state && state.price,
                description: state && state.description,
                icon_svg: state && state.icon_svg,
                level: state && state.level,
                status: state && state.status
              }
            })}>{t('view__member__instructor__sections__button__add')}</div>
          {destroyCourseLoading ? <LoadingComp /> :
            <div className="button btn-danger" onClick={() => {
              confirm('Delete course ?') && dispatch(destroyCourseActions.init(state && state.id))
            }}>{t('view__member__instructor__sections__button__delete')}</div>}
        </div>
        <hr />
        {loading ? <LoadingComp />
          : sections && sections.data && sections.data.length > 0 ?
            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>{t('title')}</th>
                    <th>{t('view__member__instructor__section__form__label')}</th>
                    <th>{t('created-at')}</th>
                    <th>{t('updated-at')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.data.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{value.title}</td>
                      <td className='view__member__instructor__sections__order'>{value.order_in_course}</td>
                      <td>{value.created_at}</td>
                      <td>{value.updated_at}</td>
                      <td className='view__member__instructor__sections__actions'>
                        <div className="view__member__instructor__sections__action__button text-success" onClick={() =>
                          navigate('lessons#top', {
                            state: {
                              section_id: value.id,
                              section_title: value.title,
                              id: state && state.id,
                              title: state && state.title,
                              price: state && state.price,
                              description: state && state.description,
                              icon_svg: state && state.icon_svg,
                              status: state && state.status
                            }
                          })}>{t('show')}</div>
                        <div className='view__member__instructor__sections__action__button text-warning' onClick={() => {
                          navigate('edit#top', {
                            state: {
                              section_id: value.id,
                              section_title: value.title,
                              section_order_in_course: value.order_in_course,
                              id: state && state.id,
                              title: state && state.title,
                              price: state && state.price,
                              description: state && state.description,
                              icon_svg: state && state.icon_svg,
                              status: state && state.status,
                            }
                          })
                        }}>{t('edit')}</div>
                        {destroySectionLoading ? <LoadingComp /> :
                          <p className="view__member__instructor__sections__action__button text-danger" onClick={() => { confirm(`${t('delete-section')}, title: ${value.title} ?`) && dispatch(destroySectionActions.init(state.id, value.id)) }}>{t('delete')}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            : <div className='badge badge-danger' style={{ placeSelf: 'center' }}>{t('no-data')}</div>}
      </section>
    </Layouts>
  )
}

export default Sections