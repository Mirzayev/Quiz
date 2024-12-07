
import React from "react";
import Header from "./components/Header.jsx";
import Dashbord from "./components/Dashbord.jsx";
import UpcomingQuizzes from "./components/UpcomingQuizzes.jsx";


function HomePage(){

    return(
        <div className="max-w-[1536px] mx-auto max-h-[100vh]">
        <div>
            <Header/>
        </div>
        <div>
            <div className="admin-page flex ">
            <div className="bg-[#041025] basis-1/6"
                style={{ height: "calc(100vh - 64px)" }
            }><Dashbord/></div>
        </div>
        <div>
            <UpcomingQuizzes/>
        </div>
        </div>
    </div>

    )
}

export default HomePage