import './App.css'
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/HomePage.jsx';
import ResultPage from './pages/user-page/ResultPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UpcomingQuizzes from "./pages/user-page/components/UpcomingQuizzes.jsx";
import QuizContainer from "./pages/user-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import Feed from "./pages/admin-page/components/Feed.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";

function App() {



    const route = createBrowserRouter([
        {
            path: '/',
            element: <Admin/>,
            children: [
                {
                    index: true,
                    element: <DashbordElement/>,
                },
                {
                   path: "/quiz",
                    element: <QuizContainer/>
                },
                {
                    path: '/result',
                    element: <Result/>
                },
            ]
        }
    ])
    return (
<<<<<<< HEAD
       <RouterProvider router={route}/>
=======
        <div className=''>
             {/* <Login/> */}
            {/*<Register/>
            <Admin/> */}
            <HomePage/>
            <ResultPage/>
            {/* <SuperAdmin/> */}
            
        </div>
>>>>>>> refs/remotes/origin/main
    )
}

export default App
