import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import './main.css'
import { AuthProvider } from './context/AuthProvider'

import routes from './utils/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_GOOGLE}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>,
)
