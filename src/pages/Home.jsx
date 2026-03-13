import { useState } from 'react';
import AudioUploader from '../components/AudioUploader';

export default function Home() {
    const [audioFile, setAudioFile] = useState(null);

    const handleAudioLoad = (data) => {
        setAudioFile(data);
        console.log("Audio loaded:", data.name);
    };

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col items-center pt-24 pb-12 px-6">

            {/* ── Background Elements ──────────────────────────────── */}
            <div className="glow-orb-1"></div>
            <div className="glow-orb-2"></div>

            {/* ── Header Section ───────────────────────────────────── */}
            <header className="z-10 text-center mb-16 fade-up">
                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
                    <span className="shimmer-text">Sandhi</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-slate-300 mb-2">
                    Generative Waveform Reconstruction for Lossy Audio
                </p>
                <p className="max-w-2xl mx-auto text-slate-400">
                    Upload a speech sample and visualize how AI reconstructs missing audio packets in real-time.
                </p>
            </header>

            {/* ── Main Content Area (Layout) ───────────────────────── */}
            <main className="z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 fade-up fade-up-delay-1">

                {/* Left Column (Upload & Model Info) */}
                <div className="flex flex-col gap-8 lg:col-span-1">

                    {/* 1. Audio Upload Section */}
                    <section className="glass-card p-6 flex flex-col items-center justify-center text-center">
                        <h2 className="text-lg font-semibold text-slate-200 mb-4 self-start">
                            Input Source
                        </h2>
                        <AudioUploader onAudioLoaded={handleAudioLoad} />
                        <div className="w-full flex items-center gap-4 text-sm text-slate-400">
                            <span className="h-px bg-slate-700/50 flex-1"></span>
                            Or use demo
                            <span className="h-px bg-slate-700/50 flex-1"></span>
                        </div>
                    </section>

                    {/* 3. Model Information Panel */}
                    <section className="glass-card p-6">
                        <h2 className="text-lg font-semibold text-slate-200 mb-4">
                            Model Specs
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                                <span className="text-slate-400 text-sm">Architecture</span>
                                <span className="tag-pill">Hifi-GAN Vocoder</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                                <span className="text-slate-400 text-sm">Sample Rate</span>
                                <span className="text-slate-200 text-sm font-medium">22.05 kHz</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                                <span className="text-slate-400 text-sm">Packet Loss Target</span>
                                <span className="text-slate-200 text-sm font-medium">30% - 60%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Inference Device</span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span className="text-slate-200 text-sm">Server GPU</span>
                                </span>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column (Waveforms) */}
                <div className="lg:col-span-2">
                    {/* 2. Waveform Visualization Section */}
                    <section className="glass-card p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-semibold text-slate-200">
                                Waveform Analysis
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Ready</span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-12">

                            {/* Original Audio Placeholder */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-sm font-medium text-slate-300">Original / Degraded Source</h3>
                                    <span className="text-xs text-slate-500">00:00.00</span>
                                </div>
                                <div className="waveform-bg h-24 w-full flex items-center justify-center border border-slate-800 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                                        {/* Decorative bars indicating empty state */}
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="w-1 bg-indigo-400 rounded-full h-1"></div>
                                        ))}
                                    </div>
                                    <span className="text-slate-600 text-sm font-mono z-10">Waiting for audio...</span>
                                </div>
                            </div>

                            {/* Reconstructed Audio Placeholder */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        Reconstructed Output
                                    </h3>
                                    <span className="text-xs text-slate-500">00:00.00</span>
                                </div>
                                <div className="h-32 w-full flex items-center justify-center border border-indigo-900/30 bg-indigo-950/20 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-10">
                                        {/* Animated placeholder bars */}
                                        {[...Array(40)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="waveform-bar bg-indigo-500"
                                                style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="text-indigo-800/60 text-sm font-mono z-10">AI processing inactive</span>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium" disabled>
                                Download Full Quality
                            </button>
                            <button className="px-5 py-2.5 rounded-lg bg-indigo-600/50 text-indigo-200 cursor-not-allowed text-sm font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Play Reconstructed
                            </button>
                        </div>
                    </section>
                </div>

            </main>
        </div>
    )
}
