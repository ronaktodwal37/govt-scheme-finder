const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const graphProxy = require('./utils/graphProxy');
const schemesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'database/schemes.json'), 'utf-8'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints
// GET /schemes -> list all schemes
app.get('/schemes', (req, res) => {
    res.json(schemesData);
});

// POST /match -> returns matched schemes based on simple rules
app.post('/match', (req, res) => {
    const userProfile = req.body;
    // Simple rule-based match taking income, state, and category into account
    const matchedSchemes = schemesData.filter(scheme => {
        let stateMatch = scheme.state === 'All' || scheme.state === userProfile.state;
        let incomeMatch = scheme.income_limit === null || userProfile.income <= scheme.income_limit;
        let categoryMatch = scheme.category.some(cat => userProfile.category.includes(cat));

        return stateMatch && incomeMatch && categoryMatch;
    });

    res.json(matchedSchemes);
});

// GET /recommend -> TigerGraph-based recommendations simulated via graphProxy
app.get('/recommend', (req, res) => {
    try {
        // In reality, this would be a query to tgcloud.io 
        // For prototyping, we pass the profile from query params
        const profileStr = req.query.profile;
        if (!profileStr) return res.status(400).json({ error: "Missing profile" });
        const userProfile = JSON.parse(profileStr);

        const recommendations = graphProxy.getRecommendations(userProfile);
        res.json(recommendations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "TigerGraph DB Error" });
    }
});

// POST /chat -> chatbot response
app.post('/chat', (req, res) => {
    const message = req.body.message.toLowerCase();
    let reply = "Hello! I am your Govt Scheme Assistant. Tell me a bit about yourself (e.g. 'I am a farmer from Bihar' or 'I need a scheme for a girl child').";

    if (message.includes("farmer") || message.includes("agriculture")) {
        reply = "For farmers, the PM Kisan Samman Nidhi and Rythu Bandhu schemes are excellent. Would you like me to show them?";
    } else if (message.includes("girl") || message.includes("daughter")) {
        reply = "You might be eligible for Sukanya Samriddhi Yojana or Mukhya Mantri Kanya Utthan Yojana. These are designed for the welfare of girl children.";
    } else if (message.includes("loan") || message.includes("business")) {
        reply = "The Stand-Up India Scheme provides bank loans from ₹10 Lakh to ₹1 Crore for setting up new enterprises.";
    } else if (message.includes("house") || message.includes("home")) {
        reply = "The Pradhan Mantri Awas Yojana (PMAY) can help you with financial assistance for house construction.";
    } else if (message.includes("health") || message.includes("hospital")) {
        reply = "You should check out Ayushman Bharat PM-JAY which provides health insurance cover of up to ₹5 Lakhs.";
    }

    // Fake delay for realistic feel
    setTimeout(() => {
        res.json({ reply });
    }, 800);
});

// POST /save -> simulate saving a scheme
app.post('/save', (req, res) => {
    const { schemeId } = req.body;
    // In a real app we'd update a DB. Here we just acknowledge.
    res.json({ success: true, message: "Scheme saved successfully to your dashboard." });
});

// Server Startup
app.listen(PORT, () => {
    console.log(`Govt Scheme Finder Server running on http://localhost:${PORT}`);
});
