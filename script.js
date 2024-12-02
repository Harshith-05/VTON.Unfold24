// Base API URL for Okto endpoints
const API_BASE = "https://api.okto.tech";

// API Key for Okto (replace with your actual key)
const OKTO_API_KEY = "YOUR_OKTO_API_KEY";

// Global variable to store wallet address
let userWallet = null;

// Function to create a wallet
async function createWallet() {
    try {
        const response = await axios.post(`${API_BASE}/wallet/create`, {
            userId: "exampleUser", // Replace with a unique user ID
        }, {
            headers: {
                Authorization: `Bearer ${OKTO_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        userWallet = response.data.walletAddress;
        document.getElementById("walletAddress").innerText = `Wallet Address: ${userWallet}`;
        document.getElementById("status").innerText = "Status: Wallet Created";
        document.getElementById("rewardTokens").disabled = false;
        document.getElementById("showBalance").disabled = false;

        alert("Wallet successfully created!");
    } catch (error) {
        console.error("Error creating wallet:", error);
        alert("Failed to create wallet.");
    }
}

// Function to reward tokens
async function rewardTokens() {
    try {
        if (!userWallet) {
            alert("Please create a wallet first!");
            return;
        }

        const response = await axios.post(`${API_BASE}/transfer`, {
            from: "platformWalletAddress", // Replace with your platform's wallet address
            to: userWallet,
            amount: 10, // Reward 10 tokens
        }, {
            headers: {
                Authorization: `Bearer ${OKTO_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        alert(`Rewarded 10 tokens!`);
    } catch (error) {
        console.error("Error rewarding tokens:", error);
        alert("Failed to reward tokens.");
    }
}

// Function to fetch token balance
async function getBalance() {
    try {
        if (!userWallet) {
            alert("Please create a wallet first!");
            return;
        }

        const response = await axios.get(`${API_BASE}/wallet/${userWallet}/balance`, {
            headers: {
                Authorization: `Bearer ${OKTO_API_KEY}`,
            },
        });

        const balance = response.data.tokens;
        document.getElementById("balance").innerText = `Token Balance: ${balance} TOT`;
        alert(`Your balance is ${balance} TOT.`);
    } catch (error) {
        console.error("Error fetching balance:", error);
        alert("Failed to fetch balance.");
    }
}

// Attach event listeners to buttons
document.getElementById("createWallet").addEventListener("click", createWallet);
document.getElementById("rewardTokens").addEventListener("click", rewardTokens);
document.getElementById("showBalance").addEventListener("click", getBalance);
