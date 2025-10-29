// import { useCallback } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import type { Chat, Message } from './useChats'; 


// //export interface Message {
// //   id: string;
// //   role: 'user' | 'assistant';
// //   content: string;
// //   timestamp: Date;
// // }

// // export interface Chat {
// //   id: string;
// //   name: string;
// //   messages: Message[];
// // }

// interface UseChatActionsProps {
//   chats: Chat[];
//   activeChatId: string | null;
//   setActiveChatId: (id: string) => void;
//   setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
// }


// export const useChatActions = ({ chats, activeChatId, setActiveChatId, setChats }: UseChatActionsProps) => {
//   // Create a new chat
//   const createChat = useCallback(() => {
//     const newChat: Chat = {
//       id: uuidv4(),
//       name: `Chat ${chats.length + 1}`,
//       messages: [],
//     };
//     setChats(prevChats => [...prevChats, newChat]);
//     setActiveChatId(newChat.id);
//   }, [chats.length, setChats, setActiveChatId]);

//   // Delete a chat
//   const deleteChat = useCallback((chatId: string) => {
//     setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
//     if (activeChatId === chatId) {
//       const remainingChats = chats.filter(chat => chat.id !== chatId);
//       setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
//     }
//   }, [activeChatId, chats, setChats, setActiveChatId]);

//   // Rename a chat
//   const renameChat = useCallback((chatId: string, newName: string) => {
//     setChats(prevChats =>
//       prevChats.map(chat =>
//         chat.id === chatId ? { ...chat, name: newName } : chat
//       )
//     );
//   }, [setChats]);

//   // Send message with optional deep search support
//   const sendMessage = useCallback(
//     async (text: string, setIsTyping: (typing: boolean) => void, deepSearch: boolean = false) => {
//       if (!activeChatId) return;

//       // Add user message immediately
//       const userMessage: Message = {
//         id: uuidv4(),
//         role: 'user',
//         content: text,
//         timestamp: new Date(),
//       };

//       setChats(prevChats =>
//         prevChats.map(chat =>
//           chat.id === activeChatId
//             ? { ...chat, messages: [...chat.messages, userMessage] }
//             : chat
//         )
//       );

//       if (!deepSearch) {
//         // Normal flow: Mock immediate responsereplace(Grok/OpenAI)
//         setTimeout(() => {
//           const responseMessage: Message = {
//             id: uuidv4(),
//             role: 'assistant',
//             content: `Normal response to: ${text}`, // Real: await fetch('/api/chat')
//             timestamp: new Date(),
//           };
//           setChats(prevChats =>
//             prevChats.map(chat =>
//               chat.id === activeChatId
//                 ? { ...chat, messages: [...chat.messages, responseMessage] }
//                 : chat
//             )
//           );
//           setIsTyping(false);
//         }, 1000);
//         return;
//       }

//       // Deep Search Flow: Chain delays with intermediate messages
//       setIsTyping(true);

//       // Step 1: Clarify (immediate)
//       const clarifyMessage: Message = {
//         id: uuidv4(),
//         role: 'assistant',
//         content: `Clarifying your request... Let me make sure I understand: You're asking about [rephrased query based on "${text}"]. Is that correct?`,
//         timestamp: new Date(),
//       };
//       setChats(prevChats =>
//         prevChats.map(chat =>
//           chat.id === activeChatId
//             ? { ...chat, messages: [...chat.messages, clarifyMessage] }
//             : chat
//         )
//       );

//       // Step 2: Analyze (2s delay)
//       setTimeout(() => {
//         const analyzeMessage: Message = {
//           id: uuidv4(),
//           role: 'assistant',
//           content: "Analyzing your request... Processing key aspects and context.",
//           timestamp: new Date(),
//         };
//         setChats(prevChats =>
//           prevChats.map(chat =>
//             chat.id === activeChatId
//               ? { ...chat, messages: [...chat.messages, analyzeMessage] }
//               : chat
//           )
//         );
//       }, 2000);

//       // Step 3: Search Medium (2s delay)
//       setTimeout(() => {
//         const mediumMessage: Message = {
//           id: uuidv4(),
//           role: 'assistant',
//           content: `Searching on Medium... Found relevant articles on [mock: e.g., 'Advanced ${text.split(' ')[0]} patterns'].`,
//           timestamp: new Date(),
//         };
//         setChats(prevChats =>
//           prevChats.map(chat =>
//             chat.id === activeChatId
//               ? { ...chat, messages: [...chat.messages, mediumMessage] }
//               : chat
//           )
//         );
//       }, 4000);

//       // Step 4: Search Stack Overflow (2s delay)
//       setTimeout(() => {
//         const soMessage: Message = {
//           id: uuidv4(),
//           role: 'assistant',
//           content: `Searching on Stack Overflow... Identified top-voted solutions for [mock: e.g., '${text}' issues].`,
//           timestamp: new Date(),
//         };
//         setChats(prevChats =>
//           prevChats.map(chat =>
//             chat.id === activeChatId
//               ? { ...chat, messages: [...chat.messages, soMessage] }
//               : chat
//           )
//         );
//       }, 6000);

//       // Step 5: Final Answer (2s delay) - Mock for now; integrate real search below
//       setTimeout(async () => {
//         let finalContent = `Based on my deep search across Medium and Stack Overflow, here's a comprehensive answer to "${text}": [Synthesized insights]. For example, key takeaways include efficient state management and error handling. See code snippet: const [state, setState] = useState();`;

//         // REAL INTEGRATION :
//         // try {
//         // 
//         // } catch (error) {
//         //   finalContent = "Search encountered an issue; falling back to analysis.";
//         // }

//         ;

//         const finalMessage: Message = {
//           id: uuidv4(),
//           role: 'assistant',
//           content: finalContent,
//           timestamp: new Date(),
//         };
//         setChats(prevChats =>
//           prevChats.map(chat =>
//             chat.id === activeChatId
//               ? { ...chat, messages: [...chat.messages, finalMessage] }
//               : chat
//           )
//         );
//         setIsTyping(false);
//       }, 8000);
//     },
//     [activeChatId, setChats]
//   );

//   return { createChat, deleteChat, renameChat, sendMessage };
// }; 