import React, { useState, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, User, Lock } from 'lucide-react';
import { Button } from './Button';
import { Gender } from '../types';

interface ImageUploaderProps {
  onImageSelect: (base64: string, gender: Gender) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [showError, setShowError] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!selectedGender) {
      setShowError(true);
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result, selectedGender);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect, selectedGender]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!selectedGender) {
      setShowError(true);
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const selectGender = (gender: Gender) => {
    setSelectedGender(gender);
    setShowError(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-fashion-900 mb-3">
          Your Personal Style AI
        </h2>
        <p className="text-fashion-500 text-lg">
          Upload a photo to start your makeover.
        </p>
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-sm font-medium text-fashion-500 uppercase tracking-wider mb-4">
          Step 1: Select Style Preference
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => selectGender('female')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-200 ${
              selectedGender === 'female'
                ? 'border-fashion-900 bg-fashion-900 text-white shadow-md transform scale-105'
                : 'border-fashion-200 bg-white text-fashion-500 hover:border-fashion-400 hover:bg-fashion-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>For Her</span>
          </button>
          <button
            onClick={() => selectGender('male')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-200 ${
              selectedGender === 'male'
                ? 'border-fashion-900 bg-fashion-900 text-white shadow-md transform scale-105'
                : 'border-fashion-200 bg-white text-fashion-500 hover:border-fashion-400 hover:bg-fashion-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>For Him</span>
          </button>
        </div>
        {showError && !selectedGender && (
          <p className="text-red-500 text-sm mt-2 animate-pulse">
            Please select a gender preference to continue
          </p>
        )}
      </div>

      <div className="relative">
        {/* Disabled State Overlay */}
        {!selectedGender && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] rounded-2xl border border-transparent flex flex-col items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-3 rounded-full shadow-lg mb-2">
              <Lock className="w-6 h-6 text-fashion-400" />
            </div>
            <p className="text-fashion-500 font-medium">Select a style above to unlock upload</p>
          </div>
        )}

        <div
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ease-in-out
            ${isDragging 
              ? 'border-fashion-900 bg-fashion-50 scale-[1.02]' 
              : 'border-fashion-200'
            }
            ${!selectedGender ? 'opacity-50' : 'hover:border-fashion-400 hover:bg-white bg-white cursor-pointer'}
          `}
          onDragOver={(e) => { 
            e.preventDefault(); 
            if (selectedGender) setIsDragging(true); 
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center pointer-events-none">
            <div className={`p-4 rounded-full bg-fashion-50 mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
              <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-fashion-900' : 'text-fashion-400'}`} />
            </div>
            <h3 className="text-xl font-medium text-fashion-900 mb-2">
              Drop your photo here
            </h3>
            <p className="text-fashion-400 mb-6">
              or click to browse (JPEG, PNG, WebP)
            </p>
          </div>

          <div className="relative inline-block">
            <input
              type="file"
              accept="image/*"
              className={`absolute inset-0 w-full h-full opacity-0 ${selectedGender ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onChange={handleChange}
              disabled={!selectedGender}
              aria-label="Upload image"
            />
            <Button 
              variant="primary" 
              size="lg" 
              icon={<ImageIcon className="w-5 h-5"/>} 
              className="pointer-events-none"
              disabled={!selectedGender}
            >
              Select Photo
            </Button>
          </div>
          
          <div className="mt-8 flex justify-center space-x-8 text-sm text-fashion-400">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
              Secure Processing
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
              High Resolution
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};