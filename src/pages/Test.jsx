'use client'
import '../app/globals.css' 
import React, { useEffect, useState, useRef } from 'react'
import '../app/globals.css';

const STORAGE_KEY = 'chat-ui-v1';

const defaultChats = [
  {
    id: 'welcome',
    title: 'Welcome',
    messages: [
      { id: 'welcome-msg', role: 'assistant', text: 'Welcome — ask anything or choose a suggestion above.' }
    ]
  }
]

export default function Main1() {
  const [chats, setChats] = useState(defaultChats);
  const [activeChatId, setActiveChatId] = useState(defaultChats[0].id)
  const [input, setInput] = useState('')
  const [model, setModel] = useState('Model 1')
  const [deepSearch, setDeepSearch] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)  // NEW: Mobile sidebar toggle
  const inputRef = useRef(null)

  // ID generator (from previous fix)
  function makeId() {
    return Math.random().toString(36);
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  }, [chats])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChats(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (!activeChatId && chats.length) setActiveChatId(chats[0].id)
    if (activeChatId && !chats.find(c => c.id === activeChatId)) setActiveChatId(chats[0]?.id ?? null)
  }, [chats, activeChatId])

  const activeChat = chats.find(c => c.id === activeChatId) || null

  function createChat() {
    const newChat = { id: makeId(), title: 'New Chat', messages: [] }
    setChats(prev => [newChat, ...prev])
    setActiveChatId(newChat.id)
    if (window.innerWidth < 768) setIsSidebarOpen(false)  // Close sidebar on mobile after action
  }

  function deleteChat(id) {
    setChats(prev => prev.filter(c => c.id !== id))
    if (id === activeChatId) setActiveChatId(null)
  }

  function appendMessage(chatId, message) {
    setChats(prev => prev.map(c => (c.id === chatId ? { ...c, messages: [...c.messages, message] } : c)))
  }

  async function sendMessage(text) {
    if (!activeChatId) return
    const userMsg = { id: makeId(), role: 'user', text }
    appendMessage(activeChatId, userMsg)
    setInput('')
    setIsTyping(true)

    const simulatedResponse = `Here is a helpful response to "${text}". (Model: ${model}${deepSearch ? ', Deep Search ON' : ''})

- Tip 1
- Tip 2

If you want this hooked to a real LLM, I can add the server API route.`

    const assistantId = makeId()
    appendMessage(activeChatId, { id: assistantId, role: 'assistant', text: '' })

    for (let i = 0; i < simulatedResponse.length; i += 12) {
      const chunk = simulatedResponse.slice(i, i + 12)
      await new Promise(r => setTimeout(r, 120))
      setChats(prev => prev.map(c => ({
        ...c,
        messages: c.id === activeChatId ? c.messages.map(m => (m.id === assistantId ? { ...m, text: (m.text || '') + chunk } : m)) : c.messages
      })))
    }

    setIsTyping(false)
  }

  function onSubmit(e) {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    sendMessage(trimmed)
  }

  function quickExample(text) {
    setInput(text)
    inputRef.current?.focus()
  }

  function renameChat(id, title) {
    setChats(prev => prev.map(c => (c.id === id ? { ...c, title } : c)))
  }

  // NEW: Toggle sidebar function
  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">  {/* CHANGED: flex-col on mobile */}
      {/* Mobile Overlay Sidebar (NEW) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}>
          <aside className="fixed left-0 top-0 h-full w-80 bg-gray-800 border-r border-gray-700 p-4 flex flex-col z-50">
            {/* Mobile sidebar content - same as desktop */}
            <div className="mb-4">
              <button onClick={createChat} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">New Chat</button>
            </div>
            <nav className="flex-1 overflow-auto space-y-2">
              {chats.map(chat => (
                <div key={chat.id} className={`flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-700 cursor-pointer ${chat.id === activeChatId ? 'bg-gray-700' : ''}`}>
                  <div onClick={() => { setActiveChatId(chat.id); setIsSidebarOpen(false); }} className="flex-1">  {/* Close on select */}
                    <div className="truncate">{chat.title || 'Untitled'}</div>
                    <div className="text-xs text-gray-400 truncate">{chat.messages[chat.messages.length - 1]?.text?.slice(0, 40) || 'No messages'}</div>
                  </div>
                  <div className="ml-2 flex items-center gap-1">
                    <button title="Rename" onClick={() => { const t = prompt('Chat title', chat.title || ''); if (t !== null) renameChat(chat.id, t) }} className="text-sm">✏️</button>
                    <button title="Delete" onClick={() => { if (confirm('Delete chat?')) deleteChat(chat.id) }} className="text-sm">🗑️</button>
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-4">
              <button onClick={() => { localStorage.removeItem(STORAGE_KEY); setChats(defaultChats); setActiveChatId(defaultChats[0].id); setIsSidebarOpen(false); }} className="w-full bg-transparent border border-gray-700 py-2 rounded-md">Reset</button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-72 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">  {/* CHANGED: hidden md:flex */}
        <div className="mb-4">
          <button onClick={createChat} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">New Chat</button>
        </div>
        <nav className="flex-1 overflow-auto space-y-2">
          {chats.map(chat => (
            <div key={chat.id} className={`flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-700 cursor-pointer ${chat.id === activeChatId ? 'bg-gray-700' : ''}`}>
              <div onClick={() => setActiveChatId(chat.id)} className="flex-1">
                <div className="truncate">{chat.title || 'Untitled'}</div>
                <div className="text-xs text-gray-400 truncate">{chat.messages[chat.messages.length - 1]?.text?.slice(0, 40) || 'No messages'}</div>
              </div>
              <div className="ml-2 flex items-center gap-1">
                <button title="Rename" onClick={() => { const t = prompt('Chat title', chat.title || ''); if (t !== null) renameChat(chat.id, t) }} className="text-sm">✏️</button>
                <button title="Delete" onClick={() => { if (confirm('Delete chat?')) deleteChat(chat.id) }} className="text-sm">🗑️</button>
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-4">
          <button onClick={() => { localStorage.removeItem(STORAGE_KEY); setChats(defaultChats); setActiveChatId(defaultChats[0].id) }} className="w-full bg-transparent border border-gray-700 py-2 rounded-md">Reset</button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 p-2 md:p-6 flex flex-col min-h-screen">  {/* CHANGED: Responsive padding, min-h-screen */}
        <div className="w-full max-w-full md:max-w-5xl mx-auto flex-1 flex flex-col">  {/* CHANGED: max-w-full on mobile */}
          {/* Header with Hamburger (NEW) */}
          <header className="text-center mb-4 md:mb-6 flex items-center justify-between">  {/* CHANGED: flex for hamburger */}
            <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-300 hover:text-white">  {/* NEW: Hamburger button */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold flex-1">Hi Arunkavi! Good Night<span aria-hidden>🌤️</span></h1>
          </header>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-4 md:mb-6">  {/* CHANGED: Smaller gap on mobile */}
            <button onClick={() => quickExample('What is MAC lung disease?')} className="px-3 py-2 md:px-4 md:py-2 bg-gray-800/60 border border-gray-700 rounded-full text-sm md:text-base">What is MAC lung disease?</button>
            <button onClick={() => quickExample('What are the symptoms of MAC lung disease?')} className="px-3 py-2 md:px-4 md:py-2 bg-gray-800/60 border border-gray-700 rounded-full text-sm md:text-base">What are the symptoms of MAC lung disease?</button>
            <button onClick={() => quickExample('What are the other diseases related to lungs?')} className="px-3 py-2 md:px-4 md:py-2 bg-gray-800/60 border border-gray-700 rounded-full text-sm md:text-base">What are the other diseases related to lungs?</button>
          </div>

          {/* Controls - unchanged, but responsive */}
          <div className="flex items-center justify-center gap-4 mb-4"></div>

          {/* Chat area */}
          <div className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-gray-900/40 rounded-xl p-4 md:p-6 mb-4" style={{ minHeight: 200 }}>  {/* CHANGED: Responsive padding */}
            {!activeChat && <div className="text-center text-gray-400">Select or create a chat to begin.</div>}

            {activeChat && (
              <div className="space-y-4">
                {activeChat.messages.map(m => (
                  <div key={m.id} className={`max-w-3xl ${m.role === 'user' ? 'ml-auto text-right' : ''}`}>
                    <div className={`${m.role === 'user' ? 'inline-block bg-blue-600 text-white' : 'inline-block bg-gray-800 text-gray-100'} px-3 md:px-4 py-2 md:py-3 rounded-lg block max-w-full`}>
                      <div className="whitespace-pre-wrap break-words text-sm md:text-base">{m.text}</div>  {/* CHANGED: Responsive text size */}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="text-left">
                    <div className="inline-block bg-gray-800 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-400 text-sm md:text-base">Typing <span className="animate-pulse">...</span></div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input area */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 md:gap-3">  {/* CHANGED: Smaller gap on mobile */}
            <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-2 md:px-3 py-1 md:py-2 flex-1 w-full">  {/* CHANGED: Full width, responsive padding */}
              <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-4">  {/* CHANGED: Smaller gap */}
                <span className="text-xs md:text-sm px-2 md:px-3 py-1 border border-gray-700 rounded-full">{model}</span>
                <span className="text-xs md:text-sm px-2 md:px-3 py-1 border border-gray-700 rounded-full">{deepSearch ? 'Deep' : 'Quick'}</span>
              </div>

              <input
                ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-400 text-sm md:text-base px-1"
                placeholder="Ask Here..."
                aria-label="chat input"
              />

              <button type="submit" className="ml-1 md:ml-3 bg-blue-600 hover:bg-blue-500 rounded-full p-1 md:p-2">Send</button>  {/* CHANGED: Responsive padding */}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}