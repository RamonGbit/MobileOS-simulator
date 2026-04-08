import React from 'react';

interface SettingSectionProps {
  title?: string;
  children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8 px-4">
      {title && (
        <h2 className="px-1 mb-2 text-[13px] font-medium text-white/40 uppercase tracking-wider">
          {title}
        </h2>
      )}
      <div className="bg-white/5 backdrop-blur-md rounded-xl divide-y divide-white/10 overflow-hidden border border-white/5">
        {children}
      </div>
    </div>
  );
};

export default SettingSection;
