import './App.css';
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/pages/HomePage.jsx';
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpcomingQuizzes from "./pages/admin-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";
import QuizStart from './pages/user-page/components/QuizStart.jsx';
import AddQuiz from "./pages/admin-page/components/AddQuiz.jsx";

function App() {
=======
import ResultForAdmin from './pages/admin-page/components/ResultForAdmin.jsx';
import {createBrowserRouter, BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import UpcomingQuizzes from "./pages/user-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";
import QuizStart from './pages/user-page/components/QuizStart.jsx';
import React from "react";
import StudentList from './pages/admin-page/components/StudentList.jsx';
import Dashbord from './pages/user-page/components/Dashbord.jsx';
import QuizContainer from './pages/admin-page/components/UpcomingQuizzes.jsx'
import ChangePassword from './pages/user-page/components/ChangePassword.jsx';

function App() {

>>>>>>> 875c198517fd199f0a061515cc7631594919d529
    const route = createBrowserRouter([
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/registr',
            element: <Register />,
        },
        {
            path: '/user-dashboard',
<<<<<<< HEAD
            element: <HomePage />,
=======
            element: <HomePage/>,
            children: [
                {
                    index:true,
                    element: <UpcomingQuizzes/>
                },
                {
                    path: "result",
                    element: <Result/>
                },
                {
                    path: "changepassword",
                    element: <ChangePassword/>
                },
                {
                    path: "quizstart",
                    element: <QuizStart/>
                }
            ]    
>>>>>>> 875c198517fd199f0a061515cc7631594919d529
        },
        {
            path: '/admin-dashboard',
            element: <Admin />,
            children: [
                {
                    index: true, // Default child route
                    element: <DashbordElement />,
                },
                {
<<<<<<< HEAD
                    path: 'quiz',
                    element: <UpcomingQuizzes />,
                },
                {
                    path: 'quiz/add',
                    element: <AddQuiz />,
                },
                {
                    path: 'result',
                    element: <Result />,
                },
            ],
        },
        {
            path: '/super-admin-dashboard',
            element: <SuperAdmin />,
        },
        {
            path: '/quiz-start',
            element: <QuizStart />,
        },
    ]);

    return <RouterProvider router={route} />;
=======
                    path: "quiz",
                    element: <QuizContainer/>,

                },
                {
                    path: "result",
                    element: <ResultForAdmin/>
                },
                {
                    path: "changepassword",
                    element: <ChangePassword/>
                }
            ]
        },
        {
            path: '/super-admin-dashboard',
            element: <SuperAdmin/>,
            children:[
                {
                    index: true,
                    element: <DashbordElement/>
                },
                {
                    path: "quiz",
                    element: <QuizContainer/>,

                },
                {
                    path: "result",
                    element: <ResultForAdmin/>
                },
                {
                    path: "changepassword",
                    element: <ChangePassword/>
                }
            ]
        }
    ])
    return (
       <RouterProvider router={route}/>
    )
>>>>>>> 875c198517fd199f0a061515cc7631594919d529
}

export default App;
