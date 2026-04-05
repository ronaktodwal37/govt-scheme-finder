import fs from 'fs';
import path from 'path';

class MockTigerGraph {
    schemes: any[];
    users: any[];

    constructor() {
        const dbPathSchemes = path.join(process.cwd(), 'database', 'schemes.json');
        const dbPathUsers = path.join(process.cwd(), 'database', 'users.json');
        this.schemes = JSON.parse(fs.readFileSync(dbPathSchemes, 'utf-8'));
        this.users = JSON.parse(fs.readFileSync(dbPathUsers, 'utf-8'));
    }

    getRecommendations(userProfile: any) {
        let similarUsers = this.users.filter(u => {
            let sharedCategory = userProfile.category.some((cat: string) => u.category.includes(cat));
            let sameState = (userProfile.state === u.state || u.state === 'All');
            let similarIncome = Math.abs(userProfile.income - u.income) <= 200000;
            return sharedCategory && (sameState || similarIncome);
        });

        let recommendedSchemeIds = new Set<string>();
        similarUsers.forEach(u => {
            u.applied_schemes.forEach((sid: string) => recommendedSchemeIds.add(sid));
        });

        let recommendations = Array.from(recommendedSchemeIds).map(id => {
            return this.schemes.find(s => s.id === id);
        }).filter(Boolean);

        return recommendations;
    }
}

export const graphProxy = new MockTigerGraph();
