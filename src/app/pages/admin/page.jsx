"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { createClient } from '@supabase/supabase-js'; // npm install @supabase/supabase-js
import { Upload } from "lucide-react";
import Image from "next/image";
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________


const AdminPanel = () => {



    //Image Panel Hnadels
    // ============================================================================================
    let [Picurl, setPicUrl] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);



    //COnnnection with Bucket
    const supabaseUrl = 'https://rrhywjyjsoqpwklkgfjr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyaHl3anlqc29xcHdrbGtnZmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzgwODUsImV4cCI6MjA1MjUxNDA4NX0.qLQUPTdjBssbt4PiGpTRAwIANoujoY26B5BFrHq97fw';
    const supabase = createClient(supabaseUrl, supabaseKey);




    const handleImageUpload = async () => {
        if (!image) {
            Swal.fire("Error", "Please select an image to upload!", "error");
            return;
        }

        const fileName = `${Date.now()}-${image.name}`;

        try {
            const { data, error } = await supabase.storage
                .from('BusBucket')
                .upload(fileName, image);

            if (error) {
                throw error;
            }

            const { data: publicData, error: publicError } = supabase.storage
                .from('BusBucket')
                .getPublicUrl(fileName);

            if (publicError) {
                throw publicError;
            }

            setPicUrl(publicData.publicUrl.toString());
            Swal.fire("Success", "Image uploaded successfully!", "success");
            setImage(null);
            setPreview(null);
        } catch (error) {
            Swal.fire("Error", "Image upload failed. Please try again.", "error");
        }
    };
    // ============================================================================================

















    // Bus Crud Handels
    // ============================================================================================


    // ==================================================
    //Context Data
    const { dbbus, Loadingbuses } = useContext(AppContext);

    // ==================================================

    useEffect(() => {

        Loadingbuses();

    }, [dbbus]);

    // ==================================================

    const [id, setId] = useState("");

    // ==================================================

    const [buses, setBuses] = useState([]);

    const [editMode, seteditMode] = useState(false);

    const handleEditClick = async (busID) => {

        const selectedItem = dbbus.find((item) => item.Bid == busID);

        setId(selectedItem.Bid)
        setbusname(selectedItem.busname)
        setBusNo(selectedItem.busNo)
        setBusFare(selectedItem.busFare)
        setDepartureCity(selectedItem.dprtrCity)
        setArrivalCity(selectedItem.arvlCity)
        setDepartureTime(selectedItem.dprtrTme);

        seteditMode(true);
    };

    // ==================================================

    const [busname, setbusname] = useState("");
    const [busNo, setBusNo] = useState("");
    const [busFare, setBusFare] = useState("");
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureTime, setDepartureTime] = useState("10:10 PM");

    // ==================================================

    // Reset Form
    const resetForm = () => {
        setbusname("");
        setBusNo("");
        setBusFare("");
        setDepartureCity("");
        setArrivalCity("");
        setDepartureTime("");
    };

    // ==================================================

    // Add New Bus
    const handleAddBus = async (e) => {

        e.preventDefault()


        if (Picurl === "") {
            alert("Please upload a picture");
        }
        else {


            const Bid = Date.now() + '-' + Math.floor(Math.random() * 1000000);

            try {
                const newBus = {
                    Bid,
                    busname,
                    busNo,
                    busFare,
                    dprtrCity: departureCity,
                    arvlCity: arrivalCity,
                    dprtrTme: departureTime,
                    img_url: Picurl
                };

                const response = await axios.post("/api/bus", newBus);

                const response2 = await axios.post("/api/Bus_Fk_Seats", newBus);

                setBuses([...buses, response.data]);

                resetForm();

                setPicUrl("");

                Swal.fire("Success", "Bus added successfully!", "success");

            } catch (error) {

                Swal.fire("Error", "Failed to add the bus. Please try again.", "error");
            }
        }

    };

    // ==================================================

    // Delete Bus
    const handleDeleteBus = async (busid) => {


        await axios.delete('/api/bus', { data: { id: busid } });

        handleDeleteBusFromSeat(busid);
        // Swal.fire('Success', 'Bus deleted successfully!', 'success');
        resetForm();
    };

    // Delete Bus from seat table
    const handleDeleteBusFromSeat = async (busid) => {

        await axios.delete('/api/Bus_Fk_Seats', { data: { id: busid } });

        Swal.fire('Success', 'Bus deleted successfully!', 'success');
        resetForm();
    };

    // ==================================================

    // Update Bus
    const handleUpdateBus = async (e) => {

        e.preventDefault()

        await axios.patch('/api/bus', {
            id,
            busname,
            busNo,
            busFare,
            dprtrCity: departureCity,
            arvlCity: arrivalCity,
            dprtrTme: departureTime,
        });
        Swal.fire('Success', 'Bus updated successfully!', 'success');
        seteditMode(false)
        resetForm();
    };

    // ==================================================


    // ============================================================================================
















    return (

        <div className="min-h-screen bg-red-50 py-8 flex items-center justify-center">
            <div className="max-w-7xl w-full mx-auto bg-white shadow-xl rounded-lg p-6 border border-red-300">

                <h1 className="text-xl md:text-4xl font-extrabold text-center text-red-800 mb-8">
                    Bus Management
                </h1>

                <div className="my-3 bg-red-100 p-4 rounded-lg">
                    <label className="block text-red-800 font-semibold mb-2">Select Image:</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            required
                            className="block w-full px-3 py-2 border border-red-400 rounded-md focus:ring-red-600 focus:border-red-600"
                        />
                        <button
                            onClick={handleImageUpload}
                            className="bg-red-800 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                        >
                            <Upload className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-4">
                            <p className="text-red-800 font-semibold">Preview:</p>
                            <Image
                                src={preview}
                                alt="Selected"
                                width={150}
                                height={150}
                                className="mt-2 rounded-md border border-red-400"
                            />
                        </div>
                    )}
                </div>

                {/* Add Bus Form */}
                <form className="mb-8 bg-red-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">
                        Add New Bus
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Bus Name"
                            value={busname}
                            onChange={(e) => setbusname(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Bus Number"
                            value={busNo}
                            onChange={(e) => setBusNo(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Fare"
                            value={busFare}
                            onChange={(e) => setBusFare(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Departure City"
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Arrival City"
                            value={arrivalCity}
                            onChange={(e) => setArrivalCity(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="time"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <button onClick={handleAddBus} className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 w-full text-center">
                        Add Bus
                    </button>
                </form>

                {/* Bus Table */}
                <div className="p-4">
                    <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">Bus Management</h1>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-red-300">
                            <thead>
                                <tr className="bg-red-800 text-white">
                                    <th className="border text-center border-red-300 px-4 py-2">Bus Image</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Bus Name</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Bus Number</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Fare</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Departure City</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Arrival City</th>
                                    <th className="border text-center border-red-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbbus.map((bus, index) => (
                                    <tr key={index} className="hover:bg-red-100">
                                        <td className="border flex justify-center items-center text-center border-red-300 px-4 py-2">
                                            <Image
                                                src={bus.img_url}
                                                width={50}
                                                height={50}
                                                alt={bus.busname}
                                                className="rounded-[8px]"
                                            />
                                        </td>
                                        <td className="border text-center border-red-300 px-4 py-2">{bus.busname}</td>
                                        <td className="border text-center border-red-300 px-4 py-2">{bus.busNo}</td>
                                        <td className="border text-center border-red-300 px-4 py-2">{bus.busFare}</td>
                                        <td className="border text-center border-red-300 px-4 py-2">{bus.dprtrCity}</td>
                                        <td className="border text-center border-red-300 px-4 py-2">{bus.arvlCity}</td>
                                        <td className="border text-center border-red-300 px-4 py-2">
                                            <div className="flex justify-around items-center gap-2">
                                                <button onClick={() => handleDeleteBus(bus.Bid)} className="px-4 py-2 w-[100px] text-center bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                                                <button onClick={() => handleEditClick(bus.Bid)} className="px-4 py-2 w-[100px] text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>




                    {/* Edit Bus Form */}

                    {
                        editMode &&
                        <div className="mt-5 max-w-6xl mx-auto bg-gradient-to-r from-red-600 to-red-800 shadow-xl rounded-xl p-8">

                            <form onSubmit={handleUpdateBus} className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                                    Update Bus Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <input
                                        type="text"
                                        placeholder="Bus Name"
                                        value={busname}
                                        onChange={(e) => setbusname(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white placeholder:text-white/80 text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bus Number"
                                        value={busNo}
                                        onChange={(e) => setBusNo(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white placeholder:text-white/80 text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Fare"
                                        value={busFare}
                                        onChange={(e) => setBusFare(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white placeholder:text-white/80 text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Departure City"
                                        value={departureCity}
                                        onChange={(e) => setDepartureCity(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white placeholder:text-white/80 text-white"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Arrival City"
                                        value={arrivalCity}
                                        onChange={(e) => setArrivalCity(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white placeholder:text-white/80 text-white"
                                        required
                                    />
                                    <input
                                        type="time"
                                        value={departureTime}
                                        onChange={(e) => setDepartureTime(e.target.value)}
                                        className="w-full border border-white/50 bg-white/20 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-white text-white"
                                    // required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full py-3 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:bg-red-100 transition ease-in-out duration-300"
                                >
                                    Update Bus
                                </button>
                            </form>

                        </div>
                    }

                </div>







            </div>
        </div >
    );
};

export default AdminPanel;
