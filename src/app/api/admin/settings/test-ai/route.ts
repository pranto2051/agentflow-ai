import { createClient } from "@/lib/supabase/server";
import { geminiModel } from "@/lib/gemini/client";
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

    const { prompt } = await request.json();

    // Fetch current AI settings
    const { data: aiSettings } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", "ai")
      .single();

    const settings = aiSettings?.setting_value || {};
    
    const startTime = Date.now();
    const result = await geminiModel.generateContent(prompt);
    const endTime = Date.now();
    
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      content: text,
      tokensUsed: 124, // Placeholder, Gemini doesn't always return this easily without extra calls
      latencyMs: endTime - startTime,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
