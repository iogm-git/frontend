import Cookies from "js-cookie";

import { api } from "@root/services/api"
import { _isTokenExpired, _redirectToLogin } from "@root/utils/helper"
import { discussionForumsActions, storeDiscussionForumActions, updateDobAddressActions } from "@root/redux/actions/member/general"

export const fetchDataDiscussionForums = (course_id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(discussionForumsActions.request())
            await api.get(`code/member/general/discussion-forums${course_id ? `?course_id=${course_id}` : ''}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(discussionForumsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}
export const storeDataDiscussionForum = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeDiscussionForumActions.request())
            await api.post('code/member/general/discussion-forum', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeDiscussionForumActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeDiscussionForumActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDobAddress = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateDobAddressActions.request())
            await api.put('code/member/general/dob-address', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateDobAddressActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateDobAddressActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}