import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // Mock run
  return NextResponse.json({
    success: true,
    post: {
      id: Math.random().toString(36).substring(7),
      content: "This is a mocked generated post content.",
      platform: "linkedin",
      hashtags: ["#mock", "#ai", "#agentflow"],
      status: "draft",
      generated_at: new Date().toISOString()
    }
  });
}
