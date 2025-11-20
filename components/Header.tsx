import React from 'react';
import { Wand2, Scissors } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-fashion-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-fashion-900 p-1.5 rounded-lg">
              <Wand2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-serif font-bold text-fashion-900 tracking-tight">
                StyleAI
              </h1>
              <span className="text-xs text-fashion-500 font-medium tracking-widest uppercase">
                Nano Edition
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-fashion-500">
            <span className="flex items-center hover:text-fashion-900 cursor-default transition-colors">
              <Scissors className="w-4 h-4 mr-1" />
              Hair
            </span>
            <span className="flex items-center hover:text-fashion-900 cursor-default transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              Colors
            </span>
            <span className="flex items-center hover:text-fashion-900 cursor-default transition-colors">
               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Outfits
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
