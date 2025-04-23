
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-12 py-6 px-4 bg-gradient-to-r from-indigo-50 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/7d36acb3-bb7f-483e-975a-4a75e882c465.png" 
              alt="Creator" 
              className="w-32 h-auto"
            />
            <p className="text-sm text-gray-600 font-medium">
              Created by Ayman Mahmod
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {year} DNA Whisper Cipher | Built with React & Tailwind CSS
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <a 
                href="#" 
                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
              >
                Back to Top
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="https://en.wikipedia.org/wiki/DNA_digital_data_storage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
