import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import { GuestProvider } from './context/GuestProvider'
import { MemberProvider } from './context/MemberProvider'

import './main.css'
import routes from './utils/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuestProvider>
      <AuthProvider>
        <MemberProvider>
          <RouterProvider router={routes} />
        </MemberProvider>
      </AuthProvider>
    </GuestProvider >
  </React.StrictMode>,

)
