import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="flex flex-col items-center text-center pt-24 pb-20 px-6 fade-up relative">
            <div className="title-glow mb-6">
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#F3F4F6]">
                    Sandhi
                </h1>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium text-[#22D3EE] mb-4">
                AI Reconstruction for Lost Speech Packets
            </h2>

            <p className="max-w-2xl text-lg md:text-xl text-[#9CA3AF] mb-10 leading-relaxed">
                Restore missing audio caused by network dropouts using state-of-the-art generative waveform models in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                    to="/demo"
                    className="px-8 py-3.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                >
                    Try Demo
                </Link>
                <button
                    className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[#F3F4F6] font-semibold text-lg transition-colors"
                >
                    View Architecture
                </button>
            </div>

            {/* Decorative Waveform Hero Graphic */}
            <div className="w-full max-w-4xl mt-20 h-32 flex items-center justify-center gap-1 opacity-40 fade-up fade-up-delay-2">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 md:w-2 bg-[#6366F1] rounded-full"
                        style={{
                            height: `${20 + Math.random() * 80}%`,
                            animation: `bar-pulse ${1 + Math.random()}s ease-in-out infinite`,
                            animationDelay: `${i * 0.05}s`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
