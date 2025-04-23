
import React, { useState } from 'react';
import Header from "@/components/Header";
import EncryptionForm from "@/components/EncryptionForm";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import DnaVisualizer from "@/components/DnaVisualizer";

const Index = () => {
  const [currentDnaSequence, setCurrentDnaSequence] = useState<string>("");
  
  // Function to receive the DNA sequence from the EncryptionForm
  const handleDnaOutput = (dna: string) => {
    setCurrentDnaSequence(dna);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6">
        <Header />
        
        <div className="mt-8">
          <EncryptionForm onDnaOutput={handleDnaOutput} />
        </div>
        
        {currentDnaSequence && <DnaVisualizer dnaSequence={currentDnaSequence} />}
        
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
