import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Layouts from '@root/views/Layouts'
import MenuComp from '@root/components/member/MenuComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'

import './Certificates.css'
import { HashLink } from 'react-router-hash-link'
import { useSelector } from 'react-redux'
import { handleDownloadCertification } from '@root/services/member/student'

const Certificates = () => {
    const { t } = useTranslation()

    const { data: certificates, loading } = useSelector(state => state.certificatesData)
    const [isLoading, _setLoading] = useState(false)

    function setLoading(value) {
        _setLoading(value)
    }

    useEffect(() => { }, [certificates, loading])

    return (
        <Layouts>
            <MenuComp />
            <section className="view__layout__member">
                <h1 className="section-title">{t('my-certificates')}</h1>
                <hr />
                {loading ? <LoadingComp />
                    : certificates.data && certificates.data.length > 0 ?
                        <div className="table-box">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>{t('name')}</th>
                                        <th>{t('instructor')}</th>
                                        <th>{t('created-at')}</th>
                                        <th>{t('actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificates.data.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.course.title}</td>
                                            <td>{value.course.instructor.name}</td>
                                            <td>{value.created_at}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {isLoading ? <LoadingComp />
                                                    : <div className="text-success view__member__student__certificates"
                                                        onClick={() => handleDownloadCertification(value.course_id, `${value.course.title}-${value.student.name}`, setLoading)}>{t('download')}</div>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : <>
                            <div className='bg-gradient' style={{ '--first-gradient-color': 'var(--transblue-color)', '--second-gradient-color': 'var(--transred-color)' }}></div>
                            <p style={{ placeSelf: 'center', textAlign: 'center' }}>{t('view__member__student__certificates__warning')}</p>
                            <HashLink className='button btn-primary' style={{ placeSelf: 'center' }} smooth to='/courses#top'>{t('see-courses')}</HashLink>
                        </>}
            </section>
        </Layouts>
    )
}

export default Certificates