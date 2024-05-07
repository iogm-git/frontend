import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

export const _isTokenExpired = () => {
    if (!!Cookies.get("auth_token")) {
        if (jwtDecode(Cookies.get("auth_token")).exp < Date.now() / 1000) {
            Cookies.remove('auth_token')
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

export const _getImage = (name) => {
    if (name) return `${import.meta.env.VITE_APP_BASE_URL}/storage/images/${name}`
}

export const _redirectToLogin = () => {
    Cookies.set('to_url', window.location.href, { path: '/', domain: import.meta.env.VITE_APP_DOMAIN, expires: 3600 })
    window.location.href = import.meta.env.VITE_APP_URL_USER
}

export const _formatCurrency = (amount) => {
    const parts = parseFloat(amount).toFixed(2).toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `Rp. ${parts.join('.')}`;
}

export const _getPageFromUrl = (url) => {
    if (!url) return null;

    const queryString = url.split('?')[1];


    const queryParams = queryString.split('&');

    const pageParam = queryParams.find(param => param.startsWith('page='));

    if (pageParam) {
        return pageParam.split('=')[1];
    } else {
        return null;
    }
}

export const _isActiveLink = (link) => {
    const location = useLocation()
    const currentUrl = `${import.meta.env.VITE_APP_URL_CODE}${location.pathname}${location.hash}`

    return currentUrl.includes(link)
}
