import './App.css';
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/pages/HomePage.jsx';
// import ResultPage from './pages/user-page/pages/ResultPage.jsx';
import {createBrowserRouter, BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import UpcomingQuizzes from "./pages/user-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";
import QuizStart from './pages/user-page/components/QuizStart.jsx';
import React from "react";
import StudentList from './pages/admin-page/components/StudentList.jsx';
import Dashbord from './pages/user-page/components/Dashbord.jsx';

function App() {

    const route = createBrowserRouter([

        {
            path:'/',
            element: <Login/>
        },
        {
            path: '/login',
            // element: <Register/>,
            element: <Login/>,
        },
        {
            path: '/registr',
            element: <Register/>
        },
        {
            path: '/user-dashboard',
            element: <HomePage/>,
            children: [
                {
                    index:true,
                    element: <UpcomingQuizzes/>
                },
                {
                    path: "result",
                    element: <Result/>
                }
            ]    
        },
        {
            path: '/admin-dashboard',
            element: <Admin/>,
            children: [
                {
                    index: true,
                    element: <DashbordElement/>
                },
                {
                    path: "quiz",
                    element: <UpcomingQuizzes/>
                },
                {
                    path: "result",
                    element: <Result/>
                }
            ]
        },
        {
            path: '/super-admin-dashboard',
            element: <SuperAdmin/>
        }
    ])
    return (
       <RouterProvider router={route}/>

    )
}

export default App;
