import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Mock CSV data download
  const csvData = "date,posts\n2025-05-01,5";
  return new NextResponse(csvData, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="analytics_export.csv"'
    }
  });
}
