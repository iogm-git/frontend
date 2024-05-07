import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function getImage(name) {
    if (name) return `${import.meta.env.VITE_APP_BASE_URL}/storage/images/${name}`
}

export function isTokenExpired(token) {
    if (!!token) {
        if (jwtDecode(token).exp < Date.now() / 1000) {
            Cookies.remove('auth_token')
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

export function useHeadersConfig(token) {
    return { headers: { Authorization: 'Bearer ' + token } }
}

export function useRedirectToLogin() {
    Cookies.set('to_url', window.location.href, { path: '/', domain: import.meta.env.VITE_APP_DOMAIN, expires: 3600 })
    Cookies.remove('auth_token', { domain: import.meta.env.VITE_APP_DOMAIN })
    window.location.href = import.meta.env.VITE_APP_URL_USER
}