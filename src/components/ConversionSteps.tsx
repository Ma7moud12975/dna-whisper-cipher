
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConversionStepsProps {
  steps: any;
  mode: 'encrypt' | 'decrypt';
}

export const ConversionSteps: React.FC<ConversionStepsProps> = ({ steps, mode }) => {
  const isEncrypt = mode === 'encrypt';
  
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="step1">
        <AccordionTrigger>
          Step 1: {isEncrypt ? 'Convert characters to ASCII' : 'DNA to binary conversion'}
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-32 rounded-md border p-2">
            {isEncrypt ? (
              <div className="font-mono">
                {steps.text.split('').map((char: string, i: number) => (
                  <div key={i} className="flex gap-4 mb-1">
                    <span className="w-10 text-indigo-600">{char}</span>
                    <span className="text-gray-700">→</span>
                    <span className="text-emerald-600">{steps.ascii[i]}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-mono">
                <div className="mb-2">DNA Sequence:</div>
                <div className="mb-2 text-indigo-600">{steps.dna}</div>
                <div className="mb-2">↓</div>
                <div className="mb-2">Binary Segments:</div>
                <div className="text-emerald-600">
                  {steps.binarySegments.map((segment: string[], i: number) => (
                    <div key={i} className="mb-1">
                      {segment.join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="step2">
        <AccordionTrigger>
          Step 2: {isEncrypt ? 'Convert ASCII to binary' : 'Group binary into bytes'}
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-32 rounded-md border p-2">
            <div className="font-mono">
              {isEncrypt ? (
                steps.ascii.map((ascii: number, i: number) => (
                  <div key={i} className="flex gap-4 mb-1">
                    <span className="w-10 text-indigo-600">{ascii}</span>
                    <span className="text-gray-700">→</span>
                    <span className="text-emerald-600">{steps.binary[i]}</span>
                  </div>
                ))
              ) : (
                <div>
                  <div className="mb-1">Binary grouped into bytes:</div>
                  {steps.binary.map((byte: string, i: number) => (
                    <div key={i} className="text-emerald-600 mb-1">{byte}</div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="step3">
        <AccordionTrigger>
          Step 3: {isEncrypt ? 'Map 2-bit segments to DNA bases' : 'Binary to ASCII conversion'}
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-32 rounded-md border p-2">
            <div className="font-mono">
              {isEncrypt ? (
                steps.binarySegments.map((segments: string[], i: number) => (
                  <div key={i} className="mb-2">
                    <div className="text-indigo-600">
                      {segments.join(' ')} 
                    </div>
                    <div className="text-gray-700">↓</div>
                    <div className="text-emerald-600">
                      {segments.map((seg: string) => 
                        seg === '00' ? 'A' : 
                        seg === '01' ? 'T' :
                        seg === '10' ? 'C' : 'G'
                      ).join('')}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="mb-2">Binary to ASCII:</div>
                  {steps.binary.map((byte: string, i: number) => (
                    <div key={i} className="flex gap-4 mb-1">
                      <span className="text-indigo-600">{byte}</span>
                      <span className="text-gray-700">→</span>
                      <span className="text-emerald-600">{steps.ascii[i]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="step4">
        <AccordionTrigger>
          Final Result: {isEncrypt ? 'Complete DNA sequence' : 'Text from ASCII'}
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-3 bg-gray-50 rounded-md font-mono">
            {isEncrypt ? (
              <div>
                <div className="mb-2 text-sm text-gray-600">DNA Sequence:</div>
                <div className="text-indigo-600">{steps.dna}</div>
              </div>
            ) : (
              <div>
                <div className="mb-2 text-sm text-gray-600">ASCII to Text:</div>
                <div>
                  {steps.ascii.map((ascii: number, i: number) => (
                    <div key={i} className="flex gap-4 mb-1">
                      <span className="text-indigo-600">{ascii}</span>
                      <span className="text-gray-700">→</span>
                      <span className="text-emerald-600">{String.fromCharCode(ascii)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600">Final text:</div>
                  <div className="text-indigo-600 font-bold">{steps.text}</div>
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
