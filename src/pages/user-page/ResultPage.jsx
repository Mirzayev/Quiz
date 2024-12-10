import Dashbord from './components/Dashbord.jsx'
import Feed from './components/Feed.jsx'
import Header from './components/Header.jsx'
import React from 'react'
import Result from './components/Result.jsx'

function ResultPage(){

    return(
        <div className="max-w-[1536px] mx-auto ">
            <div>
                <Header/>
            </div>
            <div className="admin-page flex ">
                <div className="bg-[#041025] basis-1/6"
                    style={{ height: "calc(100vh - 64px)" }
                }><Dashbord/></div>
                <div className='my-auto mx-auto'><Result/></div>
            </div>
        </div>
    )
}
export default ResultPage
