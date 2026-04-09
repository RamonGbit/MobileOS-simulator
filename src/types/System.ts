import { Phone, MessageSquare, Settings, Globe, LucideIcon } from 'lucide-react';
import React from 'react';

export interface AppConfig {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
    memoryCost: number; // in MB
    batteryDrain: number; // % drain per minute when active
}

// System Constants mock out physical bounds of the hardware OS
export const SYSTEM_CONFIG = {
    TOTAL_RAM_MB: 8192, // 8 GB
    TOTAL_STORAGE_GB: 256,
}

// The apps that exist on the System Image
export const APP_REGISTRY: Record<string, AppConfig> = {
    'Phone': { id: 'Phone', name: 'Phone', icon: Phone, color: 'bg-ios-green', memoryCost: 150, batteryDrain: 0.02 },
    'Messages': { id: 'Messages', name: 'Messages', icon: MessageSquare, color: 'bg-ios-blue', memoryCost: 200, batteryDrain: 0.05 },
    'Browser': { id: 'Browser', name: 'Browser', icon: Globe, color: 'bg-ios-blue', memoryCost: 800, batteryDrain: 0.2 },
    'Settings': { id: 'Settings', name: 'Settings', icon: Settings, color: 'bg-ios-gray', memoryCost: 300, batteryDrain: 0.1 },
};
