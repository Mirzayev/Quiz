import Dashbord from "../components/Dashbord.jsx";
import Feed from "../components/Feed.jsx";
import Rightbar from "../components/Rightbar.jsx";

export default function Admin() {


    return (
        <div className="admin-page flex ">
            <div className={"bg-[#020c1e] min-h-[100vh] basis-1/6"}><Dashbord/></div>
            <div className="basis-3/6"><Feed/></div>
            <div className="basis-2/6"><Rightbar/></div>
        </div>
    )
}