import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Home from './Pages/Home.jsx'
import Server from './Pages/Server.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([



  {
    path: "/",
    element: (
      <div>
        <Home></Home>
      </div>
    )
  },

  {
    path: "/Server",
    element: (
      <div>
        <Server></Server>
      </div>
    )
  }
  
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
