/**
 * WallpaperView
 * Full-screen settings sub-view for browsing and selecting wallpapers.
 * Wallpapers are defined as CSS gradient/color values — zero external assets needed.
 */
import React from 'react';
import { ChevronLeft, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import WallpaperCard from '../components/WallpaperCard';
import { useWallpaper } from '../../../contexts/WallpaperContext';
import type { WallpaperEntry } from '../../../kernel/FileSystem';

// ─── Wallpaper Catalogue ────────────────────────────────────────────────────

const WALLPAPER_CATALOGUE: { category: string; items: WallpaperEntry[] }[] = [
  {
    category: 'Gradientes',
    items: [
      {
        id: 'default',
        value: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      },
      {
        id: 'aurora',
        value: 'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      },
      {
        id: 'sunset',
        value: 'linear-gradient(160deg, #f83600 0%, #f9d423 100%)',
      },
      {
        id: 'ocean',
        value: 'linear-gradient(160deg, #0052d4 0%, #65c7f7 50%, #9cecfb 100%)',
      },
      {
        id: 'forest',
        value: 'linear-gradient(160deg, #134e5e 0%, #71b280 100%)',
      },
      {
        id: 'candy',
        value: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      },
      {
        id: 'midnight',
        value: 'linear-gradient(160deg, #232526 0%, #414345 100%)',
      },
      {
        id: 'peachy',
        value: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      },
    ],
  },
  {
    category: 'Oscuros',
    items: [
      {
        id: 'dark-void',
        value: 'radial-gradient(ellipse at top, #1a1a2e 0%, #000000 100%)',
      },
      {
        id: 'dark-nebula',
        value: 'radial-gradient(ellipse at bottom, #0d0d1a 0%, #1a0533 60%, #000000 100%)',
      },
      {
        id: 'dark-ember',
        value: 'radial-gradient(ellipse at center, #1f0000 0%, #3d0000 50%, #000000 100%)',
      },
      {
        id: 'dark-abyss',
        value: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #111111 100%)',
      },
    ],
  },
  {
    category: 'Dinámicos',
    items: [
      {
        id: 'cosmic',
        value: 'conic-gradient(from 135deg at 50% 60%, #312e81, #7c3aed, #db2777, #ea580c, #312e81)',
      },
      {
        id: 'prism',
        value: 'conic-gradient(from 90deg at 50% 50%, #06b6d4, #6366f1, #ec4899, #f59e0b, #06b6d4)',
      },
      {
        id: 'aurora-borealis',
        value: 'linear-gradient(160deg, #004d40 0%, #00695c 25%, #1a237e 70%, #311b92 100%)',
      },
      {
        id: 'lava',
        value: 'radial-gradient(ellipse at bottom, #b71c1c 0%, #4a0000 50%, #1a0000 100%)',
      },
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface WallpaperViewProps {
  onBack: () => void;
}

const WallpaperView: React.FC<WallpaperViewProps> = ({ onBack }) => {
  const { wallpaper, setWallpaper } = useWallpaper();

  return (
    <div className="flex-1 overflow-y-auto pb-20 pt-4 custom-scrollbar">
      {/* Back nav */}
      <div className="px-4 mb-4 flex items-center">
        <button onClick={onBack} className="flex items-center text-ios-blue space-x-1">
          <ChevronLeft size={24} />
          <span className="text-[17px]">Settings</span>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Wallpaper</h1>
      </div>

      {/* Live Preview */}
      <div className="px-4 mb-8">
        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <motion.div
            key={wallpaper.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{ background: wallpaper.value }}
          />
          {/* Mini phone chrome overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-white/70">
            <Image size={14} />
            <span className="text-xs font-medium tracking-wide">Vista previa en vivo</span>
          </div>
        </div>
      </div>

      {/* Gallery by category */}
      {WALLPAPER_CATALOGUE.map((section) => (
        <div key={section.category} className="mb-8 px-4">
          <h2 className="text-[13px] font-medium text-white/40 uppercase tracking-wider mb-3 px-1">
            {section.category}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {section.items.map((entry) => (
              <WallpaperCard
                key={entry.id}
                entry={entry}
                isSelected={wallpaper.id === entry.id}
                onSelect={setWallpaper}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WallpaperView;
