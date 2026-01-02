import React from 'react';
import { Shirt } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-gray-800/50 flex items-center justify-between bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-red-600 to-red-900 rounded-lg shadow-lg shadow-red-900/20">
          <Shirt className="text-white h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
          맹맹맹.AI
        </h1>
      </div>
      <div className="text-xs md:text-sm font-medium text-gray-500 border border-gray-800 px-3 py-1 rounded-full">
        Gemini 3 Pro Image
      </div>
    </header>
  );
};