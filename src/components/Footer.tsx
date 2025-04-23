
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-12 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
    </footer>
  );
};

export default Footer;
