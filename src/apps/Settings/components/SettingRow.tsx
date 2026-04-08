import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingRowProps {
  icon: any;
  label: string;
  value?: string;
  iconColor?: string;
  onClick?: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon: Icon, label, value, iconColor = "bg-ios-gray", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between px-4 py-3 active:bg-white/10 transition-colors cursor-pointer group"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-7 h-7 ${iconColor} rounded-md flex items-center justify-center text-white`}>
          <Icon size={18} />
        </div>
        <span className="text-[17px] font-medium text-white/90">{label}</span>
      </div>
      <div className="flex items-center space-x-2 text-white/40">
        {value && <span className="text-[17px]">{value}</span>}
        <ChevronRight size={20} className="text-white/20 group-active:text-white/40" />
      </div>
    </div>
  );
};

export default SettingRow;
