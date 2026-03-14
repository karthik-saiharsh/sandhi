import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UploadPanel from '../components/UploadPanel';
import PacketLossSlider from '../components/PacketLossSlider';
import ModelSpecs from '../components/ModelSpecs';
import WaveformPanel from '../components/WaveformPanel';

export default function Demo() {
    const [audioFile, setAudioFile] = useState(null);
    const [packetLoss, setPacketLoss] = useState(30);

    const [originalAudio, setOriginalAudio] = useState(null);
    const [maskedAudio, setMaskedAudio] = useState(null);
    const [reconstructedAudio, setReconstructedAudio] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAudioLoad = (data) => {
        setAudioFile(data);
        console.log("Audio loaded:", data.name);
    };

    useEffect(() => {
        if (!audioFile) return;

        const processAudio = async () => {
            setIsProcessing(true);
            try {
                const formData = new FormData();
                formData.append('audio_file', audioFile.file);
                formData.append('loss_percentage', packetLoss);

                const response = await fetch('http://localhost:8000/api/reconstruct', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }

                const data = await response.json();
                setOriginalAudio(data.original_audio);
                setMaskedAudio(data.masked_audio);
                setReconstructedAudio(data.reconstructed_audio);
            } catch (err) {
                console.error("Reconstruction failed", err);
            } finally {
                setIsProcessing(false);
            }
        };

        processAudio();
    }, [audioFile, packetLoss]);

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
                    <WaveformPanel
                        audioFile={audioFile}
                        packetLoss={packetLoss}
                        isProcessing={isProcessing}
                        originalAudio={originalAudio}
                        maskedAudio={maskedAudio}
                        reconstructedAudio={reconstructedAudio}
                    />
                </div>
            </motion.div>
        </div>
    );
}
