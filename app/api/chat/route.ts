import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const message = body.message.toLowerCase();
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

    await new Promise(resolve => setTimeout(resolve, 800));
    return NextResponse.json({ reply });
}
