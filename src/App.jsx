import './App.css';
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpcomingQuizzes from "./pages/admin-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";
import QuizStart from './pages/user-page/components/QuizStart.jsx';
import AddQuiz from "./pages/admin-page/components/AddQuiz.jsx";

function App() {
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
            element: <HomePage />,
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
}

export default App;
