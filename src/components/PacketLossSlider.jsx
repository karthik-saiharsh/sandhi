import { useState } from 'react';

export default function PacketLossSlider({ onLossChange }) {
    const [lossTarget, setLossTarget] = useState(30);

    const handleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setLossTarget(val);
        if (onLossChange) onLossChange(val);
    };

    return (
        <section className="glass-card p-6">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-semibold text-[#F3F4F6]">
                    Packet Loss
                </h2>
                <span className="text-sm font-mono text-[#22D3EE] font-medium">{lossTarget}%</span>
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
                        background: `linear-gradient(to right, #6366F1 0%, #22D3EE ${lossTarget * 1.66}%, rgba(255, 255, 255, 0.1) ${lossTarget * 1.66}%, rgba(255, 255, 255, 0.1) 100%)`
                    }}
                />
            </div>
            <p className="text-xs text-[#9CA3AF] mt-4 leading-relaxed">
                Simulate real-world degradation. Model targets optimal reconstruction between 30-60%.
            </p>
        </section>
    );
}
