import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    results: (body.platforms || []).map((p: string) => ({
      platform: p,
      success: true,
      postUrl: `https://${p}.com/post/123`
    }))
  });
}
