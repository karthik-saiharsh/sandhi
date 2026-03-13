import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';

export default function Home() {
    return (
        <main className="w-full flex flex-col items-center bg-[#0A0A0A]">
            <Hero />
            <Problem />
            <Solution />
            <HowItWorks />
            <CTA />
        </main>
    );
}
