import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.scss'

// import * as bootstrap from 'bootstrap';

import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
