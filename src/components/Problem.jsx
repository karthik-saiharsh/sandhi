import { motion } from 'framer-motion';

export default function Problem() {
    return (
        <section className="w-full bg-[#0A0A0A] py-40 px-6 flex flex-col items-center text-center border-b border-[#333336]/30">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] mb-8">
                    Network Calls Lose Data.
                </h2>

                <p className="text-2xl md:text-4xl text-[#86868B] font-medium leading-tight">
                    During network congestion, voice packets are permanently lost in transit.
                </p>
                <p className="text-xl md:text-3xl text-[#86868B] mt-8 leading-relaxed max-w-3xl mx-auto font-normal">
                    Traditional systems either replay old packets or insert silence, producing robotic glitches and broken conversations.
                </p>
            </motion.div>
        </section>
    );
}
