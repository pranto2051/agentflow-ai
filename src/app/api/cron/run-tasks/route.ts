import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { geminiModel } from "@/lib/gemini/client";
import { generateLinkedInPost } from "@/lib/gemini/prompts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// We use the service role key here because this is a background process
const supabaseAdmin = (supabaseUrl && serviceRoleKey) 
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function GET(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const now = new Date().toISOString();

    // 1. Get tasks that are active and due
    const { data: tasks, error: tasksError } = await supabaseAdmin
      .from("tasks")
      .select(`
        *,
        profiles:user_id (id, full_name)
      `)
      .eq("status", "active")
      .lte("next_run", now);

    if (tasksError) throw tasksError;

    const results = {
      processed: tasks?.length || 0,
      succeeded: 0,
      failed: 0,
    };

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ message: "No tasks to run", results });
    }

    for (const task of tasks) {
      try {
        // 2. Get AI memory for user
        const { data: memory } = await supabaseAdmin
          .from("ai_memory")
          .select("memory_value")
          .eq("user_id", task.user_id)
          .eq("memory_key", "profile")
          .single();

        const userMemory = memory?.memory_value || "Professional and insightful.";

        // 3. Generate content
        const prompt = generateLinkedInPost({
          taskDescription: task.description,
          userMemory,
          platform: task.platform,
        });

        const result = await geminiModel.generateContent(prompt);
        const text = result.response.text();
        
        // Simple extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const content = jsonMatch ? JSON.parse(jsonMatch[0]).content : text;

        // 4. Create post record
        await supabaseAdmin.from("ai_generated_posts").insert({
          user_id: task.user_id,
          task_id: task.id,
          platform: task.platform,
          generated_content: content,
          status: "scheduled",
        });

        // 5. Update task next run time (simplified logic)
        const nextRun = new Date();
        if (task.task_type === 'daily') nextRun.setDate(nextRun.getDate() + 1);
        else if (task.task_type === 'weekly') nextRun.setDate(nextRun.getDate() + 7);
        else if (task.task_type === 'monthly') nextRun.setMonth(nextRun.getMonth() + 1);

        await supabaseAdmin
          .from("tasks")
          .update({
            last_run: now,
            next_run: nextRun.toISOString(),
            run_count: (task.run_count || 0) + 1,
          })
          .eq("id", task.id);

        // 6. Log success
        await supabaseAdmin.from("automation_logs").insert({
          user_id: task.user_id,
          task_id: task.id,
          action: "cron_run",
          status: "success",
          response: { content },
        });

        results.succeeded++;
      } catch (err) {
        console.error(`Task ${task.id} failed:`, err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        await supabaseAdmin.from("automation_logs").insert({
          user_id: task.user_id,
          task_id: task.id,
          action: "cron_run",
          status: "failed",
          error_message: errorMessage,
        });
        results.failed++;
      }
    }

    return NextResponse.json({ message: "Cron run complete", results });
  } catch (error) {
    console.error("Cron Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
