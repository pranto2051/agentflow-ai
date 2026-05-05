import { createClient } from "@/lib/supabase/server";
import { AllAdminSettings } from "@/types/admin-settings";
import { NextResponse } from "next/server";
import { z } from "zod";

const settingsSchema = z.object({
  key: z.enum([
    "general",
    "ai",
    "email",
    "quotas",
    "social",
    "security",
    "maintenance",
    "advanced",
  ]),
  value: z.record(z.unknown()),
});

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

    const { data: settings, error } = await supabase
      .from("admin_settings")
      .select("setting_key, setting_value");

    if (error) throw error;

    // Transform into AllAdminSettings object
    const result = settings.reduce((acc, curr) => {
      acc[curr.setting_key as keyof AllAdminSettings] = curr.setting_value;
      return acc;
    }, {} as Partial<AllAdminSettings>);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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

    const body = await request.json();
    const validated = settingsSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { key, value } = validated.data;

    // Get old value for audit log
    const { data: oldSetting } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", key)
      .single();

    const { error: updateError } = await supabase
      .from("admin_settings")
      .update({
        setting_value: value,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("setting_key", key);

    if (updateError) throw updateError;

    // Log action
    await supabase.from("admin_audit_log").insert({
      admin_id: user.id,
      action: `Update ${key} settings`,
      target_type: "setting",
      target_id: key,
      old_value: oldSetting?.setting_value,
      new_value: value,
    });

    return NextResponse.json({ success: true, key, value });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

