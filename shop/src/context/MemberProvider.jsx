import { createContext, useContext, useEffect, useState } from "react";

import { api } from "@root/services/api.js"
import { isTokenExpired, useHeadersConfig, useRedirectToLogin } from "@root/utils/helper";
import { AuthContext } from "./AuthProvider";
import Cookies from "js-cookie";

export const MemberContext = createContext()

export const MemberProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext)
    const [stashData, setStashData] = useState()
    const [transactionData, setTransactionData] = useState()
    const [latestTransactionData, setLatestTransactionData] = useState()
    const [downloadWebData, setDownloadWebData] = useState()
    const [useModal, setModal] = useState({ show: false })
    const [useLoading, setLoading] = useState(false)

    const getStashData = async () => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.get('shop/member/stash', useHeadersConfig(token))
                .then(({ data }) => { setStashData(data.data); setLoading(false) })
                .catch(() => { setStashData(); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const handleStoreStash = async (webId) => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.post('shop/member/stash', { web_id: webId }, useHeadersConfig(token))
                .then(({ data }) => { setModal({ show: true, msg: data.message }); setLoading(false) })
                .catch(({ response }) => { setModal({ show: true, msg: response.data.message }); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const handleDestroyStash = async (webId) => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.delete(`shop/member/stash?id=${webId}`, useHeadersConfig(token))
                .then(({ data }) => { setModal({ show: true, msg: data.message }); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const handleDownloadTransaction = async () => {
        if (!isTokenExpired(token) && user) {
            setLoading(true)
            const res = await api.get('shop/member/download/transactions',
                {
                    headers: { Authorization: 'Bearer ' + token },
                    responseType: 'arraybuffer'
                })
            // Create a Blob from the response data
            const blob = new Blob([res.data], { type: 'application/pdf' });

            // Create a download link
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `transactions-${user.email}.pdf`;

            // Append the link to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);

            setLoading(false)
        } else {
            useRedirectToLogin()
        }
    }

    const handleDownloadFileZipWeb = async (transactionId) => {
        if (!isTokenExpired(token) && user) {
            const res = await api.get(`/shop/member/download/web?id=${transactionId}`,
                {
                    headers: { Authorization: 'Bearer ' + token },
                    responseType: 'blob',
                })
            // Create a Blob from the response data
            const blob = new Blob([res.data], { type: 'application/zip' });

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = transactionId + '.zip'; // Set the desired file name

            // Append the link to the body and trigger the click event
            document.body.appendChild(link);
            link.click();

            // Remove the link element after the download
            document.body.removeChild(link);
        } else {
            useRedirectToLogin()
        }
    }

    const getTransactionData = async () => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.get('shop/member/transaction/information', useHeadersConfig(token))
                .then(({ data }) => { setTransactionData(data.data); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const getLatestTransactionData = async () => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.get('shop/member/transaction/latest-unpaid', useHeadersConfig(token))
                .then(({ data }) => { setLatestTransactionData(data.data); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const getDownloadWebData = async () => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.get('shop/member/transaction/have-paid', useHeadersConfig(token))
                .then(({ data }) => { setDownloadWebData(data.data); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const handleStoreTransaction = async (web_id) => {
        if (!isTokenExpired(token)) {
            setLoading(true)
            await api.post(`shop/member/transaction/store`, { web_id: web_id }, useHeadersConfig(token))
                .then(({ data }) => { setModal({ show: true, msg: data.message }); getTransactionData(); getLatestTransactionData(); setLoading(false) })
        } else {
            useRedirectToLogin()
        }
    }

    const handleLogout = async () => {
        if (!isTokenExpired(token) && user) {
            await api.post('user/guest/auth/logout', null, useHeadersConfig(token))
                .then(() => {
                    Cookies.remove('to_url', { domain: import.meta.env.VITE_APP_DOMAIN })
                    Cookies.remove('auth_token', { domain: import.meta.env.VITE_APP_DOMAIN })
                    window.location.href = import.meta.env.VITE_APP_URL_SHOP
                })
        } else {
            useRedirectToLogin()
        }
    }

    const goSetting = () => {
        Cookies.set('to_url', window.location.href, { path: '/', domain: import.meta.env.VITE_APP_DOMAIN, expires: 3600 })
        window.location.href = import.meta.env.VITE_APP_URL_USER + '/member/setting'
    }

    useEffect(() => {
        if (user) {
            if (user.id) {
                getStashData()
                getTransactionData()
            }
            if (user.verification_at) {
                getLatestTransactionData()
                getDownloadWebData()
            }
        }
    }, [user])

    return (
        <MemberContext.Provider value={{
            stashData,
            getStashData,
            handleStoreStash,
            handleDestroyStash,
            handleDownloadTransaction,
            handleDownloadFileZipWeb,
            transactionData,
            getTransactionData,
            latestTransactionData,
            getLatestTransactionData,
            downloadWebData,
            getDownloadWebData,
            handleStoreTransaction,
            handleLogout,
            goSetting,
            useModal,
            setModal,
            useLoading,
        }}>
            {children}
        </MemberContext.Provider>
    );
}
