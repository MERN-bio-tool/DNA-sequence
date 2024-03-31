import React, { useState } from 'react';
import './SequenceAnalysis.css';

function SequenceAnalysis() {
  const [dna, setDna] = useState('');
  const [analysisType, setAnalysisType] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const transcribeDnaToRna = (dnaSequence) => {
    const rnaSequence = dnaSequence.replace(/T/g, 'U');
    setAnalysisResult(`Transcribed RNA Sequence: ${rnaSequence}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (analysisType) {
      case 'motifs':
        findMotifs(dna);
        break;
      case 'orfs':
        findORFs(dna);
        break;
      case 'mutations':
        detectMutations(dna);
        break;
      case 'transcription':
        transcribeDnaToRna(dna);
        break;
      default:
        setAnalysisResult('Please select a valid analysis type.');
    }
  };

  const findMotifs = (sequence) => {
    const motifs = ['ATG', 'TATA', 'CGC']; // Example motifs
    const foundMotifs = motifs.filter(motif => sequence.includes(motif));
    if (foundMotifs.length > 0) {
      setAnalysisResult(`Found motifs: ${foundMotifs.join(', ')}`);
    } else {
      setAnalysisResult('No motifs found in the sequence.');
    }
  };

  const findORFs = (sequence) => {
    const startCodon = 'ATG';
    const stopCodons = ['TAA', 'TAG', 'TGA'];
    let inORF = false;
    let orfs = [];

    for (let i = 0; i < sequence.length - 2; i++) {
      const codon = sequence.substring(i, i + 3);
      if (codon === startCodon) {
        inORF = true;
      } else if (stopCodons.includes(codon) && inORF) {
        orfs.push(sequence.substring(i - 2, i + 1));
        inORF = false;
      }
    }

    if (orfs.length > 0) {
      setAnalysisResult(`Found ORFs: ${orfs.join(', ')}`);
    } else {
      setAnalysisResult('No ORFs found in the sequence.');
    }
  };

  const detectMutations = (sequence) => {
    const mutatedSequence = sequence.split('').map(base => {
      if (Math.random() < 0.1) { // Mutation rate: 10%
        const mutationOptions = ['A', 'T', 'C', 'G'].filter(option => option !== base);
        return mutationOptions[Math.floor(Math.random() * mutationOptions.length)];
      } else {
        return base;
      }
    }).join('');

    const mutations = [];
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] !== mutatedSequence[i]) {
        mutations.push({ position: i + 1, originalBase: sequence[i], mutatedBase: mutatedSequence[i] });
      }
    }

    if (mutations.length > 0) {
      const mutationResults = mutations.map(mutation => `Position ${mutation.position}: ${mutation.originalBase} -> ${mutation.mutatedBase}`);
      setAnalysisResult(`Detected mutations: ${mutationResults.join(', ')}`);
    } else {
      setAnalysisResult('No mutations detected in the sequence.');
    }
  };

  return (
    <div className="SequenceAnalysis">
      <h2>Sequence Analysis Tool</h2>
      <form onSubmit={handleSubmit}>
        <label>
          DNA Sequence:
          <input
            type="text"
            value={dna}
            onChange={(e) => setDna(e.target.value)}
            placeholder="Enter DNA sequence"
          />
        </label>
        <label>
          Analysis Type:
          <select value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
            <option value="">Select Analysis Type</option>
            <option value="motifs">Find Motifs</option>
            <option value="orfs">Identify ORFs</option>
            <option value="mutations">Detect Mutations</option>
            <option value="transcription">DNA to RNA Transcription</option>
          </select>
        </label>
        <button type="submit">Analyze</button>
      </form>
      {analysisResult && <div className="analysisResult"><strong>Analysis Result:</strong> {analysisResult}</div>}
      <p className="transcription-explanation">
        The process of DNA to RNA transcription involves copying the DNA sequence into an RNA sequence. This crucial step in gene expression replaces thymine (T) with uracil (U), adapting the DNA code into a form that can be used to synthesize proteins.
      </p>
    </div>
  );
}

export default SequenceAnalysis;