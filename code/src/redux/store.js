import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer } from './reducers/auth';
import { certificateReducer, coursesReducer } from './reducers/guest';
import {
    discussionForumsReducer,
    storeDiscussionForumReducer,
    updateDobAddressReducer
} from './reducers/member/general';
import {
    questionsReducer,
    storeAnswerReducer,
    updateAnswerReducer,

    courseReviewsReducer,
    earningsReducer,
    disburseReducer,

    studiesReducer,
    storeCourseReducer,
    updateCourseReducer,
    destroyCourseReducer,

    sectionsReducer,
    storeSectionReducer,
    updateSectionReducer,
    destroySectionReducer,

    lessonsReducer,
    storeLessonReducer,
    updateLessonReducer,
    destroyLessonReducer,
} from './reducers/member/instructor';
import {
    certificatesReducer,
    studentCoursesReducer,
    courseProgressReducer,
    studentSectionsReducer,
    studentLessonsReducer,

    updateCompletedLecturesReducer,

    studentCourseReviewsReducer,
    storeStudentCourseReviewReducer,
    updateStudentCourseReviewReducer,
    destroyStudentCourseReviewsReducer,

    answersReducer,
    storeQuestionReducer,

    stashesReducer,
    storeStashReducer,
    destroyStashReducer,

    transactionsReducer,
    storeTransactionReducer,
    storeTransactionFreeReducer,
    destroyTransactionReducer
} from './reducers/member/student';

const reducers = combineReducers({
    // guest
    coursesData: coursesReducer,
    certificateData: certificateReducer,
    // guest

    // general
    userData: userReducer,
    discussionForumsData: discussionForumsReducer,
    storeDiscussionForumResult: storeDiscussionForumReducer,
    updateDobAddressResult: updateDobAddressReducer,
    // general


    // instructor
    questionsData: questionsReducer,
    storeAnswerResult: storeAnswerReducer,
    updateAnswerResult: updateAnswerReducer,

    courseReviewsData: courseReviewsReducer,
    earningsData: earningsReducer,
    disburseResult: disburseReducer,

    studiesData: studiesReducer,
    storeCourseResult: storeCourseReducer,
    updateCourseResult: updateCourseReducer,
    destroyCourseResult: destroyCourseReducer,

    sectionsData: sectionsReducer,
    storeSectionResult: storeSectionReducer,
    updateSectionResult: updateSectionReducer,
    destroySectionResult: destroySectionReducer,

    lessonsData: lessonsReducer,
    storeLessonResult: storeLessonReducer,
    updateLessonResult: updateLessonReducer,
    destroyLessonResult: destroyLessonReducer,
    // instructor


    // student
    certificatesData: certificatesReducer,
    studentCoursesData: studentCoursesReducer,
    studentSectionsData: studentSectionsReducer,
    studentLessonsData: studentLessonsReducer,
    courseProgressData: courseProgressReducer,

    updateCompletedLecturesResult: updateCompletedLecturesReducer,

    studentCourseReviewsData: studentCourseReviewsReducer,
    storeStudentCourseReviewResult: storeStudentCourseReviewReducer,
    updateStudentCourseReviewResult: updateStudentCourseReviewReducer,
    destroyStudentCourseReviewsResult: destroyStudentCourseReviewsReducer,

    answersData: answersReducer,
    storeQuestionResult: storeQuestionReducer,

    stashesData: stashesReducer,
    storeStashResult: storeStashReducer,
    destroyStashResult: destroyStashReducer,

    transactionsData: transactionsReducer,
    storeTransactionResult: storeTransactionReducer,
    storeTransactionFreeResult: storeTransactionFreeReducer,
    destroyTransactionResult: destroyTransactionReducer
    // student

})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;
