import { motion } from 'framer-motion';

export default function Solution() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="w-full bg-[#0A0A0A] py-40 px-6 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full mb-32"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] mb-8 mt-12">
                    Meet Sandhi.
                </h2>
                <p className="text-2xl md:text-4xl text-[#86868B] font-medium leading-tight max-w-3xl mx-auto">
                    Sandhi uses a generative neural network to precisely reconstruct missing audio packets by analyzing the surrounding speech context.
                </p>
            </motion.div>

            {/* Minimal Visual Pipeline */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                    <span className="text-lg font-medium text-[#F5F5F7] tracking-wider mb-2">Audio Formats</span>
                    <span className="text-[#86868B]">Source Generation</span>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden md:block text-[#333336]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center">
                    <span className="text-lg font-medium text-[#F5F5F7] tracking-wider mb-2">Packet Loss</span>
                    <span className="text-[#86868B]">Network Simulation</span>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden md:block text-[#2997FF]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center">
                    <span className="text-lg font-medium text-[#2997FF] tracking-wider mb-2">AI Reconstruction</span>
                    <span className="text-[#86868B]">Generative Inference</span>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden md:block text-[#333336]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center">
                    <span className="text-lg font-medium text-[#F5F5F7] tracking-wider mb-2">Clean Speech</span>
                    <span className="text-[#86868B]">Final Output</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
