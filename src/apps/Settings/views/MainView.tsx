import React from 'react';
import { Wifi, Bluetooth, Lock, Info, User, ShieldCheck, Image, Cpu, HardDrive } from 'lucide-react';
import SettingRow from '../components/SettingRow';
import SettingSection from '../components/SettingSection';
import { FileSystem } from '../../../kernel/FileSystem';
import { useSystem } from '../../../contexts/SystemContext';
import { SYSTEM_CONFIG } from '../../../types/System';

interface MainViewProps {
  onNavigate: (view: string) => void;
}

const MainView: React.FC<MainViewProps> = ({ onNavigate }) => {
  const settings = FileSystem.getSettings();
  const { usedMemoryMB } = useSystem();

  return (
    <div className="flex-1 overflow-y-auto pb-20 pt-4 custom-scrollbar">
      {/* Search Bar - Visual only */}
      <div className="px-4 mb-6">
        <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center space-x-2 text-white/30">
          <span className="text-[17px]">Search</span>
        </div>
      </div>

      {/* Profile Section */}
      <SettingSection>
        <SettingRow 
          icon={User} 
          label={settings.ownerName} 
          value="Apple ID, iCloud+" 
          iconColor="bg-ios-gray"
        />
      </SettingSection>

      {/* Connectivity Section */}
      <SettingSection>
        <SettingRow 
          icon={Wifi} 
          label="Wi-Fi" 
          value={settings.isWifiEnabled ? "Home-Network" : "Off"} 
          iconColor="bg-ios-blue"
        />
        <SettingRow 
          icon={Bluetooth} 
          label="Bluetooth" 
          value={settings.isBluetoothEnabled ? "On" : "Off"} 
          iconColor="bg-ios-blue"
        />
      </SettingSection>

      {/* Personalización Section */}
      <SettingSection title="Personalización">
        <SettingRow
          icon={Image}
          label="Wallpaper"
          iconColor="bg-ios-blue"
          onClick={() => onNavigate('wallpaper')}
        />
      </SettingSection>

      {/* Security Section */}
      <SettingSection title="Seguridad">
        <SettingRow 
          icon={Lock} 
          label="Face ID & Passcode" 
          iconColor="bg-ios-blue"
          onClick={() => onNavigate('security')}
        />
        <SettingRow 
          icon={ShieldCheck} 
          label="Privacy & Security" 
          iconColor="bg-ios-blue"
        />
      </SettingSection>

      {/* System Section */}
      <SettingSection title="System Resources">
        <SettingRow 
          icon={Cpu} 
          label="RAM" 
          value={`${usedMemoryMB} MB / ${SYSTEM_CONFIG.TOTAL_RAM_MB} MB`}
          iconColor="bg-ios-gray"
        />
        <SettingRow 
          icon={HardDrive} 
          label="Storage" 
          value={`14.2 GB / ${SYSTEM_CONFIG.TOTAL_STORAGE_GB} GB`}
          iconColor="bg-ios-gray"
        />
        <SettingRow 
          icon={Info} 
          label="About Simulator" 
          iconColor="bg-ios-blue"
          onClick={() => onNavigate('about')}
        />
      </SettingSection>
    </div>
  );
};

export default MainView;
