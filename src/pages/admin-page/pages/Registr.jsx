
import LogoWhite from '../../../assets/images/Logo-white.png'
import LoginImg from '../../../assets/images/LoginImg.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Register(){
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        prePassword: '',
      });
      const [code, setCode] = useState('');
      const [verificationCodeModal, setVerificationCodeModal] = useState(false);
      const [apiResponse, setApiResponse] = useState(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
      const handleVerify = async () => {
        try {
          const verifyResponse = await fetch(`http://localhost:9090/api-auth/verify?code=${code}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ registerDTO: formData }),
          });
    
          if (verifyResponse.ok) {
            const result = await verifyResponse.json();
            setApiResponse(result); // Set response data
            
            if (result.success) {
              // Redirect or handle successful user creation
              localStorage.setItem('user', JSON.stringify(result.data));
              // Navigate to user's home page or any relevant page
            } else {
              alert(result.message); // Show error if any
            }
          } else {
            const errorResponse = await verifyResponse.json();
            setApiResponse(errorResponse);
            alert('Error: ' + errorResponse.message);
          }
        } catch (error) {
          console.error('Error during verification:', error);
          setApiResponse({ success: false, message: 'Server error, please try again.' });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulating form submission
        setVerificationCodeModal(true); // Show verification modal
      };
    
      const handleCodeSubmit = (e) => {
        e.preventDefault();
        handleVerify(); // Call verification function
      };
    //   console.log(JSON.stringify({ code, registerDTO: formData }))
    return (
        <div className="w-full min-h-screen bg-[#0D1321] flex justify-center items-center">
            <div className="w-[1440px] h-[720px] bg-[#0D1321] p-[20px] flex justify-around">
                <div className='max-w-[50%] flex flex-col py-[40px]'>
                    <img src={LogoWhite} className='w-[150px] py-[20px]' alt="" />
                    <h1 className='text-[#C5D86D] text-[25px] py-[15px]'>Create your account and start using QuizWiz!</h1>
                    <div className='flex flex-col gap-[20px]'>  
                        <div className='flex justify-around gap-[20px]'>
                            <NavLink to={'/Login'} className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold'><i className="fa-solid fa-user-tie text-white text-[45px]">‌</i>Sign In</NavLink>
                            <NavLink to={'/Registr'} className='w-[190px] h-[130px] gap-[10px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px]  text-[white] text-[15px] font-bold border-[5px] border-[#C5D86D]'><i className="fa-solid fa-user-plus text-[#C5D86D] text-[45px]">‌</i>Create Account</NavLink>
                        </div>
                        {!verificationCodeModal ?(<form className='flex flex-col gap-[20px]' onSubmit={handleSubmit}>
                            <div className='flex justify-between gap-[15px]'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your name</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40' 
                                    name='name'
                                    required type="text" 
                                    placeholder='Type your name'
                                    onChange={handleChange}
                                    value={formData.name}
                                    />
                                </div>

                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your surname</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40' 
                                    name='surname'
                                    required 
                                    type="text" 
                                    placeholder='Type your surname'
                                    value={formData.surname}
                                    onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between gap-[15px]'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your username</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40' 
                                    name='username'
                                    required 
                                    type="text" 
                                    placeholder='Type your username'
                                    onChange={handleChange}
                                    value={formData.username}/>
                                </div>

                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your email</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40' 
                                    name='email'
                                    required 
                                    type="email" 
                                    placeholder='Type your email'
                                    value={formData.email}
                                    onChange={handleChange}/>
                                </div>
                            </div>
                            <div className='flex justify-between gap-[15px]'>
                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your password</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white]  placeholder:opacity-40' 
                                    name='password'
                                    required type="password" 
                                    placeholder='Password'
                                    value={formData.password}
                                    onChange={handleChange}/>
                                </div>

                                <div className='flex flex-col w-[50%]'>
                                    <label className='text-white text-[16px] p-[7px] font-bold'>Your pre password</label>
                                    <input className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40' 
                                    name='prePassword'
                                    required 
                                    type="password" 
                                    placeholder='Pre pasword'
                                    value={formData.prePassword}
                                    onChange={handleChange}/>
                                </div>
                            </div>
                        </form>): (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            required
          />
          <button onClick={handleCodeSubmit}>Verify Code</button>
        </div>
      )}
                        <div>
                            <button className='bg-[#F5F5F5] text-[#000000] py-[10px] px-[20px] rounded-[10px] w-full' type="submit" onClick={handleCodeSubmit}>Registr <i className="fa fa-check-circle text-[black]" aria-hidden="true"></i></button>
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
export default Register