const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

class GeminiService {
	constructor() {
		if (!process.env.GEMINI_API_KEY) {
			throw new Error("GEMINI_API_KEY is required in environment variables");
		}

		this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
		this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
	}

	async analyzeCV(cvText, jobDescription = "") {
		try {
			const prompt = this.createCVAnalysisPrompt(cvText, jobDescription);

			const result = await this.model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();

			// Parse the JSON response
			const analysisData = this.parseGeminiResponse(text);

			return {
				success: true,
				analysis: analysisData,
			};
		} catch (error) {
			console.error("Gemini API Error:", error);
			return {
				success: false,
				error: "Failed to analyze CV with AI",
			};
		}
	}

	createCVAnalysisPrompt(cvText, jobDescription) {
		return `
            Analyze this CV for a South African job seeker and provide comprehensive feedback.

            **CV Content:**
            ${cvText}

            ${
							jobDescription
								? `**Target Job Description:**\n${jobDescription}\n`
								: ""
						}

            **Instructions:**
            Provide a detailed analysis in the following JSON format. Be specific and actionable.

            {
            "matchScore": [number 0-100],
            "identifiedSkills": [array of skills found in CV],
            "skillsToAdd": [array of 8-12 missing skills relevant to South African job market],
            "recommendations": [
                {
                "section": "summary|skills|experience",
                "title": "Short title",
                "description": "Actionable advice",
                "priority": "high|medium|low"
                }
            ],
            "optimizedSummary": "Professional summary rewritten for South African job market",
            "careerReadinessScore": [number 0-100],
            "improvements": [
                {
                "area": "Specific area to improve",
                "suggestion": "How to improve it",
                "impact": "Expected impact"
                }
            ]
            }

            **Guidelines:**
            - Focus on South African job market requirements
            - Consider skills in demand in SA (tech, finance, healthcare, mining, etc.)
            - Provide practical, actionable advice
            - Be encouraging but honest about gaps
            - Include both technical and soft skills
            - Consider entry-level to mid-level positions
            - Return ONLY valid JSON, no extra text
        `;
	}

	parseGeminiResponse(text) {
		try {
			// Clean the response to extract JSON
			const jsonMatch = text.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw new Error("No JSON found in response");
			}

			const jsonText = jsonMatch[0];
			const parsed = JSON.parse(jsonText);

			// Add additional computed fields
			parsed.id = `analysis_${Date.now()}`;
			parsed.uploadDate = new Date().toISOString();
			parsed.fileName = "uploaded-cv.pdf";

			return parsed;
		} catch (error) {
			console.error("Failed to parse Gemini response:", error);
			// Return fallback data
			return this.getFallbackAnalysis();
		}
	}

	getFallbackAnalysis() {
		return {
			id: `analysis_${Date.now()}`,
			fileName: "uploaded-cv.pdf",
			uploadDate: new Date().toISOString(),
			matchScore: 45,
			identifiedSkills: ["Communication", "Teamwork", "Problem Solving"],
			skillsToAdd: [
				"JavaScript",
				"Python",
				"SQL",
				"Excel",
				"Project Management",
				"Data Analysis",
				"Digital Marketing",
				"Customer Service",
			],
			recommendations: [
				{
					section: "summary",
					title: "Professional Summary",
					description:
						"Strengthen your professional summary to highlight career aspirations and key achievements",
					priority: "high",
				},
				{
					section: "skills",
					title: "Technical Skills",
					description: "Add relevant technical skills for your target industry",
					priority: "high",
				},
			],
			optimizedSummary:
				"Motivated professional with strong communication and teamwork skills, seeking to contribute to a dynamic organization while developing technical expertise.",
			careerReadinessScore: 45,
		};
	}

	async generateLearningPath(targetRole, currentSkills = []) {
		try {
			const prompt = `
                Create a 30-day learning roadmap for someone in South Africa who wants to become a ${targetRole}.

                Current skills: ${currentSkills.join(", ")}

                Provide a detailed learning plan in JSON format:
                {
                "roadmap": [
                    {
                    "week": 1,
                    "focus": "Main learning focus",
                    "dailyTasks": [
                        {
                        "day": 1,
                        "task": "Specific task",
                        "duration": "time estimate",
                        "resources": ["resource links or names"]
                        }
                    ]
                    }
                ],
                "milestones": ["Achievement markers"],
                "requiredSkills": ["Skills to develop"],
                "estimatedHours": number
                }
            `;

			const result = await this.model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();

			return JSON.parse(text);
		} catch (error) {
			console.error("Learning path generation failed:", error);
			return null;
		}
	}
}

module.exports = new GeminiService();
