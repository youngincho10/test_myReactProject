import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyConfig } from '../types';

interface KeyColumnProps {
  config: KeyConfig;
  isActive: boolean;
  onPointerDown: (key: string) => void;
  onPointerUp: (key: string) => void;
  customImage?: string;
}

export const KeyColumn: React.FC<KeyColumnProps> = ({ 
  config, 
  isActive, 
  onPointerDown, 
  onPointerUp,
  customImage
}) => {
  // We use pointer events for mouse/touch support to simulate key presses
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    onPointerDown(config.key);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    onPointerUp(config.key);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    // If dragging out, treat as release
    if (isActive) {
        onPointerUp(config.key);
    }
  };

  const displayImage = customImage || config.imageUrl;

  return (
    <div 
        className="relative flex-1 h-full flex flex-col items-center justify-end group select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
    >
      {/* Background Track (Subtle guide) */}
      <div className="absolute bottom-0 w-full h-full bg-white/5 border-r border-white/5 last:border-r-0 transition-colors duration-300 group-hover:bg-white/10" />

      {/* The Rising Bar */}
      <motion.div
        className="absolute bottom-0 w-full overflow-hidden shadow-2xl z-10"
        initial={{ height: "15%" }}
        animate={{ 
          height: isActive ? "95%" : "15%",
          // Removed grayscale and color filters, just handling brightness/contrast for active state
          filter: isActive ? "brightness(1.1) contrast(1.1)" : "brightness(0.6)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.8
        }}
      >
        {/* The Image Background */}
        <div className="absolute inset-0 w-full h-full bg-black">
             <img 
                src={displayImage} 
                alt={config.label}
                className="w-full h-full object-cover"
                draggable={false}
             />
             {/* Simple dark gradient at bottom for text visibility, no color overlays */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Decorative Particles/Glow (Visible when active) */}
        <AnimatePresence>
            {isActive && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/10"
                />
            )}
        </AnimatePresence>

      </motion.div>

      {/* Key Label (The physical 'button' look at the bottom) */}
      <div className="relative z-20 w-full h-[15%] flex items-center justify-center pointer-events-none">
        <motion.div 
            className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2 
                        backdrop-blur-md shadow-lg
                        ${isActive 
                            ? 'bg-white text-black border-white scale-110' 
                            : 'bg-black/40 text-white/70 border-white/20'
                        }`}
            animate={{
                y: isActive ? -10 : 0,
            }}
        >
          <span className="text-xl md:text-2xl font-black font-mono">{config.label}</span>
        </motion.div>
      </div>

      {/* Light Reflection effect at the bottom when active */}
      {isActive && (
        <motion.div 
            className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-30"
            layoutId={`glow-${config.key}`}
        />
      )}
    </div>
  );
};