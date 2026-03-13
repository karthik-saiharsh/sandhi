import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PipelineVisualizer from '../components/PipelineVisualizer';

export default function Home() {
    return (
        <div className="w-full flex flex-col items-center pb-24">
            <Hero />

            <PipelineVisualizer />

            {/* ── Problem Section ───────────────────────────────────── */}
            <section className="w-full max-w-6xl px-6 py-20 fade-up">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F3F4F6] mb-4">The Impact of Packet Loss</h2>
                    <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg">
                        Real-time communication over unreliable networks leads to severe audio degradation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        title="Data Dropouts"
                        description="UDP transmission natively lacks retransmission, causing audio packets to be permanently lost over weak connections."
                    />
                    <FeatureCard
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        }
                        title="Audio Glitches"
                        description="Traditional concealment methods create robotic artifacts, clipping, and jarring acoustic glitches during speech."
                    />
                    <FeatureCard
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        }
                        title="Broken Conversation"
                        description="The accumulative effect destroys conversational flow, reducing intelligibility and frustrating end users."
                    />
                </div>
            </section>

            {/* ── Solution / How It Works ───────────────────────────────────── */}
            <section className="w-full max-w-6xl px-6 py-20 fade-up">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F3F4F6] mb-4">How Sandhi Works</h2>
                    <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg">
                        A three-step generative pipeline utilizing GAN + U-Net architectures to infer missing frequencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                    <FeatureCard
                        icon={<span className="text-lg font-bold">1</span>}
                        title="Upload Audio"
                        description="Standard lossless or lossy speech files are ingested directly into the Sandhi engine."
                    />
                    <FeatureCard
                        icon={<span className="text-lg font-bold">2</span>}
                        title="Simulate Loss"
                        description="The engine artificially drops random packet blocks (up to 60%) to simulate extreme network degradation."
                    />
                    <FeatureCard
                        icon={<span className="text-lg font-bold">3</span>}
                        title="AI Reconstructs"
                        description="Our generative model analyzes the surrounding context and hallucinates the missing audio with high fidelity."
                        highlight={true}
                    />
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────────── */}
            <section className="w-full max-w-4xl px-6 py-24 text-center fade-up relative z-10">
                <div className="glass-card p-12 flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#F3F4F6] mb-6">Experience the Reconstruction</h2>
                    <p className="text-[#9CA3AF] text-lg mb-8 max-w-xl">
                        Test the model in real time using your own voice or provided samples directly in the browser playground.
                    </p>
                    <Link
                        to="/demo"
                        className="px-8 py-4 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_30px_rgba(99,102,241,0.8)]"
                    >
                        Launch Playground
                    </Link>
                </div>
            </section>

        </div>
    );
}
