'use client';
import React, { useState } from 'react';
import type { Chat } from '@/hooks/useChats';
import ChatDropdown from './ChatDropdown';

interface ChatListProps {
  chats?: Chat[];
  activeChatId?: string | null;
  onSelectChat?: (id: string) => void;
  onCreateChat?: () => void;
  onDeleteChat?: (id: string) => void;
  onRenameChat?: (id: string, title: string) => void;
  onCloseSidebar?: () => void; // For mobile
}

export default function ChatList({ chats, activeChatId, onSelectChat, onCreateChat, onDeleteChat, onRenameChat, onCloseSidebar }: ChatListProps) {
  const [dropdownChatId, setDropdownChatId] = useState<string | null>(null);

  const handleDropdownToggle = (chatId: string) => {
    setDropdownChatId(chatId === dropdownChatId ? null : chatId);
  };

  const handleRename = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    const title = prompt('Chat title', chat?.title || '');
    if (title !== null) onRenameChat(chatId, title);
    setDropdownChatId(null);
  };

  const handleDelete = (chatId: string) => {
    if (confirm('Delete chat?')) {
        onDeleteChat(chatId);
        setDropdownChatId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4  mt-4 sticky top-0 z-20 bg-gray-900/80 backdrop-blur-sm">
        <button onClick={onCreateChat} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">
          New Chat
        </button> 
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {chats.map(chat => (
          <div key={chat.id} className={`flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-700 cursor-pointer ${chat.id === activeChatId ? 'bg-gray-700' : ''}`}>
            <div onClick={() => { onSelectChat(chat.id); onCloseSidebar?.(); }} className="flex-1 truncate">
              <div>{chat.title || 'Untitled'}</div>
              <div className="text-xs text-gray-400 truncate">{chat.messages[chat.messages.length - 1]?.text?.slice(0, 40) || 'No messages'}</div>
            </div>
            <div className="ml-2 relative">
              <button
                title="Options"
                onClick={(e) => { e.stopPropagation(); handleDropdownToggle(chat.id); }}          
                className="text-sm p-1 hover:bg-gray-700 rounded"
              >
                ...
              </button>
              
              <ChatDropdown
                isOpen={dropdownChatId === chat.id}
                onRename={() => handleRename(chat.id)}
                onDelete={() => handleDelete(chat.id)}
              />
            </div>
          </div>
        ))}
      </nav>

      <footer className='sticky bottom-0 z-20'>
        <div className="mt-4">
          <button
            onClick={() => { localStorage.removeItem('chat-ui-v1'); window.location.reload(); }}
            className="w-full  border border-gray-700 py-2 rounded-md bg-gray-900/80 backdrop-blur-sm"
          >
            Reset
          </button>
        </div>
      </footer>
    </div>
  );
}