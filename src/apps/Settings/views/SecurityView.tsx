import React from 'react';
import { ChevronLeft } from 'lucide-react';
import SettingSection from '../components/SettingSection';
import SettingRow from '../components/SettingRow';
import { FileSystem } from '../../../kernel/FileSystem';

interface SecurityViewProps {
  onBack: () => void;
}

const SecurityView: React.FC<SecurityViewProps> = ({ onBack }) => {
  const settings = FileSystem.getSettings();

  return (
    <div className="flex-1 overflow-y-auto pb-20 pt-4">
      <div className="px-4 mb-4 flex items-center">
        <button onClick={onBack} className="flex items-center text-ios-blue space-x-1">
          <ChevronLeft size={24} />
          <span className="text-[17px]">Settings</span>
        </button>
      </div>

      <div className="px-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Security</h1>
      </div>

      <SettingSection title="Passcode">
        <SettingRow 
          icon={() => <div className="text-[10px] font-bold">123</div>} 
          label="Turn Passcode On" 
          iconColor="bg-ios-blue"
          onClick={() => alert("Password implementation coming soon...")}
        />
      </SettingSection>

      <div className="px-6 text-[13px] text-white/40">
        A passcode protects your data and allows you to use Face ID or Touch ID.
      </div>
    </div>
  );
};

export default SecurityView;
