import React from 'react';
import { motion } from 'framer-motion';

interface PowerButtonProps {
  onPress: () => void;
}

const PowerButton: React.FC<PowerButtonProps> = ({ onPress }) => {
  return (
    <motion.button
      whileTap={{ x: -2, scaleY: 0.98 }}
      onClick={onPress}
      className="absolute top-48 -right-2.5 w-1.5 h-24 bg-gradient-to-l from-gray-700 to-black rounded-r-lg border-y border-r border-white/10 shadow-lg cursor-pointer hover:from-gray-600 transition-colors z-30"
      aria-label="Power Button"
      title="Lock Screen"
    />
  );
};

export default PowerButton;
