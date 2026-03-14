import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="hero-gradient"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="z-10 flex flex-col items-center text-center px-6 max-w-5xl"
            >
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-[#F5F5F7] mb-6">
                    Sandhi
                </h1>

                <h2 className="text-2xl md:text-4xl font-semibold text-[#F5F5F7] mb-6 tracking-tight">
                    AI Reconstruction for <br className="md:hidden" /> Lost Speech Packets
                </h2>

                <p className="max-w-3xl text-xl md:text-2xl text-[#86868B] mb-12 font-medium leading-relaxed">
                    Restore missing speech caused by network dropouts using generative waveform models.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link
                        to="/demo"
                        className="px-8 py-4 rounded-full bg-[#F5F5F7] text-[#0A0A0A] font-semibold text-lg hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                        Try Demo
                    </Link>
                    <Link
                        to="/architecture"
                        className="px-8 py-4 rounded-full bg-transparent border border-[#F5F5F7]/20 text-[#F5F5F7] font-medium text-lg hover:border-[#F5F5F7]/40 transition-colors"
                    >
                        View Architecture
                    </Link>
                </div>
            </motion.div>

            {/* ── Minimal Animated Waveform ──────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="absolute bottom-16 h-24 w-full flex justify-center items-end gap-[3px] opacity-40 px-6 overflow-hidden"
            >
                {[...Array(120)].map((_, i) => (
                    <div
                        key={i}
                        className="wave-bar"
                        style={{
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: `${1.2 + Math.random()}s`
                        }}
                    />
                ))}
            </motion.div>
        </section>
    );
}
