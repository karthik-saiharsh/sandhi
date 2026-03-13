export default function WaveformPanel() {
    return (
        <section className="w-full mb-16">
            <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">
                    2. Waveform Analysis
                </h2>
            </div>

            <div className="flex flex-col gap-12">

                {/* Original */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-medium text-[#F5F5F7]">Original Source</h3>
                        <span className="text-xs text-[#86868B] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-track bg-[#1C1C1E] rounded-xl border border-[#333336]">
                        {/* Placeholder waveform */}
                        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between opacity-30">
                            {[...Array(60)].map((_, i) => (
                                <div key={i} className="w-1 bg-[#86868B] rounded-full" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Degraded */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-medium text-[#F5F5F7]">Degraded (30% Loss)</h3>
                        <span className="text-xs text-[#86868B] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-track bg-[#1C1C1E] rounded-xl border border-[#333336]">
                        {/* Red overlapping blocks to simulate packet loss UI */}
                        <div className="absolute inset-0 waveform-loss-overlay z-10 flex items-center justify-center">
                            <span className="bg-[#0A0A0A] text-[#FF453A] px-3 py-1 rounded text-xs font-medium border border-[#FF453A]/30">Lost Packets Highlighted</span>
                        </div>
                        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between opacity-30">
                            {[...Array(60)].map((_, i) => (
                                <div key={i} className="w-1 bg-[#86868B] rounded-full" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reconstructed */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-medium text-[#2997FF] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            AI Reconstruction
                        </h3>
                        <span className="text-xs text-[#86868B] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-track bg-[#2997FF]/5 rounded-xl border border-[#2997FF]/20">
                        <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between opacity-50">
                            {[...Array(60)].map((_, i) => (
                                <div key={i} className="w-1 bg-[#2997FF] rounded-full" style={{ height: `${20 + Math.random() * 80}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 rounded-full border border-[#333336] hover:bg-[#1C1C1E] text-[#F5F5F7] text-sm font-semibold transition-colors disabled:opacity-50">
                    Download Quality
                </button>
                <button className="px-8 py-4 rounded-full bg-[#2997FF] hover:bg-[#147CE5] text-[#F5F5F7] text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Play Reconstructed
                </button>
            </div>
        </section>
    );
}
