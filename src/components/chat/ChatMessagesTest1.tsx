import React from 'react';
import type { Message } from '@/hooks/useChats';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messageClassName: string;
  userBubbleClassName: string;
  botBubbleClassName: string;
}

export default function ChatMessages({ 
  messages, 
  isTyping, 
  messageClassName, 
  userBubbleClassName, 
  botBubbleClassName 
}: ChatMessagesProps) {
  return (
    <div className={`flex-1 overflow-auto bg-gradient-to-b from-transparent to-gray-900/40 rounded-xl p-4 md:p-6 mb-4 ${messageClassName}`} style={{ minHeight: 200 }}>
      {!messages.length && !isTyping && (
        <div className="text-center text-gray-400">Select or create a chat to begin.</div>
      )}
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-3xl ${m.role === 'user' ? 'ml-auto text-right' : ''}`}>
            {m.role === 'user' ? (
              // User bubble with custom class
              <div className={`inline-block ${userBubbleClassName} px-3 md:px-4 py-2 md:py-3 rounded-lg block max-w-full`}>
                <div className="whitespace-pre-wrap break-words text-sm md:text-base">{m.text}</div>
              </div>
            ) : (
              // Assistant bubble with custom class
              <div className={`flex items-start gap-2 ${botBubbleClassName}`}>
                <span className="flex-shrink-0 mt-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">A</span>
                <div className="inline-block bg-gray-800 text-gray-100 px-3 md:px-4 py-2 md:py-3 rounded-lg max-w-full">
                  <div className="whitespace-pre-wrap break-words text-sm md:text-base">{m.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <div className="inline-block bg-gray-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-400 text-sm md:text-base">
              Typing <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}