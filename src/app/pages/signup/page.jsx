"use client"

import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import login_bus from '@/app/assets/images/bg/bg-1.png';
import logo from '@/app/assets/images/logo/logo.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________


const Signup = () => {


  // ==========================================================================================
  //Context Data
  const {
    LoadingUser,
    dbusers,
  } = useContext(AppContext);

  // ==========================================================================================

  useEffect(() => {

    LoadingUser();

  }, []);

  // ==========================================================================================



  const router = useRouter()

  // _________________________________________________________

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // _________________________________________________________

  const resetInput = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  // _________________________________________________________

  const handleSignUp = async (e) => {

    e.preventDefault();

    const EmailExist = dbusers.some((v) => v.email === email);

    if (EmailExist) {

      toast.error('Email already Exist.', { position: "top-center" });

    }
    else {

      await axios.post("/api/users", { firstname, lastname, email, password, role });
      resetInput();
      toast.success("Sign Up Successful!", { autoClose: 2000 });
      router.push('/pages/home');

    }

  };

  // _________________________________________________________

  return (
    <div>
      <ToastContainer />
      <div className="flex fixed items-start border-1 border-white">
        <Image className="rounded-full m-2" src={logo} alt="Logo" width={50} />
      </div>
      <div
        style={{ backgroundImage: `url(${login_bus.src})` }}
        className="bg-cover h-screen flex justify-around items-center text-white"
      >
        <div className="m-2 md:mt-[10px] md:ml-[700px] flex flex-col w-[450px] md:w-[550px] border-1 border-white">
          <FontAwesomeIcon className="text-white text-9xl" icon={faUserCircle} />
          <div className="h-[400px]">
            <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center mt-[30px]">
              <input
                type="text"
                placeholder="First Name"
                className="mb-2 p-[10px]  w-[90%] md:w-[400px]  rounded-lg outline-none bg-white border-2 border-white text-black"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="mb-2 p-[10px]  w-[90%] md:w-[400px]  rounded-lg outline-none bg-white border-2 border-white text-black"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email or Username"
                className="mb-2 p-[10px]  w-[90%] md:w-[400px]  rounded-lg outline-none bg-white border-2 border-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-2 p-[10px]  w-[90%] md:w-[400px]  rounded-lg outline-none bg-white border-2 border-white text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="my-3  flex justify-center items-center">
                <input type="checkbox" required /> &nbsp;
                <p className="text-white ml-2">Agree to our privacy policy</p>
              </div>
              <button
                type="submit"
                className="text-black  my-3 border-4 border-solid border-white bg-white p-[8px] mr-[10px] rounded-lg hover:text-[#f0ead2] hover:bg-transparent font-bold transition-all duration-400 w-[150px]"
              >
                Signup
              </button>
              <div className="flex  my-3 ">
                <p className="text-white">Already have an account?</p>&nbsp;
                <Link className="text-white hover:text-blue-400 font-bold" href="/pages/login">
                  <u>Login</u>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
