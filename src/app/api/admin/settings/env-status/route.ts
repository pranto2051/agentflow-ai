import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const envVars = [
      { key: 'NEXT_PUBLIC_SUPABASE_URL', description: 'Supabase project URL', required: true },
      { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', description: 'Supabase anonymous key', required: true },
      { key: 'SUPABASE_SERVICE_ROLE_KEY', description: 'Supabase service role key', required: true },
      { key: 'GEMINI_API_KEY', description: 'Google Gemini API key', required: true },
      { key: 'CRON_SECRET', description: 'Protects cron endpoints', required: true },
      { key: 'RESEND_API_KEY', description: 'Email service key', required: false },
      { key: 'NEXTAUTH_SECRET', description: 'Session encryption secret', required: true },
      { key: 'LINKEDIN_CLIENT_ID', description: 'LinkedIn OAuth client ID', required: false },
      { key: 'LINKEDIN_CLIENT_SECRET', description: 'LinkedIn OAuth secret', required: false },
    ];

    const result = envVars.map(ev => ({
      ...ev,
      isSet: !!process.env[ev.key]
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
