import { motion } from 'framer-motion';

export default function Architecture() {
    return (
        <div className="w-full bg-[#0A0A0A] flex flex-col items-center pt-16 pb-32 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl flex flex-col items-start text-left"
            >
                <div className="mb-16 w-full text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5F7] tracking-tight mb-4">Architecture & Flow</h1>
                    <p className="text-[#86868B] text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Deep dive into how Sandhi's Generative Waveform Reconstruction operates.
                    </p>
                </div>

                {/* 1. Problem Statement */}
                <section className="mb-20 w-full">
                    <h2 className="text-3xl font-semibold text-[#F5F5F7] mb-6 tracking-tight">1. Problem Statement & Background</h2>
                    <div className="prose prose-invert prose-lg text-[#A1A1A6] max-w-none leading-relaxed">
                        <p className="mb-4">
                            Many times when on a networked call and the connection dips for a few moments, it causes the audio to get cut out or sound robotic. This happens because data packets get lost in transit. Right now, apps like Zoom or WhatsApp handle this in a very basic way; they either silence the gap or replay the last received packet to fill the missing parts.
                        </p>
                        <p className="mb-6">
                            This method works for tiny glitches, but if enough data is lost to drop a whole syllable, the audio becomes choppy and hard to understand.
                        </p>
                        <h3 className="text-xl font-medium text-[#E5E5E7] mb-3 mt-8">Generative Approach</h3>
                        <p>
                            Traditional Packet Loss Concealment (PLC) struggles on multi-millisecond gaps, resulting in artifacts. However, using <strong>Generative Adversarial Networks (GANs)</strong> and <strong>1-D Convolutional U-Nets</strong> for audio domain translation allows us to reconstruct coherent waveforms by synthesizing realistic completions based on surrounding contextual speech patterns.
                        </p>
                    </div>
                </section>

                {/* 2. Architecture Diagram */}
                <section className="mb-20 w-full">
                    <h2 className="text-3xl font-semibold text-[#F5F5F7] mb-8 tracking-tight">2. Network Architecture</h2>
                    <div className="w-full rounded-2xl overflow-hidden border border-[#333336] bg-[#1C1C1E] p-4 md:p-8 flex justify-center mb-8">
                        <img
                            src="https://github.com/user-attachments/assets/cf2d9f20-c026-47a6-a7b0-f07e45ea91d1"
                            alt="Sandhi U-Net GAN Architecture"
                            className="w-full h-auto object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                    <div className="prose prose-invert prose-lg text-[#A1A1A6] max-w-none leading-relaxed grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-medium text-[#2997FF] mb-3 flex items-center gap-2">
                                <span className="bg-[#2997FF]/10 text-[#2997FF] p-2 rounded-lg">G</span>
                                The Generator
                            </h3>
                            <p className="text-sm md:text-base">
                                Acts like an AI painter for missing audio using a <strong>U-Net</strong> architecture. It first zooms out (Encoder) to understand the broad context of the spoken word, and then zooms back in (Decoder) to synthesize the missing sound waves. <strong>Skip Connections</strong> help the model remember fine details so the reconstructed audio doesn't get blurry.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-[#FF453A] mb-3 flex items-center gap-2">
                                <span className="bg-[#FF453A]/10 text-[#FF453A] p-2 rounded-lg">D</span>
                                The Discriminator
                            </h3>
                            <p className="text-sm md:text-base">
                                It listens to audio clips and acts as a binary classifier, trying to guess if the audio is real human speech or if the Generator faked it. Through adversarial training, the generator learns to produce audio that is indistinguishable from reality to fool this discriminator.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Dataflow & Block Diagram */}
                <section className="mb-16 w-full">
                    <h2 className="text-3xl font-semibold text-[#F5F5F7] mb-8 tracking-tight">3. Dataflow & Pre-Processing</h2>

                    <div className="w-full rounded-2xl overflow-hidden border border-[#333336] bg-[#1C1C1E] p-4 md:p-8 flex justify-center mb-8">
                        <img
                            src="https://github.com/user-attachments/assets/47164626-d34c-4e33-ae57-15d115da6000"
                            alt="Data Processing Flow"
                            className="w-full h-auto object-contain rounded-lg shadow-2xl"
                        />
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 relative">
                        {/* Process Steps */}
                        <div className="bg-[#1C1C1E] p-6 rounded-2xl border border-[#333336] flex flex-col relative z-10">
                            <span className="text-[#86868B] font-mono text-sm mb-2">01</span>
                            <h4 className="text-[#F5F5F7] font-semibold mb-2">Data Prep</h4>
                            <p className="text-[#A1A1A6] text-sm leading-relaxed">Audio is resampled to a standardized 22,050 Hz Mono format and amplitude peak-normalized to [-1.0, 1.0].</p>
                        </div>
                        <div className="bg-[#1C1C1E] p-6 rounded-2xl border border-[#333336] flex flex-col relative z-10">
                            <span className="text-[#86868B] font-mono text-sm mb-2">02</span>
                            <h4 className="text-[#F5F5F7] font-semibold mb-2">Masking</h4>
                            <p className="text-[#A1A1A6] text-sm leading-relaxed">A perfectly good recording is artificially "broken" by deleting a random chunk of sound, simulating packet loss.</p>
                        </div>
                        <div className="bg-[#1C1C1E] p-6 rounded-2xl border border-[#333336] flex flex-col relative z-10">
                            <span className="text-[#86868B] font-mono text-sm mb-2">03</span>
                            <h4 className="text-[#F5F5F7] font-semibold mb-2">Inpainting</h4>
                            <p className="text-[#A1A1A6] text-sm leading-relaxed">The internal Generator listens to the contextual sound surrounding the gap and generates the missing payload.</p>
                        </div>
                        <div className="bg-[#1C1C1E] p-6 rounded-2xl border border-[#333336] flex flex-col relative z-10">
                            <span className="text-[#86868B] font-mono text-sm mb-2">04</span>
                            <h4 className="text-[#F5F5F7] font-semibold mb-2">Evaluation</h4>
                            <p className="text-[#A1A1A6] text-sm leading-relaxed">L1 parameters mathematically bond the clip to ensure seamless connections, avoiding jarring popping sounds.</p>
                        </div>
                    </div>
                </section>

            </motion.div>
        </div>
    );
}
