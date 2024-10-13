import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Home from './pages/Home';
import Login from './login/Login';
import SignUp from './signup/SignUp';
import AuthProvider from './provider/AuthProvider';
import CheckOut from './pages/CheckOut';
import Booking from './pages/Booking';
import PrivateRoute from './provider/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      },
      {
        path:"/checkout/:id",
        element: <CheckOut></CheckOut>,
        loader: ({params})=>fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path:"/bookings",
        element:<PrivateRoute><Booking></Booking></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
 <div className='max-w-7xl mx-auto'>
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
 </div>
)
