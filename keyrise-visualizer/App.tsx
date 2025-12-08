import React, { useState, useRef } from 'react';
import { useActiveKeys } from './hooks/useActiveKeys';
import { KEY_CONFIGS } from './constants';
import { KeyColumn } from './components/KeyColumn';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const keyboardActiveKeys = useActiveKeys();
  const [touchActiveKeys, setTouchActiveKeys] = useState<Set<string>>(new Set());
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merge keyboard and touch active keys
  const isKeyActive = (key: string) => {
    return keyboardActiveKeys.has(key) || touchActiveKeys.has(key);
  };

  // Handlers for touch interaction
  const handleTouchStart = (key: string) => {
    setTouchActiveKeys(prev => {
        const next = new Set(prev);
        next.add(key);
        return next;
    });
  };

  const handleTouchEnd = (key: string) => {
    setTouchActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
    });
  };

  // Handler for bulk upload
  const handleBulkUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = { ...customImages };
    
    // Logic: 
    // If 1 image is uploaded -> Apply to ALL keys
    // If >1 images are uploaded -> Map sequentially to keys
    
    if (files.length === 1) {
        const singleImageUrl = URL.createObjectURL(files[0]);
        KEY_CONFIGS.forEach((config) => {
            newImages[config.key] = singleImageUrl;
        });
    } else {
        KEY_CONFIGS.forEach((config, index) => {
            if (files[index]) {
                newImages[config.key] = URL.createObjectURL(files[index]);
            }
        });
    }

    setCustomImages(newImages);
    
    // Reset input so same files can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative w-full h-screen bg-neutral-950 overflow-hidden flex flex-col">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header / Instructions */}
        <header className="pt-8 px-6 text-center flex flex-col items-center">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 tracking-tighter mb-2"
            >
                KEYRISE
            </motion.h1>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2"
            >
                <p className="text-neutral-500 text-sm md:text-base font-medium tracking-wide uppercase">
                    Press <span className="text-white mx-1">A S D F J K L</span>
                </p>
                
                {/* Bulk Upload Button */}
                <button 
                    onClick={handleBulkUploadClick}
                    className="mt-4 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all backdrop-blur-sm flex items-center gap-2 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Upload Images (1 for All, or Multiple)
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={handleBulkFileChange}
                />
            </motion.div>
        </header>

        {/* Visualizer Area */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-8 pb-0 flex items-end h-full">
            <div className="w-full h-full flex flex-row items-end justify-center gap-1 md:gap-2">
                {KEY_CONFIGS.map((config) => (
                    <KeyColumn
                        key={config.key}
                        config={config}
                        isActive={isKeyActive(config.key)}
                        onPointerDown={handleTouchStart}
                        onPointerUp={handleTouchEnd}
                        customImage={customImages[config.key]}
                    />
                ))}
            </div>
        </div>

      </main>

      {/* Overlay Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40 z-50" />
    </div>
  );
};

export default App;