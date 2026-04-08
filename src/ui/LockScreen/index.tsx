import React, { useState, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence, useAnimation } from 'framer-motion';
import { Lock, Flashlight, Camera } from 'lucide-react';
import NumericPad from '../Keyboard/NumericPad';
import { FileSystem } from '../../kernel/FileSystem';
import { useWallpaper } from '../../contexts/WallpaperContext';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const { wallpaper } = useWallpaper();
  const [time, setTime] = useState(new Date());
  const [showKeypad, setShowKeypad] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (showKeypad) return; // Si el teclado está visible, no procesamos swipe
    if (info.offset.y < -150 || info.velocity.y < -500) {
      const settings = FileSystem.getSettings();
      if (settings.security.hasPassword) {
        setShowKeypad(true);
        // Hacemos que la pantalla regrese a 0 para mostrar el teclado correctamente
        controls.start({ y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } });
      } else {
        onUnlock();
      }
    } else {
      // Rebotamos si no deslizó lo suficiente
      controls.start({ y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } });
    }
  };

  const handlePinComplete = (pin: string) => {
    const settings = FileSystem.getSettings();
    if (pin === settings.security.passcode) {
      setErrorMessage(undefined);
      onUnlock();
    } else {
      setErrorMessage("Código incorrecto");
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={controls}
      exit={{ y: -844 }}
      drag={!showKeypad ? "y" : false}
      dragConstraints={{ top: -844, bottom: 0 }}
      dragElastic={0.05}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 z-50 flex flex-col items-center justify-between py-16 text-white select-none overflow-hidden touch-none"
      style={{
        background: wallpaper.value,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />

      <AnimatePresence mode="wait">
        {!showKeypad ? (
          <motion.div 
            key="lock-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-between py-16 w-full"
          >
            {/* Top Section */}
            <div className="relative z-10 flex flex-col items-center space-y-2 pt-12 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <Lock size={24} className="text-white/90 drop-shadow-md" />
              </motion.div>
              
              <div className="text-center">
                <motion.h1 
                  className="text-[96px] font-bold leading-tight tracking-tight drop-shadow-2xl"
                >
                  {formatTime(time)}
                </motion.h1>
                <motion.p className="text-xl font-medium text-white/90 capitalize drop-shadow-lg">
                  {formatDate(time)}
                </motion.p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 w-full px-12 pb-10 flex flex-col items-center space-y-12">
              <div className="w-full flex justify-between items-center">
                <button className="w-14 h-14 rounded-full bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl transition-all active:bg-black/40 group">
                  <Flashlight size={24} className="text-white group-active:text-yellow-400" />
                </button>
                <button className="w-14 h-14 rounded-full bg-black/25 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl transition-all active:bg-black/40 group">
                  <Camera size={24} className="text-white group-active:text-gray-300" />
                </button>
              </div>

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
          </motion.div>
        ) : (
          <motion.div
            key="lock-keypad"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 w-full"
          >
            <NumericPad 
              title="Introduce PIN"
              errorMessage={errorMessage}
              onComplete={handlePinComplete}
              onCancel={() => {
                setShowKeypad(false);
                setErrorMessage(undefined);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/30" />
    </motion.div>
  );
};

export default LockScreen;
