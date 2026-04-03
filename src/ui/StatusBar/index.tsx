import React, { useState, useEffect } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

const StatusBar: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="w-full h-12 flex items-center justify-between px-6 bg-transparent select-none">
            {/* Left side: Time */}
            <div className="text-sm font-semibold text-white drop-shadow-md">
                {formatTime(time)}
            </div>

            {/* Right side: Status Icons */}
            <div className="flex items-center space-x-2 text-white">
                <Signal size={16} strokeWidth={2.5} className="drop-shadow-md" />
                <Wifi size={16} strokeWidth={2.5} className="drop-shadow-md" />
                <div className="flex items-center space-x-1">
                    <span className="text-xs font-semibold drop-shadow-md">100%</span>
                    <Battery size={20} strokeWidth={2.5} className="rotate-0 drop-shadow-md" />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
