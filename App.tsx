import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Editor } from './components/Editor';
import { AppState, Gender } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>('female');

  const handleImageSelect = (base64: string, selectedGender: Gender) => {
    setUploadedImage(base64);
    setGender(selectedGender);
    setAppState(AppState.EDITOR);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAppState(AppState.UPLOAD);
  };

  return (
    <div className="min-h-screen bg-fashion-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col">
        {appState === AppState.UPLOAD && (
          <div className="flex-grow flex items-center justify-center animate-fade-in">
             <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        )}
        
        {appState === AppState.EDITOR && uploadedImage && (
          <div className="flex-grow animate-fade-in">
            <Editor 
              originalImage={uploadedImage} 
              onReset={handleReset} 
              gender={gender}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;