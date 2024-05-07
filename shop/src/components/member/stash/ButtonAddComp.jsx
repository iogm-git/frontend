import React, { useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'

import { MemberContext } from '@root/context/MemberProvider'

const ButtonAddComp = (props) => {
    const { getStashData, useLoading, handleStoreStash, useModal, setModal } = useContext(MemberContext)

    useEffect(() => {

    }, [useLoading, useModal])

    return (
        <>
            {useLoading ? <LoadingComp />
                : <a className='comp__card__web__action__link' onClick={() => handleStoreStash(props.webId)} data-tooltip='add'>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='web-add' />
                </a>
            }

            {useModal.show &&
                <ModalComp title='Add Stash' content={
                    <>
                        <p className={useModal.msg.includes('successfully') ? 'badge badge-success' : 'badge badge-danger'}>{useModal.msg}</p>
                        <HashLink onClick={() => { getStashData(); setModal({ show: false }) }} className='button bg-primary' smooth to='/member/stash#top'>See Stash</HashLink>
                    </>
                } close={() => setModal({ show: false })} />
            }
        </>
    )
}

export default ButtonAddComp