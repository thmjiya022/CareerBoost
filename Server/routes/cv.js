const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const geminiService = require("../services/geminiService");

// Import pdf-parse - it exports a function by default
const pdfParse = require("pdf-parse");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = "uploads";
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const uniqueName = `cv_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = [".pdf", ".doc", ".docx"];
	const fileExt = path.extname(file.originalname).toLowerCase();

	if (allowedTypes.includes(fileExt)) {
		cb(null, true);
	} else {
		cb(
			new Error(
				"Invalid file type. Only PDF, DOC, and DOCX files are allowed."
			),
			false
		);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
	},
});

// Helper function to extract text from PDF
async function extractTextFromFile(filePath, originalName) {
	try {
		const fileExt = path.extname(originalName).toLowerCase();

		if (fileExt === ".pdf") {
			const dataBuffer = fs.readFileSync(filePath);

			// Call pdfParse as a function with the buffer
			const pdfData = await pdfParse(dataBuffer);
			return pdfData.text;
		} else if (fileExt === ".doc" || fileExt === ".docx") {
			// For demo purposes, return a placeholder
			// In production, you'd use a library like mammoth for .docx
			return "Text extraction from DOC/DOCX files is not implemented in this demo. Please use PDF files.";
		}

		throw new Error("Unsupported file type");
	} catch (error) {
		console.error("Text extraction failed:", error);
		throw error;
	}
}

// POST /cv/upload-analyze - Upload and analyze CV
router.post("/upload-analyze", upload.single("cv"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				error: "No file uploaded",
			});
		}

		const { jobDescription } = req.body;
		const filePath = req.file.path;

		// Extract text from the uploaded file
		const cvText = await extractTextFromFile(filePath, req.file.originalname);

		if (!cvText || cvText.trim().length < 50) {
			// Clean up the uploaded file
			fs.unlinkSync(filePath);
			return res.status(400).json({
				success: false,
				error:
					"Could not extract sufficient text from the CV. Please ensure the file is readable and contains text.",
			});
		}

		// Analyze CV with Gemini
		const analysisResult = await geminiService.analyzeCV(
			cvText,
			jobDescription
		);

		// Clean up the uploaded file after analysis
		fs.unlinkSync(filePath);

		if (!analysisResult.success) {
			return res.status(500).json({
				success: false,
				error: analysisResult.error,
			});
		}

		// Add file information to the analysis
		analysisResult.analysis.fileName = req.file.originalname;
		analysisResult.analysis.fileSize = req.file.size;

		res.json({
			success: true,
			analysis: analysisResult.analysis,
		});
	} catch (error) {
		console.error("CV analysis error:", error);

		// Clean up file if it exists
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}

		res.status(500).json({
			success: false,
			error: error.message || "Failed to analyze CV",
		});
	}
});

// GET /cv/analysis/:id - Get analysis by ID (for demo purposes)
router.get("/analysis/:id", (req, res) => {
	// In a real app, this would fetch from database
	res.status(404).json({
		success: false,
		error: "Analysis not found. This is a demo endpoint.",
	});
});

// GET /cv/history - Get user's analysis history
router.get("/history", (req, res) => {
	// In a real app, this would fetch from database
	res.json([]);
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		if (error.code === "LIMIT_FILE_SIZE") {
			return res.status(400).json({
				success: false,
				error: "File too large. Maximum size is 10MB.",
			});
		}
	}

	res.status(400).json({
		success: false,
		error: error.message,
	});
});

module.exports = router;
