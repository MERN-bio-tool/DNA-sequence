const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema and model for user data
const userDataSchema = new mongoose.Schema({
  dna: String,
  complement: String,
  reverseComplement: String
});

const UserData = mongoose.model('UserData', userDataSchema);

// Route to handle DNA tools and save user data
app.post('/api/dna-tools', async (req, res) => {
  const { dna } = req.body;
  
  if (!/^[ATCGatcg]*$/.test(dna)) {
    return res.status(400).json({ error: 'Invalid DNA sequence. Only A, T, C, and G are allowed.' });
  }

  try {
    // Check if data already exists for the given DNA sequence
    const existingData = await UserData.findOne({ dna });
    if (existingData) {
      return res.json(existingData);
    }

    // Calculate complement and reverse complement
    const complement = dna.toUpperCase().replace(/[ATCG]/g, match => ({
      'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'
    }[match]));
    const reverseComplement = complement.split('').reverse().join('');

    // Save user data
    const userData = new UserData({ dna, complement, reverseComplement });
    await userData.save();
  
    res.json({ complement, reverseComplement });
  } catch (error) {
    console.error('Error processing DNA sequence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
