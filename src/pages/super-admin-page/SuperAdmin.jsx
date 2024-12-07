import Dashbord from '../super-admin-page/components/Dashbord.jsx'
import Feed from '../super-admin-page/components/Feed.jsx'
import Header from '../super-admin-page/components/Header.jsx'
import React from 'react'

function SuperAdmin(){

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
export default SuperAdmin
