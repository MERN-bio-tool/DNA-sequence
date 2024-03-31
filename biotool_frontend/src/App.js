import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Tutorial from './Tutorial';
import DnaVisualization from './DnaVisualization';
import SequenceAnalysis from './SequenceAnalysis';

function App() {
  const [dna, setDna] = useState('');
  const [complement, setComplement] = useState('');
  const [reverseComplement, setReverseComplement] = useState('');
  const [error, setError] = useState('');

  const handleDnaChange = (e) => {
    setDna(e.target.value.toUpperCase()); // Convert input to uppercase immediately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^[ATCG]*$/.test(dna)) {
      setError('Invalid DNA sequence. Only A, T, C, and G are allowed.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/dna-tools', { dna });
      setComplement(response.data.complement);
      setReverseComplement(response.data.reverseComplement);
    } catch (error) {
      const errorMessage = error.response && error.response.data.error ? error.response.data.error : 'Failed to calculate complements. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="App">
      <Tutorial />
      <SequenceAnalysis />
      <header className="App-header">
        <h1>DNA Sequence Tool</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={dna}
            onChange={handleDnaChange}
            placeholder="Enter DNA sequence (A, T, C, G)"
          />
          <button type="submit">Calculate</button>
        </form>
        {error && <div className="error">{error}</div>}
        {complement && <div>Complementary DNA: {complement}</div>}
        {reverseComplement && <div>Reverse Complementary DNA: {reverseComplement}</div>}
        <DnaVisualization dna={dna} complement={complement} />
      </header>
    </div>
  );
}

export default App;
