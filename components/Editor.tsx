
import React, { useState, useMemo } from 'react';
import { Download, ArrowLeft, RotateCcw, Layers, Wand2, Lightbulb } from 'lucide-react';
import { Button } from './Button';
import { STYLE_PRESETS, CUSTOM_EDIT_EXAMPLES } from '../constants';
import { editImageWithGemini } from '../services/geminiService';
import { LoadingOverlay } from './LoadingOverlay';
import { StyleCategory, Gender, HairLength } from '../types';

interface EditorProps {
  originalImage: string;
  onReset: () => void;
  gender: Gender;
}

export const Editor: React.FC<EditorProps> = ({ originalImage, onReset, gender }) => {
  const [currentImage, setCurrentImage] = useState<string>(originalImage);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [activeCategory, setActiveCategory] = useState<StyleCategory>('hair');
  const [activeHairLength, setActiveHairLength] = useState<HairLength>('medium');
  const [error, setError] = useState<string | null>(null);

  // Filter presets based on category, gender, and sub-category for hair
  const filteredPresets = useMemo(() => {
    return STYLE_PRESETS.filter(p => {
      const matchesCategory = p.category === activeCategory;
      const matchesGender = p.gender === 'both' || p.gender === gender;
      
      if (activeCategory === 'hair') {
        return matchesCategory && matchesGender && p.subCategory === activeHairLength;
      }
      
      return matchesCategory && matchesGender;
    });
  }, [activeCategory, gender, activeHairLength]);

  const handleStyleApply = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      // Trim and ensure basic cleanliness of prompt
      const finalPrompt = prompt.trim();
      // Using currentImage allows stacking edits
      const result = await editImageWithGemini(currentImage, finalPrompt);
      setCurrentImage(result);
    } catch (err) {
      setError("Failed to generate style. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = 'style-ai-makeover.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRevert = () => {
    setCurrentImage(originalImage);
    setError(null);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left: Controls */}
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-fashion-200 flex flex-col h-full z-10 shadow-lg lg:shadow-none">
        
        <div className="p-4 border-b border-fashion-100 flex items-center justify-between">
           <Button variant="ghost" size="sm" onClick={onReset} className="text-fashion-500">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
           </Button>
           <div className="flex items-center space-x-2">
             <span className="text-xs font-medium px-2 py-1 bg-fashion-50 rounded-full text-fashion-500 uppercase tracking-wider">
               {gender === 'male' ? 'For Him' : 'For Her'}
             </span>
             <h2 className="text-lg font-serif font-bold text-fashion-900">Studio</h2>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-fashion-100 overflow-x-auto scrollbar-hide">
          {(['hair', 'color', 'outfit', 'edit'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-1 py-4 px-2 text-sm font-medium text-center capitalize border-b-2 transition-colors whitespace-nowrap
                ${activeCategory === cat 
                  ? 'border-fashion-900 text-fashion-900' 
                  : 'border-transparent text-fashion-400 hover:text-fashion-600 hover:border-fashion-200'
                }
              `}
            >
              {cat === 'edit' ? 'Magic Edit' : cat}
            </button>
          ))}
        </div>

        {/* Hair Length Sub-Category Selector */}
        {activeCategory === 'hair' && (
          <div className="px-4 pt-4 pb-2 border-b border-fashion-50">
            <div className="flex bg-fashion-50 p-1 rounded-lg">
              {(['short', 'medium', 'long'] as const).map((length) => (
                <button
                  key={length}
                  onClick={() => setActiveHairLength(length)}
                  className={`
                    flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200 capitalize
                    ${activeHairLength === length
                      ? 'bg-white text-fashion-900 shadow-sm' 
                      : 'text-fashion-500 hover:text-fashion-700'
                    }
                  `}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-fashion-50/50">
          
          {activeCategory === 'edit' ? (
             <div className="space-y-6">
               {/* Custom Prompt Only (Quick Actions removed) */}
               <div>
                 <h3 className="text-xs font-semibold text-fashion-500 uppercase tracking-wider mb-3 flex items-center">
                   <Layers className="w-3 h-3 mr-1" />
                   Custom Edit
                 </h3>
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-fashion-100">
                   <label className="block text-sm font-medium text-fashion-700 mb-2">
                     Describe your edit
                   </label>
                   <textarea
                     className="w-full p-3 bg-white text-fashion-900 border border-fashion-200 rounded-lg focus:ring-2 focus:ring-fashion-900 focus:border-transparent resize-none h-32 text-sm mb-3 placeholder-fashion-300"
                     placeholder="Describe what you want to change... (e.g. 'Make the person stand up', 'Add a hat')"
                     value={customPrompt}
                     onChange={(e) => setCustomPrompt(e.target.value)}
                   />
                   
                   {/* Inspiration Chips */}
                   <div className="mb-4">
                      <div className="flex items-center mb-2 text-xs text-fashion-500 font-medium">
                        <Lightbulb className="w-3 h-3 mr-1 text-yellow-500" />
                        <span>Try an example:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {CUSTOM_EDIT_EXAMPLES.map((ex) => (
                          <button
                            key={ex.label}
                            onClick={() => setCustomPrompt(ex.prompt)}
                            className="px-2.5 py-1 bg-fashion-50 hover:bg-fashion-100 border border-fashion-200 hover:border-fashion-300 text-xs rounded-lg text-fashion-600 transition-colors text-left"
                            title={ex.prompt}
                          >
                            {ex.label}
                          </button>
                        ))}
                      </div>
                   </div>

                   <Button 
                     className="w-full" 
                     onClick={() => handleStyleApply(customPrompt)}
                     disabled={!customPrompt.trim() || isProcessing}
                     isLoading={isProcessing}
                     icon={<Wand2 className="w-4 h-4" />}
                   >
                     Generate
                   </Button>
                 </div>
                 <div className="mt-2 text-xs text-fashion-400 px-1">
                   Tip: Be specific about details like color, style, and lighting for best results.
                 </div>
               </div>
             </div>
          ) : (
            <div className="space-y-2">
              {activeCategory === 'hair' && (
                <div className="px-1 pb-2">
                   <span className="text-xs font-medium text-fashion-400 uppercase tracking-wide">
                     {activeHairLength} Styles
                   </span>
                </div>
              )}
              <div className="grid grid-cols-1 gap-3">
                {filteredPresets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleStyleApply(preset.promptSuffix)}
                    disabled={isProcessing}
                    className="group relative flex items-center p-3 bg-white border border-fashion-200 rounded-xl hover:border-fashion-400 hover:shadow-md transition-all text-left disabled:opacity-50"
                  >
                    <div className="w-10 h-10 rounded-full bg-fashion-50 flex items-center justify-center mr-3 group-hover:bg-fashion-900 group-hover:text-white transition-colors">
                       {activeCategory === 'hair' && <span className="text-lg">✂️</span>}
                       {activeCategory === 'color' && <span className="text-lg">🎨</span>}
                       {activeCategory === 'outfit' && <span className="text-lg">👗</span>}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-fashion-900">{preset.label}</h3>
                      {/* Split prompt to hide the technical instructions from user view */}
                      <p className="text-xs text-fashion-400 truncate w-48">{preset.promptSuffix.split('.')[0]}</p>
                    </div>
                  </button>
                ))}
                {filteredPresets.length === 0 && (
                  <div className="text-center py-8 text-fashion-400 text-sm italic">
                    No styles available for this selection.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-white border-t border-fashion-100 space-y-3">
           {error && (
             <div className="text-red-500 text-xs text-center bg-red-50 p-2 rounded mb-2">
               {error}
             </div>
           )}
           <div className="flex gap-2">
             <Button variant="outline" onClick={handleRevert} className="flex-1" icon={<RotateCcw className="w-4 h-4"/>}>
               Revert
             </Button>
             <Button variant="primary" onClick={handleDownload} className="flex-1" icon={<Download className="w-4 h-4"/>}>
               Save
             </Button>
           </div>
        </div>
      </div>

      {/* Right: Canvas */}
      <div className="flex-1 bg-fashion-100/50 relative flex items-center justify-center p-4 lg:p-8 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden bg-white">
             <img 
               src={showOriginal ? originalImage : currentImage} 
               alt="Current Edit" 
               className="max-w-full max-h-[calc(100vh-8rem)] object-contain"
             />
             <LoadingOverlay isVisible={isProcessing} />
          </div>
          
          {/* Compare Button Overlay */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button 
              className="bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md hover:bg-black/80 transition cursor-pointer select-none"
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
            >
              Hold to Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
