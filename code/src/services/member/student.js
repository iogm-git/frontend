import Cookies from "js-cookie";

import { api } from "@root/services/api";
import { _isTokenExpired, _redirectToLogin } from "@root/utils/helper"
import {
    certificatesActions,
    studentCoursesActions,
    studentSectionsActions,
    studentLessonsActions,
    courseProgressActions,

    updateCompletedLecturesActions,

    studentCoursesReviewsActions,
    storeStudentCoursesReviewActions,
    updateStudentCoursesReviewActions,
    destroyStudentCoursesReviewActions,

    answersActions,
    storeQuestionActions,
    destroyStashActions,

    stashesActions,
    storeStashActions,

    transactionsActions,
    storeTransactionActions,
    storeTransactionFreeActions,
    destroyTransactionActions
} from "@root/redux/actions/member/student";

export const fetchDataCertificates = () => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(certificatesActions.request())
            await api.get('code/member/student/certificates', { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(certificatesActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const handleDownloadCertification = async (id, title, callback) => {
    if (!_isTokenExpired()) {
        callback(true)
        await api.get(`code/member/student/certificate?course_id=${id}`,
            { responseType: 'blob', headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
            .then(({ data }) => {
                const blob = new Blob([data], { type: 'application/pdf' });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `${title}.pdf`;

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);

                callback(false)
            })
    } else {
        _redirectToLogin();
    }
};

export const fetchDataCourses = (page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(studentCoursesActions.request())
            await api.get(`code/member/student/courses?page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(studentCoursesActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataSection = (course_id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(studentSectionsActions.request())
            await api.get(`code/member/student/sections?course_id=${course_id}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(studentSectionsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataLesson = (course_id, section_id, page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(studentLessonsActions.request())
            await api.get(`code/member/student/lessons?course_id=${course_id}&section_id=${section_id}&page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(studentLessonsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataCourseProgress = () => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(courseProgressActions.request())
            await api.get('code/member/student/course-progress', { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(courseProgressActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataCompletedLectures = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateCompletedLecturesActions.request())
            await api.put('code/member/student/completed-lectures', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateCompletedLecturesActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateCompletedLecturesActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataStudentCourseReviews = (page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(studentCoursesReviewsActions.request())
            await api.get(`code/member/student/reviews?page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(studentCoursesReviewsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataStudentCourseReview = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeStudentCoursesReviewActions.request())
            await api.post('code/member/student/review', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeStudentCoursesReviewActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeStudentCoursesReviewActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const updateDataStudentCourseReview = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(updateStudentCoursesReviewActions.request())
            await api.put('code/member/student/review', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(updateStudentCoursesReviewActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(updateStudentCoursesReviewActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataStudentCourseReview = (id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroyStudentCoursesReviewActions.request())
            await api.delete('code/member/student/review?course_id=' + id, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroyStudentCoursesReviewActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroyStudentCoursesReviewActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataAnswers = (course_tag = 'all', order_by = 'new', page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(answersActions.request())
            await api.get(`code/member/student/answers?course_tag=${course_tag}&order_by=${order_by}&page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(answersActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataQuestion = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeQuestionActions.request())
            await api.post('code/member/student/question', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeQuestionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeQuestionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataStashes = (page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(stashesActions.request())
            await api.get(`code/member/student/stashes?page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(stashesActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataStash = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeStashActions.request())
            await api.post('code/member/student/stash', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeStashActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeStashActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataStash = (id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroyStashActions.request())
            await api.delete('code/member/student/stash?course_id=' + id, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroyStashActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroyStashActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const fetchDataTransactions = (page = 1) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(transactionsActions.request())
            await api.get(`code/member/student/transactions?page=${page}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(transactionsActions.success(data))
                })
        } else {
            _redirectToLogin()
        }
    }
}

export const storeDataTransaction = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeTransactionActions.request())
            await api.post('code/member/student/transaction', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeTransactionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeTransactionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}
export const storeDataTransactionFree = (data) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(storeTransactionFreeActions.request())
            await api.post('code/member/student/transaction/free', data, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(storeTransactionFreeActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(storeTransactionFreeActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}

export const destroyDataTransaction = (order_id, course_id) => {
    return async dispatch => {
        if (!_isTokenExpired()) {
            dispatch(destroyTransactionActions.request())
            await api.delete(`code/member/student/transaction?order_id=${order_id}&course_id=${course_id}`, { headers: { Authorization: 'Bearer ' + Cookies.get('auth_token') } })
                .then(({ data }) => {
                    dispatch(destroyTransactionActions.success(data))
                }).catch(({ response }) => { console.log(response); dispatch(destroyTransactionActions.failure(response.data.message)) })
        } else {
            _redirectToLogin()
        }
    }
}