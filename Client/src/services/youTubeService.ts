import api from './api';
import type {
    ProcessVideoResponse,
    GetLessonsResponse,
    DeleteLessonResponse
} from '../types/youtube';

class YouTubeService {
    /**
     * Process YouTube video and generate learning content
     */
    async processVideo(
        videoUrl: string,
        userId?: number
    ): Promise<ProcessVideoResponse> {
        try {
            const response = await api.post('/youtube/process', {
                videoUrl,
                userId,
            });

            return {
                success: true,
                lesson: response.data.lesson,
            };
        } catch (error: any) {
            console.error('YouTube process failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to process video',
            };
        }
    }

    /**
     * Get all lessons for a user
     */
    async getLessons(userId?: number): Promise<GetLessonsResponse> {
        try {
            const response = await api.get('/youtube/lessons', {
                params: { userId },
            });

            return {
                success: true,
                lessons: response.data.lessons,
            };
        } catch (error: any) {
            console.error('Fetch lessons failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to fetch lessons',
            };
        }
    }

    /**
     * Get single lesson by ID
     */
    async getLesson(id: number): Promise<ProcessVideoResponse> {
        try {
            const response = await api.get(`/youtube/lessons/${id}`);

            return {
                success: true,
                lesson: response.data.lesson,
            };
        } catch (error: any) {
            console.error('Fetch lesson failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to fetch lesson',
            };
        }
    }

    /**
     * Delete a lesson
     */
    async deleteLesson(id: number): Promise<DeleteLessonResponse> {
        try {
            const response = await api.delete(`/youtube/lessons/${id}`);

            return {
                success: true,
                message: response.data.message,
            };
        } catch (error: any) {
            console.error('Delete lesson failed:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Failed to delete lesson',
            };
        }
    }
}

export default new YouTubeService();