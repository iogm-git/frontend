import React, { useContext } from 'react'
import { HashLink } from 'react-router-hash-link'

import SvgComp from '@root/components/common/SvgComp'
import LoadingComp from '@root/components/common/loading/LoadingComp'
import ModalComp from '@root/components/common/ModalComp'

import { MemberContext } from '@root/context/MemberProvider'

const ButtonRemoveComp = (props) => {
    const { getStashData, useLoading, handleDestroyStash, useModal, setModal } = useContext(MemberContext)

    return (
        <>
            {useLoading ? <LoadingComp />
                : <a className='comp__card__web__action__link' onClick={() => handleDestroyStash(props.webId)} data-tooltip='rmv'>
                    <SvgComp rule='svg-l' path='svg' file='member' icon='web-rmv' />
                </a>
            }

            {useModal.show &&
                <ModalComp title='Remove Stash' content={
                    <>
                        <p className={useModal.msg.includes('successfully') ? 'badge badge-success' : 'badge badge-danger'}>{useModal.msg}</p>
                        <div className='button bg-success' onClick={() => { getStashData(); setModal({ show: false }) }}>See Stash</div>
                        <HashLink className='button bg-primary' onClick={() => { getStashData(); setModal({ show: false }) }} smooth to='/#website'>See Another Web</HashLink>
                    </>
                } close={() => setModal({ show: false })} />
            }
        </>
    )
}

export default ButtonRemoveComp