import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ id: params.id, title: 'Mock Task' });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json({ id: params.id, ...body, updated_at: new Date().toISOString() });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, id: params.id });
}
