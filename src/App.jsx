import './App.css';
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/pages/HomePage.jsx';
import {createBrowserRouter, BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import UpcomingQuizzes from "./pages/user-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";
import QuizStart from './pages/user-page/components/QuizStart.jsx';

function App() {




    const route = createBrowserRouter([
        // {
        //     path: '/',
        //     element: <Admin/>,
        //     children: [
        //         {
        //             index: true,
        //             element: <DashbordElement/>,
        //         },
        //         {
        //            path: "/quiz",
        //             element: <UpcomingQuizzes/>
        //         },
        //         {
        //             path: '/result',
        //             element: <Result/>
        //         },
                

        //     ],

        // },
        {
            path: '/',
            element: <HomePage/>,
            children: [
                {
                    index: true,
                    element: <UpcomingQuizzes/>
                },
                
                {
                    path: '/result',
                    element: <QuizStart/>
                },
                

            ],

        },
    ])
    return (
       <RouterProvider router={route}/>
    )
}

export default App;
