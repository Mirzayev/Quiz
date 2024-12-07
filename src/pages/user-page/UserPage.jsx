import Dashbord from '../user-page/components/Dashbord.jsx'
import Feed from '../user-page/components/Feed.jsx'
import Header from '../user-page/components/Header.jsx'
import React from 'react'

function UserPage(){

    return(
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
export default UserPage
