export default function FeatureCard({ icon, title, description, highlight = false }) {
    return (
        <div className={`glass-card p-6 flex flex-col h-full ${highlight ? 'border-[#6366F1]/40 shadow-[0_4px_30px_rgba(99,102,241,0.15)]' : ''}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${highlight ? 'bg-[#6366F1]/20 text-[#22D3EE]' : 'bg-white/5 text-[#6366F1]'}`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-[#F3F4F6] mb-3">{title}</h3>
            <p className="text-[#9CA3AF] leading-relaxed flex-1">{description}</p>
        </div>
    );
}
