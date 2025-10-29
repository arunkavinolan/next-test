interface ChatDropdownProps {
  isOpen: boolean;
  onRename: () => void;
  onDelete: () => void; 
}

export default function ChatDropdown({ isOpen, onRename, onDelete }: ChatDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-1 w-24 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10">
      <div className="flex flex-col">
        <button onClick={onRename} className="px-3 py-2 text-sm text-left hover:bg-gray-600 rounded-t-md w-full">
          rename
        </button>
        <button onClick={onDelete} className="px-3 py-2 text-sm text-left hover:bg-gray-600 rounded-b-md w-full text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
}