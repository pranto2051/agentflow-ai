import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { platform: string } }) {
  return NextResponse.json({ authUrl: `https://${params.platform}.com/oauth/authorize` });
}
