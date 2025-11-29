const express = require("express");
const youtubeService = require("../services/youtubeService");

const router = express.Router();

// POST /youtube/process - Process YouTube video and generate learning content
router.post("/process", async (req, res) => {
    try {
        const { videoUrl, userId } = req.body;

        if (!videoUrl) {
            return res.status(400).json({
                success: false,
                error: "Video URL is required",
            });
        }

        // Validate YouTube URL
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            return res.status(400).json({
                success: false,
                error: "Invalid YouTube URL",
            });
        }

        // Process video with AI
        const result = await youtubeService.processVideo(videoUrl, videoId, userId);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.error,
            });
        }

        res.json({
            success: true,
            lesson: result.lesson,
        });
    } catch (error) {
        console.error("YouTube processing error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to process YouTube video",
        });
    }
});

// GET /youtube/lessons - Get all lessons for a user
router.get("/lessons", async (req, res) => {
    try {
        const { userId } = req.query;

        // In production, fetch from database
        // For now, return empty array
        res.json({
            success: true,
            lessons: [],
        });
    } catch (error) {
        console.error("Fetch lessons error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch lessons",
        });
    }
});

// GET /youtube/lessons/:id - Get single lesson by ID
router.get("/lessons/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // In production, fetch from database
        res.status(404).json({
            success: false,
            error: "Lesson not found",
        });
    } catch (error) {
        console.error("Fetch lesson error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch lesson",
        });
    }
});

// DELETE /youtube/lessons/:id - Delete a lesson
router.delete("/lessons/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // In production, delete from database
        res.json({
            success: true,
            message: "Lesson deleted successfully",
        });
    } catch (error) {
        console.error("Delete lesson error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to delete lesson",
        });
    }
});

// Helper function to extract video ID from YouTube URL
function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

module.exports = router;