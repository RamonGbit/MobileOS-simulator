/**
 * FileSystem Service
 * Simulates a JSON-based file system for Vercel-compatible persistence.
 * Uses localStorage as the backend.
 */

export interface WallpaperEntry {
  id: string;
  /** CSS value — either a gradient string or a hex/hsl color */
  value: string;
}

export interface SystemSettings {
  isWifiEnabled: boolean;
  bluetoothName: string;
  isBluetoothEnabled: boolean;
  ownerName: string;
  wallpaper: WallpaperEntry;
  security: {
    hasPassword: boolean;
    passcode: string | null;
  };
  deviceInfo: {
    model: string;
    version: string;
    kernel: string;
  };
}

const DEFAULT_SETTINGS: SystemSettings = {
  isWifiEnabled: true,
  bluetoothName: "MobileOS-Device",
  isBluetoothEnabled: false,
  ownerName: "User",
  wallpaper: {
    id: "default",
    value: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
  },
  security: {
    hasPassword: false,
    passcode: null,
  },
  deviceInfo: {
    model: "Pro Simulator 1.0",
    version: "1.0.0-alpha",
    kernel: "Vortex-Core-0.1",
  },
};

const SETTINGS_KEY = 'mobile_os_settings';

export const FileSystem = {
  /**
   * Reads the settings "JSON file".
   */
  getSettings(): SystemSettings {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) {
      this.saveSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
    try {
      const parsed = JSON.parse(saved) as Partial<SystemSettings>;
      // Deep-merge with defaults so newly added fields (e.g. wallpaper)
      // are always present even when localStorage has stale data.
      const merged: SystemSettings = {
        ...DEFAULT_SETTINGS,
        ...parsed,
        security: { ...DEFAULT_SETTINGS.security, ...(parsed.security ?? {}) },
        deviceInfo: { ...DEFAULT_SETTINGS.deviceInfo, ...(parsed.deviceInfo ?? {}) },
        wallpaper: parsed.wallpaper ?? DEFAULT_SETTINGS.wallpaper,
      };
      return merged;
    } catch (e) {
      console.error("Failed to parse settings JSON, resetting to defaults:", e);
      this.saveSettings(DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  },

  /**
   * Writes to the settings "JSON file".
   */
  saveSettings(settings: SystemSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  /**
   * Updates a specific section of the settings.
   */
  updateSettings(partial: Partial<SystemSettings>): SystemSettings {
    const current = this.getSettings();
    const updated = { ...current, ...partial };
    this.saveSettings(updated);
    return updated;
  }
};
