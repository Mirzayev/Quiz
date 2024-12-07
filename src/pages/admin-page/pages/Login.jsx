
import LogoWhite from '../../../assets/images/Logo-white.png'
import LoginImg from '../../../assets/images/LoginImg.png'
import React from "react"
function Login(){
    return (
        <div className="w-full min-h-screen bg-[#0D1321] flex justify-center items-center">
            <div className="w-[1440px] h-[720px] bg-[#0D1321] p-[20px] flex justify-around">
                <div className='max-w-[50%] flex flex-col py-[40px]'>
                    <img src={LogoWhite} className='w-[150px] py-[20px]' alt="" />
                    <h1 className='text-[#C5D86D] text-[25px] py-[15px]'>Continue your learning journey with QuizWiz!</h1>
                    <div className='flex flex-col gap-[20px]'>  
                        <div className='flex justify-around gap-[20px]'>
                            <button className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold border-[5px] border-[#C5D86D]'><i class="fa-solid fa-user-tie text-[#C5D86D] text-[45px]">‌</i>Sign in as a tutor</button>
                            <button className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold'><i class="fa-solid fa-user-graduate text-white text-[45px]">‌</i>Sign in as a learner</button>
                            <button className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold'><i class="fa-solid fa-user-plus text-white text-[45px]">‌</i>Create Account</button>
                        </div>
                        <form className='flex flex-col gap-[20px]'>
                            <div className='flex flex-col'>
                                <label className='text-white text-[16px] p-[7px] font-bold'>Registered email address</label>
                                <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white]' type="email" placeholder='Type your email'/>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-white text-[16px] p-[7px] font-bold'>Password</label>
                                <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white]' type="password" placeholder='Password'/>
                            </div>
                        </form>
                        <div>
                            <button className='bg-[#F5F5F5] text-[#000000] py-[10px] px-[20px] rounded-[10px]'>Sign In <i class="fa fa-check-circle text-[black]" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={LoginImg} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Login