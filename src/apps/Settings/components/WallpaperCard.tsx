/**
 * WallpaperCard
 * Individual wallpaper preview tile in the gallery grid.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { WallpaperEntry } from '../../../kernel/FileSystem';

interface WallpaperCardProps {
  entry: WallpaperEntry;
  isSelected: boolean;
  onSelect: (entry: WallpaperEntry) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ entry, isSelected, onSelect }) => {
  return (
    <motion.button
      onClick={() => onSelect(entry)}
      whileTap={{ scale: 0.94 }}
      className="relative aspect-[9/16] rounded-xl overflow-hidden border-2 transition-all duration-200 focus:outline-none"
      style={{
        borderColor: isSelected ? '#007AFF' : 'rgba(255,255,255,0.08)',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(0,122,255,0.35), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 2px 10px rgba(0,0,0,0.4)',
      }}
    >
      {/* Wallpaper preview */}
      <div
        className="absolute inset-0"
        style={{ background: entry.value }}
      />

      {/* Subtle dark bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Selected checkmark badge */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="absolute bottom-2 right-2 w-6 h-6 bg-ios-blue rounded-full flex items-center justify-center shadow-lg"
        >
          <Check size={13} strokeWidth={3} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default WallpaperCard;
