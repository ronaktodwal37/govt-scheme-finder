import { NextResponse } from 'next/server';
import { graphProxy } from '@/utils/graphProxy';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const profileStr = searchParams.get('profile');
        if (!profileStr) return NextResponse.json({ error: "Missing profile" }, { status: 400 });
        const userProfile = JSON.parse(profileStr);

        const recommendations = graphProxy.getRecommendations(userProfile);
        return NextResponse.json(recommendations);
    } catch (error) {
        return NextResponse.json({ error: "TigerGraph DB Error" }, { status: 500 });
    }
}
