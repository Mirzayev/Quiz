
import React from "react";
import Header from "../components/Header.jsx";
import Dashbord from "../components/Dashbord.jsx";
import Feed from "../components/Feed.jsx";
function HomePage(){

    return(
        <div className="max-w-[1536px] mx-auto max-h-[100vh]">
        <div>
            <Header/>
        </div>
            <div className="flex">
            <div className="bg-[#041025] basis-1/6"
                style={{ height: "calc(100vh - 64px)" }
            }><Dashbord/></div>
            <div  className="basis-5/6">
            <div className="w-full">
            <Feed/>
            </div>
        </div>
        </div>
    </div>

    )
}

export default HomePage