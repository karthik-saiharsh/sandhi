import { useState } from 'react';
import UploadPanel from '../components/UploadPanel';
import PacketLossSlider from '../components/PacketLossSlider';
import ModelSpecs from '../components/ModelSpecs';
import WaveformPanel from '../components/WaveformPanel';

export default function Demo() {
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
        <div className="w-full flex-1 flex flex-col items-center pt-8 pb-16 px-6 fade-up">
            <div className="w-full max-w-[1400px] mb-8">
                <h1 className="text-3xl font-bold text-[#F3F4F6] tracking-tight">Demo Playground</h1>
                <p className="text-[#9CA3AF] text-sm mt-1">Configure parameters and visualize generative reconstruction.</p>
            </div>

            <main className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Sidebar (30%) */}
                <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
                    <UploadPanel onAudioLoaded={handleAudioLoad} />
                    <PacketLossSlider onLossChange={handleLossChange} />
                    <ModelSpecs />
                </div>

                {/* Main Workspace (70%) */}
                <div className="lg:col-span-8 xl:col-span-9 h-[800px] lg:h-auto">
                    <WaveformPanel audioFile={audioFile} packetLoss={packetLoss} />
                </div>

            </main>
        </div>
    );
}
