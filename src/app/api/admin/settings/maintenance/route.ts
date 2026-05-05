import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    const { action } = await request.json();

    switch (action) {
      case "clear-logs":
        // Mock clear logs
        return NextResponse.json({ success: true, deleted: 150 });
      case "recalculate-analytics":
        // Mock recalculate
        return NextResponse.json({ success: true, recalculated: true });
      case "delete-logs":
        // Actually delete logs if table exists
        await supabase.from("automation_logs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        return NextResponse.json({ success: true });
      case "reset-all-settings":
        // Mock reset settings
        return NextResponse.json({ success: true });
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
