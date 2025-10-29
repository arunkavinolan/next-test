import React from 'react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function MobileSidebar({ isOpen, onClose, children }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 md:hidden bg-black bg-opacity-50"
        onClick={onClose}
      />
      <aside className="fixed left-0 top-0 h-full w-80 bg-gray-800 border-r border-gray-700 p-4 flex flex-col z-50 overflow-y-auto">
        {children}
      </aside>
    </>
  );
}