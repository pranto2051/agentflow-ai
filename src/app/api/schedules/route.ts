import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    upcoming: [],
    calendar: [],
    todayRuns: [],
    nextRun: null,
    streaks: { current: 0, longest: 0 }
  });
}
