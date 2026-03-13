export default function PipelineVisualizer() {
    return (
        <div className="w-full max-w-5xl mx-auto my-16 p-8 glass-card fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Node 1: Audio */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F4F6] shadow-lg relative z-10">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#F3F4F6] tracking-wide uppercase">Source Audio</span>
                </div>

                {/* Path 1 */}
                <div className="flex-1 w-full md:w-auto flex items-center shrink-0 min-w-[50px]">
                    <div className="anim-flow"></div>
                </div>

                {/* Node 2: Packet Loss */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] relative z-10">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-red-400 tracking-wide uppercase">Packet Loss</span>
                </div>

                {/* Path 2 */}
                <div className="flex-1 w-full md:w-auto flex items-center shrink-0 min-w-[50px]">
                    <div className="anim-flow"></div>
                </div>

                {/* Node 3: AI Model */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-[#6366F1]/20 border border-[#6366F1]/50 flex items-center justify-center text-[#22D3EE] shadow-[0_0_25px_rgba(99,102,241,0.3)] relative z-10 scale-110">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#6366F1] tracking-wide uppercase">Sandhi AI</span>
                </div>

                {/* Path 3 */}
                <div className="flex-1 w-full md:w-auto flex items-center shrink-0 min-w-[50px]">
                    <div className="anim-flow"></div>
                </div>

                {/* Node 4: Reconstructed */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.2)] relative z-10">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#22D3EE] tracking-wide uppercase">Reconstructed</span>
                </div>

            </div>
        </div>
    );
}
