"use client"

import React, { useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission
        console.log('Form submitted', formData);

        // Show SweetAlert success message
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for contacting us. We will get back to you soon.',
            confirmButtonText: 'OK',
            background: '#f8f9fa',
            confirmButtonColor: '#28a745'
        });

        // Clear form fields after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-500 to-red-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl w-[90%] shadow-xl border border-gray-300">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
                <p className="text-center text-gray-600 mb-8">
                    Have any questions or feedback? We'd love to hear from you!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>

                        {/* Message Input */}
                        <div>
                            <label htmlFor="message" className="block text-gray-700 font-semibold">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                                placeholder="Write your message here..."
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                        >
                            Submit Message
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center text-gray-700">
                    <p>If you prefer to reach us by phone, feel free to call:</p>
                    <p className="text-lg font-semibold">+1 (800) 123-4567</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
