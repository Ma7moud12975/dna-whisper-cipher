
import React, { useEffect, useState } from 'react';

interface DnaVisualizerProps {
  dnaSequence: string;
  maxDisplay?: number;
}

export const DnaVisualizer: React.FC<DnaVisualizerProps> = ({ 
  dnaSequence, 
  maxDisplay = 50 
}) => {
  const [animationActive, setAnimationActive] = useState(true);
  
  useEffect(() => {
    // Reset animation state when sequence changes
    setAnimationActive(true);
    
    // Disable animation after it completes to reduce CPU usage
    const timer = setTimeout(() => {
      setAnimationActive(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [dnaSequence]);
  
  if (!dnaSequence) return null;
  
  // Display a portion of the sequence if it's too long
  const displaySequence = dnaSequence.length > maxDisplay 
    ? dnaSequence.substring(0, maxDisplay) + '...'
    : dnaSequence;
  
  // Map bases to colors
  const getBaseColor = (base: string) => {
    switch (base) {
      case 'A': return 'text-green-500';
      case 'T': return 'text-red-500';
      case 'C': return 'text-blue-500';
      case 'G': return 'text-yellow-600';
      default: return 'text-gray-400';
    }
  };
  
  return (
    <div className="mt-6">
      <div className="text-center mb-2 text-gray-500 text-sm">
        DNA Sequence Visualization
      </div>
      <div className={`relative h-16 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center 
                      ${animationActive ? 'dna-animation' : ''}`}>
        <div className="flex items-center flex-wrap justify-center p-2">
          {Array.from(displaySequence).map((base, index) => (
            <span 
              key={index} 
              className={`inline-block text-lg font-mono ${getBaseColor(base)} 
                         ${animationActive ? 'dna-base' : ''}`}
              style={{
                animationDelay: `${index * 0.05}s`,
                opacity: animationActive ? 0 : 1
              }}
            >
              {base}
            </span>
          ))}
        </div>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .dna-base {
            animation: fadeIn 0.5s forwards;
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
};

export default DnaVisualizer;
