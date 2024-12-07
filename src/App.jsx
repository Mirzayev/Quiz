import './App.css'
import Admin from "./pages/admin-page/pages/Admin.jsx";
import Login from './pages/admin-page/pages/Login.jsx';
import Register from './pages/admin-page/pages/Registr.jsx';

function App() {

    return (
        <div className=''>
            <Login/>
            <Register/>
            <Admin/>
        </div>
    )
}

export default App
