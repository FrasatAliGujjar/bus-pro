"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { createClient } from "@supabase/supabase-js"; // npm install @supabase/supabase-js
import { Upload } from "lucide-react";
import Image from "next/image";
// ______________________________________________
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext.jsx";
// ______________________________________________

const AdminPanel = () => {
    // _________________________________________________________

    const { dbusers, LoadingUser } = useContext(AppContext);

    // _________________________________________________________

    useEffect(() => {

        LoadingUser();

    }, []);

    // _________________________________________________________

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");

    // _________________________________________________________

    const resetInput = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
    };

    // _________________________________________________________

    const handleAddAdmin = async (e) => {

        e.preventDefault();

        const EmailExist = dbusers.some((v) => v.email === email);

        if (EmailExist) {

            toast.error('Email already Exist.', { position: "top-center" });

        }
        else {

            await axios.post("/api/users", { firstname, lastname, email, password, role });
            resetInput();
            toast.success("Sign Up Successful!", { autoClose: 2000 });
            router.push('/pages/home');

        }

    };

    // _________________________________________________________

    return (
        <div className="min-h-screen bg-red-50 py-8 flex items-center justify-center">
            <div className="max-w-7xl w-full mx-auto bg-white shadow-xl rounded-lg p-6 border border-red-300">
                <h1 className="text-xl md:text-4xl font-extrabold text-center text-red-800 mb-8">
                    Admin Management
                </h1>

                {/* Add Admin Form */}
                <form
                    onSubmit={handleAddAdmin}
                    className="mb-8 bg-red-100 p-6 rounded-lg"
                >
                    <h2 className="text-2xl font-semibold text-red-800 mb-4">
                        Add New Admin
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 w-full text-center"
                    >
                        Add Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
