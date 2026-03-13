export default function WaveformPanel() {
    return (
        <section className="glass-card p-8 h-full flex flex-col justify-between">

            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h2 className="text-xl font-semibold text-[#F3F4F6]">Waveform Analysis</h2>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"></span>
                    <span className="text-xs text-[#22D3EE] uppercase tracking-widest font-mono font-medium">Model Ready</span>
                </div>
            </div>

            {/* Waveforms */}
            <div className="flex-1 flex flex-col justify-center space-y-12">

                {/* 1. Original Audio */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#F3F4F6] tracking-wide">Original Reference</h3>
                        <span className="text-xs text-[#9CA3AF] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-bg h-20 w-full flex items-center justify-center border border-white/5 rounded-lg overflow-hidden relative group cursor-pointer hover:border-white/20 transition-colors">
                        <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-30">
                            {[...Array(40)].map((_, i) => (
                                <div key={i} className="w-1 bg-[#6366F1] rounded-full" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <button className="text-[#9CA3AF] hover:text-[#22D3EE] transition-colors p-1" aria-label="Play original">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>

                {/* 2. Packet Loss Simulation */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#9CA3AF] tracking-wide">Degraded Source (Masked)</h3>
                        <span className="text-xs text-red-400 font-mono">-30.0% Loss</span>
                    </div>
                    <div className="waveform-loss h-20 w-full flex items-center justify-center border border-red-500/10 rounded-lg overflow-hidden relative group cursor-pointer hover:border-red-500/30 transition-colors">
                        <span className="text-red-400 text-xs font-mono z-10 opacity-80 bg-[#0A0F1E]/50 px-3 py-1 rounded backdrop-blur-sm border border-red-500/20">Missing Regions</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <button className="text-[#9CA3AF] hover:text-red-400 transition-colors p-1" aria-label="Play degraded">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </div>

                {/* 3. Reconstructed Output */}
                <div>
                    <div className="flex justify-between items-end mb-3">
                        <h3 className="text-sm font-medium text-[#22D3EE] tracking-wide flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            AI Reconstructed Output
                        </h3>
                        <span className="text-xs text-[#9CA3AF] font-mono">00:00.00</span>
                    </div>
                    <div className="h-28 w-full flex items-center justify-center border border-[#22D3EE]/20 bg-[#22D3EE]/5 rounded-lg overflow-hidden relative group cursor-pointer hover:border-[#22D3EE]/50 transition-colors shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
                        <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-[0.25]">
                            {[...Array(60)].map((_, i) => (
                                <div key={i} className="waveform-bar bg-[#22D3EE]" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}></div>
                            ))}
                        </div>
                        <span className="text-[#22D3EE] text-xs font-mono z-10 tracking-widest uppercase bg-[#0A0F1E]/50 px-4 py-2 rounded border border-[#22D3EE]/20 backdrop-blur-md">Waiting for model...</span>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">

                <div className="flex items-center gap-3 text-sm text-[#22D3EE] opacity-0 transition-opacity">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Inferring lost packets...
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-white/10 text-[#9CA3AF] hover:bg-white/5 hover:text-[#F3F4F6] transition-colors text-sm font-semibold shadow-sm" disabled>
                        Download Quality
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1] cursor-not-allowed hover:bg-[#6366F1]/20 transition-all text-sm font-bold flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Play Reconstructed
                    </button>
                </div>
            </div>
        </section>
    );
}
