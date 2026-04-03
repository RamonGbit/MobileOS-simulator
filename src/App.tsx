import React from 'react';
import StatusBar from './ui/StatusBar';
import Dock from './ui/Dock';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      {/* Mobile Device Frame */}
      <div className="relative w-[390px] h-[844px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-mobile shadow-2xl overflow-hidden border-[8px] border-black ring-4 ring-gray-800">
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />

        {/* System UI Layout */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Top: Status Bar */}
          <StatusBar />

          {/* Main: App Content (Empty for now) */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-xl text-white/90">
              Welcome to MobileOS
            </h1>
            <p className="mt-4 text-white/70 font-medium">
              Gestión de procesos y kernel modular.
            </p>
          </div>

          {/* Bottom: Floating Dock */}
          <Dock />

        </div>

        {/* Home Indicator (iPhone style) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/40 rounded-full z-20" />
      </div>
    </div>
  );
};

export default App;
