import React, { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Lock, Flashlight, Camera } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    // We use ES-ES locale as requested by the user's language
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If swiped up significantly
    if (info.offset.y < -150 || info.velocity.y < -500) {
      onUnlock();
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: -844 }}
      drag="y"
      dragConstraints={{ top: -844, bottom: 0 }}
      dragElastic={0.05}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 z-50 flex flex-col items-center justify-between py-16 text-white select-none overflow-hidden touch-none"
      style={{
        backgroundImage: 'url("/src/assets/wallpapers/lockscreen.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      {/* Top Section: Lock Icon & Time */}
      <div className="relative z-10 flex flex-col items-center space-y-2 pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-4"
        >
          <Lock size={24} className="text-white/90 drop-shadow-md" />
        </motion.div>
        
        <div className="text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[96px] font-bold leading-tight tracking-tight drop-shadow-2xl"
          >
            {formatTime(time)}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium text-white/90 capitalize drop-shadow-lg"
          >
            {formatDate(time)}
          </motion.p>
        </div>
      </div>

      {/* Bottom Section: Quick Actions & Instructions */}
      <div className="relative z-10 w-full px-12 pb-10 flex flex-col items-center space-y-12">
        {/* Quick Actions */}
        <div className="w-full flex justify-between items-center">
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-14 h-14 rounded-full bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl transition-all hover:bg-black/40 group"
          >
            <Flashlight size={24} className="text-white group-hover:text-yellow-400 transition-colors" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-14 h-14 rounded-full bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl transition-all hover:bg-black/40 group"
          >
            <Camera size={24} className="text-white group-hover:text-gray-300 transition-colors" />
          </motion.button>
        </div>

        {/* Unlock Indicator */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="w-16 h-1.5 bg-white/40 rounded-full shadow-inner" />
          <p className="text-[13px] font-bold tracking-[0.2em] text-white/60 uppercase drop-shadow-md">
            Desliza para desbloquear
          </p>
        </motion.div>
      </div>

      {/* Subtle depth lighting */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/30" />
    </motion.div>
  );
};

export { default as PowerButton } from './PowerButton';
export default LockScreen;
