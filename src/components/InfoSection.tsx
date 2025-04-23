
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const InfoSection: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 mt-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">About DNA Encryption</h2>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is">
            <AccordionTrigger>
              What is DNA Encryption?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 mb-2">
                DNA encryption is a cryptographic method that uses the principles of DNA structure to encode information.
                In our implementation, we convert binary data into sequences of DNA bases: Adenine (A), Thymine (T), 
                Cytosine (C), and Guanine (G).
              </p>
              <p className="text-gray-700">
                This technique takes advantage of DNA's natural information storage properties, creating a system that's
                both elegant and secure when combined with proper cryptographic practices.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="how-works">
            <AccordionTrigger>
              How Does It Work?
            </AccordionTrigger>
            <AccordionContent>
              <h4 className="font-semibold mb-2">Encryption Process:</h4>
              <ol className="list-decimal pl-5 mb-4 space-y-2">
                <li>Your text is converted to ASCII values</li>
                <li>ASCII values are converted to 8-bit binary</li>
                <li>Binary digits are grouped into 2-bit pairs</li>
                <li>Each 2-bit pair maps to a DNA base:
                  <ul className="list-disc pl-5 mt-1">
                    <li>00 → A (Adenine)</li>
                    <li>01 → T (Thymine)</li>
                    <li>10 → C (Cytosine)</li>
                    <li>11 → G (Guanine)</li>
                  </ul>
                </li>
              </ol>
              
              <h4 className="font-semibold mb-2">Decryption Process:</h4>
              <p className="text-gray-700">
                The process is reversed - DNA bases are converted back to 2-bit pairs, which are assembled into bytes,
                converted to ASCII, and finally back to readable text.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="dna-key">
            <AccordionTrigger>
              What is a DNA Key?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 mb-2">
                A DNA key implements a one-time pad on top of the base DNA encoding. This significantly enhances security
                by performing an XOR operation between your encoded DNA sequence and the key.
              </p>
              <p className="text-gray-700 mb-2">
                For maximum security, a DNA key should:
              </p>
              <ul className="list-disc pl-5 mb-2">
                <li>Be at least as long as your message</li>
                <li>Be truly random</li>
                <li>Be used only once</li>
                <li>Be kept secret between communicating parties</li>
              </ul>
              <p className="text-gray-700">
                When these conditions are met, this creates a theoretically unbreakable encryption system.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="security">
            <AccordionTrigger>
              Is This Secure?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 mb-2">
                The base DNA encoding without a key is essentially a form of encoding (not encryption), and can be easily 
                reversed if someone knows the algorithm.
              </p>
              <p className="text-gray-700 mb-2">
                However, when you add a DNA key (one-time pad):
              </p>
              <ul className="list-disc pl-5">
                <li>It becomes mathematically unbreakable if the key is truly random, used only once, and kept secret</li>
                <li>Without the key, even powerful computers cannot determine the original message</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default InfoSection;
