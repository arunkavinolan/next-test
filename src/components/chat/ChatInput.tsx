import React, { useRef } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  input: string;
  model: string;
  deepSearch: boolean;
  onSubmit: (text: string) => void;
  onInputChange: (value: string) => void;
  onModelChange: (model: string) => void;
  inputClassName: string;
  onDeepSearchToggle: (enabled: boolean) => void;
}

export default function ChatInput({input,model,deepSearch,onSubmit,onInputChange,onModelChange, onDeepSearchToggle,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-3">
      <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-2 md:px-3 py-1 md:py-2 flex-1 w-full">
        <div className="flex items-center gap-1 md:gap-2 mr-2 md:mr-4">
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="text-xs md:text-sm bg-gray-800 border border-gray-700 px-2 md:px-3 py-1 rounded-full text-gray-100 outline-none cursor-pointer appearance-none relative z-20"
          >
            <option value="Model 1">Model 1</option>
            <option value="Model 2">Model 2</option>
            <option value="Model 3">Model 3</option>
          </select>

          <button
            type="button"
            onClick={() => onDeepSearchToggle(!deepSearch)}
            className={`text-xs md:text-sm px-2 md:px-3 py-1 border rounded-full cursor-pointer transition-colors ${
              deepSearch
                ? 'bg-blue-600 border-blue-500 text-blue-100 hover:bg-blue-600'
                : 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-800'
            }`}
          >
            Deep search
          </button>
        </div>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-400 text-sm md:text-base px-1"
          placeholder="Ask Here..."
          aria-label="chat input"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 rounded-full p-2 ml-1 md:ml-3 md:p-3 flex items-center justify-center">
          <SendHorizontal />
        </button>
      </div>
    </form>
  );
}