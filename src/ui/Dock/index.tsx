import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Settings, Globe } from 'lucide-react';

const DockItem = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md ${color} bg-opacity-80 transition-all duration-200 border border-white/20`}
  >
    <Icon size={30} className="text-white" strokeWidth={2.2} />
  </motion.div>
);

const Dock: React.FC = () => {
  const apps = [
    { icon: Phone, label: "Phone", color: "bg-ios-green" },
    { icon: MessageSquare, label: "Messages", color: "bg-ios-blue" },
    { icon: Globe, label: "Browser", color: "bg-ios-blue" },
    { icon: Settings, label: "Settings", color: "bg-ios-gray" },
  ];

  return (
    <div className="w-full flex justify-center pb-8 px-4 select-none">
      <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-xl p-3.5 rounded-mobile border border-white/30 shadow-2xl">
        {apps.map((app, index) => (
          <DockItem key={index} {...app} />
        ))}
      </div>
    </div>
  );
};

export default Dock;
