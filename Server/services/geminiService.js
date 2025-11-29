const { GoogleGenerativeAI } = require("@google/generative-ai");
const PromptBuilder = require("../utils/promptBuilder");
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
			const prompt = PromptBuilder.createCVAnalysisPrompt(
				cvText,
				jobDescription
			);

			const result = await this.model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();

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

	parseGeminiResponse(text) {
		try {
			const jsonMatch = text.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw new Error("No JSON found in response");
			}

			const jsonText = jsonMatch[0];
			const parsed = JSON.parse(jsonText);

			parsed.id = `analysis_${Date.now()}`;
			parsed.uploadDate = new Date().toISOString();
			parsed.fileName = "uploaded-cv.pdf";

			return parsed;
		} catch (error) {
			console.error("Failed to parse Gemini response:", error);

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
			improvements: [
				{
					area: "Professional Summary",
					suggestion: "Add quantified achievements and specific career goals",
					impact: "Higher recruiter engagement",
				},
				{
					area: "Skills Section",
					suggestion: "Include technical skills relevant to your target role",
					impact: "Better ATS matching",
				},
			],
		};
	}
}

module.exports = new GeminiService();
