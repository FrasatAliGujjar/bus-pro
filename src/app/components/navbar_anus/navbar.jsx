import Image from 'next/image'
import React, { useState } from 'react'
import logo from '@/app/assets/images/logo/logo.png'
import Link from 'next/link'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className='w-[100%] border-[2px] border-solid border-black flex justify-between items-center bg-black text-white h-[100px] px-4 md:px-8'>
                <div className='flex justify-center items-center h-[100px]'>
                    <Image className='h-[80px] w-[250px] cursor-pointer' src={logo} alt='Logo' />
                </div>
                {/* Desktop Menu */}
                <div className='hidden md:block'>
                    <ul className='flex justify-between items-center w-[500px] font-bold'>
                        <li className='hover:text-[#00FFFF] transition-colors duration-450 cursor-pointer'><Link href="/pages/home">Home</Link></li>
                        <li className='hover:text-[#00FFFF] transition-colors duration-450 cursor-pointer'><Link href="/pages/tickets">Tickets</Link></li>
                        <li className='hover:text-[#00FFFF] transition-colors duration-450 cursor-pointer'><Link href="/pages/about">About</Link></li>
                        <li className='hover:text-[#00FFFF] transition-colors duration-450 cursor-pointer'><Link href="/pages/services">Services</Link></li>
                        <li className='hover:text-[#00FFFF] transition-colors duration-450 cursor-pointer'><Link href="/pages/contact">Contact Us</Link></li>
                    </ul>
                </div>
                {/* Mobile Menu Toggle Button */}
                <div className='md:hidden flex items-center'>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='text-white'>
                        <span className='text-2xl'>{isMobileMenuOpen ? 'X' : '☰'}</span>
                    </button>
                </div>
                {/* Logout Button (Desktop) */}
                <div className='hidden md:block'>
                    <button className='border-[2px] border-solid border-white w-[150px] text-center p-[8px] mr-[10px] rounded-lg hover:text-black hover:bg-white font-bold transition-all duration-400'>
                        <Link href='/pages/dashboard'>Admin Panel</Link>
                    </button>
                    <button className='border-[2px] border-solid border-white w-[150px] text-center p-[8px] mr-[10px] rounded-lg hover:text-black hover:bg-white font-bold transition-all duration-400'>
                        <Link href='/pages/login'>Logout</Link>
                    </button>

                </div>
                <div className='border-[2px] border-solid border-white p-[10px] h-[50px] w-[50px] flex justify-center items-center rounded-[50%] bg-white text-black hidden'>
                    <p className='font-bold text-2xl'>AI</p>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-full bg-black text-white p-4 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
                    }`}>
                <div className='flex flex-col items-center'>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className='absolute top-4 right-4 text-3xl text-white'>
                        X
                    </button>
                    <ul className='flex flex-col items-center'>
                        <li className='py-2 hover:text-[#00FFFF] cursor-pointer'>Home</li>
                        <li className='py-2 hover:text-[#00FFFF] cursor-pointer'>Tickets</li>
                        <li className='py-2 hover:text-[#00FFFF] cursor-pointer'>About</li>
                        <li className='py-2 hover:text-[#00FFFF] cursor-pointer'>Services</li>
                        <li className='py-2 hover:text-[#00FFFF] cursor-pointer'>Contact Us</li>
                    </ul>
                    <div className='pt-6'>
                        <button className='border-[2px] border-solid border-white w-[100px] text-center p-[8px] mr-[10px] rounded-lg hover:text-black hover:bg-white font-bold transition-all duration-400'>
                            <Link href='/pages/login'>Logout</Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
