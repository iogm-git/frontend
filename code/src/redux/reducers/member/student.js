import { initData, createReducer } from '@root/redux/reducers'
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

    stashesActions,
    storeStashActions,
    destroyStashActions,

    transactionsActions,
    storeTransactionActions,
    storeTransactionFreeActions,
    destroyTransactionActions
} from "@root/redux/actions/member/student";

export const certificatesReducer = createReducer({ ...initData }, certificatesActions);
export const studentCoursesReducer = createReducer({ ...initData }, studentCoursesActions);
export const studentSectionsReducer = createReducer({ ...initData }, studentSectionsActions);
export const studentLessonsReducer = createReducer({ ...initData }, studentLessonsActions);
export const courseProgressReducer = createReducer({ ...initData }, courseProgressActions);

export const updateCompletedLecturesReducer = createReducer({ ...initData }, updateCompletedLecturesActions);

export const studentCourseReviewsReducer = createReducer({ ...initData }, studentCoursesReviewsActions)
export const storeStudentCourseReviewReducer = createReducer({ ...initData }, storeStudentCoursesReviewActions)
export const updateStudentCourseReviewReducer = createReducer({ ...initData }, updateStudentCoursesReviewActions)
export const destroyStudentCourseReviewsReducer = createReducer({ ...initData }, destroyStudentCoursesReviewActions)

export const answersReducer = createReducer({ ...initData }, answersActions);
export const storeQuestionReducer = createReducer({ ...initData }, storeQuestionActions);

export const stashesReducer = createReducer({ ...initData }, stashesActions);
export const storeStashReducer = createReducer({ ...initData }, storeStashActions);
export const destroyStashReducer = createReducer({ ...initData }, destroyStashActions);

export const transactionsReducer = createReducer({ ...initData }, transactionsActions);
export const storeTransactionReducer = createReducer({ ...initData }, storeTransactionActions);
export const storeTransactionFreeReducer = createReducer({ ...initData }, storeTransactionFreeActions);
export const destroyTransactionReducer = createReducer({ ...initData }, destroyTransactionActions);

