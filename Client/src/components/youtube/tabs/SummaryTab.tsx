import React from 'react';
import type { SummaryTabProps } from '../../../types/youtube';

const SummaryTab: React.FC<SummaryTabProps> = ({ lesson, extractVideoId }) => {
    return (
        <div className="bg-[#1A1B3A] border border-[#2A2B4A] rounded-lg">
            <div className="p-4 border-b border-[#2A2B4A]">
                <h2 className="text-white text-xl font-semibold">{lesson.video_title}</h2>
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${extractVideoId(lesson.video_url)}`}
                            title={lesson.video_title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Summary</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {lesson.ai_summary}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryTab;