

"use client";

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________

const Invoice = () => {

    // ==================================================

    //Context Data
    const { invoice } = useContext(AppContext);

    // ==================================================

    const invoiceRef = useRef(null);

    const handleDownload = async () => {
        if (invoiceRef.current === null) {
            return;
        }

        try {
            // ________________________________________________________________
            const divElement = document.getElementById("specificDiv");
            const canvas = await html2canvas(divElement, {
                useCORS: true,
                scrollX: 0,
                scrollY: 0,
                width: divElement.scrollWidth,
                height: divElement.scrollHeight,
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `${invoice.pname}-invoice.png`;
            link.click();
            // ________________________________________________________________


        } catch (error) {
            console.error("Error while downloading the invoice", error);
        }
    };

    // ==================================================

    return (
        <div className="min-h-screen bg-red-500 py-10 px-5 flex flex-col items-center">
            <div
                id='specificDiv'
                className="w-full border-1 border-green-600 max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                ref={invoiceRef}
            >
                {/* Header Section */}
                <div className="text-center py-8 bg-red-600 text-white">
                    <h1 className="text-4xl font-extrabold">Bus Mate Service</h1>
                    <p className="text-base mt-2 tracking-wide">Invoice Report</p>
                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dashed divide-gray-300">
                    {/* Passenger Details */}
                    <div className="p-8">
                        <h2 className="text-xl font-semibold mb-6 text-red-600">Passenger Details</h2>
                        <p className="mb-4">
                            <strong className="font-medium">Name:</strong> {invoice.pname}
                        </p>
                        <p className="mb-4">
                            <strong className="font-medium">Contact:</strong> {invoice.pcontact}
                        </p>
                        <p className="mb-4">
                            <strong className="font-medium">Email:</strong> {invoice.pemail}
                        </p>
                    </div>

                    {/* Company Details */}
                    <div className="p-8">
                        <h2 className="text-xl font-semibold mb-6 text-red-600">Company Details</h2>
                        <p className="mb-4">
                            <strong className="font-medium">Company Name:</strong> BusMate
                        </p>
                        <p className="mb-4">
                            <strong className="font-medium">Address:</strong> 123 Main Street, Cityville
                        </p>
                        <p className="mb-4">
                            <strong className="font-medium">Contact:</strong> +987 654 3210
                        </p>
                        <p className="mb-4">
                            <strong className="font-medium">Email:</strong> support@busmate.com
                        </p>
                    </div>
                </div>

                {/* Bus Details Section */}
                <div className="p-8 border-t border-dashed border-gray-300">
                    <h2 className="text-xl font-semibold mb-6 text-red-600">Bus Details</h2>
                    <p className="mb-4">
                        <strong className="font-medium">Total Fare:</strong> {invoice.ptotalfare}
                    </p>
                    <p className="mb-4">
                        <strong className="font-medium">Number of Seats:</strong> {invoice.pnoSeats}
                    </p>
                    <p className="mb-4">
                        <strong className="font-medium">Bus Number:</strong> {invoice.pbusno}
                    </p>
                </div>
            </div>

            {/* Download Button */}
            <div className="mt-10">
                <button
                    onClick={handleDownload}
                    className="px-8 py-3 bg-white text-red-600 font-bold rounded-full shadow-md hover:bg-red-100 transition-all duration-300"
                >
                    Download Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
