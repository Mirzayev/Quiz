import { Outlet } from "react-router-dom";
import StudentList from "./StudentList.jsx";

export default function Feed() {


    return (
        <div className="">
            <div className="container">
                <Outlet/>
            </div>
        </div>
    )
}