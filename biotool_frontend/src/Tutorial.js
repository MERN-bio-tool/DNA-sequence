// Tutorial.js
import React from 'react';

function Tutorial() {
  return (
    <div className="tutorial">
      <h2>DNA Basics</h2>
      <p>DNA, or Deoxyribonucleic Acid, is the molecule that contains the genetic code of organisms. This genetic material is made up of four chemical bases: adenine (A), cytosine (C), guanine (G), and thymine (T).</p>
      
      <h3>Complementarity</h3>
      <p>In DNA, bases pair up with each other to form units called base pairs. Adenine pairs with thymine (A-T) and cytosine pairs with guanine (C-G). This pairing is due to the chemical affinity between the bases and is known as complementarity.</p>
      
      <h3>Importance in Genetics</h3>
      <p>Complementarity is crucial for the replication of DNA. During DNA replication, the two strands of the DNA molecule separate and serve as templates for the creation of the new strands, ensuring genetic information is accurately passed on to the next generation.</p>

      <h3>DNA Double Helix</h3>
      <p>The structure of DNA is a double helix, which looks like a twisted ladder. The sides of the ladder are made of alternating sugar (deoxyribose) and phosphate groups. The rungs of the ladder are the base pairs, held together by hydrogen bonds. This structure was first described by James Watson and Francis Crick in 1953, with contributions from Rosalind Franklin's X-ray crystallography.</p>

      <h3>Protein Synthesis</h3>
      <p>DNA plays a critical role in protein synthesis, which occurs in two main stages: transcription and translation. During transcription, a segment of DNA is copied into RNA (specifically, messenger RNA or mRNA) by the enzyme RNA polymerase. This mRNA then travels from the nucleus to the ribosome, where translation occurs. Here, the mRNA sequence is read and translated into a specific sequence of amino acids, forming a protein.</p>

      <h3>Modern DNA Technologies</h3>
      <p>Advancements in DNA technology have revolutionized biological research and medicine. Techniques such as CRISPR-Cas9 allow scientists to edit genes with unprecedented precision, opening new doors for gene therapy and the treatment of genetic diseases. DNA sequencing, once a laborious process, can now be completed rapidly, enabling the decoding of entire genomes and furthering our understanding of genetic influences on diseases and traits.</p>

      <h3>Try It Yourself</h3>
      <p>Enter a DNA sequence in the calculator below to see its complementary strand!</p>
    </div>
  );
}

export default Tutorial;
