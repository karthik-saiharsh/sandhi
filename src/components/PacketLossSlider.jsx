import { useState } from 'react';

export default function PacketLossSlider({ onLossChange }) {
    const [lossTarget, setLossTarget] = useState(30);

    const handleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setLossTarget(val);
        if (onLossChange) onLossChange(val);
    };

    return (
        <section className="w-full mb-12">
            <div className="flex justify-between items-baseline mb-6">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">
                    Simulation Strictness
                </h2>
                <span className="text-xl font-medium text-[#2997FF]">{lossTarget}% Loss</span>
            </div>

            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={lossTarget}
                    onChange={handleChange}
                    style={{
                        background: `linear-gradient(to right, #2997FF 0%, #2997FF ${lossTarget * 1.66}%, #333336 ${lossTarget * 1.66}%, #333336 100%)`
                    }}
                />
            </div>
            <p className="text-sm text-[#86868B] mt-4 leading-relaxed">
                Adjust the packet drop rate to simulate varying degrees of network congestion.
            </p>
        </section>
    );
}
