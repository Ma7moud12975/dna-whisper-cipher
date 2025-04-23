
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          DNA Whisper Cipher
        </h1>
        <div className="mt-2 text-lg text-gray-600 text-center max-w-2xl">
          Secure your messages with DNA encryption technology
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
            <span className="mr-1">00 →</span>
            <span className="font-bold text-green-500">A</span>
          </div>
          <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
            <span className="mr-1">01 →</span>
            <span className="font-bold text-red-500">T</span>
          </div>
          <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
            <span className="mr-1">10 →</span>
            <span className="font-bold text-blue-500">C</span>
          </div>
          <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
            <span className="mr-1">11 →</span>
            <span className="font-bold text-yellow-600">G</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
