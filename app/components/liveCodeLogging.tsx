"use client"
import { useState, useEffect } from 'react';

const initialLogs = [
    { id: 1, text: "[11:10:24] POST /api/v1/auth 200 OK (342ms)", status: "normal" },
    { id: 2, text: "[11:10:24] GET /api/v1/user/me 200 OK (128ms)", status: "normal" },
    { id: 3, text: "[11:10:25] Connecting to PostgreSQL... Success", status: "success" },
    { id: 4, text: "[11:10:25] Prisma client ready", status: "normal" },
    { id: 5, text: "[11:10:26] Redis connection established", status: "normal" },
    { id: 6, text: "[11:10:26] Server running on port 8000", status: "normal" },
];

export default function LiveLogTerminal() {
    const [visibleLogs, setVisibleLogs] = useState<typeof initialLogs>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < initialLogs.length) {
            const timer = setTimeout(() => {
                setVisibleLogs((prev) => [...prev, initialLogs[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            }, 600); // Adjust speed of log streaming here (ms)
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        <div className="w-full rounded-xl bg-gray-950 border border-gray-800 font-mono text-xs shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-gray-800/60">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-gray-400 text-xs font-medium">system.log</div>
                <div className="flex items-center space-x-2 text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 space-y-2.5 min-h-[240px] flex flex-col justify-between">
                <div className="space-y-2">
                    {visibleLogs.map((log) => (
                        <div key={log.id} className="flex items-center space-x-2 text-emerald-400">
                            <span>{log.text.split('... ')[0]}</span>
                            {log.status === 'success' && (
                                <span className="text-emerald-400 font-semibold">... Success</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Prompt line & Live indicator */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-900 mt-4">
                    <div className="flex items-center space-x-2 text-emerald-400">
                        <span>&gt;_</span>
                        <span className="w-2 h-4 bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Live Logs</span>
                    </div>
                </div>
            </div>
        </div>
    );
}