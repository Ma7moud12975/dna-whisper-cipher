
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { textToDna, dnaToText, generateDnaKey, exportAsTxt, exportAsFasta } from "@/utils/dnaEncryption";
import { ArrowRight } from 'lucide-react';
import { ConversionSteps } from './ConversionSteps';

type Mode = 'encrypt' | 'decrypt';

interface EncryptionFormProps {
  onDnaOutput?: (dna: string) => void;
}

const EncryptionForm: React.FC<EncryptionFormProps> = ({ onDnaOutput }) => {
  const [mode, setMode] = useState<Mode>('encrypt');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [dnaKey, setDnaKey] = useState('');
  const [useDnaKey, setUseDnaKey] = useState(false);
  const [showSteps, setShowSteps] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [encryptionSteps, setEncryptionSteps] = useState<any | null>(null);
  
  // Handle form submission for encryption/decryption
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (mode === 'encrypt') {
        // Encrypt text to DNA
        const result = textToDna(input, useDnaKey ? dnaKey : undefined);
        setOutput(result.dna);
        setEncryptionSteps(result.steps);
        // Pass DNA output to parent component
        if (onDnaOutput) {
          onDnaOutput(result.dna);
        }
      } else {
        // Decrypt DNA to text
        const result = dnaToText(input, useDnaKey ? dnaKey : undefined);
        setOutput(result.text);
        setEncryptionSteps(result.steps);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
      setEncryptionSteps(null);
    }
  };
  
  // Generate a random DNA key
  const handleGenerateKey = () => {
    // Key length should match input length for proper one-time pad
    const keyLength = mode === 'encrypt' ? 
      input.length * 4 : // Each character becomes 4 DNA bases
      Math.ceil(input.length / 4); // Rough estimate for decryption
    
    const newKey = generateDnaKey(Math.max(16, keyLength));
    setDnaKey(newKey);
    setUseDnaKey(true);
  };
  
  // Switch between encrypt and decrypt modes
  const toggleMode = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    setInput('');
    setOutput('');
    setError(null);
    setEncryptionSteps(null);
    
    // Clear the DNA output when toggling modes
    if (onDnaOutput) {
      onDnaOutput('');
    }
  };
  
  // Handle file export
  const handleExport = (format: 'txt' | 'fasta') => {
    if (!output) return;
    
    if (format === 'txt') {
      exportAsTxt(output);
    } else {
      exportAsFasta(output);
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {mode === 'encrypt' ? 'Text to DNA Encryption' : 'DNA to Text Decryption'}
            </h2>
            <Button 
              variant="outline" 
              onClick={toggleMode}
              className="flex items-center gap-2"
            >
              Switch to {mode === 'encrypt' ? 'Decrypt' : 'Encrypt'} 
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="input" className="text-lg">
                {mode === 'encrypt' ? 'Plain Text' : 'DNA Sequence'}
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encrypt' ? 'Enter text to encrypt' : 'Enter DNA sequence (A, T, C, G only)'}
                className="h-32 font-mono"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="use-key" 
                checked={useDnaKey} 
                onCheckedChange={setUseDnaKey} 
              />
              <Label htmlFor="use-key">Use DNA Key (One-Time Pad)</Label>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGenerateKey}
                className="ml-auto"
                size="sm"
              >
                Generate Key
              </Button>
            </div>
            
            {useDnaKey && (
              <div>
                <Label htmlFor="dna-key" className="text-lg">DNA Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="dna-key"
                    value={dnaKey}
                    onChange={(e) => setDnaKey(e.target.value)}
                    placeholder="Enter DNA key (A, T, C, G only)"
                    className="font-mono"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-steps"
                  checked={showSteps}
                  onCheckedChange={setShowSteps}
                />
                <Label htmlFor="show-steps">Show Conversion Steps</Label>
              </div>
              
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
              </Button>
            </div>
          </form>
          
          {output && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="output" className="text-lg">
                  {mode === 'encrypt' ? 'DNA Output' : 'Decrypted Text'}
                </Label>
                {mode === 'encrypt' && (
                  <div className="space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleExport('txt')}
                    >
                      Export as .txt
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleExport('fasta')}
                    >
                      Export as .fasta
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 rounded-md overflow-auto max-h-32 font-mono">
                {output}
              </div>
            </div>
          )}
          
          {showSteps && encryptionSteps && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Conversion Steps</h3>
              <ConversionSteps steps={encryptionSteps} mode={mode} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EncryptionForm;
