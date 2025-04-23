
import React from 'react';
import { WifiIcon, Binary, Dna } from 'lucide-react';

const DnaCyberAnimation = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden my-8">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* DNA Helix Animation */}
        <div className="animate-pulse">
          <Dna className="w-12 h-12 text-indigo-600" />
        </div>
        
        {/* Cyber Elements */}
        <div className="absolute inset-0 flex items-center justify-around opacity-50">
          <div className="animate-bounce delay-100">
            <Binary className="w-8 h-8 text-blue-500" />
          </div>
          <div className="animate-ping">
            <WifiIcon className="w-6 h-6 text-green-500" />
          </div>
          <div className="animate-bounce delay-300">
            <Binary className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DnaCyberAnimation;
