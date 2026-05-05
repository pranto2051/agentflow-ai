import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    tone: 'Professional',
    industry: 'Tech',
    writing_style: 'Concise and informative',
    topics: ['AI', 'Startups'],
    about_me: 'Software Engineer at Google'
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, memory: body });
}
