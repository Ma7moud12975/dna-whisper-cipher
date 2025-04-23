
import React, { useState } from 'react';
import Header from "@/components/Header";
import EncryptionForm from "@/components/EncryptionForm";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import DnaVisualizer from "@/components/DnaVisualizer";
import DnaCyberAnimation from "@/components/DnaCyberAnimation";

const Index = () => {
  const [currentDnaSequence, setCurrentDnaSequence] = useState<string>("");
  
  const handleDnaOutput = (dna: string) => {
    setCurrentDnaSequence(dna);
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzYxNjE2MSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-40" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-6">
          <Header />
          <DnaCyberAnimation />
          
          <div className="mt-8">
            <EncryptionForm onDnaOutput={handleDnaOutput} />
          </div>
          
          {currentDnaSequence && <DnaVisualizer dnaSequence={currentDnaSequence} />}
          
          <InfoSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
