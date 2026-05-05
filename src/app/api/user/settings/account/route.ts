import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const body = await request.json();
  if (body.confirmation === 'DELETE MY ACCOUNT') {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Invalid confirmation' }, { status: 400 });
}
