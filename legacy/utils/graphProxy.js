const fs = require('fs');
const path = require('path');

// Simulate a TigerGraph Graph Database in memory
// We have two Vertex Types: User, Scheme
// Edge Types: ELIGIBLE_FOR (User -> Scheme) OR APPLIED_FOR
// Edge Types: SIMILAR_TO (User <-> User)

class MockTigerGraph {
    constructor() {
        this.schemes = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/schemes.json'), 'utf-8'));
        this.users = JSON.parse(fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf-8'));
    }

    // A simplified query to find recommendations:
    // Start at current user profile -> Find SIMILAR_TO users -> Traverse to schemes they are ELIGIBLE_FOR / APPLIED_FOR -> filter out ones user already applied to
    getRecommendations(userProfile) {
        // Step 1: Find SIMILAR_TO users
        // Similarity logic: shares at least one category, or same state, or similar income bracket (within 200k)
        let similarUsers = this.users.filter(u => {
            let sharedCategory = userProfile.category.some(cat => u.category.includes(cat));
            let sameState = (userProfile.state === u.state || u.state === 'All');
            let similarIncome = Math.abs(userProfile.income - u.income) <= 200000;
            
            // To be considered similar, they must share Category AND (State or Income)
            return sharedCategory && (sameState || similarIncome);
        });

        // Step 2: Traverse ELIGIBLE_FOR / APPLIED_FOR
        let recommendedSchemeIds = new Set();
        similarUsers.forEach(u => {
            u.applied_schemes.forEach(sid => recommendedSchemeIds.add(sid));
        });

        // Step 3: Map IDs back to full scheme objects
        let recommendations = Array.from(recommendedSchemeIds).map(id => {
            return this.schemes.find(s => s.id === id);
        }).filter(Boolean); // Filter out nulls

        // Assuming userProfile.applied_schemes exists, filter those out (but userProfile here is new form data, so no applied schemes yet)
        return recommendations;
    }
}

module.exports = new MockTigerGraph();
