import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MainView from './views/MainView';
import SecurityView from './views/SecurityView';
import WallpaperView from './views/WallpaperView';

interface SettingsAppProps {
  onClose: () => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('main');

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 390 : -390,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 390 : -390,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col h-full bg-[#000000] text-white">
      {/* App Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-30">
        <h1 className="text-lg font-semibold">Settings</h1>
        <button 
          onClick={onClose}
          className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* View Container */}
      <div className="flex-1 overflow-hidden flex flex-col pt-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {currentView === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="px-4 mb-2">
                <h1 className="text-3xl font-bold">Settings</h1>
              </div>
              <MainView onNavigate={(view) => setCurrentView(view)} />
            </motion.div>
          )}

          {currentView === 'security' && (
            <motion.div
              key="security"
              initial={{ x: 390 }}
              animate={{ x: 0 }}
              exit={{ x: 390 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-black pt-14 z-20"
            >
              <SecurityView onBack={() => setCurrentView('main')} />
            </motion.div>
          )}

          {currentView === 'wallpaper' && (
            <motion.div
              key="wallpaper"
              initial={{ x: 390 }}
              animate={{ x: 0 }}
              exit={{ x: 390 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-black pt-14 z-20"
            >
              <WallpaperView onBack={() => setCurrentView('main')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsApp;
