import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    accounts: [],
    totalConnected: 0,
    totalPosts: 0,
    platforms: {
      linkedin: { connected: false },
      twitter: { connected: false },
      facebook: { connected: false }
    }
  });
}
