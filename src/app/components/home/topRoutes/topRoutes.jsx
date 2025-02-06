
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaWifi, FaUtensils, FaTv, FaBolt } from 'react-icons/fa'; // Import specific icons

// ==========================================================================================
const Option = ({ icon, label }) => {
  return (
    <span className="flex items-center gap-2">
      {icon} {label}
    </span>
  );
}


const TopRoutes = ({ dbbus_v }) => {

  const route = useRouter();

  return (
    <>
      {/* ======================================================================================================= */}


      <div className="w-full md:w-[390px] bg-gray-200 shadow-md overflow-hidden border-2 ">
        <div className="p-6">
          {/* Route Details */}
          <div className="flex justify-between items-center ">
            <div className="">
              <p className="text-gray-500 text-center">From</p>
              <h2 className="text-xl font-semibold text-gray-800">{dbbus_v.dprtrCity}</h2>
            </div>
            <div className="flex items-center  mt-[28px]">
              <span className="mx-2 text-gray-500">---</span>
              <p className="text-gray-700">{dbbus_v.dprtrTme}</p>
              <span className="mx-2 text-gray-500">---</span>
            </div>
            <div>
              <p className="text-gray-500 text-center">To</p>
              <h2 className="text-xl font-semibold text-gray-800">{dbbus_v.arvlCity}</h2>
            </div>
          </div>
          {/* Options Section */}
          <div className="my-4 flex justify-between text-sm text-gray-600 border-1 border-solid">
            <Option className="m-2" icon={<FaWifi />} label="Internet" />
            <div className='hidden md:block'>
              <Option icon={<FaUtensils />} label="Snacks" />
            </div>
            <Option icon={<FaTv />} label="TV" />
            <Option icon={<FaBolt />} label="Charging" />
          </div>
          {/* Price and Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-gray-800">{dbbus_v.busFare}</p>
            <button
              onClick={() => { route.push(`/pages/buses/${dbbus_v.Bid}`) }}
              className="bg-red-600 border-2 border-red-600 text-white px-4 py-2 rounded-sm shadow font-bold hover:bg-white hover:text-red-600 duration-300">
              {/* <FontAwesomeIcon icon={faHandPointRight} />  */}
              Reserve Seat
            </button>
          </div>
        </div>
      </div>



      {/* ======================================================================================================= */}
    </>
  );
};

export default TopRoutes;
