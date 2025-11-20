import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = "Styling..." }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-fashion-900 animate-spin" />
        <Sparkles className="w-6 h-6 text-fashion-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="mt-4 text-fashion-800 font-serif text-lg font-medium animate-pulse">{message}</p>
    </div>
  );
};
