import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, platform, taskId, tone, useMemory } = await request.json();
    
    // Mock generate
    return NextResponse.json({
      post: {
        id: Math.random().toString(36).substring(7),
        content: `Generated post for ${platform} based on: ${prompt}`,
        hashtags: ['#ai', '#automation'],
        platform,
        status: 'draft',
        generated_at: new Date().toISOString()
      },
      tokensUsed: 124,
      latencyMs: 1200,
      remaining: 49
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
