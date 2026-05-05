import { useState } from 'react';
import useSWR from 'swr';
import { Message, GeneratedPost } from '@/types/dashboard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'linkedin'|'twitter'|'facebook'>('linkedin');
  const [selectedTone, setSelectedTone] = useState<string>('Professional');
  const [useMemory, setUseMemory] = useState(true);
  const [dailyRemaining, setDailyRemaining] = useState(50);

  const { data: history } = useSWR<GeneratedPost[]>('/api/ai/history', fetcher);

  const generate = async (prompt: string) => {
    const userMsgId = Math.random().toString();
    const newMsg: Message = { id: userMsgId, role: 'user', content: prompt, timestamp: new Date().toISOString() };
    
    setMessages(prev => [...prev, newMsg]);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, platform: selectedPlatform, tone: selectedTone, useMemory })
      });
      const data = await res.json();
      
      if (data.post) {
        setMessages(prev => [...prev, {
          id: data.post.id,
          role: 'assistant',
          content: data.post.content,
          post: data.post,
          timestamp: new Date().toISOString()
        }]);
        setDailyRemaining(data.remaining || dailyRemaining - 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearConversation = () => setMessages([]);

  return {
    messages,
    isGenerating,
    selectedPlatform, setSelectedPlatform,
    selectedTone, setSelectedTone,
    useMemory, setUseMemory,
    dailyRemaining,
    history: history || [],
    generate,
    clearConversation
  };
}
