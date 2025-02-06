"use client"

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheck, faHandHoldingDollar, faHeadset } from '@fortawesome/free-solid-svg-icons';
import Hero from '@/app/components/home/hero/hero';
import TopRoutes from '@/app/components/home/topRoutes/topRoutes';
import axios from 'axios';

// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________


const Home = () => {


  // ==========================================================================================
  //Context Data
  const {
    dbbus,
    Loadingbuses,
  } = useContext(AppContext);

  // ==========================================================================================

  useEffect(() => {

    Loadingbuses();

  }, [dbbus]);

  // ==========================================================================================





  return (
    <>
      <div>
        <Hero />
      </div>
      {/* ===================================================================================== */}

      <p className='my-[40px] text-3xl font-bold text-center'>
        Our <span className='text-red-600'>Services</span>
      </p>

      {/* ================================================= */}

      <div className="container border-1 border-red-500 h-fit p-5 card mt-2 flex justify-center items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* --------------------------------------- */}
          <div className="border-1 border-blue-500">
            {/* box 1 */}
            <div className='p-[20px] rounded-sm cursor-pointer bg-gray-200 hover:bg-gray-300 hover:border-gray-300 transition-all duration-300'>
              <p className='text-2xl font-bold flex justify-center items-center'>
                <FontAwesomeIcon className='bg-gray-400 p-[10px] rounded-lg text-black' icon={faMoneyCheck} /> &nbsp;
                Secure Payment
              </p><br />
              <p className='text-center'>
                Integrate Secure Payment Gateways For Users To <br /> Pay For Their Tickets.
              </p>
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className="border-1 border-blue-500">
            {/* box 2 */}
            <div className='p-[20px] rounded-sm cursor-pointer bg-gray-200 hover:bg-gray-300 hover:border-gray-300 transition-all duration-300'>
              <p className='text-2xl font-bold flex justify-center items-center'>
                <FontAwesomeIcon className='bg-gray-400 p-[10px] rounded-lg text-black' icon={faHandHoldingDollar} /> &nbsp;
                Refund Policy
              </p><br />
              <p className='text-center'>
                Offer Options For The Users To Purchase Refundable <br /> Tickets With Clear Terms.
              </p>
            </div>
          </div>
          {/* --------------------------------------- */}
          <div className="border-1 border-blue-500">
            {/* box 3 */}
            <div className='p-[20px] rounded-sm cursor-pointer bg-gray-200 hover:bg-gray-300 hover:border-gray-300 transition-all duration-300'>
              <p className='text-2xl font-bold flex justify-center items-center'>
                <FontAwesomeIcon className='bg-gray-400 p-[10px] rounded-lg text-black' icon={faHeadset} /> &nbsp;
                24/7 Support
              </p><br />
              <p className='text-center'>
                Get Assistance Anytime Through Live Chat, Email, <br /> or Phone Support.
              </p>
            </div>
          </div>
          {/* --------------------------------------- */}
        </div>
      </div>

      {/* ================================================= */}

      <p className='my-[40px] text-3xl font-bold text-center'>
        Top <span className='text-red-600'>Routes</span>
      </p>

      <div className='flex justify-center items-center h-fit '>
        <div className="container border-1 border-red-500 h-fit p-5 card mt-2 flex justify-around items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ______________________________  */}
            {
              dbbus.map((dbbus_v, i) => (

                <TopRoutes key={i} dbbus_v={dbbus_v} />

              ))
            }
            {/* ______________________________  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;


