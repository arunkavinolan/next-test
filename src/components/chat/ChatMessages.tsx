import React from 'react';
import type { Message } from '@/hooks/useChats';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messageClassName: string;
  userBubbleClassName: string;
  botBubbleClassName: string;
  deepSearchState?: { phase: 'idle' | 'analyzing' | 'searching' | 'expanding' | 'complete'; content: string; progressId?: string };
}

export default function ChatMessages({ messages, isTyping, messageClassName, userBubbleClassName, botBubbleClassName,deepSearchState}
: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-gray-900/40 rounded-xl p-4 md:p-6 mb-4" style={{ minHeight: 200 }}>
      {!messages.length && !isTyping && !deepSearchState?.phase && (
        <div className="text-center text-gray-400">Select or create a chat to begin.</div>
      )}
      <div className="space-y-4">
        {messages.map((m) => {
         
          // if (
          //   // m.role === 'assistant' &&
          //   // deepSearchState?.progressId === m.id &&
          //   // deepSearchState.phase !== 'idle'
          // ) {
          //   return null;
          // }

          return (
            <div key={m.id} className={`max-w-3xl ${m.role === 'user' ? 'ml-auto text-right' : ''}`}>
              {m.role === 'user' ? (
               
                <div className="inline-block bg-blue-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg block max-w-full">
                  <div className="whitespace-pre-wrap break-words text-sm md:text-base">{m.text}</div>
                </div>
              ) : (
                
                <div className="flex items-start gap-2 mr-auto">
                  <span className="flex-shrink-0 mt-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">A</span>
                  <div className="inline-block bg-gray-800 text-gray-100 px-3 md:px-4 py-2 md:py-3 rounded-lg max-w-full">
                    <div className="whitespace-pre-wrap break-words text-sm md:text-base">{m.text}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Deep search progress (only renders if active; single evolving div) */}
       
        {deepSearchState?.phase !== 'idle' && (
          <div 
            className="mb-4 transition-opacity duration-300 opacity-100" 
            style={{ animationDelay: '0.2s' }}
          >
            <div className="max-w-3xl flex items-start gap-2 mr-auto">
              <span className="flex-shrink-0 mt-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">A</span>
              <div className="inline-block bg-gray-800 text-gray-100 px-3 md:px-4 py-2 md:py-3 rounded-lg max-w-full border border-blue-500/30 shadow-lg">
                <div className="text-sm md:text-base whitespace-pre-wrap">
                  {deepSearchState.phase === 'analyzing' && (
                    <span>🤔 Analyzing your request... <span className="animate-pulse ml-1">• • •</span></span>
                  )}
                  {deepSearchState.phase === 'searching' && (
                    <div>
                      <p className="mb-2 font-medium">🔍 Searching top articles...</p>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• Mayo Clinic: Overview of MAC lung disease</li>
                        <li>• WebMD: Early symptoms and risks</li>
                        <li>• NIH: Treatment guidelines</li>
                      </ul>
                    </div>
                  )}
                  {deepSearchState.phase === 'expanding' && (
                    <div>
                      <p className="mb-2 font-medium">🌐 Expanding to top sites for deeper insights...</p>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li>• CDC.gov: Infection prevention tips</li>
                        <li>• Lancet Journal: Recent studies (2025 update)</li>
                        <li>• WHO Report: Global prevalence</li>
                      </ul>
                    </div>
                  )}
                  {deepSearchState.phase === 'complete' && (
                    <div>
                      <p className="mb-2 font-medium">✨ Here's what I found:</p>
                      <div className="text-gray-100 mb-3 leading-relaxed"> 
                        {deepSearchState.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        Sources: Mayo Clinic, CDC, NIH • Not medical advice—consult a pro!
                      </div>
                    
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )} 
      
        {isTyping && (
          <div className="text-left">
            <div className="inline-block bg-gray-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-400 text-sm md:text-base mr-auto">
              Typing <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}