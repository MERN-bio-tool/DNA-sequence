import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DnaVisualization.css';

const DnaVisualization = ({ dna, complement }) => {
  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    if (dna && complement && !dataSaved) {
      const saveUserData = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/dna-tools', { dna, complement });
          console.log('User data saved successfully:', response.data);
          setDataSaved(true); // Set dataSaved to true after successfully saving data
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      };

      saveUserData();
    }
  }, [dna, complement, dataSaved]);

  if (!dna || !complement) return null;

  const dnaBases = dna.split('');
  const complementBases = complement.split('');

  return (
    <div className="dna-visualization">
      <div className="dna-sequence">
        {dnaBases.map((base, index) => (
          <div key={index} className={`base ${base}`}>
            {base}
          </div>
        ))}
      </div>
      <div className="dna-sequence">
        {complementBases.map((base, index) => (
          <div key={index} className={`base ${base}`}>
            {base}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DnaVisualization;
