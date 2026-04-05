import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const userProfile = await req.json();
    const dbPath = path.join(process.cwd(), 'database', 'schemes.json');
    const schemesData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const matchedSchemes = schemesData.filter((scheme: any) => {
        let stateMatch = scheme.state === 'All' || scheme.state === userProfile.state;
        let incomeMatch = scheme.income_limit === null || userProfile.income <= scheme.income_limit;
        let categoryMatch = scheme.category.some((cat: string) => userProfile.category.includes(cat));
        return stateMatch && incomeMatch && categoryMatch;
    });

    return NextResponse.json(matchedSchemes);
}
