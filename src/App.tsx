import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatusBar from './ui/StatusBar';
import Dock from './ui/Dock';
import LockScreen from './ui/LockScreen';
import { PowerButton, VolumeButtons } from './ui/Hardware';
import { VolumeHUD } from './ui/System';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [volume, setVolume] = useState(50);
  const [showVolumeHUD, setShowVolumeHUD] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVolumeChange = (type: 'up' | 'down') => {
    setVolume(prev => {
      const next = type === 'up' ? Math.min(prev + 5, 100) : Math.max(prev - 5, 0);
      return next;
    });
    
    // Show HUD
    setShowVolumeHUD(true);
    
    // Reset timeout
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeHUD(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      {/* Device Wrapper */}
      <div className="relative">
        
        {/* Physical Buttons */}
        <PowerButton onPress={() => setIsLocked(true)} />
        <VolumeButtons 
          onVolumeUp={() => handleVolumeChange('up')} 
          onVolumeDown={() => handleVolumeChange('down')} 
        />
        
        {/* Mobile Device Frame */}
        <div className="relative w-[390px] h-[844px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-mobile shadow-2xl overflow-hidden border-[8px] border-black ring-4 ring-gray-800">
          
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />

          {/* System UI Layout */}
          <div className="relative z-10 flex flex-col h-full">
            
            {/* Top: Status Bar */}
            <StatusBar />

            {/* Main: App Content (Empty for now) */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tight drop-shadow-xl text-white/90">
                  Welcome to MobileOS
                </h1>
                <p className="mt-4 text-white/70 font-medium">
                  Gestión de procesos y kernel modular.
                </p>
              </motion.div>
            </div>

            {/* Bottom: Floating Dock */}
            <Dock />

          </div>

          {/* Home Indicator (iPhone style) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/40 rounded-full z-20" />

          {/* Visual HUDs */}
          <VolumeHUD volume={volume} isVisible={showVolumeHUD} />

          {/* Lock Screen Overlay with AnimatePresence */}
          <AnimatePresence>
            {isLocked && (
              <LockScreen onUnlock={() => setIsLocked(false)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
