export default function WaveformPanel() {
    return (
        <section className="glass-card p-6 h-full flex flex-col justify-between">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-[#E6EAF2]">Waveform Analysis</h2>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6C7CFF]"></span>
                    <span className="text-xs text-[#9CA3AF] uppercase tracking-widest font-mono">Ready</span>
                </div>
            </div>

            {/* Waveforms */}
            <div className="flex-1 flex flex-col justify-center space-y-10">

                {/* 1. Original Audio */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#E6EAF2] tracking-wide">Original Reference</h3>
                        <span className="text-xs text-[#9CA3AF] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-bg h-20 w-full flex items-center justify-center border border-[#E6EAF2]/10 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="w-1 bg-[#6C7CFF] rounded-full h-1"></div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <button className="text-[#9CA3AF] hover:text-[#00D1FF] transition-colors p-1" aria-label="Play original">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>

                {/* 2. Packet Loss Simulation */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#9CA3AF] tracking-wide">Degraded Source (Packet Loss)</h3>
                        <span className="text-xs text-[#9CA3AF] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-loss h-20 w-full flex items-center justify-center border border-red-500/20 rounded-lg overflow-hidden relative">
                        <span className="text-[#9CA3AF] text-xs font-mono z-10 opacity-60">Missing data regions highlighted in red</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <button className="text-[#9CA3AF] hover:text-red-400 transition-colors p-1" aria-label="Play degraded">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>

                {/* 3. Reconstructed Output */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#00D1FF] tracking-wide flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            Reconstructed Output
                        </h3>
                        <span className="text-xs text-[#9CA3AF] font-mono">00:00.00</span>
                    </div>
                    <div className="h-28 w-full flex items-center justify-center border border-[#00D1FF]/20 bg-[#00D1FF]/5 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-[0.15]">
                            {[...Array(40)].map((_, i) => (
                                <div key={i} className="waveform-bar bg-[#00D1FF]" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}></div>
                            ))}
                        </div>
                        <span className="text-[#00D1FF]/60 text-xs font-mono z-10 tracking-widest uppercase">Waiting for model...</span>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="mt-10 pt-6 border-t border-[#E6EAF2]/10 flex flex-col sm:flex-row justify-between items-center gap-4">

                <div className="flex items-center gap-3 text-sm text-[#00D1FF] opacity-0 transition-opacity">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    AI processing audio...
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-[#E6EAF2]/10 text-[#9CA3AF] hover:bg-[#E6EAF2]/5 hover:text-[#E6EAF2] transition-colors text-sm font-medium" disabled>
                        Download Quality
                    </button>
                    <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#6C7CFF]/10 border border-[#6C7CFF]/30 text-[#6C7CFF] cursor-not-allowed hover:bg-[#6C7CFF]/20 transition-all text-sm font-medium flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Play Reconstructed
                    </button>
                </div>
            </div>
        </section>
    );
}
