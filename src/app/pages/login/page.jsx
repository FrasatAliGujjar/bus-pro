"use client"

import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import login_bus from '@/app/assets/images/bg/bg-1.png';
import logo from '@/app/assets/images/logo/logo.png';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________
import { setCookie } from "cookies-next";


const Login = () => {

  // ==========================================================================================
  //Context Data
  const {
    LoadingUser,
    dbusers,
  } = useContext(AppContext);

  // ==========================================================================================

  useEffect(() => {

    LoadingUser();
    // setCookie("loginStatus", loginStatus);


  }, []);

  // ==========================================================================================

  const router = useRouter();

  // _________________________________________________________

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState("");

  // _________________________________________________________

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  // _________________________________________________________

  const handleSignIn = async (e) => {

    e.preventDefault();

    // ______________________________________

    const UserExistObject = dbusers.find(
      (user) => user.email === email && user.password === password
    );

    // setRole(UserExistObject.role)

    setCookie("role", UserExistObject.role);

    // ______________________________________

    const userExists = dbusers.some(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {

      resetInput();

      // Store role in cookies

      toast.success('Login successful!', { position: "top-center" });

      router.push('/pages/home');

      setCookie("role", UserExistObject.role);


    }
    else {
      toast.error('Invalid email or password.', { position: "top-center" });
    }
  }

  // _________________________________________________________

  return (
    <>
      <ToastContainer />
      <div className=''>
        <div className="flex fixed items-start border-1 border-white">
          <Image className="rounded-full m-2" src={logo} alt="Logo" width={50} />
        </div>

        <div
          style={{ backgroundImage: `url(${login_bus.src})` }}
          className="bg-cover h-screen flex justify-around items-center text-white"
        >
          <div className="m-2 md:mt-[100px] md:ml-[700px] flex flex-col w-[450px] md:w-[550px] border-1 border-white">
            <FontAwesomeIcon className="text-white text-9xl" icon={faUserCircle} />
            <div className="h-[400px]">
              <form className="flex flex-col justify-center items-center mt-[30px]" onSubmit={handleSignIn}>
                <input
                  type="email"
                  placeholder="Email or Username"
                  className="mb-2 p-[10px] w-[90%] md:w-[400px] rounded-lg outline-none bg-white border-2 border-white text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="mb-2 p-[10px] w-[90%] md:w-[400px] rounded-lg outline-none bg-white border-2 border-white text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="mb-2 flex flex-col md:flex-row justify-center items-center">
                  <div className="flex my-3 md:my-0">
                    <input type="checkbox" /> &nbsp;
                    <p className="text-white">Remember me</p>
                  </div>
                  <div className="flex">
                    <Link className="ml-0 my-3 md:my-0 md:ml-[105px] text-white" href="#">Forgot Password?</Link>
                  </div>
                </div>
                <div className="mb-2">
                  <button
                    type="submit"
                    className="text-black border-4 border-solid border-white bg-white p-[8px] mr-[10px] rounded-lg hover:text-[#f0ead2] hover:bg-transparent font-bold transition-all duration-400 w-[150px]"
                  >
                    Login
                  </button>
                </div>
                <div className="flex mb-2">
                  <p className="text-white">Don't have an account?</p>&nbsp;
                  <Link className="text-white hover:text-blue-400 font-bold" href="/pages/signup">
                    <u>Signup</u>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
