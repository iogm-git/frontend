import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import Index from "@root/views/guest/Index/Index";
import Show from "@root/views/guest/Show/Show";
import About from "@root/views/guest/About/About";

import Profile from '@root/views/member/profile/Profile';
import Stash from '@root/views/member/stash/Stash';
import Download from "@root/views/member/download/Download";
import Purchase from "@root/views/member/purchase/Purchase";
import Payment from "@root/views/member/purchase/payment/Payment";
import Transaction from "@root/views/member/transactions/Transactions";

import Protected from "./Protected";


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'guest',
    children: [
      {
        path: 'show',
        element: <Show />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: 'member',
    children: [
      {
        path: 'profile',
        element: <Protected type='route'><Profile /></Protected>
      },
      {
        path: 'stash',
        element: <Protected type='route'><Stash /></Protected>
      },
      {
        path: 'download',
        element: <Protected type='route'><Download /></Protected>
      },
      {
        path: 'purchase',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Protected type='route'><Purchase /></Protected>
          },
          {
            path: 'payment',
            element: <Protected type='route'><Payment /></Protected>
          }
        ]
      },
      {
        path: 'transactions',
        element: <Protected type='route'><Transaction /></Protected>
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
])

export default routes