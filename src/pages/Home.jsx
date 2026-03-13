import { useState } from 'react';
import Header from '../components/Header';
import AudioUploader from '../components/AudioUploader';
import ModelSpecs from '../components/ModelSpecs';
import PacketLossControl from '../components/PacketLossControl';
import WaveformPanel from '../components/WaveformPanel';

export default function Home() {
    const [audioFile, setAudioFile] = useState(null);
    const [packetLoss, setPacketLoss] = useState(30);

    const handleAudioLoad = (data) => {
        setAudioFile(data);
        console.log("Audio loaded:", data.name);
    };

    const handleLossChange = (val) => {
        setPacketLoss(val);
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col items-center pt-24 pb-16 px-6">

            {/* ── Background Elements ──────────────────────────────── */}
            <div className="glow-orb-primary"></div>
            <div className="glow-orb-secondary"></div>

            <div className="w-full max-w-[1400px] z-10 flex flex-col items-center">

                {/* ── Header Section ───────────────────────────────────── */}
                <Header />

                {/* ── Main Content Area (30/70 Split Layout) ───────────── */}
                <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 fade-up fade-up-delay-1">

                    {/* Left Column (30%) */}
                    <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
                        <AudioUploader onAudioLoaded={handleAudioLoad} />
                        <PacketLossControl onLossChange={handleLossChange} />
                        <ModelSpecs />
                    </div>

                    {/* Right Column (70%) */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <WaveformPanel audioFile={audioFile} packetLoss={packetLoss} />
                    </div>

                </main>
            </div>
        </div>
    );
}
