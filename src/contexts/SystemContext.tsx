import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { APP_REGISTRY, SYSTEM_CONFIG, AppConfig } from '../types/System';

interface SystemContextType {
    runningApps: AppConfig[];
    activeApp: string | null;
    isTaskSwitcherOpen: boolean;
    batteryLevel: number;
    usedMemoryMB: number;
    
    // Actions
    launchApp: (appId: string) => void;
    killApp: (appId: string) => void;
    goHome: () => void;
    toggleTaskSwitcher: (state?: boolean) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Current fully active application taking the screen
    const [activeApp, setActiveApp] = useState<string | null>(null);
    
    // Array of apps currently suspended in memory (including activeApp if any)
    const [runningAppIds, setRunningAppIds] = useState<string[]>([]);
    
    // Task Switcher overlay visibility
    const [isTaskSwitcherOpen, setIsTaskSwitcherOpen] = useState(false);
    
    // Battery and Memory states
    const [batteryLevel, setBatteryLevel] = useState(100);

    const getUsedMemory = (appIds: string[]) => {
        return appIds.reduce((acc, id) => {
            const config = APP_REGISTRY[id];
            return acc + (config ? config.memoryCost : 0);
        }, 0);
    };

    const usedMemoryMB = getUsedMemory(runningAppIds);

    const launchApp = useCallback((appId: string) => {
        const appToConfig = APP_REGISTRY[appId];
        if (!appToConfig) return;

        setRunningAppIds(prev => {
            // First check if already in memory
            if (prev.includes(appId)) {
                // Return same arr but move it to end (most recently used) so it doesn't get kicked out first
                 const filtered = prev.filter(id => id !== appId);
                 return [...filtered, appId];
            }

            let newApps = [...prev, appId];
            let memory = getUsedMemory(newApps);

            // While memory exceeds max, remove the oldest (least recently used) app at the beginning of the array
            while (memory > SYSTEM_CONFIG.TOTAL_RAM_MB && newApps.length > 1) {
                const killedApp = newApps.shift(); // Remove LRU (index 0)
                console.log(`[Kernel] Cierre por Out-Of-Memory en background: ${killedApp}`);
                memory = getUsedMemory(newApps);
            }

            return newApps;
        });

        // Set to active, implicitly closing switcher
        setActiveApp(appId);
        setIsTaskSwitcherOpen(false);
    }, []);

    const killApp = useCallback((appId: string) => {
        setRunningAppIds(prev => prev.filter(id => id !== appId));
        if (activeApp === appId) {
            setActiveApp(null);
        }
    }, [activeApp]);

    const goHome = useCallback(() => {
        setActiveApp(null);
        setIsTaskSwitcherOpen(false);
    }, []);

    const toggleTaskSwitcher = useCallback((state?: boolean) => {
        setIsTaskSwitcherOpen(prev => state !== undefined ? state : !prev);
    }, []);

    // Effect for battery drain simulation (1 "tick" every minute)
    useEffect(() => {
        const drainBattery = () => {
             setBatteryLevel(prev => {
                 if (prev <= 0) return 0;
                 
                 // Calculate drain based on running apps
                 let totalDrain = 0;
                 runningAppIds.forEach(id => {
                     if(APP_REGISTRY[id]) {
                          // Background apps drain less, but for this simulation let's just drain them their base price
                          // In a complex OS, we'd multiply by 0.1 for bg etc.
                          let drain = APP_REGISTRY[id].batteryDrain;
                          // If it's not the active app, it drains 20% of its normal rate
                          if(id !== activeApp) {
                              drain = drain * 0.2; 
                          }
                          totalDrain += drain;
                     }
                 });
                 
                 // Minimum idle OS drain
                 totalDrain += 0.05;

                 return Math.max(0, prev - totalDrain);
             });
        };

        // Every 3 seconds in demo time so the user can easily see it drop a little bit
        // For real-time, change to 60000 
        const intervalId = setInterval(drainBattery, 3000); 

        return () => clearInterval(intervalId);
    }, [runningAppIds, activeApp]);

    const runningApps = runningAppIds.map(id => APP_REGISTRY[id]).filter(Boolean) as AppConfig[];

    return (
        <SystemContext.Provider value={{
            runningApps,
            activeApp,
            isTaskSwitcherOpen,
            batteryLevel,
            usedMemoryMB,
            launchApp,
            killApp,
            goHome,
            toggleTaskSwitcher
        }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (context === undefined) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};
