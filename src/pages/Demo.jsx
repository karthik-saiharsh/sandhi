import { useState } from 'react';
import { motion } from 'framer-motion';
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
        <div className="w-full bg-[#0A0A0A] flex flex-col items-center pt-16 pb-32 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl flex flex-col items-center"
            >
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight mb-4">Reconstruction Engine</h1>
                    <p className="text-[#86868B] text-lg">Test the generative capabilities of Sandhi on local audio files.</p>
                </div>

                <div className="w-full">
                    <UploadPanel onAudioLoaded={handleAudioLoad} />
                    <PacketLossSlider onLossChange={handleLossChange} />
                    <ModelSpecs />
                    <WaveformPanel audioFile={audioFile} packetLoss={packetLoss} />
                </div>
            </motion.div>
        </div>
    );
}
