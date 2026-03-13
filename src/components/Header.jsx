import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const isDemo = location.pathname === '/demo';

    return (
        <nav className="w-full flex items-center justify-between px-6 py-5 sticky top-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/5 fade-up">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center group-hover:bg-[#6366F1]/40 transition-colors">
                    <svg className="w-5 h-5 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-[#F3F4F6] group-hover:text-white transition-colors">Sandhi</span>
            </Link>

            <div className="flex items-center gap-4">
                {!isDemo && (
                    <Link
                        to="/demo"
                        className="px-5 py-2 text-sm font-medium rounded-lg bg-[#F3F4F6] text-[#0A0F1E] hover:bg-white transition-colors"
                    >
                        Try Demo
                    </Link>
                )}
            </div>
        </nav>
    );
}
