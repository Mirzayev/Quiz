import './App.css';
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/pages/HomePage.jsx';
import ResultPage from './pages/user-page/pages/ResultPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpcomingQuizzes from "./pages/user-page/components/UpcomingQuizzes.jsx";
import Result from "./pages/user-page/components/Result.jsx";
import DashbordElement from "./pages/admin-page/components/DashbordElement.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Admin/>}>
                    <Route index element={<DashbordElement />} />
                    <Route path="quiz" element={<UpcomingQuizzes />} />
                    <Route path="result" element={<Result />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/super-admin" element={<SuperAdmin />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/result-page" element={<ResultPage />} />
            </Routes>
        </Router>
    );
}

export default App;
