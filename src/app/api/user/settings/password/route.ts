import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
