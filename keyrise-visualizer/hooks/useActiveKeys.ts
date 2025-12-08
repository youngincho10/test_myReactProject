import { useEffect, useState } from 'react';
import { VALID_KEYS } from '../constants';

export const useActiveKeys = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (VALID_KEYS.has(key)) {
        // Prevent default only for our specific game keys to avoid scrolling/browser actions
        // if they were mapped to things like Space or Arrows (not the case here, but good practice)
        
        if (!event.repeat) {
          setActiveKeys((prev) => {
            const newSet = new Set(prev);
            newSet.add(key);
            return newSet;
          });
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (VALID_KEYS.has(key)) {
        setActiveKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      }
    };

    // Also handle visibility change to clear keys if user tabs out
    const handleVisibilityChange = () => {
        if (document.hidden) {
            setActiveKeys(new Set());
        }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return activeKeys;
};