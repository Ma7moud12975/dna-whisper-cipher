
// DNA Encryption Utility functions

// Map for converting 2-bit binary to DNA bases
const binaryToDnaMap: Record<string, string> = {
  '00': 'A',
  '01': 'T',
  '10': 'C',
  '11': 'G',
};

// Map for converting DNA bases back to 2-bit binary
const dnaToBinaryMap: Record<string, string> = {
  'A': '00',
  'T': '01',
  'C': '10',
  'G': '11',
};

/**
 * Convert text to DNA sequence
 * @param text - Plain text to encrypt
 * @param dnaKey - Optional DNA key for XOR encryption
 * @returns Object containing DNA string and conversion steps
 */
export const textToDna = (text: string, dnaKey?: string): { 
  dna: string, 
  steps: {
    text: string,
    ascii: number[],
    binary: string[],
    binarySegments: string[][],
    dna: string
  } 
} => {
  // Step 1: Convert characters to ASCII
  const asciiValues = Array.from(text).map(char => char.charCodeAt(0));
  
  // Step 2: Convert ASCII to 8-bit binary
  const binaryValues = asciiValues.map(ascii => 
    ascii.toString(2).padStart(8, '0')
  );
  
  // Step 3: Group binary into 2-bit segments
  const binarySegments = binaryValues.map(binary => {
    const segments = [];
    for (let i = 0; i < binary.length; i += 2) {
      segments.push(binary.slice(i, i + 2));
    }
    return segments;
  });
  
  // Step 4: Map 2-bit segments to DNA bases
  let dnaResult = '';
  binarySegments.forEach(segments => {
    segments.forEach(segment => {
      dnaResult += binaryToDnaMap[segment];
    });
  });
  
  // Step 5: Apply XOR with DNA key if provided
  if (dnaKey && dnaKey.length > 0) {
    dnaResult = applyDnaXor(dnaResult, dnaKey);
  }
  
  return {
    dna: dnaResult,
    steps: {
      text,
      ascii: asciiValues,
      binary: binaryValues,
      binarySegments,
      dna: dnaResult
    }
  };
};

/**
 * Convert DNA sequence back to text
 * @param dna - DNA sequence to decrypt
 * @param dnaKey - Optional DNA key used for XOR decryption
 * @returns Object containing decrypted text and conversion steps
 */
export const dnaToText = (dna: string, dnaKey?: string): {
  text: string,
  steps: {
    dna: string,
    binarySegments: string[][],
    binary: string[],
    ascii: number[],
    text: string
  }
} => {
  // Apply XOR with DNA key first if provided
  let workingDna = dna;
  if (dnaKey && dnaKey.length > 0) {
    workingDna = applyDnaXor(workingDna, dnaKey);
  }
  
  // Validate the DNA string (should contain only A, T, C, G)
  const isDnaValid = /^[ATCG]+$/.test(workingDna);
  if (!isDnaValid) {
    throw new Error('Invalid DNA sequence. Only A, T, C, G characters are allowed.');
  }
  
  // Step 1: Map DNA bases back to 2-bit binary segments
  const binaryString = Array.from(workingDna).map(base => dnaToBinaryMap[base]).join('');
  
  // Step 2: Group binary into 8-bit bytes
  const binaryBytes: string[] = [];
  for (let i = 0; i < binaryString.length; i += 8) {
    binaryBytes.push(binaryString.slice(i, i + 8));
  }
  
  // Recreate binary segments for visualization
  const binarySegments = binaryBytes.map(byte => {
    const segments = [];
    for (let i = 0; i < byte.length; i += 2) {
      segments.push(byte.slice(i, i + 2));
    }
    return segments;
  });
  
  // Step 3: Convert binary to ASCII
  const asciiValues = binaryBytes.map(binary => parseInt(binary, 2));
  
  // Step 4: Convert ASCII back to characters
  const textResult = String.fromCharCode(...asciiValues);
  
  return {
    text: textResult,
    steps: {
      dna: workingDna,
      binarySegments,
      binary: binaryBytes,
      ascii: asciiValues,
      text: textResult
    }
  };
};

/**
 * Apply XOR operation with a DNA key
 * @param dnaString - The DNA string to apply XOR to
 * @param dnaKey - The DNA key to use for XOR
 * @returns XOR'ed DNA string
 */
export const applyDnaXor = (dnaString: string, dnaKey: string): string => {
  const repeatedKey = extendKey(dnaKey, dnaString.length);
  let result = '';
  
  for (let i = 0; i < dnaString.length; i++) {
    // Convert DNA bases to binary
    const dnaBinary = dnaToBinaryMap[dnaString[i]];
    const keyBinary = dnaToBinaryMap[repeatedKey[i]];
    
    // Perform XOR on the binary values
    const xorBinary = xorBits(dnaBinary, keyBinary);
    
    // Convert back to DNA
    result += binaryToDnaMap[xorBinary];
  }
  
  return result;
};

/**
 * XOR two 2-bit binary strings
 */
const xorBits = (bits1: string, bits2: string): string => {
  let result = '';
  for (let i = 0; i < bits1.length; i++) {
    // XOR operation: result is 1 if bits are different, 0 if same
    result += (parseInt(bits1[i]) ^ parseInt(bits2[i])).toString();
  }
  return result;
};

/**
 * Extend key to match the length of the target string by repeating it
 */
const extendKey = (key: string, targetLength: number): string => {
  if (key.length >= targetLength) return key.substring(0, targetLength);
  
  const repeats = Math.ceil(targetLength / key.length);
  return key.repeat(repeats).substring(0, targetLength);
};

/**
 * Generate a random DNA key of specified length
 */
export const generateDnaKey = (length: number): string => {
  const bases = ['A', 'T', 'C', 'G'];
  let key = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 4);
    key += bases[randomIndex];
  }
  
  return key;
};

/**
 * Export DNA sequence as a txt file
 */
export const exportAsTxt = (dnaSequence: string, filename = 'dna-sequence'): void => {
  const blob = new Blob([dnaSequence], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Export DNA sequence as a FASTA file
 */
export const exportAsFasta = (dnaSequence: string, filename = 'dna-sequence'): void => {
  const fastaContent = `>DNA_Encryption_${new Date().toISOString()}\n${dnaSequence}`;
  const blob = new Blob([fastaContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.fasta`;
  link.click();
  URL.revokeObjectURL(url);
};
