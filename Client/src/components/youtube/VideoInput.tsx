import React from 'react';
import { Youtube, Loader2, Target } from 'lucide-react';
import type { VideoInputProps } from '../../types/youtube';

const VideoInput: React.FC<VideoInputProps> = ({
    videoUrl,
    setVideoUrl,
    onProcess,
    isProcessing
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onProcess();
    };

    return (
        <div className="bg-[#1A1B3A] border border-[#2A2B4A] rounded-lg p-6 mb-6">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Paste YouTube video URL here..."
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full bg-[#0F0F23] border border-[#2A2B4A] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!videoUrl || isProcessing}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Target className="w-5 h-5" />
                                Extract Learning
                            </>
                        )}
                    </button>
                </div>
                <p className="text-gray-500 text-xs mt-3">
                    AI will generate summary, notes, quiz questions, and flashcards from the video
                </p>
            </form>
        </div>
    );
};

export default VideoInput;