const express = require("express");
const axios = require("axios");
const https = require("https");
const router = express.Router();
require("dotenv").config();

const APP_ID = process.env.ADZUNA_APP_ID || "284cc7b9";
const APP_KEY =
	process.env.ADZUNA_APP_KEY || "0fee1c6d47bb6f64e1efa9745210ca32";

const cache = new Map();
const CACHE_TTL = 10 * 60 * 60 * 1000;

function getCacheKey(endpoint, params) {
	return `${endpoint}:${JSON.stringify(params)}`;
}

function isValidCache(timestamp) {
	return Date.now() - timestamp < CACHE_TTL;
}

function buildAdzunaUrl(endpoint, params = {}) {
	const baseUrl = `https://api.adzuna.com/v1/api/jobs/za/${endpoint}`;
	const url = new URL(baseUrl);

	url.searchParams.set("app_id", APP_ID);
	url.searchParams.set("app_key", APP_KEY);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.set(key, String(value));
		}
	});

	return url.toString();
}

router.get("/search", async (req, res) => {
	const cacheKey = getCacheKey("search", req.query);
	const cached = cache.get(cacheKey);

	if (cached && isValidCache(cached.timestamp)) {
		console.log("Returning cached job search data");
		return res.json(cached.data);
	}

	try {
		console.log("Fetching job data from Adzuna API...");

		const pageNum = req.query.page || 1;
		const { page, ...queryParams } = req.query;

		const adzunaUrl = buildAdzunaUrl(`search/${pageNum}`, queryParams);

		const httpsAgent = new https.Agent({
			family: 4,
			keepAlive: true,
			secureProtocol: "TLSv1_2_method",
		});

		const response = await axios.get(adzunaUrl, {
			httpsAgent,
			timeout: 30000,
			headers: {
				Accept: "application/json",
				"User-Agent": "CareerBoost-App/1.0",
			},
		});

		console.log(
			`Successfully fetched ${
				response.data?.results?.length || 0
			} jobs from Adzuna`
		);

		cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
		res.json(response.data);
	} catch (error) {
		console.error("❌ Adzuna API failed:", error.message);
		res.status(500).json({
			error: "Failed to fetch jobs from Adzuna API",
			message: error.message,
		});
	}
});

router.get("/categories", async (req, res) => {
	const cacheKey = getCacheKey("categories", {});
	const cached = cache.get(cacheKey);

	if (cached && isValidCache(cached.timestamp)) {
		console.log("Returning cached categories data");
		return res.json(cached.data);
	}

	try {
		console.log("Fetching categories from Adzuna API...");

		const adzunaUrl = buildAdzunaUrl("categories");

		const httpsAgent = new https.Agent({
			family: 4,
			keepAlive: true,
			secureProtocol: "TLSv1_2_method",
		});

		const response = await axios.get(adzunaUrl, {
			httpsAgent,
			timeout: 15000,
			headers: {
				Accept: "application/json",
				"User-Agent": "CareerBoost-App/1.0",
			},
		});

		console.log("Successfully fetched categories from Adzuna");

		const categories = response.data?.results || [];
		cache.set(cacheKey, { data: categories, timestamp: Date.now() });
		res.json(categories);
	} catch (error) {
		console.error("❌ Adzuna Categories API failed:", error.message);
		res.status(500).json({
			error: "Failed to fetch categories from Adzuna API",
			message: error.message,
		});
	}
});

module.exports = router;
