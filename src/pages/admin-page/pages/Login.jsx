import  { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoWhite from "../../../assets/images/Logo-white.png";
import LoginImg from "../../../assets/images/LoginImg.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9090/api-auth/login", {
        username,
        password,
      });

      const user = response.data.data; // API dan qaytgan UserDTO obyekt
      
      // Local storage ga ma'lumotni saqlaymiz
      localStorage.setItem("user", JSON.stringify(user));
      // console.log(localStorage.getItem('user'))
      // Role bo'yicha yo'naltirish
      if (user.role === "USER") {
        navigate("/user-dashboard");
      } else if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "SUPER_ADMIN") {
        navigate("/super-admin-dashboard");
      }
    } catch (error) {
      setErrorMessage("Username yoki parol noto'g'ri!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0D1321] flex justify-center items-center">
      <div className="w-[1440px] h-[720px] bg-[#0D1321] p-[20px] flex justify-around">
        <div className="max-w-[50%] flex flex-col py-[40px]">
          <img src={LogoWhite} className="w-[150px] py-[20px]" alt="" />
          <h1 className="text-[#C5D86D] text-[25px] py-[15px]">
            Continue your learning journey with QuizWiz!
          </h1>
          <div className='flex justify-around gap-[20px]'>
                            <NavLink className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold  border-[5px] border-[#C5D86D]' to={'/Login'}><i className="fa-solid fa-user-tie text-white text-[45px]">‌</i>Sign In</NavLink>
                            <NavLink className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold' to={'/Registr'}><i className="fa-solid fa-user-plus text-[#C5D86D] text-[45px]">‌</i>Create Account</NavLink>
                        </div>
          <form className="flex flex-col gap-[20px]" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="text-white text-[16px] p-[7px] font-bold">Username</label>
              <input
                className="w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white]  placeholder:opacity-40"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white text-[16px] p-[7px] font-bold">Password</label>
              <input
                className="w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-[#F5F5F5] text-[#000000] py-[10px] px-[20px] rounded-[10px] ">
              Login <i className="fa fa-check-circle text-[black]" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <div>
          <img src={LoginImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;