const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const APP_ID = process.env.ADZUNA_APP_ID || "284cc7b9";
const APP_KEY =
	process.env.ADZUNA_APP_KEY || "0fee1c6d47bb6f64e1efa9745210ca32";

// Mock data for South African jobs
const mockJobData = {
	results: [
		{
			id: "mock-1",
			title: "Software Developer",
			company: { display_name: "TechCorp SA" },
			location: { display_name: "Cape Town, Western Cape" },
			salary_min: 350000,
			salary_max: 500000,
			description:
				"Join our dynamic team as a Software Developer! Experience with React, Node.js, and cloud technologies required.",
			created: "2024-01-15T10:30:00Z",
			redirect_url: "#",
		},
		{
			id: "mock-2",
			title: "Frontend Developer",
			company: { display_name: "Digital Solutions" },
			location: { display_name: "Johannesburg, Gauteng" },
			salary_min: 300000,
			salary_max: 420000,
			description:
				"Frontend Developer opportunity. Experience with React, TypeScript, and modern CSS frameworks required.",
			created: "2024-01-14T14:20:00Z",
			redirect_url: "#",
		},
		{
			id: "mock-3",
			title: "Full Stack Developer",
			company: { display_name: "Innovation Hub" },
			location: { display_name: "Durban, KwaZulu-Natal" },
			salary_min: 380000,
			salary_max: 550000,
			description:
				"Full Stack Developer position. Work with React, Node.js, Python, and AWS cloud services.",
			created: "2024-01-13T09:15:00Z",
			redirect_url: "#",
		},
		{
			id: "mock-4",
			title: "Backend Developer",
			company: { display_name: "FinTech Pro" },
			location: { display_name: "Pretoria, Gauteng" },
			salary_min: 400000,
			salary_max: 600000,
			description:
				"Backend Developer in FinTech. Experience with Node.js, Python, databases, and API development essential.",
			created: "2024-01-12T16:45:00Z",
			redirect_url: "#",
		},
		{
			id: "mock-5",
			title: "Mobile App Developer",
			company: { display_name: "Mobile Innovations" },
			location: { display_name: "Port Elizabeth, Eastern Cape" },
			salary_min: 320000,
			salary_max: 480000,
			description:
				"Mobile App Developer with React Native or Flutter experience. Work on apps used by thousands daily.",
			created: "2024-01-11T11:30:00Z",
			redirect_url: "#",
		},
	],
	count: 5,
};

// Job search with simple fallback
router.get("/:country/search/:page?", async (req, res) => {
	const { country, page = 1 } = req.params;
	const {
		what,
		where,
		results_per_page = 10,
		sort_by = "relevance",
	} = req.query;

	if (country === "za") {
		// For South Africa, use mock data directly
		let filteredResults = [...mockJobData.results];

		if (what) {
			filteredResults = mockJobData.results.filter(
				(job) =>
					job.title.toLowerCase().includes(what.toLowerCase()) ||
					job.description.toLowerCase().includes(what.toLowerCase())
			);
		}

		const startIndex = (page - 1) * results_per_page;
		const endIndex = startIndex + parseInt(results_per_page);
		const paginatedResults = filteredResults.slice(startIndex, endIndex);

		return res.json({
			results: paginatedResults,
			count: paginatedResults.length,
		});
	}

	// For other countries, try API
	const url = `https://api.adzuna.com/v1/api/jobs/za/search/1?app_id=${APP_ID}&app_key=${APP_KEY}`;

	try {
		const response = await axios.get(url, {
			headers: { "Content-Type": "application/json" },
		});
		res.json(response.data);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch job listings",
			details: error.message,
		});
	}
});

// Salary histogram
router.get("/:country/histogram", async (req, res) => {
	const mockHistogram = {
		histogram: {
			200000: 15,
			300000: 35,
			400000: 40,
			500000: 25,
			600000: 15,
		},
	};

	res.json(mockHistogram);
});

// Top companies
router.get("/:country/top_companies", async (req, res) => {
	const mockCompanies = {
		leaderboard: [
			{ name: "Naspers", count: 45 },
			{ name: "MTN Group", count: 38 },
			{ name: "Standard Bank", count: 32 },
			{ name: "Absa Group", count: 28 },
			{ name: "Discovery", count: 20 },
		],
	};

	res.json(mockCompanies);
});

module.exports = router;
