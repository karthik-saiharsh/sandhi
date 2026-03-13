export default function Header() {
    return (
        <header className="z-10 text-center mb-12 fade-up" style={{ paddingBottom: '48px' }}>
            <div className="title-glow">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                    <span className="shimmer-text">Sandhi</span>
                </h1>
            </div>
            <p className="text-lg md:text-xl font-medium text-[#E6EAF2] mb-3">
                Generative Waveform Reconstruction for Lossy Audio
            </p>
            <p className="max-w-2xl mx-auto text-[#9CA3AF] text-sm md:text-base leading-relaxed">
                Upload a speech sample and visualize how AI reconstructs missing audio packets in real time.
            </p>
        </header>
    );
}
