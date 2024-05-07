import { Navigate, createBrowserRouter } from "react-router-dom";

// Views
import Login from "@root/views/guest/Login";
import Register from "@root/views/guest/Register";
import Forgot from "@root/views/guest/password/Forgot";
import Reset from "@root/views/guest/password/Reset";

import Setting from '@root/views/member/setting/Setting';
import Ballot from '@root/views/member/ballot/Ballot';
import CodeRegister from "@root/views/member/setting/code/CodeRegister";
import CodeInstructor from "@root/views/member/setting/code/CodeInstructor";

import Protected from './Protected';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' />,
  },
  {
    path: 'login',
    element: <Protected type='route'><Login /></Protected>,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'password',
    children: [
      {
        index: true,
        element: <Navigate to='/password/forgot' />
      },
      {
        path: 'forgot',
        element: <Forgot />
      },
      {
        path: 'reset',
        element: <Reset />
      }
    ]
  },
  {
    path: 'member',
    children: [
      {
        index: true,
        element: <Navigate to='/member/setting' />
      },
      {
        path: 'setting',
        children: [
          {
            index: true,
            element: <Protected type='route'><Setting /></Protected>
          },
          {
            path: 'code',
            children: [
              {
                index: true,
                element: <Navigate to='/member/setting' />
              },
              {
                path: 'register',
                element: <Protected type='route'><CodeRegister /></Protected>
              },
              {
                path: 'instructor',
                element: <Protected type='route'><CodeInstructor /></Protected>
              }
            ]
          }
        ]
      },
      {
        path: 'ballot',
        element: <Protected type='route'><Ballot /></Protected>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/login' />
  }
])

export default routes