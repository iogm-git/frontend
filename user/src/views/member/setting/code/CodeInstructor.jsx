import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'
import Layouts from '@root/views/Layouts'
import InputTextComp from '@root/components/form/text/InputTextComp'
import LoadingComp from '@root/components/loading/LoadingComp'
import AlertCloseComp from '@root/components/AlertCloseComp'
import ModalComp from '@root/components/ModalComp'

import { AuthContext } from '@root/context/AuthProvider'
import { useCodeHooks } from '@root/hooks/Code'
import { _dataBanks, _searchData, _getFromData } from '@root/utils/helper'


const CodeInstructor = () => {
    const { stateBanksAccount,
        setBanksAccount,
        banksAccount, isLoading } = useCodeHooks()

    const navigate = useNavigate()

    const [banks, setBanks] = useState({ show: false, value: _dataBanks })
    const { user, userLoading } = useContext(AuthContext)
    const [bankName, setBankName] = useState('')

    useEffect(() => {

    }, [user, bankName, userLoading])

    useEffect(() => {
        if (user) {
            if (user.email === null || user.role === null || user.role === 'student') {
                navigate('/member/setting')
            }
        }
    })

    return (
        <Layouts>
            <section className='view__member__setting__code__register'>
                <h2 className="section-title">Bank</h2>
                {user &&
                    <>
                        <div className='view__member__setting__code__box grid-custom'>
                            <h2>Info</h2>
                            <InputTextComp type='text' name='name' value={user.name} disabled={true} />
                            <InputTextComp type='email' name='email' value={user.email} disabled={true} />
                        </div>
                        <form onSubmit={banksAccount().submit} className='view__member__setting__code__box grid-custom'>
                            <h2>Account</h2>
                            {stateBanksAccount.success && <AlertCloseComp type='success' msg={stateBanksAccount.success} close={banksAccount().removeMessage} />}
                            {userLoading ? <LoadingComp /> : user &&
                                <>
                                    <div className='view__member__setting__code__formel'>
                                        <InputTextComp type='number' name='number' value={user.account} handleInputOnChange={value => setBanksAccount(prev => ({ ...prev, account: value }))} />
                                        <p className='text-warning view__member__setting__code__formel'>Enter your bank account number correctly (without bank code)</p>
                                        {stateBanksAccount && stateBanksAccount.error && <p className='text-error-msg'>{stateBanksAccount.error.account}</p>}
                                        {stateBanksAccount && stateBanksAccount.error && stateBanksAccount.error.errors && <p className='text-error-msg'>{stateBanksAccount.error.errors[0].includes('Account') && stateBanksAccount.error.errors[0]}</p>}
                                    </div>
                                    <div className='view__member__setting__code__flex view__member__setting__code__formel'>
                                        <InputTextComp type='text' name='bank' value={bankName === '' ? _getFromData(user.bank, _dataBanks) : bankName} disabled={true} />
                                        <div className='button bg-primary' onClick={() => setBanks(prev => ({ ...prev, show: !prev.show }))}>Search Bank</div>
                                        {stateBanksAccount && stateBanksAccount.error && <p className='text-error-msg'>{stateBanksAccount.error.bank}</p>}
                                        {stateBanksAccount && stateBanksAccount.error && stateBanksAccount.error.errors && <p className='text-error-msg'>{stateBanksAccount.error.errors[0].includes('Bank') && stateBanksAccount.error.errors[0]}</p>}
                                    </div>
                                    {banks.show &&
                                        <ModalComp title='Banks' handleClose={() => setBanks({ show: false, value: _dataBanks })}
                                            content={
                                                <div className='view__member__setting__code__instructor__modal__content__banks'>
                                                    <div className='view__member__setting__code__instructor__modal__content__search__bank'>
                                                        <InputTextComp type='text' name='search...' handleInputOnChange={value => _searchData(value.toLowerCase(), _dataBanks, result => setBanks(prev => ({ ...prev, value: result })))} />
                                                    </div>
                                                    {banks.value.map((value, index) => (
                                                        <div onClick={() => { setBanksAccount(prev => ({ ...prev, bank: Object.keys(value)[0] })), setBanks({ show: false, value: _dataBanks }), setBankName(Object.values(value)[0]) }} key={index}
                                                            className='hover-progress view__member__setting__code__instructor__modal__content__bank'>
                                                            {Object.values(value)[0]}
                                                        </div>
                                                    ))}
                                                </div>
                                            } />
                                    }
                                    <div className='view__member__setting__code__formel'>
                                        <InputTextComp type='text' name='alias name' value={user.alias_name} handleInputOnChange={value => setBanksAccount(prev => ({ ...prev, alias_name: value }))} />
                                        <p className='text-warning view__member__setting__code__formel'>Alias name is used to indicate the owner of the bank, example : `johnbca`</p>
                                        {stateBanksAccount && stateBanksAccount.error && <p className='text-error-msg'>{stateBanksAccount.error.alias_name}</p>}
                                        {stateBanksAccount && stateBanksAccount.error && stateBanksAccount.error.errors && <p className='text-error-msg'>{stateBanksAccount.error.errors[0].includes('Alias') && stateBanksAccount.error.errors[0]}</p>}
                                    </div>
                                    <>
                                        {isLoading ? <LoadingComp /> : <button className="button badge-primary">Submit</button>}
                                    </>
                                    <a className='button bg-primary' href={import.meta.env.VITE_APP_URL_CODE + '/member/instructor/earnings#top'}>Visit IOGM - Code</a>
                                </>
                            }
                        </form>
                    </>
                }
            </section>
        </Layouts >
    )
}

export default CodeInstructor