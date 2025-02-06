"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import { IdCardIcon } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import PaymentMethod from "@/app/components/paymentMethod/paymentMethod";

const Reservation = () => {
    const [passengers, setPassengers] = useState([]);
    const [fullName, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [altPhone, setaltphone] = useState("");
    const [idCard, setidcard] = useState("");

    // Reset Form
    const resetForm = () => {
        setfullname("");
        setemail("");
        setphone("");
        setaltphone("");
        setidcard("");
    };

    // Combined Submit & Add Passenger Function
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    // // Validations


    const handleAddPassenger = async (event) => {
        event.preventDefault();

        const phoneRegex = /^\+92\d{10}$/; // Phone should start with +92 and be 11 digits long
        const idCardRegex = /^\d{13}$/; // ID Card number should be exactly 13 digits
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email format

        if (!phoneRegex.test(phone)) {
            Swal.fire("Invalid Phone Number", "Phone number must start with +92 and be 11 digits long.", "error");
            return;
        }

        if (!idCardRegex.test(idCard)) {
            Swal.fire("Invalid ID Card Number", "ID Card number must be exactly 13 digits.", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
            return;
        }


        try {
            const newPassenger = {
                pName: fullName,
                pEmail: email,
                pPhone: phone,
                pAltPhone: altPhone,
                pIdCard: idCard,
            };
            // console.log("Adding passenger", newPassenger);  // Check data before sending
            const response = await axios.post("/api/passenger", newPassenger);
            // console.log("Response from server:", response);  // Check API response
            setPassengers([...passengers, response.data]);
            resetForm();
            Swal.fire("Success", "Passenger added successfully!", "success");
        } catch (error) {
            console.error("Error adding passenger:", error);  // Log the error
            Swal.fire("Error", "Failed to add the Passenger. Please try again.", "error");
        }
    };



    return (
        <div className="bg-gray-50 flex items-center justify-center h-screen p-[50px] mt-[20px] ">
            <div className="max-w-4xl w-full h-screen bg-white border-gray-400 border-2 rounded-lg p-8 space-y-8 flex flex-col basis-[50%]">
                <h2 className="text-3xl font-bold text-center text-blue-600">
                    Passenger Information
                </h2>

                {/* Form */}
                <form className="space-y-6 h-[80vh] flex flex-col justify-between" onSubmit={handleAddPassenger}>
                    {/* Full Name */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-bold text-blue-600 flex items-center"
                        >
                            <FaUserCircle className="mr-2" /> Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setfullname(e.target.value)}
                            placeholder="Enter your full name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm outline-none"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="text-sm font-bold text-blue-600 flex items-center"
                        >
                            <FaEnvelope className="mr-2" /> Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm outline-none"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="phone"
                            className="text-sm font-bold text-blue-600 flex items-center"
                        >
                            <FaPhone className="mr-2" /> Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                            placeholder="Enter your phone number (e.g., +921234567890)"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm outline-none"
                            required
                        />
                    </div>

                    {/* Alternative Phone Number */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="altPhone"
                            className="text-sm font-bold text-blue-600 flex items-center"
                        >
                            <FaPhone className="mr-2" /> Alternative Phone Number
                        </label>
                        <input
                            type="text"
                            id="altPhone"
                            name="altPhone"
                            value={altPhone}
                            onChange={(e) => setaltphone(e.target.value)}
                            placeholder="Enter an alternative phone number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm outline-none"
                        />
                    </div>

                    {/* ID Card Number */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="idCard"
                            className="text-sm font-bold text-blue-600 flex items-center"
                        >
                            <IdCardIcon className="mr-2" /> ID Card Number
                        </label>
                        <input
                            type="text"
                            id="idCard"
                            name="idCard"
                            value={idCard}
                            onChange={(e) => setidcard(e.target.value)}
                            placeholder="Enter your ID card number (e.g., 3310030877781)"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm outline-none"
                            required
                        />
                    </div>


                    {/* payment method  */}


                    <div className="flex flex-col">
                        <PaymentMethod />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center w-full my-[30px]">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

                        >
                            <Link href="/pages/invoice">Reserve Seat</Link>
                        </button>
                    </div>


                </form>
            </div>
            <div className="h-screen rounded-sm ml-[20px] w-[50vw] flex justify-center p-[20px]">
                <div className="flex flex-col justify-center items-start basis-[50%] col-span-2 border-2 rounded-sm  h-[70vh] p-[20px]">
                    <h1 className="text-center font-bold w-full text-2xl text-red-600">Your Ticket Reservation Status</h1>
                    <div className="w-full space-y-2 flex flex-col justify-center items-center p-[20px] mb-[20px]">
                        <div className="w-[40vw] flex items-center justify-between">
                            <h1 className="text-lg text-neutral-600 font-medium">
                                Your Destination
                            </h1>
                            <Link href="/pages/home" className="text-sm text-red-600 font-normal">
                                Change Route
                            </Link>
                        </div>

                        <div className="space-y-0.5 w-full">
                            <div className="w-full flex items-center justify-between gap-x-5">
                                <p className="text-sm text-neutral-400 font-normal">
                                    From <span className="text-xs">(New Buspark)</span>
                                </p>
                                <p className="text-sm text-neutral-400 font-normal">
                                    To <span className="text-xs">(ChakChake)</span>
                                </p>
                            </div>

                            <div className="w-full flex items-center justify-between gap-x-4">
                                <h1 className="text-sm text-neutral-600 font-normal">
                                    Kathmandu <span className="font-medium">
                                        (06:15 PM)
                                    </span>
                                </h1>
                                <div className="flex-1 border-dashed border-2 border-neutral-300" />

                                <h1 className="text-sm text-neutral-600 font-normal">
                                    Kathmandu <span className="font-medium">
                                        (06:15 PM)
                                    </span>
                                </h1>
                                <div className="flex-1 border-dashed border-2 border-neutral-300" />
                                <h1>
                                    Pyuthan <span className="font-medium">
                                        (08:15 AM)
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-full flex flex-col items-start justify-center mb-[10px]">
                            <h1 className="text-neutral-600 font-bold">
                                Bus Deatils
                            </h1>

                            <div className="w-full flex items-start justify-between ">
                                <p className="text-neutral-500 font-bold">
                                    Bus No.
                                </p>
                                <p>
                                    ADC 2387
                                </p>
                            </div>

                            <div className="w-full flex items-start justify-between">
                                <p className="text-neutral-500 font-bold">
                                    Bus Departure Time
                                </p>
                                <p>
                                    6:05 AM
                                </p>
                            </div>
                        </div>
                    </div>



                    <div className="w-full mt-[20px] mb-[20px]">
                        <div className="w-full flex items-center justify-between">
                            <h1 className="text- text-neutral-600 font-bold">
                                Your Seats
                            </h1>
                            <h1>
                                4
                            </h1>
                        </div>
                    </div>


                    <div className="w-full">
                        <div className="w-full flex items-center justify-between">
                            <h1 className="text- text-neutral-600 font-bold">
                                Total Fair Price
                            </h1>
                            <h1>
                                6400
                            </h1>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <form className="space-y-6 h-[80vh] flex flex-col justify-between w-full">
                        {/* Form fields go here */}


                    </form>

                </div>
            </div>
        </div>
    );
};

export default Reservation;


