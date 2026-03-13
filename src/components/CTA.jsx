import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="w-full bg-[#0A0A0A] pt-32 pb-60 px-6 flex flex-col items-center text-center border-t border-[#333336]/30">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
            >
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#F5F5F7] mb-12">
                    Experience Sandhi.
                </h2>

                <Link
                    to="/demo"
                    className="inline-block px-10 py-5 rounded-full bg-[#2997FF] hover:bg-[#147CE5] text-[#F5F5F7] font-semibold text-xl transition-colors"
                >
                    Try the Demo
                </Link>
            </motion.div>
        </section>
    );
}
