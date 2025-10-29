import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Chat, Message } from './useChats'; 
import { makeId } from '@/utils/id';

interface UseChatActionsProps {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

type SetTyping = (typing: boolean) => void;
type SetDeepState = (state: { phase: 'idle' | 'analyzing' | 'searching' | 'expanding' | 'complete'; content: string; progressId?: string }) => void;

export function useChatActions({chats,activeChatId,setActiveChatId,setChats}: UseChatActionsProps) {
  const createChat = useCallback(() => {
    const newChat: Chat = { id: makeId(), title: 'New Chat', messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    // Note: Sidebar close logic moved to ChatList for reusability
  }, [setChats, setActiveChatId]);

  const deleteChat = useCallback(
    (id: string) => {
      setChats((prev) => prev.filter((c) => c.id !== id));
      if (id === activeChatId) {
        setActiveChatId(null);
      }
    },
    [activeChatId, setActiveChatId, setChats]
  );

  const renameChat = useCallback(
    (id: string, title: string) => {
      setChats((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title } : c))
      );
    },
    [setChats]
  );

  const appendMessage = useCallback(
    (chatId: string, message: Message) => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, message] }
            : c
        )
      );
    },
    [setChats]
  );

  const updateMessageText = useCallback(
    (chatId: string, msgId: string, newText: string) => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === msgId ? { ...m, text: newText } : m
                ),
              }
            : c
        )
      );
    },
    [setChats]
  );

  const sendMessage = useCallback(
    async (
      text: string, 
      setIsTyping: SetTyping,  // Always required
      deepSearch: boolean = false, 
      setDeepState?: SetDeepState  // Optional for deep mode
    ) => {
      if (!activeChatId) return;
      
      const userMsg: Message = { id: makeId(), role: 'user', text };
      appendMessage(activeChatId, userMsg);

      if (!deepSearch) {
        // Original non-deep sim logic
        setIsTyping(true);
        const simulatedResponse = `Here is a helpful response to "${text}". \n\nThis is the very good question.You are smart buddy\n- Tip 1\nIf you want more detail about this topic, I can give the server API route link to you.`;
        const assistantId = makeId();
        appendMessage(activeChatId, { id: assistantId, role: 'assistant', text: '' });

        for (let i = 0; i < simulatedResponse.length; i += 12) {
          const chunk = simulatedResponse.slice(i, i + 12);
          await new Promise((r) => setTimeout(r, 120));
          setChats((prev) =>
            prev.map((c) => ({
              ...c,
              messages:
                c.id === activeChatId
                  ? c.messages.map((m) =>
                      m.id === assistantId
                        ? { ...m, text: (m.text || '') + chunk }
                        : m
                    )
                  : c.messages,
            }))
          );
        }
        setIsTyping(false);
        return;
      }

      
      const progressId = makeId();
      appendMessage(activeChatId, { id: progressId, role: 'assistant', text: '' });
      
      if (setDeepState) {
        setDeepState({ phase: 'analyzing', content: '', progressId });
        await new Promise(r => setTimeout(r, 2500)); // 2.5s analyze

        setDeepState({ phase: 'searching', content: '', progressId });
        await new Promise(r => setTimeout(r, 3500)); // 3.5s articles

        setDeepState({ phase: 'expanding', content: '', progressId });
        await new Promise(r => setTimeout(r, 2500)); // 2.5s sites

        // Hardcoded final (tailored to query via simple checks)
        let finalContent = "MAC lung disease (Mycobacterium avium complex) is a nontuberculous mycobacterial infection affecting the lungs, often in those with weakened immunity. Symptoms include chronic cough, fatigue, and weight loss. Treatment involves antibiotics like azithromycin for 12-18 months. Related: Cystic fibrosis, COPD.\n\nDeep dive: Recent 2025 studies show rising cases in urban areas—prevention via clean air is key.";
        if (text.includes('symptoms')) {
          finalContent = "Key symptoms of MAC lung disease: Persistent cough (often with sputum), shortness of breath, fatigue, weight loss, night sweats, and occasional hemoptysis. Early signs mimic bronchitis—CT scans help diagnose.";
        } else if (text.includes('other diseases')) {
          finalContent = "Other lung-related diseases: COPD (chronic obstructive pulmonary disease), asthma, pneumonia, tuberculosis (TB), idiopathic pulmonary fibrosis (IPF), and cystic fibrosis. MAC often co-occurs with structural lung issues like bronchiectasis.";
        }
        
      
        updateMessageText(activeChatId, progressId, finalContent);
        setDeepState({ phase: 'idle', content: '', progressId }); // Hide overlay—msg now shows via standard render
        setIsTyping(false); // End typing (though hidden)
      }
    },
    [activeChatId, appendMessage, setChats, updateMessageText]
  );
  console.log('printing from useChatActions.ts deleteChat', deleteChat);
  return { createChat, deleteChat, renameChat, sendMessage };
}