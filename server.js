const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve a simple text response for the root route
app.get('/', (req, res) => {
    res.send('Welcome to the Virtual Try-On Blockchain Project! Use the API endpoints to interact with blockchain features.');
});

// Endpoint to Create Wallet
app.post('/api/createWallet', async (req, res) => {
    try {
        const userId = req.body.userId || 'defaultUser';
        const response = await axios.post(`${OKTO_BASE_URL}/wallet/create`, { userId }, {
            headers: {
                'Authorization': `Bearer ${process.env.OKTO_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        res.json({ walletAddress: response.data.walletAddress });
    } catch (error) {
        console.error('Error creating wallet:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
});

// Endpoint to Get Wallet Balance
app.get('/api/walletBalance', async (req, res) => {
    try {
        const walletAddress = req.query.walletAddress;
        const response = await axios.get(`${OKTO_BASE_URL}/wallet/balance`, {
            headers: {
                'Authorization': `Bearer ${process.env.OKTO_API_KEY}`,
            },
            params: { walletAddress },
        });
        res.json({ balance: response.data.balance });
    } catch (error) {
        console.error('Error fetching wallet balance:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
