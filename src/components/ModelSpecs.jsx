export default function ModelSpecs() {
    return (
        <div className="w-full flex flex-col sm:flex-row gap-6 mt-8 mb-16 pt-8 border-t border-[#333336]">
            <div className="flex-1">
                <span className="block text-xs text-[#86868B] font-mono uppercase tracking-wider mb-1">Architecture</span>
                <span className="text-[#F5F5F7] font-medium text-sm">GAN + U-Net</span>
            </div>
            <div className="flex-1">
                <span className="block text-xs text-[#86868B] font-mono uppercase tracking-wider mb-1">Sample Rate</span>
                <span className="text-[#F5F5F7] font-medium text-sm">22.05 kHz</span>
            </div>
            <div className="flex-1">
                <span className="block text-xs text-[#86868B] font-mono uppercase tracking-wider mb-1">Status</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#34C759]"></div>
                    <span className="text-[#F5F5F7] font-medium text-sm">Ready</span>
                </div>
            </div>
        </div>
    );
}
