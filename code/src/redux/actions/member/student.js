import { fetchActions } from "@root/redux/actions"
import {
    fetchDataCertificates,
    fetchDataCourses,
    fetchDataSection,
    fetchDataLesson,
    fetchDataCourseProgress,

    updateDataCompletedLectures,

    fetchDataStudentCourseReviews,
    storeDataStudentCourseReview,
    updateDataStudentCourseReview,
    destroyDataStudentCourseReview,

    fetchDataAnswers,
    storeDataQuestion,

    fetchDataStashes,
    storeDataStash,
    destroyDataStash,

    fetchDataTransactions,
    storeDataTransaction,
    storeDataTransactionFree,
    destroyDataTransaction
} from "@root/services/member/student"

export const certificatesActions = fetchActions('CERTIFICATES', fetchDataCertificates)
export const studentCoursesActions = fetchActions('STUDENT_COURSES', fetchDataCourses)
export const studentSectionsActions = fetchActions('STUDENT_SECTIONS', fetchDataSection)
export const studentLessonsActions = fetchActions('STUDENT_LESSONS', fetchDataLesson)
export const courseProgressActions = fetchActions('COURSE_PROGRESS', fetchDataCourseProgress)

export const updateCompletedLecturesActions = fetchActions('UPDATE_COMPLETED_LECTURES', updateDataCompletedLectures)

export const studentCoursesReviewsActions = fetchActions('STUDENT_COURSES_REVIEWS', fetchDataStudentCourseReviews)
export const storeStudentCoursesReviewActions = fetchActions('STORE_STUDENT_COURSES_REVIEW', storeDataStudentCourseReview)
export const updateStudentCoursesReviewActions = fetchActions('UPDATE_STUDENT_COURSE_REVIEW', updateDataStudentCourseReview)
export const destroyStudentCoursesReviewActions = fetchActions('DESTROY_STUDENT_COURSE_REVIEW', destroyDataStudentCourseReview)

export const answersActions = fetchActions('ANSWERS', fetchDataAnswers)
export const storeQuestionActions = fetchActions('STORE_QUESTION', storeDataQuestion)

export const stashesActions = fetchActions('STASHES', fetchDataStashes)
export const storeStashActions = fetchActions('STORE_STASH', storeDataStash)
export const destroyStashActions = fetchActions('DESTROY_STASH', destroyDataStash)

export const transactionsActions = fetchActions('TRANSACTIONS', fetchDataTransactions)
export const storeTransactionActions = fetchActions('STORE_TRANSACTION', storeDataTransaction)
export const storeTransactionFreeActions = fetchActions('STORE_TRANSACTION_FREE', storeDataTransactionFree)
export const destroyTransactionActions = fetchActions('DESTROY_TRANSACTION', destroyDataTransaction)