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

        // Validate type (WAV or MP3)
        const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.wav') && !file.name.endsWith('.mp3')) {
            setError('Invalid file type. Please upload a WAV or MP3 file.');
            return;
        }

        setFileName(file.name);

        // Create a local object URL to pass back
        const audioUrl = URL.createObjectURL(file);
        onAudioLoaded({ file, url: audioUrl, name: file.name });
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
        <div className="flex flex-col items-center justify-center w-full">
            <div
                className={`upload-zone w-full py-10 px-4 flex flex-col items-center justify-center mb-4 transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-indigo-500/10 scale-[1.02]' : ''
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <svg
                    className={`w-10 h-10 mb-3 transition-colors ${isDragging ? 'text-indigo-300' : 'text-indigo-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                {fileName ? (
                    <div className="text-center">
                        <p className="text-emerald-400 font-medium mb-1 truncate max-w-xs">{fileName}</p>
                        <p className="text-sm text-slate-400 mb-4">Click below to change file</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-slate-300 font-medium mb-1">
                            Drag &amp; drop audio
                        </p>
                        <p className="text-sm text-slate-500 mb-4">
                            WAV or MP3 (max 10MB)
                        </p>
                    </div>
                )}

                <label className="cursor-pointer">
                    <span className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block text-sm">
                        {fileName ? 'Replace File' : 'Browse Files'}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".wav,.mp3,audio/wav,audio/mpeg"
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {error && (
                <p className="text-rose-400 text-sm font-medium mt-2">{error}</p>
            )}
        </div>
    );
}
