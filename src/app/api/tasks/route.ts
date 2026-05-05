import { NextResponse } from 'next/server';
import { z } from 'zod';

// POST schema
const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  task_type: z.enum(['daily', 'weekly', 'monthly', 'one-time']),
  schedule_time: z.string(),
  schedule_day: z.number().optional(),
  timezone: z.string(),
  platform: z.enum(['linkedin', 'twitter', 'facebook', 'all']),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Mock user & supabase interaction
    
    return NextResponse.json({
      tasks: [],
      total: 0,
      stats: { total: 0, active: 0, paused: 0, failed: 0, runningNow: 0 }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createTaskSchema.parse(body);
    
    // Mock insert
    const newTask = {
      id: Math.random().toString(36).substring(7),
      ...validatedData,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
