"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/app/components/navbar";
import Navbar from "@/app/components/navbar/navbar.jsx";
import { usePathname } from "next/navigation";
import Footer from "./components/footer/footer";
// ========================================================
import { AppProvider } from "@/app/context/AppContext.jsx";
// ========================================================

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Array of routes where the Navbar should not be displayed
const noNavbarRoutes = ["/", "/pages/login", "/pages/signup", "/pages/about"];
// Array of routes where the Footer should not be displayed
const noFooterRoutes = ["/pages/login", "/pages/signup"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>

          {/* =========================================================================== */}
          {/* Conditionally render Navbar based on pathname */}
          {!noNavbarRoutes.includes(pathname) && <Navbar />}
          {/* ______________________ */}
          {children}
          {/* ______________________ */}
          {/* Conditionally render Footer based on pathname */}
          {!noFooterRoutes.includes(pathname) && (
            <div className="mt-[50px]">
              <Footer />
            </div>
          )}
          {/* =========================================================================== */}

        </AppProvider>

      </body>
    </html>
  );
}
