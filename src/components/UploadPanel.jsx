import { useState, useCallback } from 'react';

export default function UploadPanel({ onAudioLoaded }) {
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
            setError('Invalid format. Use WAV, MP3, or FLAC.');
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
        <section className="w-full mb-12">
            <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">
                    1. Source Audio
                </h2>
                {fileName && <span className="text-[#2997FF] font-medium text-sm">{fileName}</span>}
            </div>

            <div
                className={`w-full py-12 px-6 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 rounded-2xl ${isDragging ? 'border-[#2997FF] bg-[#2997FF]/5' : 'border-[#333336] hover:border-[#55555A]'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <svg
                    className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-[#2997FF]' : 'text-[#86868B]'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>

                <p className="text-[#F5F5F7] font-medium mb-2 text-lg">
                    Drag and drop audio file here
                </p>
                <p className="text-sm text-[#86868B] mb-6">
                    WAV, MP3, or FLAC up to 10MB
                </p>

                <label className="cursor-pointer">
                    <span className="bg-[#1C1C1E] text-[#F5F5F7] hover:bg-[#2C2C2E] font-medium py-3 px-8 rounded-full transition-colors inline-block text-sm border border-[#333336]">
                        {fileName ? 'Select Different File' : 'Browse Files'}
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
                <p className="text-red-400 text-sm font-medium mt-3">{error}</p>
            )}

            <div className="mt-4 flex items-center gap-4">
                <button className="text-[#86868B] hover:text-[#F5F5F7] transition-colors text-sm font-medium underline underline-offset-4">
                    Use sample audio instead
                </button>
            </div>
        </section>
    );
}
