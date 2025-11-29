const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cvRouter = require("./routes/cv");
const youtubeRouter = require("./routes/youtube");

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		credentials: true,
	})
);

// Basic middleware
app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cv", cvRouter);
app.use("/youtube", youtubeRouter);

// 404 handler
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		error: "Endpoint not found",
	});
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);

	res.status(err.status || 500).json({
		success: false,
		error:
			process.env.NODE_ENV === "development"
				? err.message
				: "Internal server error",
	});
});

module.exports = app;
