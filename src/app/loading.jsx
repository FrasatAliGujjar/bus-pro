// components/LoadingPage.js
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="flex justify-center items-center space-x-2">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>

        {/* Pulsing text */}
        <div className="text-white text-2xl font-semibold animate-pulse">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
