import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

export default function Architecture() {
    return (
        <div className="w-full bg-[#000000] flex flex-col items-center pt-24 pb-32 overflow-hidden selection:bg-[#2997FF] selection:text-white">

            {/* Hero Section */}
            <section className="w-full max-w-7xl px-6 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <span className="text-[#2997FF] font-semibold tracking-widest uppercase text-sm mb-4 block">Inside The Engine</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-[#F5F5F7] tracking-tighter mb-6 leading-tight">
                        Architecture <br className="hidden md:block" />& Flow.
                    </h1>
                    <p className="text-[#86868B] text-xl md:text-3xl font-medium max-w-3xl mx-auto tracking-tight leading-snug">
                        Deep dive into how Sandhi's Generative Waveform Reconstruction operates at the neural level.
                    </p>
                </motion.div>
            </section>

            {/* 1. Problem Statement */}
            <section className="w-full max-w-5xl px-6 py-24 md:py-32 border-t border-[#333336]/50">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col md:flex-row gap-12 md:gap-24"
                >
                    <div className="md:w-1/3">
                        <h2 className="text-3xl md:text-5xl font-semibold text-[#F5F5F7] tracking-tighter sticky top-24">
                            The <br /> Problem.
                        </h2>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-8 text-[#A1A1A6] text-lg md:text-2xl font-medium leading-relaxed tracking-tight">
                        <p>
                            When on a networked call and the connection dips, data packets get lost in transit. Currently, apps like Zoom or WhatsApp handle this in a very basic way; they either silence the gap or replay the last received packet.
                        </p>
                        <p>
                            This works for tiny glitches, but if enough data is lost to drop a whole syllable, the audio becomes choppy and hard to understand.
                        </p>
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0A] border border-[#333336]/50 shadow-2xl mt-4">
                            <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-4 tracking-tight">The Generative Approach</h3>
                            <p className="text-[#86868B] text-base md:text-lg">
                                Traditional Packet Loss Concealment (PLC) struggles on multi-millisecond gaps. By using <strong>Generative Adversarial Networks (GANs)</strong> and <strong>1-D Convolutional U-Nets</strong> for audio domain translation, we reconstruct coherent waveforms by synthesizing realistic completions based on contextual speech patterns.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. Architecture Diagram */}
            <section className="w-full px-6 py-24 md:py-32 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16 max-w-3xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-semibold text-[#F5F5F7] tracking-tighter mb-6">Network Architecture.</h2>
                        <p className="text-[#86868B] text-xl md:text-2xl tracking-tight">A dual-network system designed to hallucinate reality.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-[2.5rem] overflow-hidden border border-[#333336]/50 bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0A] p-2 md:p-12 mb-20 shadow-2xl relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <img
                            src="https://github.com/user-attachments/assets/cf2d9f20-c026-47a6-a7b0-f07e45ea91d1"
                            alt="Sandhi U-Net GAN Architecture"
                            className="w-full h-auto object-contain rounded-2xl relative z-10 transform group-hover:scale-[1.02] transition-transform duration-700"
                        />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl"
                    >
                        <motion.div variants={fadeUp} className="bg-[#111111] p-10 rounded-3xl border border-[#333336]/30 hover:bg-[#1A1A1A] transition-colors duration-500">
                            <h3 className="text-3xl font-semibold text-[#F5F5F7] mb-4 flex items-center gap-4 tracking-tight">
                                <span className="bg-[#2997FF]/10 text-[#2997FF] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">G</span>
                                The Generator
                            </h3>
                            <p className="text-[#86868B] text-lg leading-relaxed">
                                Acts like an AI painter for missing audio using a <strong>U-Net</strong> architecture. It first zooms out (Encoder) to understand the broad context of the spoken word, and then zooms back in (Decoder) to synthesize the missing sound waves. <strong>Skip Connections</strong> preserve high-frequency details.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="bg-[#111111] p-10 rounded-3xl border border-[#333336]/30 hover:bg-[#1A1A1A] transition-colors duration-500">
                            <h3 className="text-3xl font-semibold text-[#F5F5F7] mb-4 flex items-center gap-4 tracking-tight">
                                <span className="bg-[#FF453A]/10 text-[#FF453A] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">D</span>
                                The Discriminator
                            </h3>
                            <p className="text-[#86868B] text-lg leading-relaxed">
                                It listens to audio clips and acts as a binary classifier, trying to guess if the audio is real human speech or if the Generator faked it. Through adversarial training, the generator learns to produce audio that is structurally indistinguishable from reality.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Dataflow & Block Diagram */}
            <section className="w-full max-w-7xl px-6 py-24 md:py-32">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-semibold text-[#F5F5F7] tracking-tighter mb-6">Dataflow & Processing.</h2>
                    <p className="text-[#86868B] text-xl md:text-2xl tracking-tight max-w-3xl mx-auto">From raw wave to reconstructed signal.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-[2.5rem] overflow-hidden border border-[#333336]/50 bg-[#0A0A0A] p-4 md:p-12 mb-20 shadow-2xl relative group flex justify-center"
                >
                    <img
                        src="https://github.com/user-attachments/assets/47164626-d34c-4e33-ae57-15d115da6000"
                        alt="Data Processing Flow"
                        className="w-full max-w-5xl h-auto object-contain rounded-2xl relative z-10 transform group-hover:scale-[1.01] transition-transform duration-700"
                    />
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-4 gap-6 relative"
                >
                    {/* Process Steps */}
                    {[
                        { num: "01", title: "Data Prep", desc: "Audio is resampled to a standardized 22,050 Hz Mono format and amplitude peak-normalized to [-1.0, 1.0]." },
                        { num: "02", title: "Masking", desc: "A perfectly good recording is artificially broken by deleting a random chunk of sound, simulating packet loss." },
                        { num: "03", title: "Inpainting", desc: "The internal Generator listens to the contextual sound surrounding the gap and generates the missing payload." },
                        { num: "04", title: "Evaluation", desc: "L1 parameters mathematically bond the clip to ensure seamless connections, avoiding jarring popping sounds." }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeUp}
                            className="bg-gradient-to-b from-[#1C1C1E] to-[#121212] p-8 rounded-[2rem] border border-[#333336]/40 flex flex-col hover:-translate-y-2 transition-transform duration-500"
                        >
                            <span className="text-[#86868B] font-mono text-sm mb-4 tracking-widest">{step.num} /</span>
                            <h4 className="text-[#F5F5F7] text-xl font-semibold mb-3 tracking-tight">{step.title}</h4>
                            <p className="text-[#A1A1A6] text-base leading-relaxed font-medium">{step.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

        </div>
    );
}
