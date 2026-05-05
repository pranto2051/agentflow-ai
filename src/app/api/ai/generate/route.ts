import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geminiModel } from "@/lib/gemini/client";
import { generateLinkedInPost } from "@/lib/gemini/prompts";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { taskDescription, platform, taskId } = await request.json();

    // 1. Get user's AI memory (placeholder for now)
    const { data: memory } = await supabase
      .from("ai_memory")
      .select("memory_value")
      .eq("user_id", user.id)
      .eq("memory_key", "profile")
      .single();

    const userMemory = memory?.memory_value || "Professional, insightful, and concise.";

    // 2. Build prompt
    const prompt = generateLinkedInPost({
      taskDescription,
      userMemory,
      platform,
    });

    // 3. Call Gemini
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 4. Parse JSON response from Gemini
    // Sometimes Gemini wraps JSON in ```json ... ```
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    
    let content;
    try {
      const parsed = JSON.parse(jsonString);
      content = parsed.content;
    } catch (e) {
      content = text; // Fallback to raw text if JSON parsing fails
    }

    // 5. Save to ai_generated_posts
    const { data: post, error: postError } = await supabase
      .from("ai_generated_posts")
      .insert({
        user_id: user.id,
        task_id: taskId || null,
        platform,
        generated_content: content,
        status: "draft",
      })
      .select()
      .single();

    // 6. Log to automation_logs
    await supabase.from("automation_logs").insert({
      user_id: user.id,
      task_id: taskId || null,
      action: "ai_generate",
      status: postError ? "failed" : "success",
      response: { content },
      error_message: postError?.message,
    });

    return NextResponse.json({ content, post });
  } catch (error) {
    console.error("AI Generation Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
