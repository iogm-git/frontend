import Cookies from "js-cookie";

import { api } from "@root/services/api";
import { _isTokenExpired, _redirectToLogin } from "@root/utils/helper"
import {
    questionsActions,
    storeAnswerActions,
    updateAnswerActions,

    courseReviewsActions,
    earningsActions,
    disburseActions,

    studiesActions,
    storeCourseActions,
    updateCourseActions,
    destroyCourseActions,

    sectionsActions,
    storeSectionActions,
    updateSectionActions,
    destroySectionActions,

    lessonsActions,
    storeLessonActions,
    updateLessonActions,
    destroyLessonActions,
} from "@root/redux/actions/member/instructor";

export const fetchDataQuestions = (course_tag = '', order_by = 'latest', page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(questionsActions.request())
            await api.get(`code/member/instructor/questions?page=${page}&course_tag=${course_tag}&order_by=${order_by}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(questionsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataAnswer = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeAnswerActions.request())
            await api.post('code/member/instructor/answer', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeAnswerActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeAnswerActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataAnswer = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateAnswerActions.request())
            await api.put(`code/member/instructor/answer`, data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateAnswerActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateAnswerActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fecthDataCourseReviews = (page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(courseReviewsActions.request())
            await api.get(`code/member/instructor/course-reviews?page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(courseReviewsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataEarnings = () => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(earningsActions.request())
            await api.get('code/member/instructor/earnings', { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(earningsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataDisburse = () => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(disburseActions.request())
            await api.post('code/member/instructor/payout', null, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(disburseActions.success(data))
                }).catch(({ response }) => {
                    console.log(response);
                    dispatch(disburseActions.failure(response.data.message))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataStudies = (page = 1, filter = 'old') => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            let url = `code/member/instructor/studies?page=${page === undefined ? 1 : page}`

            if (filter !== undefined) url += `&order_by=${filter}`

            dispatch(studiesActions.request())
            await api.get(url, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(studiesActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataCourse = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeCourseActions.request())
            await api.post('code/member/instructor/course', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeCourseActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeCourseActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataCourse = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateCourseActions.request())
            await api.put('code/member/instructor/course', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateCourseActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateCourseActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataCourse = (id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroyCourseActions.request())
            await api.delete('code/member/instructor/course?id=' + id, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroyCourseActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroyCourseActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataSections = (id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(sectionsActions.request())
            await api.get('code/member/instructor/sections?id=' + id, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(sectionsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataSection = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeSectionActions.request())
            await api.post('code/member/instructor/section', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeSectionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeSectionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataSection = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateSectionActions.request())
            await api.put('code/member/instructor/section', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateSectionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateSectionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataSection = (id, sectionId) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroySectionActions.request())
            await api.delete(`code/member/instructor/section?id=${id}&section_id=${sectionId}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroySectionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroySectionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataLessons = (id, page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(lessonsActions.request())
            await api.get(`code/member/instructor/lessons?id=${id}&page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(lessonsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataLesson = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeLessonActions.request())
            await api.post('code/member/instructor/lesson', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeLessonActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeLessonActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataLesson = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateLessonActions.request())
            await api.put('code/member/instructor/lesson', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateLessonActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateLessonActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataLesson = (id, sectionId) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroyLessonActions.request())
            await api.delete(`code/member/instructor/lesson?id=${id}&section_id=${sectionId}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroyLessonActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroyLessonActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}