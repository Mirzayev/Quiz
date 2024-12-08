import './App.css'
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import HomePage from './pages/user-page/HomePage.jsx';
import ResultPage from './pages/user-page/ResultPage.jsx';
function App() {

    return (
        <div className=''>
            {/* <Login/>
            <Register/>
            <Admin/> */}
            <HomePage/>
            {/* <ResultPage/> */}
            {/* <SuperAdmin/> */}
        </div>
    )
}

export default App
