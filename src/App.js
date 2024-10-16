import React from 'react';
import { createBrowserRouter , Outlet , RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import StudentDashboard from './components/StudentDashboard';
import AllStudents from './components/AllStudents';


const AppLayout = ()=> {
  return(
    <div className='app'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Header />
        <Outlet />
    </div>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <StudentDashboard />,
      },
      {
        path:"/allStudents",
        element: <AllStudents />,
      }
    ],
  },
]);

const App = ()=> {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;