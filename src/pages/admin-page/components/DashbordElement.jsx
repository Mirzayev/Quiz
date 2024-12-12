import UpcomingQuizzes from "./UpcomingQuizzes.jsx";
import StudentList from "./StudentList.jsx";

export default function DashbordElement() {


    return (
        <div>
            <div className="flex w-full">
                <div className={"basis-1/2"}><UpcomingQuizzes/></div>
                <div className={"basis-1/2"}><StudentList/></div>
            </div>
        </div>
    )
}