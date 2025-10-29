import React from 'react';

interface QuickSuggestionsProps {
  examples: string[];
  onQuickExample: (text: string) => void; 
}

export default function QuickSuggestions({ examples, onQuickExample }: QuickSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-4 md:mb-6">
      {examples.map((example, index) => (
        <button
          key={index}
          onClick={() => onQuickExample(example)}
          className="px-3 py-2 md:px-4 md:py-2 bg-gray-800/60 border border-gray-700 rounded-full text-sm md:text-base"
        >
          {example}
        </button>
      ))}
    </div>
  );
}