import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function WaveSurferTrack({ audioBase64, isProcessing, trackColor, progressColor, overlay }) {
    const containerRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        // We only initialize WaveSurfer when the container is finally rendered
        // meaning when we aren't loading and have audio.
        if (!containerRef.current) return;

        wsRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: trackColor,
            progressColor: progressColor,
            barWidth: 4,
            barRadius: 4,
            height: 60,
            cursorWidth: 0,
            interact: true,
            normalize: true,
        });

        return () => {
            wsRef.current?.destroy();
            wsRef.current = null;
        };
    }, [isProcessing, audioBase64, trackColor, progressColor]);

    useEffect(() => {
        if (wsRef.current && audioBase64) {
            wsRef.current.load(`data:audio/wav;base64,${audioBase64}`);
        }
    }, [audioBase64]);

    return (
        <div className="absolute inset-x-4 inset-y-0" onClick={() => wsRef.current?.playPause()}>
            {overlay}
            {isProcessing ? (
                <div className="w-full h-full flex items-center justify-between opacity-30 animate-pulse cursor-wait pointer-events-none">
                    {[...Array(60)].map((_, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ backgroundColor: trackColor, height: `${20 + Math.random() * 80}%` }}></div>
                    ))}
                </div>
            ) : (!audioBase64 ? (
                <div className="w-full h-full flex items-center justify-between opacity-30 pointer-events-none">
                    {[...Array(60)].map((_, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ backgroundColor: trackColor, height: `${20 + Math.random() * 80}%` }}></div>
                    ))}
                </div>
            ) : (
                <div ref={containerRef} className="w-full h-full flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
            ))}
        </div>
    );
}

export default function WaveformPanel({ audioFile, packetLoss, isProcessing, originalAudio, maskedAudio, reconstructedAudio }) {

    const playReconstructed = () => {
        if (reconstructedAudio) {
            const audio = new Audio(`data:audio/wav;base64,${reconstructedAudio}`);
            audio.play();
        }
    };

    return (
        <section className="w-full mb-16">
            <div className="flex justify-between items-baseline mb-8">
                <h2 className="text-xl font-semibold text-[#F5F5F7] flex items-center gap-3">
                    2. Waveform Analysis
                    {isProcessing && <span className="text-xs font-medium bg-[#2997FF]/20 text-[#2997FF] px-2 py-1 rounded animate-pulse">Running Inference...</span>}
                </h2>
            </div>

            <div className="flex flex-col gap-12">

                {/* Original */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-medium text-[#F5F5F7]">Original Source</h3>
                        <span className="text-xs text-[#86868B] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-track bg-[#1C1C1E] rounded-xl border border-[#333336] relative overflow-hidden">
                        <WaveSurferTrack
                            audioBase64={originalAudio}
                            isProcessing={isProcessing}
                            trackColor="#86868B"
                            progressColor="#F5F5F7"
                        />
                    </div>
                </div>

                {/* Degraded */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-medium text-[#F5F5F7]">Degraded ({packetLoss}% Loss)</h3>
                        <span className="text-xs text-[#86868B] font-mono">00:00.00</span>
                    </div>
                    <div className="waveform-track bg-[#1C1C1E] rounded-xl border border-[#333336] relative overflow-hidden">
                        <WaveSurferTrack
                            audioBase64={maskedAudio}
                            isProcessing={isProcessing}
                            trackColor="#86868B"
                            progressColor="#F5F5F7"
                            overlay={
                                <div className="absolute inset-x-0 inset-y-0 waveform-loss-overlay z-10 flex items-center justify-center pointer-events-none">
                                    <span className="bg-[#0A0A0A] text-[#FF453A] px-3 py-1 rounded text-xs font-medium border border-[#FF453A]/30">Lost Packets Highlighted</span>
                                </div>
                            }
                        />
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
                    <div className="waveform-track bg-[#2997FF]/5 rounded-xl border border-[#2997FF]/20 relative overflow-hidden">
                        <WaveSurferTrack
                            audioBase64={reconstructedAudio}
                            isProcessing={isProcessing}
                            trackColor="#2997FF"
                            progressColor="#60A5FA"
                        />
                    </div>
                </div>

            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <button
                    disabled={!reconstructedAudio || isProcessing}
                    className="px-8 py-4 rounded-full border border-[#333336] hover:bg-[#1C1C1E] text-[#F5F5F7] text-sm font-semibold transition-colors disabled:opacity-50"
                >
                    Download Quality
                </button>
                <button
                    onClick={playReconstructed}
                    disabled={!reconstructedAudio || isProcessing}
                    className="px-8 py-4 rounded-full bg-[#2997FF] hover:bg-[#147CE5] text-[#F5F5F7] text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Play Reconstructed
                </button>
            </div>
        </section>
    );
}
