"use client";
// ______________________________________________
import Image from "next/image";
import { useParams } from "next/navigation";
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { LuArmchair } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Amenities from "@/app/components/amenities/amenities";
import Link from "next/link";
import ToggleButton from "@/app/components/toggleButton/toggleButton";
import ReservationPolicy from "@/app/components/reservationPolicy/reservationPolicy";
// import axios from "axios";
import Swal from "sweetalert2";
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________


function Page() {

  // ==========================================================================================
  //Context Data
  const {

    Loadingbuses,
    LoadingSeats,
    dbbus,
    dbSeats,
    seatCount,
    setSeatCount,
    selectedSeats,
    setSelectedSeats,
    setseatsUpdateStatus,
    setSlugBusId

  } = useContext(AppContext);

  // ==========================================================================================



  // ==================================================

  //Receiving Busid
  const { slug } = useParams() || {};

  // ==================================================

  //States
  const [selectedSeatColor, setselectedSeatColor] = useState({});
  const [dbItem, setdbItem] = useState({});
  const [LoadedSeats, setLoadedSeats] = useState({});
  // ==================================================

  //Page First Loading
  useEffect(() => {

    setSeatCount(0);

    setSelectedSeats([]);

    // _________________________________________________________
    async function executeInSequence() {
      await Loadingbuses(); // Wait for Loadingbuses to complete
      await LoadingSpecificBus(); // Then execute LoadingSpecificBus
      await LoadingSeats(); // Wait for LoadingSeats to complete
      await LoadingSpecificSeats(); // Finally execute LoadingSpecificSeats
    }
    // _________________________________________________________
    executeInSequence();



    setseatsUpdateStatus({
      "S_1": "true",
      "S_2": "true",
      "S_3": "true",
      "S_4": "true",
      "S_5": "true",
      "S_6": "true",
      "S_7": "true",
      "S_8": "true",
      "S_9": "true",
      "S_10": "true",
      "S_11": "true",
      "S_12": "true",
      "S_13": "true",
      "S_14": "true",
      "S_15": "true",
      "S_16": "true",
      "S_17": "true",
      "S_18": "true",
      "S_19": "true",
      "S_20": "true",
      "S_21": "true",
      "S_22": "true",
      "S_23": "true",
      "S_24": "true",
      "S_25": "true",
      "S_26": "true",
      "S_27": "true",
      "S_28": "true",
      "S_29": "true",
      "S_30": "true",
      "S_31": "true",
      "S_32": "true",
      "S_33": "true",
      "S_34": "true",
      "S_35": "true",
      "S_36": "true",
      "S_37": "true"
    });

  }, []);

  // ==================================================

  const LoadingSpecificBus = async () => {

    const selectedItem = dbbus.find((item) => item.Bid == slug);

    setdbItem(selectedItem || {});

  };

  // ===================================================

  const LoadingSpecificSeats = async () => {

    const selectedBusSeats = dbSeats.find((item) => item.Bid == slug);

    setLoadedSeats(selectedBusSeats || {});

  };

  // ===================================================



  //manage seats color and seat adding golobally in usecontext also
  const handelSeatStatus = (key, value) => {

    setseatsUpdateStatus((prevStatus) => {

      // _____________________________________________________________________________________
      if (selectedSeats.length === 20) {
        Swal.fire({
          title: 'Warning!',
          text: '10 seats selected',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
      // _____________________________________________________________________________________
      else {

        let isSeatAvailable = prevStatus[key] === "true"; // Check current seat status

        if (isSeatAvailable) {
          // Seat is available, so book it



          setSelectedSeats((prev) => {
            if (LoadedSeats[key] === "true") {

              setSeatCount(seatCount + 1);

              return [...prev, key];

            }
            return prev;
          });



          setselectedSeatColor((prevSeats) => ({
            ...prevSeats,
            [key]: true, // Mark seat as selected
          }));

          return {
            ...prevStatus,
            [key]: "false", // Seat is now booked
          };

        }

        else {


          setSelectedSeats((prev) => {
            if (LoadedSeats[key] === "true") {
              setSeatCount(seatCount - 1);


              return prev.filter((item) => item !== key);


            }
            return prev;
          });



          setselectedSeatColor((prevSeats) => ({
            ...prevSeats,
            [key]: false, // Deselect seat
          }));



          return {
            ...prevStatus,
            [key]: "true", // Seat is now available
          };
        }
      }
      // _____________________________________________________________________________________
    });
  };

  // ==================================================

  //manage seat color on base of database data
  const getSeatName = (value) => {
    if (value === "true") {
      return 'text-neutral-500 cursor-pointer' //available seat
    }
    return 'text-red-600 cursor-not-allowed' //bookes seat unavailable
  }

  // ===================================================




































  return (




    <section className=" text-gray-600 body-font overflow-hidden flex flex-col justify-center items-center">

      <div className=" border-[5px] border-red-500 container px-2 py-2 mx-auto flex justify-center items-center">

        <div className="border-[5px] border-green-500 lg:w-auto mx-auto flex flex-wrap justify-center items-center">























          {/* ======================================================================================================================= */}

          <div className=" border-[5px] border-blue-500 flex flex-col justify-center items-center">
            {/* __________________________________________  */}
            <div>
              <Image
                src={dbItem.img_url || ""}
                alt="buses"
                width={400}
                height={300}
                className="border-[5px] border-black md:w-[400px] md:h-[300px] w-[400px]  rounded-sm"
              />
            </div>
            {/* __________________________________________  */}

            <div className="border-2 border-black py-4 px-2 md:mt-9 flex justify-between">
              <div className="w-[20%] md:w-[30%]">
                <p className="font-bold text-black">From</p>
                <input className="w-full p-[1px] md:w-[90%]  md:text-md   rounded-lg  border-1 border-gray-500" type="text" disabled value={dbItem.dprtrCity || ''} />
              </div>
              <div className="w-[30%]  md:w-[20%]  text-[10px] lg:text-[12px] flex justify-center items-center border-2 border-dashed border-gray-600 py-1 px-1 rounded-full">
                {dbItem.dprtrTme}
              </div>
              <div className="w-[20%]  md:w-[30%] text-right">
                <p className="font-bold text-black">To</p>
                <input className="w-[100%] md:text-md rounded-lg  text-right border-1 border-gray-500" type="text" disabled value={dbItem.arvlCity || ''} />
              </div>
            </div>
            {/* __________________________________________  */}

            <div className="w-full space-y-2">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-lg text-neutral-600 font-medium">
                  Selected Seats
                </h1>

                <div className="bg-red-600 rounded-sm py-0.5 px-1.5 text-xs text-white font-bold uppercase">Non-Refundable</div>
              </div>

              {
                selectedSeats.length > 0 ? (
                  <div className="w-full flex items-center gap-x-3">
                    {[...new Set(selectedSeats)].map((value, i) => {
                      return (
                        <div
                          key={i}
                          className="w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-base text-neutral-700 font-semibold"
                        >
                          {value}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full flex items-center gap-x-3">
                    <p className="text-sm text-neutral-500 font-normal">No Seat Selected</p>
                  </div>
                )
              }

              {/* __________________________________________  */}

            </div>

          </div>

          {/* ======================================================================================================================= */}


















          {/* ===============================================[ LEFT ]================================================================== */}
          <div className=" border-[5px] border-purple-500 w-full lg:w-1/2 lg:pl-4 lg:py-6 mt-6 lg:mt-0">
            {/* ----------------------------------- */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              BUS NAME
            </h2>
            {/* ----------------------------------- */}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {dbItem.busname}
            </h1>
            {/* ----------------------------------- */}
            <div className="flex mt-1 items-center pb-5 border-gray-100 mb-2">
              <FaStar style={{ color: "gold", fontSize: "24px" }} />
              <FaStar style={{ color: "gold", fontSize: "24px" }} />
              <FaStar style={{ color: "gold", fontSize: "24px" }} />
              <FaStar style={{ color: "gold", fontSize: "24px" }} />
              <FaStarHalfAlt style={{ color: "gold", fontSize: "24px" }} />
            </div>
            {/* ----------------------------------- */}




            {/* ========================================= [ Seat Box ] ========================================================= */}
            <div className=" border-[5px] border-blue-500 w-full grid grid-cols-5 gap-10 ">

              <div className="col-span-3 w-[735px] flex items-center justify-center shadow-sm rounded-xl p-0">


                <div className=" w-full space-y-7  border-2 border-gray-300 p-[10px]">

                  <p className="text-base text-neutral-600 font-medium text-center">
                    Click on the available seats to reserve your seat .
                  </p>


                  {/* seat layout */}
                  <div className="flex items-stretch gap-x-1.5  w-full">

                    <div className="w-full h-fit">
                      <GiSteeringWheel className="text-3xl mt-4  text-red-600 -rotate-90" />
                    </div>

                    {/* seat row */}
                    <div className="flex flex-col items-center border-l-2 border-dashed p-[10px] ml-[-40px]">

                      <div className="flex-1 space-y-1">
                        {/* first row */}
                        <div className="w-[40vw] h-auto grid grid-cols-9 gap-x-5">

                          {Object.entries(LoadedSeats)
                            .slice(1, 10)
                            .map(([key, value], index) => (
                              <div
                                key={index}
                                onClick={() => handelSeatStatus(key)}
                                className={`flex items-center justify-start cursor-pointer w-[70px] h-[50px] ${getSeatName(value)} ${value === "true" && selectedSeatColor[key] ? "text-yellow-600 cursor-not-allowed" : ""
                                  }`}
                              >
                                <h6 className="text-[13px]">{key}</h6>
                                <LuArmchair className="text-[25px] -rotate-90" />
                              </div>
                            ))}

                        </div>


                        {/* second row */}
                        <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                          <div className="w-[40vw] h-auto grid grid-cols-9 gap-x-5">

                            {
                              Object.entries(LoadedSeats).slice(10, 19).map(([key, value], index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() => handelSeatStatus(key)}
                                    className={`flex items-center justify-start cursor-pointer w-[70px] h-[50px] ${getSeatName(value)} ${value === "true" && selectedSeatColor[key] ? "text-yellow-600 cursor-not-allowed" : ""
                                      }`}
                                  >
                                    <h6 className="text-[13px]">{key}</h6>
                                    <LuArmchair className="text-[25px] -rotate-90" />
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        {/* third row */}
                        <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                          <div className="w-[39.5vw] h-auto grid grid-cols-10 gap-x-5">
                            <div className="col-span-9"></div>

                            {
                              Object.entries(LoadedSeats).slice(19, 20).map(([key, value], index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() => handelSeatStatus(key)}
                                    className={`flex items-center justify-start cursor-pointer w-[70px] h-[50px] ${getSeatName(value)} ${value === "true" && selectedSeatColor[key] ? "text-yellow-600 cursor-not-allowed" : ""
                                      }`}
                                  >
                                    <h6 className="text-[13px]">{key}</h6>
                                    <LuArmchair className="text-[25px] -rotate-90" />
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        {/* fourth row */}
                        <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                          <div className="w-[40vw] h-auto grid grid-cols-9 gap-x-5">
                            {
                              Object.entries(LoadedSeats).slice(20, 29).map(([key, value], index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() => handelSeatStatus(key)}
                                    className={`flex items-center justify-start cursor-pointer w-[70px] h-[50px] ${getSeatName(value)} ${value === "true" && selectedSeatColor[key] ? "text-yellow-600 cursor-not-allowed" : ""
                                      }`}
                                  >
                                    <h6 className="text-[13px]">{key}</h6>
                                    <LuArmchair className="text-[25px] -rotate-90" />
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                        {/* fifth row */}
                        <div className="w-full h-auto grid grid-cols-9 gap-x-5 justify-end">
                          <div className="w-[40vw] h-auto grid grid-cols-9 gap-x-5">

                            {
                              Object.entries(LoadedSeats).slice(29, 38).map(([key, value], index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() => handelSeatStatus(key)}
                                    className={`flex items-center justify-start cursor-pointer w-[70px] h-[50px] ${getSeatName(value)} ${value === "true" && selectedSeatColor[key] ? "text-yellow-600 cursor-not-allowed" : ""
                                      }`}
                                  >
                                    <h6 className="text-[13px]">{key}</h6>
                                    <LuArmchair className="text-[25px] -rotate-90" />
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* reservation info */}

                  <div className="w-full flex items-center justify-center gap-6 border-t border-neutral-200 pt-5">
                    <div className="flex items-center gap-x-2">
                      <MdOutlineChair className="text-xl text-neutral-500 -rotate-90" />
                      <p className="text-sm text-neutral-500 font-medium">
                        Available
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <MdOutlineChair className="text-xl text-red-600 -rotate-90" />
                      <p className="text-sm text-neutral-500 font-medium">
                        Booked
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <MdOutlineChair className="text-xl text-yellow-600 -rotate-90" />
                      <p className="text-sm text-neutral-500 font-medium">
                        Selected ({seatCount})
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <RiMoneyRupeeCircleLine className="text-xl text-neutral-500 -rotate-90" />
                      <p className="text-sm text-neutral-500 font-medium">
                        NRP. {dbItem.busFare}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            {/* ========================================= [ Seat Box ] ========================================================= */}


            {/* ----------------------------------- */}


            <div className="flex ml-[105px] w-[40vw]">
              <button onClick={() => setSlugBusId(slug)} className="flex ml-auto text-white border-2 border-red-600 bg-red-600 hover:text-red-600 font-bold transition-all duration-300 hover:bg-transparent py-2 px-6 rounded-sm">
                <Link href={`/pages/buses/${slug}/${dbItem.Bid}`}>
                  Proceed to checkout
                </Link>
              </button>
            </div>

            {/* ----------------------------------- */}

          </div>


          {/* button  */}


        </div>






        {/* ======================================================================================================================= */}
      </div>










      {/* This is inside of session */}
      {/* ============================================================== [ Toggle info ] ======================================================= */}
      <div className="border-1 border-black w-full text-center flex items-center justify-center gap-6 flex-col mt-[10px]">
        <ToggleButton buttonText={"See Bus Details"} buttonTextHidden={"Hide Bus Deatils"}>
          <div className="w-full space-y-10">

            {/* reservation policy and amenities  */}

            <div className="w-full grid grid-cols-7 gap-20">

              {/* ameities  */}

              <Amenities />

              {/* reservation policy  */}

              <ReservationPolicy />

            </div>

          </div>
        </ToggleButton>
      </div>
      {/* ============================================================== [ Toggle info ] ======================================================= */}

















    </section>
  );
}

export default Page;