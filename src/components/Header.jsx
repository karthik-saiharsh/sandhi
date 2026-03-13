import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Header() {
    const location = useLocation();
    const isDemo = location.pathname === '/demo';

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex items-center justify-between px-8 py-6 sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#333336]/40"
        >
            <Link to="/" className="flex items-center gap-3 group">
                <span className="text-xl font-semibold tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">Sandhi</span>
            </Link>

            <div className="flex items-center gap-6">
                {isDemo ? (
                    <Link
                        to="/"
                        className="text-sm font-medium text-[#86868B] hover:text-[#F5F5F7] transition-colors"
                    >
                        Back to Home
                    </Link>
                ) : (
                    <Link
                        to="/demo"
                        className="text-sm font-medium text-[#F5F5F7] hover:text-[#2997FF] transition-colors"
                    >
                        Try Demo
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}
