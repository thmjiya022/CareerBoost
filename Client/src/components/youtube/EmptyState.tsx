import React from 'react';
import { Youtube } from 'lucide-react';

const EmptyState: React.FC = () => {
    return (
        <div className="bg-[#1A1B3A] border border-[#2A2B4A] rounded-lg">
            <div className="p-12 text-center">
                <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">
                    Start Learning from YouTube
                </h3>
                <p className="text-gray-400">
                    Paste a YouTube URL above to extract structured learning content
                </p>
            </div>
        </div>
    );
};

export default EmptyState;