import React from 'react';
import { motion } from 'framer-motion';

interface VolumeButtonsProps {
  onVolumeUp: () => void;
  onVolumeDown: () => void;
}

const VolumeButtons: React.FC<VolumeButtonsProps> = ({ onVolumeUp, onVolumeDown }) => {
  return (
    <div className="absolute top-32 -left-2.5 flex flex-col space-y-4">
      {/* Volume Up */}
      <motion.button
        whileTap={{ x: 2, scaleY: 0.98 }}
        onClick={onVolumeUp}
        className="w-1.5 h-16 bg-gradient-to-r from-gray-700 to-black rounded-l-lg border-y border-l border-white/10 shadow-lg cursor-pointer hover:from-gray-600 transition-colors z-30"
        aria-label="Volume Up"
        title="Volume Up"
      />
      
      {/* Volume Down */}
      <motion.button
        whileTap={{ x: 2, scaleY: 0.98 }}
        onClick={onVolumeDown}
        className="w-1.5 h-16 bg-gradient-to-r from-gray-700 to-black rounded-l-lg border-y border-l border-white/10 shadow-lg cursor-pointer hover:from-gray-600 transition-colors z-30"
        aria-label="Volume Down"
        title="Volume Down"
      />
    </div>
  );
};

export default VolumeButtons;
