"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________




export default function AdminPassenger() {





    // ==================================================

    const { allPassengers, fetchPassengers } = useContext(AppContext);

    // ==================================================

    useEffect(() => {

        fetchPassengers();

    }, [allPassengers]);

    // ==================================================


    // ___________________________________________________________________

    const [searchId, setSearchId] = useState("");
    const [passengerData, setPassengerData] = useState(null);

    // ___________________________________________________________________

    const [formData, setFormData] = useState({
        id: "",
        pName: "",
        pEmail: "",
        pPhone: "",
        pAltPhone: "",
        pIdCard: "",
    });

    // ___________________________________________________________________


    // ___________________________________________________________________

    const handleSearchChange = (e) => {
        setSearchId(e.target.value);
    };

    // ___________________________________________________________________

    const handleUpdateChange = (e) => {
        // console.log(e.target)
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ___________________________________________________________________

    const handleSearchSubmit = (e) => {

        e.preventDefault();

        // Find passenger by ID from the fetched data
        const passenger = allPassengers.find(
            (passenger) => passenger.Rid === searchId
        );


        if (!passenger) {
            Swal.fire({
                icon: "error",
                title: "Not Found",
                text: `No passenger found with ID ${searchId}.`,
            });
            return;
        }

        setPassengerData(passenger);

        setFormData({
            id: passenger.Rid,
            pName: passenger.pName,
            pEmail: passenger.pEmail,
            pPhone: passenger.pPhone,
            pAltPhone: passenger.pAltPhone,
            pIdCard: passenger.pIdCard,
        });

        Swal.fire({
            icon: "success",
            title: "Passenger Found",
            text: `Passenger details for ID ${searchId} have been loaded.`,
        });
    };

    // ___________________________________________________________________

    const handlePassengerUpdate = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        try {
            const response = await axios.patch("/api/passenger", {
                id: formData.id,
                pName: formData.pName,
                pEmail: formData.pEmail,
                pPhone: formData.pPhone,
                pAltPhone: formData.pAltPhone,
                pIdCard: formData.pIdCard,
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Passenger Updated",
                    text: "Passenger details have been successfully updated!",
                });

                // Reset form and related states
                setPassengerData(null);
                setFormData({
                    pName: "",
                    pEmail: "",
                    pPhone: "",
                    pAltPhone: "",
                    pIdCard: "",
                });
                setSearchId("");
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Error updating passenger:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update passenger details. Please try again later.",
            });
        }
    };

    // ___________________________________________________________________

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete passenger with ID Card: ${id}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Sending the ID card in the request body
                    const response = await axios.delete('/api/passenger', {
                        data: { id: id },
                    });

                    if (response.status === 200) {
                        Swal.fire("Deleted!", "The passenger has been deleted.", "success");
                        setPassengerData(null); // Clear the state if deletion succeeds
                    } else {
                        throw new Error("Failed to delete passenger.");
                    }
                } catch (error) {
                    Swal.fire("Error!", "There was an issue deleting the passenger.", "error");
                    console.error("Error deleting passenger:", error);
                }
            }
        });
    };

    // ___________________________________________________________________

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl md:text-4xl  font-bold text-red-600 text-center mb-8">Passenger Management</h1>

            {/* Search Form */}
            <form
                onSubmit={handleSearchSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
            >
                <h2 className="text-2xl font-semibold text-red-900 mb-4">Search Passenger by ID</h2>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Passenger ID</label>
                    <input
                        type="text"
                        value={searchId}
                        onChange={handleSearchChange}
                        placeholder="Enter Passenger ID"
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div className="flex justify-center md:justify-start">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Search Passenger
                    </button>
                </div>
            </form>

            {/* Update Form */}

            {passengerData && (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 overflow-y-scroll md:overflow-y-visible">
                    <h2 className="text-2xl font-semibold text-red-900 mb-4">Update Passenger</h2>
                    <form onSubmit={handlePassengerUpdate}>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    name="pName"
                                    value={formData.pName}
                                    onChange={handleUpdateChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="pEmail"
                                    value={formData.pEmail}
                                    onChange={handleUpdateChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                                <input
                                    type="text"
                                    name="pPhone"
                                    value={formData.pPhone}
                                    onChange={handleUpdateChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Alt Phone</label>
                                <input
                                    type="text"
                                    name="pAltPhone"
                                    value={formData.pAltPhone}
                                    onChange={handleUpdateChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Id Card Number</label>
                                <input
                                    type="text"
                                    name="pIdCard"
                                    value={formData.pIdCard}
                                    onChange={handleUpdateChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between mt-4 space-y-2">
                            <button
                                type="submit"
                                onClick={(e) => handlePassengerUpdate(e)}
                                className="bg-green-500 w-[300px] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Update Passenger
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(formData.id)}
                                className="bg-red-500 w-[300px] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Delete Passenger
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

