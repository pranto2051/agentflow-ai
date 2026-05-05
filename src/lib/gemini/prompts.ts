export const generateLinkedInPost = (params: {
  taskDescription: string;
  userMemory: string;
  platform: string;
}) => `
You are a professional social media content writer.

User's background and preferences:
${params.userMemory}

Task/Topic to write about:
${params.taskDescription}

Platform: ${params.platform}

Generate a highly engaging ${params.platform} post that:
1. Starts with a hook that grabs attention
2. Shares the insight or learning in a conversational, professional way
3. Provides 3-5 key takeaways as bullet points
4. Ends with a clear call-to-action or thought-provoking question
5. Includes 5-8 relevant hashtags at the end

Respond in this exact JSON format:
{
  "content": "full post content here",
  "hashtags": ["hashtag1", "hashtag2"],
  "hook": "first line of post",
  "cta": "call to action line"
}
`;

export const updateUserMemory = (existingMemory: string, newInteraction: string) => `
Based on this user's writing style and new post:

Existing memory: ${existingMemory}
New post: ${newInteraction}

Update the user memory profile. Extract: tone, industry, typical topics, writing style, engagement patterns.
Keep the memory concise (under 300 words). Respond with just the updated memory text.
`;
