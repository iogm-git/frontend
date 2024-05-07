import Cookies from "js-cookie";

import { api } from "./api";
import { _isTokenExpired, _redirectToLogin } from "@root/utils/helper"
import { userActions } from "@root/redux/actions/auth";
import { certificatesActions, courseProgressActions, studentCoursesActions, studentCoursesReviewsActions, answersActions, stashesActions, transactionsActions, } from "@root/redux/actions/member/student";
import { questionsActions, courseReviewsActions, earningsActions, studiesActions } from "@root/redux/actions/member/instructor";
import { discussionForumsActions } from "@root/redux/actions/member/general";

export const fetchDataUser = () => async dispatch => {

    if (!Cookies.get("auth_token")) {
        dispatch(userActions.success({ status: 'need login' }))
    } else {
        if (!_isTokenExpired()) {
            await api.post('/user/guest/auth/me', null, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(async ({ data }) => {
                    let member = data
                    await api.get('/code/member/general/me', { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                        .then(({ data }) => {
                            if (!('status' in data.data)) {
                                member.address = data.data.address
                                member.dob = data.data.dob
                                member.role = data.data.role
                                if (data.data.role === 'instructor') {
                                    member.account = data.data.account
                                    member.bank = data.data.bank
                                    member.alias_name = data.data.alias_name
                                }
                            }

                            dispatch(userActions.success(member))
                            dispatch(discussionForumsActions.init())

                            if (data.data.role === 'student') {
                                dispatch(certificatesActions.init())
                                dispatch(studentCoursesActions.init())
                                dispatch(studentCoursesReviewsActions.init())
                                dispatch(courseProgressActions.init())
                                dispatch(answersActions.init())
                                dispatch(stashesActions.init())
                                dispatch(transactionsActions.init())
                            } else if (data.data.role === 'instructor') {
                                dispatch(questionsActions.init())
                                dispatch(courseReviewsActions.init())
                                dispatch(earningsActions.init())
                                dispatch(studiesActions.init())
                            }
                        })
                }).catch((response) => {
                    dispatch(userActions.failure(response.error))
                })
        }
    }
};

export const handleLogout = async dispatch => {
    if (!_isTokenExpired()) {
        await api.post('user/guest/auth/logout', null, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
            .then(() => {
                Cookies.remove('to_url', { domain: import.meta.env.VITE_APP_DOMAIN })
                Cookies.remove('auth_token', { domain: import.meta.env.VITE_APP_DOMAIN })
                window.location.href = import.meta.env.VITE_APP_URL_CODE
                dispatch(userActions.success(null))
            })
    } else {
        _redirectToLogin()
    }
}