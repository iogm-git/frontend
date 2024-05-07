import { fetchActions } from "@root/redux/actions"
import {
    fetchDataQuestions,
    storeDataAnswer,
    updateDataAnswer,

    fecthDataCourseReviews,

    fetchDataEarnings,

    fetchDataDisburse,

    fetchDataStudies,
    storeDataCourse,
    updateDataCourse,
    destroyDataCourse,

    fetchDataSections,
    storeDataSection,
    updateDataSection,
    destroyDataSection,

    fetchDataLessons,
    storeDataLesson,
    updateDataLesson,
    destroyDataLesson
} from "@root/services/member/instructor"

export const questionsActions = fetchActions('QUESTIONS', fetchDataQuestions)
export const storeAnswerActions = fetchActions('STORE_ANSWER', storeDataAnswer)
export const updateAnswerActions = fetchActions('UPDATE_ANSWER', updateDataAnswer)

export const courseReviewsActions = fetchActions('COURSE_REVIEWS', fecthDataCourseReviews)
export const earningsActions = fetchActions('EARNINGS', fetchDataEarnings)
export const disburseActions = fetchActions('DISBURSE', fetchDataDisburse)

export const studiesActions = fetchActions('STUDIES', fetchDataStudies)
export const storeCourseActions = fetchActions('STORE_COURSE', storeDataCourse)
export const updateCourseActions = fetchActions('UPDATE_COURSE', updateDataCourse)
export const destroyCourseActions = fetchActions('DESTROY_COURSE', destroyDataCourse)

export const sectionsActions = fetchActions('SECTIONS', fetchDataSections)
export const storeSectionActions = fetchActions('STORE_SECTION', storeDataSection)
export const updateSectionActions = fetchActions('UPDATE_SECTION', updateDataSection)
export const destroySectionActions = fetchActions('DESTROY_SECTION', destroyDataSection)

export const lessonsActions = fetchActions('LESSONS', fetchDataLessons)
export const storeLessonActions = fetchActions('STORE_LESSON', storeDataLesson)
export const updateLessonActions = fetchActions('UPDATE_LESSON', updateDataLesson)
export const destroyLessonActions = fetchActions('DESTROY_LESSON', destroyDataLesson)
