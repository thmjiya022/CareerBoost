import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { NotesTabProps } from '../../../types/youtube';

const NotesTab: React.FC<NotesTabProps> = ({ notes }) => {
    return (
        <div className="bg-[#1A1B3A] border border-[#2A2B4A] rounded-lg">
            <div className="p-4 border-b border-[#2A2B4A]">
                <h2 className="text-white text-xl font-semibold">Key Takeaways</h2>
            </div>

            <div className="p-6">
                <div className="space-y-3">
                    {notes && notes.length > 0 ? (
                        notes.map((note, idx) => (
                            <div key={idx} className="flex gap-3 p-4 bg-[#0F0F23] rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <p className="text-gray-300 text-sm leading-relaxed">{note}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No notes available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotesTab;