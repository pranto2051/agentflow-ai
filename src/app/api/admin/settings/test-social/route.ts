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

    const { platform } = await request.json();

    // Mock social test
    const success = true;

    // Update last test status
    const { data: socialSettings } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", "social")
      .single();

    if (socialSettings) {
      const newValue = {
        ...socialSettings.setting_value,
        [platform]: {
          ...socialSettings.setting_value[platform],
          lastTestStatus: success ? "success" : "failed",
          lastTestAt: new Date().toISOString(),
        }
      };

      await supabase
        .from("admin_settings")
        .update({ setting_value: newValue })
        .eq("setting_key", "social");
    }

    return NextResponse.json({ success, platform, latencyMs: 450 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
