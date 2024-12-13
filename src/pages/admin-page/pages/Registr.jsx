import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoWhite from '../../../assets/images/Logo-white.png';
import LoginImg from '../../../assets/images/LoginImg.png';

function Register() {
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
  const navigate = useNavigate();

  // Input o'zgarishini boshqarish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Registratsiya funksiyasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.prePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {

      const response = await fetch('http://localhost:9090/api-auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      localStorage.setItem('registerDto', JSON.stringify(formData))
      if (response.ok) {
        alert('Check your email for verification.');
        setVerificationCodeModal(true);
      } else {
        const errorData = await response.json();
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error, please try again later.');
    }
  };
  
  // Kodni tasdiqlash funksiyasi
  const handleVerify = async () => {
    try {
      // Tasdiqlash kodini konsolda tekshirish
      console.log('Verification code:', code);
  
      // Tasdiqlash so'rovi yuborish
      const response = await fetch(`http://localhost:9090/api-auth/verify?code=${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
  
      // Javob holatini tekshirish
      if (response.ok) {
        console.log(response)
        navigate('/user-dashboard'); // Foydalanuvchini bosh sahifaga yo'naltirish
      } else {
        const errorData = await response.json();
        alert('Verification failed: ' + errorData.message); // Xato xabari ko'rsatish
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('Server error, please try again later.'); // Server xatosi haqida xabar
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-[#0D1321] flex justify-center items-center">
      <div className="w-[1440px] h-[720px] bg-[#0D1321] p-[20px] flex justify-around">
        <div className='max-w-[50%] flex flex-col py-[40px]'>
          <img src={LogoWhite} className='w-[150px] py-[20px]' alt="Logo" />
          <h1 className='text-[#C5D86D] text-[25px] py-[15px]'>Create your account and start using QuizWiz!</h1>

          <div className='flex justify-around gap-[20px]'>
            <NavLink
              to={'/Login'}
              className='w-[190px] h-[130px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px] text-[white] text-[15px] font-bold'>
              <i className="fa-solid fa-user-tie text-white text-[45px]" />
              Sign In
            </NavLink>
            <NavLink
              to={'/Registr'}
              className='w-[190px] h-[130px] flex flex-col items-center p-[20px] bg-[#333333] rounded-[10px] text-[white] text-[15px] font-bold border-[5px] border-[#C5D86D]'>
              <i className="fa-solid fa-user-plus text-[#C5D86D] text-[45px]" />
              Create Account
            </NavLink>
          </div>

          {!verificationCodeModal ? (
            <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit}>
              <div className='flex justify-between gap-[15px]'>
                <InputField
                  label="Your Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Type your name"
                />
                <InputField
                  label="Your Surname"
                  name="surname"
                  type="text"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Type your surname"
                />
              </div>
              <div className='flex justify-between gap-[15px]'>
                <InputField
                  label="Your Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Type your username"
                />
                <InputField
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type your email"
                />
              </div>
              <div className='flex justify-between gap-[15px]'>
                <InputField
                  label="Your Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <InputField
                  label="Confirm Password"
                  name="prePassword"
                  type="password"
                  value={formData.prePassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              <button
                className='bg-[#F5F5F5] text-[#000000] py-[10px] px-[20px] rounded-[10px] w-full'
                type="submit">
                Register <i className="fa fa-check-circle text-[black]" />
              </button>
            </form>
          ) : (
            <div className='flex flex-col items-center'>
              <InputField
                label="Verification Code"
                name="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
              />
              <button
                className='bg-[#C5D86D] text-[#000000] py-[10px] px-[20px] rounded-[10px] mt-[20px]'
                onClick={handleVerify}>
                Verify Code
              </button>
            </div>
          )}
        </div>

        <div>
          <img src={LoginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, type, value, onChange, placeholder }) {
  return (
    <div className='flex flex-col w-[50%]'>
      <label className='text-white text-[16px] p-[7px] font-bold'>{label}</label>
      <input
        className='w-full h-[40px] p-[15px] text-[white] rounded-[10px] placeholder:text-[white] bg-[#0D1321] border-[3px] border-[white] placeholder:opacity-40'
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Register;
