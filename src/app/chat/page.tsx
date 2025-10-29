'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import ChatList from '@/components/chat/ChatList';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import QuickSuggestions from '@/components/chat/QuickSuggestions';
import MobileSidebar from '@/components/layout/MobileSidebar';
import { useChats } from '@/hooks/useChats';
import { useChatActions } from '@/hooks/useChatActions';
import { defaultChats } from '@/utils/constants';

const STORAGE_KEY = 'chat-ui-v1';

export default function Main1() {
  const router = useRouter();

  const { chats, activeChat, activeChatId, setActiveChatId, setChats } = useChats({storageKey: STORAGE_KEY,defaultChats,});

  const { createChat, deleteChat, renameChat, sendMessage } = useChatActions({
    chats,
    activeChatId,
    setActiveChatId,
    setChats,
  });
  const [input, setInput] = useState<string>('');
  const [model, setModel] = useState<string>('Model 1');
  const [deepSearch, setDeepSearch] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  
  // New: Track deep search progress
  const [deepSearchState, setDeepSearchState] = useState<{ phase: 'idle' | 'analyzing' | 'searching' | 'expanding' | 'complete'; content: string; progressId?: string }>({ phase: 'idle', content: '' });

  // Protected route check: Redirect to login if no token
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) {
      router.replace('/');
    }
  }, [router]);

  const handleSubmit = async (text: string) => {
    if (!activeChatId) return;
    setInput('');
    
    if (deepSearch) {
      setIsTyping(false); // Hide default typing
      // Fixed call: Now setIsTyping first (always), then setDeepSearchState as optional setDeepState
      await sendMessage(text, setIsTyping, deepSearch, setDeepSearchState);
    } else {
      setIsTyping(true);
      sendMessage(text, setIsTyping, deepSearch); // Original flow (no setDeepState)
    }
  };

  const handleQuickExample = (text: string) => {
    setInput(text);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.replace('/');
  };

  const examples = [
    'What is MAC lung disease?',
    'What are the symptoms of MAC lung disease?',
    'What are the other diseases related to lungs?',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col md:flex-row relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden
        />
      )}

      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        className="transition-transform duration-300 ease-in-out"
      >
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onCreateChat={createChat}
          onDeleteChat={deleteChat}
          onRenameChat={renameChat}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </MobileSidebar>

      <aside className="hidden fixed md:flex  left-0 top-0 h-full w-72 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700  flex flex-col z-40 overflow-y-auto transition-all duration-300 space-y-6" 
      >
        

        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onCreateChat={createChat}
          onDeleteChat={deleteChat}
          onRenameChat={renameChat}
        />
        {/* <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Logout"
        >
          Logout
        </button> */}
      </aside>

      <main className="flex-1 p-6 md:ml-72 flex flex-col min-h-screen space-y-6">
        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
          <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-sm  flex items-center justify-between py-4 px-2">
            <button 
              onClick={toggleSidebar} 
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 flex-1 justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                A
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-relaxed">
                Hi Arunkavi! How can I help you today?
                <span aria-hidden className="ml-2">🌤️</span>
              </h1>
            </div>
          </header>

          {/* Quick Suggestions as Grid */}
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
            <section className="bg-gray-800/50 p-4 rounded-xl shadow-sm">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Suggestions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {examples.map((example, idx) => (
                    <button
                    key={idx}
                    onClick={() => handleQuickExample(example)}
                    className="bg-gray-700 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-600 active:scale-95 transition-all duration-200 text-left text-sm"
                    aria-label={`Start chat with: ${example}`}>
                        {example}
                    </button>
                ))}
                </div>
            </section>

            <ChatMessages 
                messages={activeChat?.messages || []} 
                isTyping={isTyping && !deepSearch} 
                messageClassName="max-w-md mx-auto p-3 rounded-lg my-2 shadow-sm [&:last-child]:mb-0"
                userBubbleClassName="ml-auto bg-blue-600 text-white"
                botBubbleClassName="mr-auto bg-gray-700 text-gray-100"
            
                deepSearchState={deepSearchState}
            />
         </div>

          <footer className="sticky bottom-0 z-20 bg-gray-900/80 backdrop-blur-sm py-3">

            {/* <div className="min-h-[125px]"> */}
                <ChatInput
                input={input}
                model={model}
                deepSearch={deepSearch}
                onSubmit={handleSubmit}
                onInputChange={setInput}
                onModelChange={setModel}
                onDeepSearchToggle={setDeepSearch}
                inputClassName="resize-none w-full p-4 bg-gray-700/80 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                />
            {/* </div> */}
          </footer>

        </div>
      </main>
    </div>
  );
}