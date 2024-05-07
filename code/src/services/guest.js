import { certificateActions, coursesActions } from "@root/redux/actions/guest";
import { api } from "./api";

export const fetchDataCourses = (keyword = '', filter = '', instructor = '', url) => {
    let page

    if (url == null) {
        page = `/code/guest/visitor/search-course?keyword=${keyword}&filter=${filter}&instructor=${instructor}`
    } else {
        page = `${url}&keyword=${keyword}&filter=${filter}&instructor=${instructor}`
    }

    return async dispatch => {
        dispatch(coursesActions.request())
        await api.get(page)
            .then(({ data }) => { dispatch(coursesActions.success(data)) })
            .catch(response => { dispatch(coursesActions.failure(response.message)) })
    };
};

export const fetchDataCertificate = (keyword) => {
    return async dispatch => {
        dispatch(certificateActions.request())
        await api.get('/code/guest/visitor/verify-certificate?id=' + keyword)
            .then(({ data }) => { dispatch(certificateActions.success(data)) })
            .catch(({ response }) => { console.log(response); dispatch(certificateActions.failure(response.data.message)) })
    }
}