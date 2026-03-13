export default function ModelSpecs() {
    return (
        <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-[#F3F4F6] mb-5">
                Model Specs
            </h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-[#9CA3AF] text-sm">Architecture</span>
                    <span className="bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] rounded-full px-2.5 py-0.5 text-xs font-mono">GAN + U-Net</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-[#9CA3AF] text-sm">Sample Rate</span>
                    <span className="text-[#F3F4F6] text-sm font-medium">22.05 kHz</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="text-[#9CA3AF] text-sm">Mask Target</span>
                    <span className="text-[#F3F4F6] text-sm font-medium">30–60%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#9CA3AF] text-sm">Deployment</span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse"></div>
                        <span className="text-[#F3F4F6] text-sm">Inference API</span>
                    </span>
                </div>
            </div>
        </section>
    );
}
