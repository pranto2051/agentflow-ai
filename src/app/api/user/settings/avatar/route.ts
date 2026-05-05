import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ avatar_url: 'https://example.com/avatar.jpg' });
}
