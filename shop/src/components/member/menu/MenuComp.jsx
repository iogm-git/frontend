import React, { useContext, useState } from 'react'

import { HashLink } from 'react-router-hash-link'
import SvgComp from '@root/components/common/SvgComp'

import { MemberContext } from '@root/context/MemberProvider'

import './MenuComp.css'

const MenuComp = () => {
    const { handleLogout, goSetting } = useContext(MemberContext)
    const [menuActive, setMenuActive] = useState(false)

    function setActive() {
        if (menuActive) {
            setMenuActive(false)
        } else {
            setMenuActive(true)
        }
    }

    return (<>
        <div className={`comp__member__menu__icon ${menuActive ? 'active' : ''}`} onClick={setActive}>
            <SvgComp rule='comp__member__menu__icon__svg' path='svg' file='member' icon='arrow_top' />
        </div>
        <menu className={`comp__member__menu ${menuActive ? 'active' : ''}`}>
            <HashLink className={`comp__member__menu__a ${location.pathname.includes('/member/profile') ? 'active' : ''}`} smooth to='/member/profile#top'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='profile' />
                <p>Profile</p>
            </HashLink>
            <a onClick={goSetting} className='comp__member__menu__a'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='setting' />
                <p>Setting</p>
            </a>
            <HashLink className={`comp__member__menu__a ${location.pathname.includes('/member/stash') ? 'active' : ''}`} smooth to='/member/stash#top'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='stash' />
                <p>Stash</p>
            </HashLink>
            <HashLink className={`comp__member__menu__a ${location.pathname.includes('/member/download') ? 'active' : ''}`} smooth to='/member/download#top'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='download' />
                <p>Download</p>
            </HashLink>
            <HashLink className={`comp__member__menu__a ${location.pathname.includes('/member/purchase') ? 'active' : ''}`} smooth to='/member/purchase#top'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='purchase' />
                <p>Purchase</p>
            </HashLink>
            <HashLink className={`comp__member__menu__a ${location.pathname.includes('/member/transactions') ? 'active' : ''}`} smooth to='/member/transactions#top'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='transactions' />
                <p>Transactions</p>
            </HashLink>
            <div onClick={handleLogout} className='comp__member__menu__a'>
                <SvgComp rule='svg-l' path='svg' file='member' icon='logout' />
                <p>Logout</p>
            </div>
        </menu>
    </>
    )
}

export default MenuComp