import { initData, createReducer } from '@root/redux/reducers'
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
    destroyLessonActions
} from "@root/redux/actions/member/instructor"

export const questionsReducer = createReducer({ ...initData }, questionsActions)
export const storeAnswerReducer = createReducer({ ...initData }, storeAnswerActions)
export const updateAnswerReducer = createReducer({ ...initData }, updateAnswerActions)

export const courseReviewsReducer = createReducer({ ...initData }, courseReviewsActions)
export const earningsReducer = createReducer({ ...initData }, earningsActions)
export const disburseReducer = createReducer({ ...initData }, disburseActions)

export const studiesReducer = createReducer({ ...initData }, studiesActions)
export const storeCourseReducer = createReducer({ ...initData }, storeCourseActions)
export const updateCourseReducer = createReducer({ ...initData }, updateCourseActions)
export const destroyCourseReducer = createReducer({ ...initData }, destroyCourseActions)

export const sectionsReducer = createReducer({ ...initData }, sectionsActions)
export const storeSectionReducer = createReducer({ ...initData }, storeSectionActions)
export const updateSectionReducer = createReducer({ ...initData }, updateSectionActions)
export const destroySectionReducer = createReducer({ ...initData }, destroySectionActions)

export const lessonsReducer = createReducer({ ...initData }, lessonsActions)
export const storeLessonReducer = createReducer({ ...initData }, storeLessonActions)
export const updateLessonReducer = createReducer({ ...initData }, updateLessonActions)
export const destroyLessonReducer = createReducer({ ...initData }, destroyLessonActions)