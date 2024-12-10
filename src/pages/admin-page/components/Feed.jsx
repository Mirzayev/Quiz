import StudentList from "./StudentList.jsx";
import UpcomingQuizzes from "../../user-page/components/UpcomingQuizzes.jsx";
import {Outlet} from "react-router-dom";

export default function Feed() {


    return (
        <div  className="Feed bg-slate-100 ">
            <div style={{scrollbarWidth: 'none'}} className="">
                <Outlet/>
            </div>
        </div>
    )
}