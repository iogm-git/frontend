import { Navigate, createBrowserRouter } from "react-router-dom"

import Protected from './Protected'

import Index from "@root/views/guest/index/Index"
import Courses from "@root/views/guest/courses/Courses"
import Certificate from "@root/views/guest/certificate/Certificate"

import Forum from "@root/views/member/general/forum/Forum"
import Setting from "@root/views/member/general/setting/Setting"

import Profile from "@root/views/member/instructor/profile/Profile"
import InstructorCourses from "@root/views/member/instructor/studies/courses/Courses"
import InstructorCourseForm from "@root/views/member/instructor/studies/courses/form/Form"
import InstructorSections from "@root/views/member/instructor/studies/sections/Sections"
import InstructorSectionForm from "@root/views/member/instructor/studies/sections/form/Form"
import InstructorLessons from "@root/views/member/instructor/studies/lessons/Lessons"
import InstructorLessonForm from "@root/views/member/instructor/studies/lessons/form/Form"
import Reviews from "@root/views/member/instructor/studies/courses/reviews/Reviews"
import Questions from "@root/views/member/instructor/questions/Questions"
import Earnings from "@root/views/member/instructor/earnings/Earnings"

import StudentProfile from "@root/views/member/student/profile/Profile"
import StudentCourses from "@root/views/member/student/studies/courses/Courses"
import Ask from "@root/views/member/student/studies/courses/ask/Ask"
import Review from "@root/views/member/student/studies/courses/review/Review"
import StudentReviews from "@root/views/member/student/reviews/Reviews"
import StudentSections from "@root/views/member/student/studies/Sections"
import StudentLessons from "@root/views/member/student/studies/lessons/Lessons"
import Stash from "@root/views/member/student/stash/Stash"
import Certificates from "@root/views/member/student/certificates/Certificates"
import Answers from "@root/views/member/student/answers/Answers"
import Transactions from "@root/views/member/student/transactions/Transactions"
import Paid from "@root/views/member/student/transactions/paid/Paid"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/courses",
        element: <Courses />
    },
    {
        path: "/certificate",
        element: <Certificate />
    },
    {
        path: "/member",
        children: [
            {
                index: true,
                element: <Navigate to='/' />
            },
            {
                path: "student",
                children: [
                    {
                        index: true,
                        element: <Navigate to='/member/student/profile' />
                    },
                    {
                        path: "profile",
                        element: <Protected type='route'><StudentProfile /></Protected>
                    },
                    {
                        path: "courses",
                        children: [
                            {
                                index: true,
                                element: <Protected type='route'><StudentCourses /></Protected>
                            },
                            {
                                path: 'ask',
                                element: <Protected type='route'><Ask /></Protected>
                            },
                            {
                                path: 'review',
                                children: [
                                    {
                                        index: true,
                                        element: <Navigate to='/member/student/courses' />,
                                    },
                                    {
                                        path: 'add',
                                        element: <Protected type='route'><Review type='add' /></Protected>
                                    }
                                ]
                            },
                            {
                                path: "sections",
                                children: [
                                    {
                                        index: true,
                                        element: <Protected type='route'><StudentSections /></Protected>
                                    },
                                    {
                                        path: "lessons",
                                        element: <Protected type='route'><StudentLessons /></Protected>
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "stash",
                        element: <Protected type='route'> <Stash /></Protected>
                    },
                    {
                        path: "certificates",
                        element: <Protected type='route'><Certificates /></Protected>
                    },
                    {
                        path: "answers",
                        element: <Protected type='route'><Answers /></Protected>
                    },
                    {
                        path: "transactions",
                        children: [
                            {
                                index: true,
                                element: <Protected type='route'><Transactions /></Protected>
                            },
                            {
                                path: "paid",
                                element: <Protected type='route'> <Paid /></Protected>
                            }
                        ]
                    },
                    {
                        path: "reviews",
                        children: [
                            {
                                index: true,
                                element: <Protected type='route'><StudentReviews /></Protected>
                            },
                            {
                                path: 'edit',
                                element: <Protected type='route'><Review type='edit' /></Protected>
                            }
                        ]
                    }
                ]
            },
            {
                path: "instructor",
                children: [
                    {
                        index: true,
                        element: <Navigate to='/member/instructor/profile' />
                    },
                    {
                        path: "profile",
                        element: <Protected type='route'><Profile /></Protected>
                    },
                    {
                        path: "courses",
                        children: [
                            {
                                index: true,
                                element: <Protected type='route'><InstructorCourses /></Protected>
                            },
                            {
                                path: "add",
                                element: <Protected type='route'><InstructorCourseForm type="Add" /></Protected>
                            },
                            {
                                path: "edit",
                                element: <Protected type='route'><InstructorCourseForm type="Edit" /></Protected>
                            },
                            {
                                path: "reviews",
                                element: <Protected type='route'><Reviews /></Protected>
                            },
                            {
                                path: "sections",
                                children: [
                                    {
                                        index: true,
                                        element: <Protected type='route'><InstructorSections /></Protected>
                                    },
                                    {
                                        path: "add",
                                        element: <Protected type='route'> <InstructorSectionForm type="Add" /></Protected>
                                    },
                                    {
                                        path: "edit",
                                        element: <Protected type='route'><InstructorSectionForm type="Edit" /></Protected>
                                    },
                                    {
                                        path: "lessons",
                                        children: [
                                            {
                                                index: true,
                                                element: <Protected type='route'><InstructorLessons /></Protected>
                                            },
                                            {
                                                path: "add",
                                                element: <Protected type='route'><InstructorLessonForm type="Add" /></Protected>
                                            },
                                            {
                                                path: "edit",
                                                element: <Protected type='route'><InstructorLessonForm type="Edit" /></Protected>
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: "questions",
                        element: <Protected type='route'><Questions /></Protected>
                    },
                    {
                        path: "earnings",
                        element: <Protected type='route'><Earnings /></Protected>
                    }
                ]
            },
            {
                path: "general",
                children: [
                    {
                        index: true,
                        element: <Navigate to='/' />
                    },
                    {
                        path: "forum",
                        element: <Protected type='route'><Forum /></Protected>
                    },
                    {
                        path: "setting",
                        element: <Protected type='route'><Setting /></Protected>
                    }
                ]
            }
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
])

export default routes