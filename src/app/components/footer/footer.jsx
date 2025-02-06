import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bankPay_img from "@/app/assets/images/payment/bankpay.png"
import easyPaisa_img from "@/app/assets/images/payment/easypaisa.png"
import jazzCash_img from "@/app/assets/images/payment/jazzcash.png"
import visa_img from "@/app/assets/images/payment/visa.png"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#141517] text-white py-10">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* Subscribe Section */}
                <div className="flex flex-col items-center justify-center mb-6 w-full">
                    <form className="flex justify-center w-full sm:w-auto relative">
                        <div className="relative w-[90%] md:w-full border-1 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="p-2 w-full rounded-full bg-white border-[#e7bc91] border-2 text-black outline-none pr-[80px]"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-[50%] transform -translate-y-[50%] bg-[#bc8a5f] text-white font-bold hover:bg-[#a47148] px-4 py-2 rounded-full"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10 text-center sm:text-left">
                    {/* Column 1 */}
                    <div className="max-w-xs mx-auto sm:mx-0">
                        <h3 className="font-bold text-lg mb-3">Bus Mate</h3>
                        <p className="text-gray-400 text-[15px]">
                            Bus Mate simplifies bus reservations with a user-friendly platform, reliable service, and transparent pricing. Your perfect travel companion for stress-free journeys!
                        </p>
                        <Link href="#" className="text-[#e7bc91] mt-2 block">
                            Read more →
                        </Link>
                    </div>
                    {/* Other Columns */}
                    {[
                        { title: "Discover", links: ["Buy & Sell", "Merchant", "Giving Back", "Help & Support"] },
                        { title: "About", links: ["Staff", "Team", "Careers", "Blog"] },
                        { title: "Resources", links: ["Security", "Global", "Charts", "Privacy"] },
                        { title: "Social", links: ["Facebook", "Twitter", "Instagram", "Google+"] }
                    ].map((section, index) => (
                        <div key={index} className="border-l-2 border-[#26282d] pl-4">
                            <h3 className="font-bold text-lg mb-5">{section.title}</h3>
                            <ul className="space-y-4 text-[15px]">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link href="#" className="text-gray-400">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="w-full max-w-5xl text-center border-t-2 border-b-2 border-[#26282d] p-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
                    <h1 className="flex flex-wrap justify-center sm:justify-start gap-4">
                        <p>Our Partner :</p>
                        {["GEO Javed Coach", "AKAZAI Group", "AKG Group", "Al-Mumtaz Coach", "Nosheen Ahmed Travellers"].map((partner, index) => (
                            <Link key={index} href="#">
                                <p className="flex items-center"><FontAwesomeIcon icon={faCircleDot} className="mr-1" /> {partner}</p>
                            </Link>
                        ))}
                    </h1>
                    <Link href="#" className="text-[#e7bc91] mt-2 block mb-2">
                        See All →
                    </Link>
                </div>

                {/* Copyright & Payment Methods */}
                <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mt-6">
                    <p className="text-gray-500 text-[15px]">&copy; 2025 . All rights reserved .</p>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-4 p-4">
                        {[jazzCash_img, easyPaisa_img, visa_img, bankPay_img].map((img, index) => (
                            <Image key={index} className="h-[30px] w-[50px]" src={img} alt="payment_method" />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
