import './App.css'
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';
import SuperAdmin from './pages/super-admin-page/SuperAdmin.jsx';
import UserPage from './pages/user-page/UserPage.jsx';
function App() {

    return (
        <div className=''>
            <Login/>
            <Register/>
            <Admin/>
            <UserPage/>
            <SuperAdmin/>
        </div>
    )
}

export default App
