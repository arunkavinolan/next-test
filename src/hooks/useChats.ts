import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text?: string; 
  // content: string;
  // timestamp: Date;
}

export interface Chat {
  id: string;
  title?: string;
  name?: string;
  messages: Message[];
} 

interface UseChatsProps {
  storageKey: string;
  defaultChats: Chat[];
}

export function useChats({ storageKey, defaultChats }: UseChatsProps) {
  const [chats, setChats] = useState<Chat[]>(defaultChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(defaultChats[0]?.id || null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setChats(JSON.parse(saved));
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(chats));
  }, [chats, storageKey]);

  useEffect(() => {
    if (chats.length && !activeChatId) {
      setActiveChatId(chats[0].id);
    } else if (activeChatId && !chats.find((c) => c.id === activeChatId)) {
      setActiveChatId(chats[0]?.id ?? null);
    }
  }, [chats, activeChatId]);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;
  console.log('printing from useChats.ts');
  console.log('chats:',chats) ;
  console.log('activeChat:',activeChat);
  console.log('activeChatId:',activeChatId);
   console.log('setChats:', setChats);
   
  return { chats, activeChat, activeChatId, setActiveChatId, setChats };
}