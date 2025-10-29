import type { Chat } from '@/hooks/useChats';

export const defaultChats: Chat[] = [ 
  {
    id: 'welcome',
    title: 'Welcome',
    messages: [
      {
        id: 'welcome-msg',
        role: 'assistant',
        text: 'Welcome — ask anything or choose a suggestion above.',
      },
    ],
  },
];