import { motion } from 'framer-motion';

export default function HowItWorks() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="w-full bg-[#0A0A0A] py-40 px-6 flex flex-col items-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#333336]/30 flex items-center justify-center text-[#F5F5F7] mb-8">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-4">1. Upload Audio</h3>
                    <p className="text-[#86868B] leading-relaxed max-w-xs">
                        Ingest lossless or lossy speech directly. The system normalizes and aligns phase automatically.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#333336]/30 flex items-center justify-center text-[#F5F5F7] mb-8">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-4">2. Simulate Packet Loss</h3>
                    <p className="text-[#86868B] leading-relaxed max-w-xs">
                        Drop randomized packets to simulate harsh real-world transmission environments.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#2997FF]/10 flex items-center justify-center text-[#2997FF] mb-8">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-4">3. AI Reconstructs</h3>
                    <p className="text-[#86868B] leading-relaxed max-w-xs">
                        The GAN architecture hallucinates missing harmonics perfectly integrated into the sequence.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
