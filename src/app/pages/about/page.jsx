"use client"

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/images/logo/logo.png"
import screenApp from "@/app/assets/images/logo/appscreen.png"
import Slider from "@/app/components/slider/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questions } from "../../../app/assets/docs/FAQs.js";
// ______________________________________________
import { useContext, useEffect } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
import axios from "axios";
import { setCookie } from "cookies-next";
// ______________________________________________


export default function About() {

  // ==========================================================================================
  //Context Data
  const {
    Loadingbuses,
    LoadingSeats,
    LoadingUser,
    fetchPassengers,
  } = useContext(AppContext);

  // ==========================================================================================

  useEffect(() => {

    Loadingbuses();
    LoadingUser();
    LoadingSeats();
    fetchPassengers();

  }, []);



  return (
    <>
      <Head>
        <title>About | Bus Reservation System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Hero Section with Background Image */}
        <div
          className="relative h-screen flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: `url('/slider1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-900 opacity-60 "></div>

          {/* Text Content */}
          <div className="relative w-full h-screen z-10 ">
            <div className="w-full  mb-[120px]">
              <Image src={logo} alt="logo" className="rounded-[50%] h-[50px] w-[50px] md:h-[100px] md:w-[100px] m-[15px]" />
            </div>
            <h1 className="text-2xl md:text-6xl font-extrabold mb-6">
              Welcome to <span className="animate-bounce text-[#cb9a6a]">Bus Mate</span> |
            </h1>
            <div className="w-[90%] m-auto text-wrap">
              <p className="text-[20px] md:text-xl mb-8 max-w-2xl mx-auto">
                Book your bus tickets with ease and convenience, and enjoy a seamless travel experience.
                <Link className=" text-[#cb9a6a] text-[20px] font-bold  ml-[10px]" href="#">Read more &rarr;</Link>
              </p>
            </div>
            <div className="flex space-x-6 justify-center">
              <Link href="/pages/signup">
                <button className="border-2 border-red-600 p-[10px] w-[100px] bg-red-600 rounded-sm font-bold hover:bg-transparent transition-all duration-300">
                  Sign Up
                </button>
              </Link>
              <Link href="/pages/login">
                <button className="border-2 border-red-600 p-[10px] w-[100px] bg-red-600 rounded-sm font-bold hover:bg-transparent transition-all duration-300">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="flex flex-col sm:flex-row items-center bg-white py-20 px-8 sm:px-32">
          {/* Text Section */}
          <div className="sm:w-1/2 mb-12 sm:mb-0 text-center sm:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-red-600 mb-6">
              Download Our Bus Mate Mobile App Now
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Experience the ultimate convenience of booking bus tickets directly from your mobile device. Get real-time updates, exclusive deals, and much more right at your fingertips.
            </p>
            <div className="mt-8">
              <button className=" text-white text-center border-2 border-red-600 p-[10px] w-[150px] bg-red-600 rounded-sm font-bold hover:bg-transparent hover:text-red-600 transition-all duration-300">
                <Link href="https://bookkaru.com/">Download Now</Link>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="sm:w-1/2 flex justify-center">
            <Image src={screenApp} alt="screenApp" />
          </div>
        </div>

        {/* Slider section */}

        <div className="min-h-[60vh] flex flex-col items-center justify-center mb-[100px]">
          <p className="text-3xl font-bold m-auto">Our <span className="text-red-600">Partners</span></p>
          <Slider />
        </div>

        {/* Accordian FAQS  */}


        <div className=" bg-white">
          <p className="text-3xl font-bold text-center h-[100px] flex justify-center items-center">Common <span className="text-red-600 ml-[5px]"> FAQ's</span></p>
          <div className="flex flex-col justify-center items-center">
            <Accordion type="single" collapsible>
              {questions.map((item, index) => {
                return (
                  <AccordionItem key={index} value={String(index)}>
                    <AccordionTrigger className="p-[10px] text-xl border-2 border-gray-300 w-[80vw] md:w-[50vw] mb-[10px] no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-[10px] text-[16px]  w-[80vw] md:w-[50vw]  mb-[10px]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>


      </div>
    </>
  );
}
