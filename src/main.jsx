import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Home from './Pages/Home.jsx'
import Informacja from './Pages/Informacja.jsx'
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
    path: "informacja",
    element: (
      <div>
        <Informacja></Informacja>
      </div>
    )
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
