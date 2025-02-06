"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________

// --------------------------------------------------------

const Buses = () => {


  // ==========================================================================================
  //Context Data
  const {
    dbbus,
    Loadingbuses,
    LoadingSeats,
  } = useContext(AppContext);

  // ==========================================================================================

  useEffect(() => {

    Loadingbuses();
    LoadingSeats();


  }, []);

  // ==========================================================================================






  return (
    <>
      {/* ============================================================================================================================== */}


      {/* ===================================================================================== */}

      <p className='my-[40px] text-3xl font-bold text-center'>
        Our <span className='text-red-600'>Transport</span>
      </p>

      {/* ===================================================================================== */}


      <section className="text-gray-600 body-font border-2 text-center px-5 py-12 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {/* ==========================================*/}
          {dbbus.map((item, i) => (
            <div
              key={i}
              className="border-1 border-gray-500 lg:w-1/4 md:w-1/3 sm:w-1/3 p-4 w-full shadow-lg m-5 rounded-lg"
            >

              <Link href={`/pages/buses/${item.Bid}`}>
                <Image
                  alt={item.busname}
                  className="m-auto w-[400px] h-[200px] shadow-stone-300 shadow-sm  rounded-lg hover:shadow-lg"
                  src={item.img_url}
                  width={500}
                  height={500}
                  priority
                />
              </Link>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.busname}
                  </h2>
                </div>
                {/* ------------ */}
                <div>
                  <h2 className="text-gray-900 title-font text-lg font-medium flex">
                    37 <p className='text-red-600 ml-1'>Passengers</p>
                  </h2>
                </div>
              </div>
            </div>
            // {/* ==========================================*/ }
          ))}
        </div>
      </section>


      {/* ===================================================================================== */}



      {/* ============================================================================================================================== */}
    </>
  );
};

export default Buses;
