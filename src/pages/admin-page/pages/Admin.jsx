import Dashbord from "../components/Dashbord.jsx";
import Feed from "../components/Feed.jsx";
import Rightbar from "../components/Rightbar.jsx";
import Header from "../components/Header.jsx";

export default function Admin() {


    return (
        <div className="max-w-[1536px] mx-auto ">
            <div>
                <Header/>
            </div>
            <div className="admin-page flex ">
                <div className={"bg-[#041025] min-h-[100vh] basis-1/6"}><Dashbord/></div>
                <div className="basis-5/6"><Feed/></div>

            </div>
        </div>
    )
}