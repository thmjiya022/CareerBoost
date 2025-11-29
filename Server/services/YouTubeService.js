const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const YouTubePromptBuilder = require("../utils/YouTubePromptBuilder");
require("dotenv").config();

class YouTubeService {
    constructor() {
        this.validateEnvironment();
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        this.youtubeApiKey = process.env.YOUTUBE_API_KEY;
    }

    validateEnvironment() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is required in environment variables");
        }
        if (!process.env.YOUTUBE_API_KEY) {
            throw new Error("YOUTUBE_API_KEY is required in environment variables");
        }
    }

    async processVideo(videoUrl, videoId, userId = null) {
        try {
            console.log('🎬 Processing YouTube video:', videoUrl);

            // 1. Get real video data from YouTube API
            const videoData = await this.fetchYouTubeVideoData(videoId);
            console.log('✅ YouTube API data fetched');

            // 2. Generate learning content
            const learningContent = await this.generateLearningContent(videoUrl, videoData);

            // 3. Build lesson object
            const lesson = this.buildLessonObject(videoUrl, videoId, videoData, learningContent, userId);

            return { success: true, lesson };

        } catch (error) {
            console.error("❌ YouTube processing error:", error.message);
            return { success: false, error: this.getUserFriendlyError(error) };
        }
    }

    async fetchYouTubeVideoData(videoId) {
        try {
            const response = await axios.get(
                'https://www.googleapis.com/youtube/v3/videos',
                {
                    params: {
                        part: 'snippet,contentDetails,statistics',
                        id: videoId,
                        key: this.youtubeApiKey
                    },
                    timeout: 10000
                }
            );

            if (!response.data.items || response.data.items.length === 0) {
                throw new Error('Video not found on YouTube');
            }

            const video = response.data.items[0];
            return this.parseVideoData(video);

        } catch (error) {
            if (error.response?.status === 403) {
                throw new Error('YouTube API quota exceeded. Please try again later.');
            } else if (error.response?.status === 404) {
                throw new Error('Video not found. Please check the YouTube URL.');
            }
            throw new Error(`YouTube API error: ${error.response?.data?.error?.message || error.message}`);
        }
    }

    parseVideoData(video) {
        const snippet = video.snippet;
        const contentDetails = video.contentDetails;

        return {
            title: snippet.title,
            description: snippet.description || '',
            channel: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            duration: this.convertDurationToMinutes(contentDetails.duration),
            viewCount: video.statistics?.viewCount || 0,
            likeCount: video.statistics?.likeCount || 0,
            thumbnails: snippet.thumbnails,
            tags: snippet.tags || [],
            categoryId: snippet.categoryId,
            videoId: video.id
        };
    }

    convertDurationToMinutes(duration) {
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = parseInt(match[1] || 0);
        const minutes = parseInt(match[2] || 0);
        const seconds = parseInt(match[3] || 0);

        return hours * 60 + minutes + Math.ceil(seconds / 60);
    }

    async generateLearningContent(videoUrl, videoData) {
        const prompt = YouTubePromptBuilder.createYouTubeLearningPrompt(videoUrl, videoData);

        console.log('🤖 Generating learning content with AI...');
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return this.parseGeminiResponse(text);
    }

    parseGeminiResponse(text) {
        try {
            let cleanText = text.trim().replace(/```json\s*|\s*```/g, '');
            const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error("AI did not return valid JSON");
            }

            const parsed = JSON.parse(jsonMatch[0]);

            // Validate required fields
            if (!parsed.summary || !parsed.notes || !Array.isArray(parsed.notes)) {
                throw new Error("AI response missing required fields");
            }

            return parsed;

        } catch (error) {
            console.error("Failed to parse AI response:", error.message);
            return this.getFallbackLearningContent();
        }
    }

    buildLessonObject(videoUrl, videoId, videoData, learningContent, userId) {
        const bestThumbnail = videoData.thumbnails?.maxres?.url ||
            videoData.thumbnails?.high?.url ||
            videoData.thumbnails?.standard?.url ||
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        return {
            id: Date.now() + Math.floor(Math.random() * 1000),
            video_url: videoUrl,
            video_title: learningContent.video_title || videoData.title,
            thumbnail_url: bestThumbnail,
            ai_summary: learningContent.summary,
            ai_notes: learningContent.notes,
            quiz_questions: learningContent.quiz_questions || [],
            flashcards: learningContent.flashcards || [],
            category: learningContent.category || this.detectCategory(videoData),
            duration_minutes: learningContent.duration_minutes || videoData.duration,
            created_at: new Date().toISOString(),
            user_id: userId,
            source: 'youtube_api_v3',
            channel: videoData.channel,
            view_count: videoData.viewCount
        };
    }

    detectCategory(videoData) {
        const text = (videoData.title + ' ' + videoData.description).toLowerCase();

        const categoryKeywords = {
            'Technology': ['programming', 'code', 'python', 'javascript', 'software', 'tech', 'computer', 'ai', 'machine learning'],
            'Business': ['business', 'marketing', 'finance', 'entrepreneur', 'startup', 'money', 'investment'],
            'Science': ['science', 'physics', 'math', 'chemistry', 'biology', 'space', 'experiment'],
            'Education': ['tutorial', 'how to', 'learn', 'education', 'course', 'lesson', 'teaching'],
            'Health': ['health', 'fitness', 'diet', 'exercise', 'nutrition', 'workout', 'yoga'],
            'Music': ['music', 'song', 'album', 'artist', 'concert', 'guitar', 'piano'],
            'Gaming': ['game', 'gaming', 'playthrough', 'walkthrough', 'minecraft', 'fortnite']
        };

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return category;
            }
        }

        return 'General';
    }

    getUserFriendlyError(error) {
        if (error.message.includes('quota')) {
            return 'YouTube API quota exceeded. Please try again tomorrow.';
        } else if (error.message.includes('not found')) {
            return 'Video not found. Please check the YouTube URL.';
        } else if (error.message.includes('API key')) {
            return 'YouTube API configuration error. Please contact support.';
        }
        return error.message || 'Failed to process video';
    }

    getFallbackLearningContent() {
        return {
            video_title: "Educational Content",
            summary: "This video contains educational material that can help you learn new concepts and skills.",
            notes: [
                "The video covers important topics in its subject area",
                "Key concepts are explained throughout the content",
                "Practical examples and applications are provided",
                "The material is presented in an engaging format",
                "Viewers can gain valuable knowledge from this content"
            ],
            quiz_questions: [
                {
                    question: "What type of content does this video primarily contain?",
                    options: ["Educational material", "Entertainment", "News reporting", "Commercial content"],
                    correct_answer: "Educational material"
                }
            ],
            flashcards: [
                {
                    front: "Learning Objective",
                    back: "The main educational goal of this video content"
                }
            ],
            category: "Education",
            duration_minutes: 15,
        };
    }
}

module.exports = new YouTubeService();