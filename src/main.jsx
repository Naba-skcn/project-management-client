import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root.jsx';
import Error from './components/Error.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import { HelmetProvider } from 'react-helmet-async';
import TaskView from './components/TaskView.jsx';
import TaskDetail from './components/TaskDetail.jsx';
import AboutUs from './components/About.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error> ,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
     
    ]
  },
  {
    path: "/login",
    element: <Login></Login>  ,
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
   path: "/about",
   element: <AboutUs></AboutUs>
  },
  {
    path: "/projects/:id",
    element: <TaskView></TaskView>,  
  },
  {
    path: "/tasks/:id",
    element: <TaskDetail></TaskDetail>
  }
 ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <HelmetProvider>
  <AuthProvider>
    <RouterProvider router={router} />
     </AuthProvider>
     </HelmetProvider>
  </StrictMode>,
)
