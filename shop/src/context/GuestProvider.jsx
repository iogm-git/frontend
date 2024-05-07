import React, { createContext, useEffect, useState } from 'react';

import { api } from '@root/services/api'

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [webCategoriesData, setWebCategoriesData] = useState([])
    const [webDetailsData, setWebDetailsData] = useState([])
    const [webPaginationsData, setWebPaginationsData] = useState([])
    const [webShowData, setWebShowData] = useState([])
    const [useLoading, setLoading] = useState(false)

    const getWebCategoriesData = async () => {
        setLoading(true)
        await api.get('shop/guest/web/categories')
            .then(({ data }) => { setWebCategoriesData(data.data); setLoading(false) })
    }

    const getWebDetailsData = async (param) => {
        setLoading(true)
        // removeClassActivePage()
        await api.get('shop/guest/web/details?page=' + param)
            .then(({ data }) => {
                setWebDetailsData(data.data.data)
                setWebPaginationsData(data.data.links)
                setLoading(false)
            })
    }

    const getWebDataByShow = async (category, type) => {
        setLoading(true)
        await api.get(`/shop/guest/web/show?category=${category}&type=${type}`)
            .then(({ data }) => { setWebShowData(data.data); setLoading(false) })
    }

    // select data by category web
    async function getWebDataByCategory(param) {
        setLoading(true)
        await api.get(`shop/guest/web/category?name=${param}`)
            .then(({ data }) => { setWebDetailsData(data.data); setLoading(false) })
    }

    // select data by search
    async function getWebDataBySearch(event) {
        if (event.target.value) {
            setLoading(true)
            await api.get(`shop/guest/web/search?keyword=${event.target.value}`)
                .then(({ data }) => { setWebDetailsData(data.data); setLoading(false) })
        } else {
            getWebDetailsData()
        }
    }

    useEffect(() => {
        getWebDetailsData(1)
        getWebCategoriesData()
    }, [])

    return (
        <GuestContext.Provider value={{
            webDetailsData,
            webCategoriesData,
            webPaginationsData,
            webShowData,
            getWebDetailsData,
            getWebDataByCategory,
            getWebDataByShow,
            getWebDataBySearch,
            useLoading
        }}>
            {children}
        </GuestContext.Provider>
    );
};