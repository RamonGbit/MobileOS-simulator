/**
 * WallpaperContext
 * Global React context that exposes the active wallpaper and a setter
 * which persists the change via FileSystem (localStorage).
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { FileSystem, WallpaperEntry } from '../kernel/FileSystem';

interface WallpaperContextValue {
  wallpaper: WallpaperEntry;
  setWallpaper: (entry: WallpaperEntry) => void;
}

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallpaper, setWallpaperState] = useState<WallpaperEntry>(() => {
    return FileSystem.getSettings().wallpaper;
  });

  const setWallpaper = useCallback((entry: WallpaperEntry) => {
    setWallpaperState(entry);
    FileSystem.updateSettings({ wallpaper: entry });
  }, []);

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = (): WallpaperContextValue => {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error('useWallpaper must be used inside WallpaperProvider');
  return ctx;
};
