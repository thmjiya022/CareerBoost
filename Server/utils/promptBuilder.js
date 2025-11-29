/**
 * CV Analysis Prompt Builder
 * Centralizes CV analysis prompts for easy editing and maintenance
 */

class PromptBuilder {
	/**
	 * Creates a comprehensive CV analysis prompt
	 * @param {string} cvText - The extracted CV text
	 * @param {string} jobDescription - Optional job description for targeted analysis
	 * @returns {string} Formatted prompt for AI analysis
	 */
	static createCVAnalysisPrompt(cvText, jobDescription = "") {
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
            Provide a concise analysis in JSON format. Be specific and actionable.

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
            - Keep everything SHORT and CLEAR
            - identifiedSkills: Only list the 3-5 STRONGEST skills from CV
            - skillsToAdd: Only 3-5 HIGH-IMPACT skills that matter most
            - recommendations: Max 3-4 items, one sentence each
            - optimizedSummary: 2-3 sentences maximum
            - Focus on what REALLY matters for SA job market
            - Return ONLY valid JSON, no extra text
        `;
	}
}

module.exports = PromptBuilder;
