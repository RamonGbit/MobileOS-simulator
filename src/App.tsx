import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatusBar from './ui/StatusBar';
import Dock from './ui/Dock';
import LockScreen from './ui/LockScreen';
import SettingsApp from './apps/Settings';
import { PowerButton, VolumeButtons } from './ui/Hardware';
import { VolumeHUD } from './ui/System';
import { WallpaperProvider, useWallpaper } from './contexts/WallpaperContext';
import { SystemProvider, useSystem } from './contexts/SystemContext';
import TaskSwitcher from './ui/TaskSwitcher';


const AppContent: React.FC = () => {
  const { wallpaper } = useWallpaper();
  const { activeApp, toggleTaskSwitcher, goHome } = useSystem();
  
  const [isLocked, setIsLocked] = useState(true);
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [volume, setVolume] = useState(50);
  const [showVolumeHUD, setShowVolumeHUD] = useState(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const handlePowerButton = () => {
    if (isScreenOn) {
      setIsScreenOn(false);
      setIsLocked(true);
    } else {
      setIsScreenOn(true);
    }
  };


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
        <PowerButton onPress={handlePowerButton} />

        <VolumeButtons
          onVolumeUp={() => handleVolumeChange('up')}
          onVolumeDown={() => handleVolumeChange('down')}
        />

        {/* Mobile Device Frame */}
        <div
          className="relative w-[390px] h-[844px] rounded-mobile shadow-2xl overflow-hidden border-[8px] border-black ring-4 ring-gray-800"
          style={{ background: wallpaper.value }}
        >

          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />

          {/* System UI Layout */}
          <div className="relative z-10 h-full flex flex-col">
            
            {/* Global Status Bar (Always on top of apps) */}
            <div className="absolute top-0 left-0 right-0 z-[60] pointer-events-none">
              <StatusBar />
            </div>

            <AnimatePresence mode="wait">
              {!activeApp ? (
                /* Home Screen Layer */
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col pt-12"
                >
                  {/* Main Home Content */}
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
                    <h1 className="text-4xl font-bold tracking-tight drop-shadow-xl text-white/90">
                      Welcome to MobileOS
                    </h1>
                    <p className="mt-4 text-white/70 font-medium">
                      Gestión de procesos y kernel modular.
                    </p>
                  </div>

                  {/* Bottom: Floating Dock */}
                  <Dock />
                </motion.div>
              ) : (
                /* Full Screen App Layer */
                <motion.div
                  key={activeApp}
                  initial={{ y: 844, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 844, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 250 }}
                  className="absolute inset-0 z-40 bg-black"
                >
                  {/* We add top padding to the app to avoid status bar overlap if necessary */}
                  <div className="h-full pt-8">
                    {activeApp === 'Settings' && <SettingsApp onClose={() => goHome()} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* Home Indicator (iPhone style) */}
          <div className="absolute bottom-0 left-0 w-full h-8 z-50 flex items-center justify-center pointer-events-auto cursor-pointer group"
               onClick={() => goHome()}
               onDoubleClick={() => toggleTaskSwitcher()}
          >
              <div className="w-32 h-1.5 bg-white/40 group-hover:bg-white/70 transition-colors rounded-full" />
          </div>

          <TaskSwitcher />

          {/* Visual HUDs */}
          <VolumeHUD volume={volume} isVisible={showVolumeHUD} />

          {/* Lock Screen Overlay with AnimatePresence */}
          <AnimatePresence>
            {isLocked && isScreenOn && (
              <LockScreen onUnlock={() => setIsLocked(false)} />
            )}
          </AnimatePresence>

          {/* Sleep Screen Overlay */}
          <AnimatePresence>
            {!isScreenOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black z-[100] cursor-pointer"
                onClick={() => setIsScreenOn(true)}
              />
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <SystemProvider>
    <WallpaperProvider>
      <AppContent />
    </WallpaperProvider>
  </SystemProvider>
);

export default App;
