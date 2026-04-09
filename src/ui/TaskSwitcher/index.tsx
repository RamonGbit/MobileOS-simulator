import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '../../contexts/SystemContext';

const TaskSwitcher: React.FC = () => {
    const { runningApps, isTaskSwitcherOpen, launchApp, killApp, toggleTaskSwitcher } = useSystem();

    return (
        <AnimatePresence>
            {isTaskSwitcherOpen && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-50 bg-black/60 flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-8"
                    // Clicking the empty space closes the Task Switcher
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            toggleTaskSwitcher(false);
                        }
                    }}
                >
                    {runningApps.length === 0 ? (
                        <div className="w-full text-center text-white/50 font-medium">
                            No Recent Apps
                        </div>
                    ) : (
                        <div className="flex gap-4 items-center h-full pt-16 pb-32">
                            <AnimatePresence>
                                {runningApps.map((app) => (
                                    <motion.div
                                        key={app.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -200 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="snap-center shrink-0 flex flex-col items-center gap-4"
                                    >
                                        <div className="text-white font-medium drop-shadow-md flex items-center gap-2">
                                            <div className={`p-1 rounded-md ${app.color} inline-flex`}>
                                                <app.icon size={16} className="text-white" />
                                            </div>
                                            {app.name}
                                        </div>

                                        <motion.div
                                            drag="y"
                                            dragConstraints={{ top: -200, bottom: 0 }}
                                            dragElastic={0.5}
                                            onDragEnd={(e, info) => {
                                                if (info.offset.y < -100 || info.velocity.y < -500) {
                                                    killApp(app.id);
                                                }
                                            }}
                                            onClick={() => launchApp(app.id)}
                                            className="w-[200px] h-[400px] bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-2xl relative cursor-pointer border-2 border-white/10"
                                        >
                                            {/* App Snapshot Placeholder */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-black/50">
                                                <app.icon size={48} className="text-white/20" />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskSwitcher;
