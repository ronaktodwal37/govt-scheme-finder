import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const dbPath = path.join(process.cwd(), 'database', 'schemes.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    return NextResponse.json(data);
}
