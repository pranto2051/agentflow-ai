import { NextResponse } from 'next/server';
import { z } from 'zod';

const updateProfileSchema = z.object({
  full_name: z.string().min(2).max(80).optional(),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/).optional(),
  bio: z.string().max(160).optional(),
  timezone: z.string().optional(),
  avatar_url: z.string().url().optional(),
});

export async function GET(request: Request) {
  return NextResponse.json({
    profile: {
      id: 'mock-user-id',
      full_name: 'John Doe',
      username: 'johndoe',
      bio: 'Software Engineer',
      timezone: 'UTC'
    },
    memory: {},
    notifications: {}
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, profile: body });
}
