import { useState, useCallback } from 'react';

export default function AudioUploader({ onAudioLoaded }) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [error, setError] = useState(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFile = (file) => {
        setError(null);
        if (!file) return;

        const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/flac'];
        if (!validTypes.includes(file.type) && !file.name.match(/\.(wav|mp3|flac)$/i)) {
            setError('Invalid file format. Please upload WAV, MP3, or FLAC.');
            return;
        }

        setFileName(file.name);
        const audioUrl = URL.createObjectURL(file);
        if (onAudioLoaded) onAudioLoaded({ file, url: audioUrl, name: file.name });
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <section className="glass-card p-6">
            <h2 className="text-lg font-semibold text-[#E6EAF2] mb-5">
                Input Source
            </h2>

            <div
                className={`upload-zone w-full py-10 px-4 flex flex-col items-center justify-center mb-4 transition-all duration-300 ${isDragging ? 'drag-active scale-[1.02]' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <svg
                    className={`w-10 h-10 mb-4 transition-colors ${isDragging ? 'text-[#00D1FF]' : 'text-[#6C7CFF]'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>

                {fileName ? (
                    <div className="text-center">
                        <p className="text-[#00D1FF] font-medium mb-1 truncate max-w-xs">{fileName}</p>
                        <p className="text-sm text-[#9CA3AF] mb-5">Click below to change file</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-[#E6EAF2] font-medium mb-1">
                            Drag &amp; drop audio
                        </p>
                        <p className="text-sm text-[#9CA3AF] mb-5">
                            WAV, MP3, FLAC (max 10MB)
                        </p>
                    </div>
                )}

                <label className="cursor-pointer">
                    <span className="bg-[#6C7CFF]/10 text-[#6C7CFF] border border-[#6C7CFF]/30 hover:bg-[#6C7CFF]/20 hover:border-[#6C7CFF]/50 hover:text-[#E6EAF2] font-medium py-2 px-6 rounded-lg transition-all inline-block text-sm">
                        {fileName ? 'Replace File' : 'Browse Files'}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".wav,.mp3,.flac,audio/wav,audio/mpeg,audio/flac"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {error && (
                <p className="text-rose-400 text-sm font-medium mt-2">{error}</p>
            )}

            <div className="w-full flex items-center justify-center gap-4 text-xs font-mono text-[#9CA3AF] uppercase tracking-wider mt-5">
                <span className="h-px bg-[#E6EAF2]/10 flex-1"></span>
                <span>Or use demo</span>
                <span className="h-px bg-[#E6EAF2]/10 flex-1"></span>
            </div>

            <button className="w-full mt-4 bg-transparent border border-[#E6EAF2]/10 text-[#9CA3AF] hover:text-[#E6EAF2] hover:bg-[#E6EAF2]/5 transition-colors text-sm font-medium py-2 rounded-lg">
                Load Sample Audio
            </button>
        </section>
    );
}
