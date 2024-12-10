import UpcomingQuizzes from "./UpcomingQuizzes.jsx";

export default function DashbordElement() {


    return (
        <div>
            <div className="flex w-full justify-between">
                <div className={"basis-1/2"}><UpcomingQuizzes/></div>
                <div className={"basis-1/2"}></div>
            </div>
        </div>
    )
}