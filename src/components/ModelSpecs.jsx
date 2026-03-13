export default function ModelSpecs() {
    return (
        <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-[#E6EAF2] mb-5">
                Model Specs
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E6EAF2]/10">
                    <span className="text-[#9CA3AF] text-sm">Architecture</span>
                    <span className="tag-pill bg-[#6C7CFF]/10 text-[#6C7CFF] border-[#6C7CFF]/20">GAN + U-Net</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#E6EAF2]/10">
                    <span className="text-[#9CA3AF] text-sm">Sample Rate</span>
                    <span className="text-[#E6EAF2] text-sm font-medium">22.05 kHz</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#E6EAF2]/10">
                    <span className="text-[#9CA3AF] text-sm">Packet Loss Target</span>
                    <span className="text-[#E6EAF2] text-sm font-medium">30–60%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9CA3AF] text-sm">Inference Device</span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse"></div>
                        <span className="text-[#E6EAF2] text-sm">Server GPU</span>
                    </span>
                </div>
            </div>
        </section>
    );
}
