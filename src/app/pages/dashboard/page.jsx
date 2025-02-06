"use client"

import axios from "axios";
import Link from "next/link";
import { React, useState, useEffect } from "react";

// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________


const Dashboard = () => {


    // ==================================================

    const {

        dbbus,
        allPassengers,
        Loadingbuses,
        fetchPassengers,

    } = useContext(AppContext);

    // ==================================================

    const handleSpeak = (cmd) => {
        const utterance = new SpeechSynthesisUtterance(cmd);
        utterance.voice = speechSynthesis.getVoices()[2];
        speechSynthesis.speak(utterance);
    };

    // ==================================================

    useEffect(() => {

        Loadingbuses();
        fetchPassengers();
        // handleSpeak();

    }, []);

    // ==================================================


    return (

        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium text-gray-700">Total Bookings</h2>
                            <p className="mt-2 text-3xl font-bold text-blue-600">{(allPassengers.length).toString()}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium text-gray-700">Buses Available</h2>
                            <p className="mt-2 text-3xl font-bold text-green-600">{(dbbus.length).toString()}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium text-gray-700">Revenue</h2>
                            <p className="mt-2 text-3xl font-bold text-yellow-600">
                                {
                                    (() => {
                                        let sum = 0;

                                        allPassengers.forEach((reservation) => {
                                            sum += Number(reservation.totalFare);
                                        });

                                        const total = sum.toString();
                                        return total;
                                    })()
                                }
                            </p>

                        </div>
                    </div>

                    {/* Reservation Table */}
                    <div className="mt-8 bg-white p-6 rounded-lg shadow overflow-y-scroll md:overflow-y-visible">
                        <h2 className="text-xl font-bold text-gray-800">Recent Reservations</h2>
                        <div className="mt-4">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Bus</th>
                                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPassengers.map((passenger) => (
                                            <tr key={passenger.Rid}>
                                                <td className="py-2 px-4 text-gray-700">{passenger.pName}</td>
                                                <td className="py-2 px-4 text-gray-700">{passenger.busname}</td>
                                                <td className="py-2 px-4 text-gray-700">{passenger.dprtrTme}</td>
                                                <td className="py-2 px-4 text-green-600">Confirmed</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="mt-8 flex justify-center flex-wrap md-flex-nowrap md:space-x-4 space-y-3 md:space-y-0">
                        <Link href="/pages/adminpassenger">
                            <button onClick={() => handleSpeak("Welcome to passenger management page")} className="bg-blue-600 w-[200px] text-center text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700">
                                Manage Passengers
                            </button>
                        </Link>
                        <Link href="/pages/admin">
                            <button onClick={() => handleSpeak("Welcome to Bus management page")} className="bg-gray-600 w-[200px] text-center text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700">
                                Manage Buses
                            </button>
                        </Link>
                        <Link href="/pages/adminmanage">
                            <button onClick={() => handleSpeak("Welcome to Admin management page")} className="bg-blue-600 w-[200px] text-center text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700">
                                Manage Admin
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
