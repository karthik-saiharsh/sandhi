import { useState } from 'react';

export default function PacketLossControl({ onLossChange }) {
    const [lossTarget, setLossTarget] = useState(30);

    const handleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setLossTarget(val);
        if (onLossChange) onLossChange(val);
    };

    return (
        <section className="glass-card p-6">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-semibold text-[#E6EAF2]">
                    Packet Loss Level
                </h2>
                <span className="text-sm font-mono text-[#00D1FF] font-medium">{lossTarget}%</span>
            </div>

            <div className="slider-container mt-2">
                <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={lossTarget}
                    onChange={handleChange}
                    style={{
                        background: `linear-gradient(to right, #6C7CFF 0%, #00D1FF ${lossTarget * 1.66}%, rgba(108, 124, 255, 0.2) ${lossTarget * 1.66}%, rgba(108, 124, 255, 0.2) 100%)`
                    }}
                />
            </div>
            <p className="text-xs text-[#9CA3AF] mt-3">
                Simulate missing audio data. The model will attempt to reconstruct the lost regions.
            </p>
        </section>
    );
}
