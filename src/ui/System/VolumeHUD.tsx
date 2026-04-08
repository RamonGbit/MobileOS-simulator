import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface VolumeHUDProps {
  volume: number;
  isVisible: boolean;
}

const VolumeHUD: React.FC<VolumeHUDProps> = ({ volume, isVisible }) => {
  const getIcon = () => {
    if (volume === 0) return <VolumeX size={14} className="text-white/60" />;
    if (volume < 50) return <Volume1 size={14} className="text-white/90" />;
    return <Volume2 size={14} className="text-white/90" />;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute left-6 top-48 z-[100] w-1.5 h-32 bg-black/40 backdrop-blur-md rounded-full overflow-hidden border border-white/10"
        >
          {/* Progress Bar Container */}
          <div className="absolute inset-0 flex flex-col justify-end items-center py-2 space-y-2">
            
            {/* Volume Icon at the bottom */}
            <div className="z-10">{getIcon()}</div>

            {/* Background Track */}
            <div className="flex-1 w-full bg-white/10 relative">
              {/* Active level fill */}
              <motion.div
                initial={false}
                animate={{ height: `${volume}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute bottom-0 w-full bg-white opacity-90"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VolumeHUD;
