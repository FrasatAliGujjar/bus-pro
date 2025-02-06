"use client"

import axios from "axios";

// context/AppContext.jsx
import { createContext, useState } from "react";
import Swal from "sweetalert2";

// Create the context
export const AppContext = createContext();






// Create the provider component
export const AppProvider = ({ children }) => {




    // ============================= [ Data ] ===============================

    var [seatCount, setSeatCount] = useState(0);

    const [selectedSeats, setSelectedSeats] = useState([]);

    let [seatsUpdateStatus, setseatsUpdateStatus] = useState({
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

    const [slugBusId, setSlugBusId] = useState("")

    const [invoice, setInvoice] = useState({
        "pname": "",
        "pemail": "",
        "pcontact": "",
        "ptotalfare": "",
        "pnoSeats": "",
        "pbusno": ""
    })

    // ==================================================

    const [dbusers, setDbusers] = useState([]);
    const [dbbus, setdbBus] = useState([]);
    const [dbSeats, setDbSeats] = useState([]);
    const [allPassengers, setAllPassengers] = useState([]);

    // ==================================================











    // ==========================================================================================
    // Update Bus

    const handleUpdateSeatStatus = async () => {

        const falseSeats = Object.fromEntries(
            Object.entries(seatsUpdateStatus).filter(([key, value]) => value === "false")
        );

        await axios.patch('/api/Bus_Fk_Seats', { slugBusId, falseSeats });


        Swal.fire('Success', 'Seats updated successfully!', 'success');
    };


    // ==========================================================================================
    const Loadingbuses = async () => {

        const response = await axios.get("/api/bus");

        setdbBus(response.data)

    }
    // ==========================================================================================

    const LoadingUser = async () => {

        const response = await axios.get("/api/users");

        setDbusers(response.data)

    }
    // ==========================================================================================

    const LoadingSeats = async () => {

        const response = await axios.get("/api/seat");

        setDbSeats(response.data);

    };

    // ==========================================================================================

    const fetchPassengers = async () => {

        const response = await axios.get("/api/passenger");

        setAllPassengers(response.data);

    };

    // ==========================================================================================



    // ======================================================================


    return (

        <AppContext.Provider value={{
            seatCount,
            setSeatCount,
            selectedSeats,
            setSelectedSeats,
            seatsUpdateStatus,
            setseatsUpdateStatus,
            handleUpdateSeatStatus,
            setSlugBusId,
            invoice,
            setInvoice,
            dbbus,
            setdbBus,
            dbusers,
            setDbusers,
            dbSeats,
            setDbSeats,
            allPassengers,
            setAllPassengers,
            Loadingbuses,
            LoadingSeats,
            LoadingUser,
            fetchPassengers,
        }}>


            {children}



        </AppContext.Provider>

    );
};
