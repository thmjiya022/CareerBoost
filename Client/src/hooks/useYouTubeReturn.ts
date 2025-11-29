import { useState, useCallback, useEffect } from 'react';
import type { Lesson } from '../types/youtube';
import youTubeService from '../services/youTubeService';
import toast from 'react-hot-toast';

interface UseYouTubeReturn {
    lessons: Lesson[];
    selectedLesson: Lesson | null;
    loading: boolean;
    processing: boolean;
    error: string | null;

    processVideo: (videoUrl: string, userId?: number) => Promise<void>;
    selectLesson: (lesson: Lesson | null) => void;
    deleteLesson: (id: number) => Promise<void>;
    refreshLessons: (userId?: number) => Promise<void>;
    clearError: () => void;
}

const CACHE_KEY = 'youtube_lessons';
const CACHE_DURATION = 1000 * 60 * 60;
interface CachedLessons {
    lessons: Lesson[];
    timestamp: number;
}

export const useYouTube = (): UseYouTubeReturn => {
    const [lessons, setLessons] = useState<Lesson[]>(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const parsedCache: CachedLessons = JSON.parse(cached);
                const isValid = Date.now() - parsedCache.timestamp < CACHE_DURATION;
                return isValid ? parsedCache.lessons : [];
            } catch {
                localStorage.removeItem(CACHE_KEY);
            }
        }
        return [];
    });

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lessons.length > 0) {
            const cacheData: CachedLessons = {
                lessons,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        }
    }, [lessons]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const selectLesson = useCallback((lesson: Lesson | null) => {
        setSelectedLesson(lesson);
    }, []);

    const processVideo = useCallback(async (videoUrl: string, userId?: number): Promise<void> => {
        setProcessing(true);
        setError(null);

        try {
            const result = await youTubeService.processVideo(videoUrl, userId);

            if (result.success && result.lesson) {
                setLessons((prev) => [result.lesson!, ...prev]);
                setSelectedLesson(result.lesson!);

                toast.success('Video processed successfully!');
            } else {
                throw new Error(result.error || 'Processing failed');
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to process video';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setProcessing(false);
        }
    }, []);

    const deleteLesson = useCallback(async (id: number): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const result = await youTubeService.deleteLesson(id);

            if (result.success) {
                setLessons((prev) => prev.filter((lesson) => lesson.id !== id));

                if (selectedLesson?.id === id) {
                    setSelectedLesson(null);
                }

                toast.success('Lesson deleted successfully!');
            } else {
                throw new Error(result.error || 'Delete failed');
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to delete lesson';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [selectedLesson]);

    const refreshLessons = useCallback(async (userId?: number): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const result = await youTubeService.getLessons(userId);

            if (result.success && result.lessons) {
                setLessons(result.lessons);
            } else {
                throw new Error(result.error || 'Failed to fetch lessons');
            }
        } catch (err: any) {
            const errorMessage = err.message || 'Failed to fetch lessons';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        lessons,
        selectedLesson,
        loading,
        processing,
        error,

        processVideo,
        selectLesson,
        deleteLesson,
        refreshLessons,
        clearError,
    };
};