/**
 * YouTube Learning Prompt Builder
 * Creates optimized prompts for YouTube video learning content generation
 */

class YouTubePromptBuilder {
    /**
     * Create YouTube learning content prompt using real video data
     */
    static createYouTubeLearningPrompt(videoUrl, videoData) {
        const { title, description, channel, duration, tags } = videoData;

        return `
You are an expert educational content creator. Create comprehensive learning materials for this YouTube video.

REAL VIDEO INFORMATION FROM YOUTUBE API:
- TITLE: "${title}"
- CHANNEL: "${channel}"
- DURATION: ${duration} minutes
- URL: ${videoUrl}
- DESCRIPTION: ${description?.substring(0, 800) || 'No description available'}
- TAGS: ${tags?.slice(0, 10).join(', ') || 'No tags'}

TASK: Generate structured learning content that would be appropriate for this specific video.

Create:
1. VIDEO_TITLE: An educational-focused title that reflects the content
2. SUMMARY: 2-3 paragraph comprehensive overview of what the video likely teaches
3. NOTES: 5-7 key learning points or takeaways
4. QUIZ_QUESTIONS: 5 multiple-choice questions testing understanding
5. FLASHCARDS: 5 educational flashcards for key concepts
6. CATEGORY: Most relevant educational category
7. DURATION: Use actual video duration: ${duration}

GUIDELINES:
- Be realistic and accurate based on the video information
- Create genuinely useful educational content
- Make quiz questions educational and thought-provoking
- Ensure flashcards are helpful for knowledge retention
- Focus on learning value and practical applications

RETURN ONLY VALID JSON in this exact format:
{
  "video_title": "Educational Title Based on Video Content",
  "summary": "Comprehensive 2-3 paragraph summary of the educational content...",
  "notes": [
    "Key learning point 1",
    "Important concept 2",
    "Practical takeaway 3",
    "Critical insight 4",
    "Useful knowledge 5"
  ],
  "quiz_questions": [
    {
      "question": "Educational multiple-choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Correct Option"
    }
  ],
  "flashcards": [
    {
      "front": "Key term or concept",
      "back": "Clear explanation or definition"
    }
  ],
  "category": "Most Relevant Category",
  "duration_minutes": ${duration}
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown.
`;
    }

    /**
     * Create prompt for videos with limited metadata
     */
    static createBasicLearningPrompt(videoUrl, title, duration = 15) {
        return `
Create educational learning content for a YouTube video.

VIDEO: "${title}"
DURATION: ${duration} minutes
URL: ${videoUrl}

Generate basic learning materials including summary, notes, quiz questions, and flashcards.

Return valid JSON only.
`;
    }
}

module.exports = YouTubePromptBuilder;