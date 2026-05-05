import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // Mock toggle
  return NextResponse.json({
    success: true,
    status: 'paused'
  });
}
