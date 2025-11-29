import React, { useState, useEffect } from "react";
import {
	Search,
	MapPin,
	TrendingUp,
	Clock,
	ExternalLink,
	ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import jobService, {
	type Job,
	type JobSearchParams,
	type MarketStats,
} from "../../services/jobService";
import toast from "react-hot-toast";

const JobMarket: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
	const [loading, setLoading] = useState(false);
	const [searchParams, setSearchParams] = useState<JobSearchParams>({
		what: "",
		where: "",
		page: 1,
		results_per_page: 20,
		sort_by: "relevance",
	});
	const [filters, setFilters] = useState({
		full_time: false,
		part_time: false,
		permanent: false,
		contract: false,
		salary_min: "",
		salary_max: "",
	});
	const [totalJobs, setTotalJobs] = useState(0);
	const [categories] = useState([
		"Technology",
		"Healthcare",
		"Finance",
		"Education",
		"Marketing",
		"Engineering",
	]);

	useEffect(() => {
		loadMarketStats();
		searchJobs();
	}, []);

	const loadMarketStats = async () => {
		try {
			const stats = await jobService.getMarketStats();
			setMarketStats(stats);
		} catch (error) {
			console.error("Failed to load market stats:", error);
		}
	};

	const searchJobs = async () => {
		setLoading(true);
		try {
			// Build search parameters with filters
			const searchQuery: JobSearchParams = {
				...searchParams,
				...(filters.full_time && { full_time: 1 }),
				...(filters.part_time && { part_time: 1 }),
				...(filters.permanent && { permanent: 1 }),
				...(filters.contract && { contract: 1 }),
				...(filters.salary_min && { salary_min: parseInt(filters.salary_min) }),
				...(filters.salary_max && { salary_max: parseInt(filters.salary_max) }),
			};

			const response = await jobService.searchJobs(searchQuery);
			setJobs(response.results || []);
			setTotalJobs(response.count || 0);
		} catch (error) {
			toast.error("Failed to fetch jobs");
			console.error("Job search error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		setSearchParams((prev) => ({ ...prev, page: 1 }));
		searchJobs();
	};

	const formatSalary = (min?: number, max?: number) => {
		if (!min && !max) return "Salary not disclosed";
		if (min && max)
			return `R${min.toLocaleString()} - R${max.toLocaleString()}`;
		if (min) return `From R${min.toLocaleString()}`;
		if (max) return `Up to R${max.toLocaleString()}`;
		return "Competitive salary";
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 1) return "Today";
		if (diffDays === 2) return "Yesterday";
		if (diffDays <= 7) return `${diffDays} days ago`;
		return date.toLocaleDateString();
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header with Navigation */}
				<div className="flex items-center gap-4 mb-8">
					<Link
						to="/"
						className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
					>
						<ArrowLeft className="h-5 w-5" />
						<span>Back to Home</span>
					</Link>
					<div>
						<h1 className="text-3xl font-bold mb-2">Job Market Intelligence</h1>
						<p className="text-gray-400">
							Explore opportunities and market insights across South Africa
						</p>
					</div>
				</div>

				{/* Market Stats */}
				{marketStats && (
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						<div className="bg-blue-600 rounded-xl p-6 text-center">
							<div className="text-3xl font-bold mb-2">
								{marketStats.activeJobs.toLocaleString()}
							</div>
							<div className="text-blue-200 text-sm">Active Opportunities</div>
						</div>
						<div className="bg-green-600 rounded-xl p-6 text-center">
							<div className="text-3xl font-bold mb-2">
								{marketStats.entryLevelJobs}
							</div>
							<div className="text-green-200 text-sm">Entry-Level Jobs</div>
						</div>
						<div className="bg-purple-600 rounded-xl p-6 text-center">
							<div className="text-3xl font-bold mb-2">
								{marketStats.internships}
							</div>
							<div className="text-purple-200 text-sm">Internships</div>
						</div>
						<div className="bg-orange-600 rounded-xl p-6 text-center">
							<div className="text-3xl font-bold mb-2">
								{marketStats.newThisWeek}
							</div>
							<div className="text-orange-200 text-sm">Posted This Week</div>
						</div>
					</div>
				)}

				{/* Trending Skills */}
				{marketStats && (
					<div className="bg-gray-800 rounded-xl p-6 mb-8">
						<div className="flex items-center gap-2 mb-4">
							<TrendingUp className="h-6 w-6 text-blue-400" />
							<h2 className="text-xl font-semibold">Trending Skills in SA</h2>
						</div>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							{marketStats.trendingSkills.map((skill, index) => (
								<div key={index} className="bg-gray-700 rounded-lg p-4">
									<div className="font-medium text-blue-400">{skill.skill}</div>
									<div className="text-sm text-green-400">
										{skill.growth} growth
									</div>
									<div className="text-xs text-gray-400">
										Demand: {skill.demand}%
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Salary Ranges */}
				{marketStats && (
					<div className="bg-gray-800 rounded-xl p-6 mb-8">
						<h3 className="text-lg font-semibold mb-4">
							💰 Entry-Level Salary Ranges (ZAR/month)
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{marketStats.salaryRanges.map((salary, index) => (
								<div key={index} className="bg-gray-700 rounded-lg p-4">
									<div className="font-medium">{salary.role}</div>
									<div className="text-2xl font-bold text-blue-400">
										R{salary.min.toLocaleString()} - R
										{salary.max.toLocaleString()}
									</div>
									<div className="text-sm text-gray-400">
										Avg: R{salary.average.toLocaleString()}
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Enhanced Search Section */}
				<div className="bg-gray-800 rounded-xl p-6 mb-8">
					<h2 className="text-xl font-semibold mb-6">
						🔍 Find Your Perfect Job
					</h2>

					{/* Results Count */}
					{totalJobs > 0 && (
						<div className="mb-4 text-sm text-gray-400">
							Found {totalJobs.toLocaleString()} jobs
						</div>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
						<div className="relative">
							<Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Job title, keywords, or company..."
								value={searchParams.what}
								onChange={(e) =>
									setSearchParams((prev) => ({ ...prev, what: e.target.value }))
								}
								className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
						<div className="relative">
							<MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Location (e.g., Cape Town, Johannesburg)"
								value={searchParams.where}
								onChange={(e) =>
									setSearchParams((prev) => ({
										...prev,
										where: e.target.value,
									}))
								}
								className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
						<button
							onClick={handleSearch}
							disabled={loading}
							className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
						>
							{loading ? (
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							) : (
								<Search className="h-5 w-5" />
							)}
							Search Jobs
						</button>
					</div>

					{/* Advanced Filters */}
					<div className="border-t border-gray-700 pt-4">
						<h3 className="text-sm font-medium text-gray-300 mb-4">
							Filters & Sort
						</h3>

						<div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
							<label className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={filters.full_time}
									onChange={(e) =>
										setFilters((prev) => ({
											...prev,
											full_time: e.target.checked,
										}))
									}
									className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
								/>
								<span>Full Time</span>
							</label>
							<label className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={filters.permanent}
									onChange={(e) =>
										setFilters((prev) => ({
											...prev,
											permanent: e.target.checked,
										}))
									}
									className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
								/>
								<span>Permanent</span>
							</label>
							<div>
								<input
									type="number"
									placeholder="Min salary"
									value={filters.salary_min}
									onChange={(e) =>
										setFilters((prev) => ({
											...prev,
											salary_min: e.target.value,
										}))
									}
									className="w-full px-3 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>
							<div>
								<input
									type="number"
									placeholder="Max salary"
									value={filters.salary_max}
									onChange={(e) =>
										setFilters((prev) => ({
											...prev,
											salary_max: e.target.value,
										}))
									}
									className="w-full px-3 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
								/>
							</div>
							<div>
								<select
									value={searchParams.sort_by}
									onChange={(e) =>
										setSearchParams((prev) => ({
											...prev,
											sort_by: e.target.value as any,
										}))
									}
									className="w-full px-3 py-1 text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
								>
									<option value="relevance">Relevance</option>
									<option value="date">Newest</option>
									<option value="salary">Salary</option>
								</select>
							</div>
						</div>
					</div>

					{/* Category Quick Filters */}
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setSearchParams((prev) => ({ ...prev, what: "" }))}
							className={`px-3 py-1 rounded-full text-sm transition-colors ${
								!searchParams.what
									? "bg-blue-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							All Jobs
						</button>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() =>
									setSearchParams((prev) => ({ ...prev, what: category }))
								}
								className={`px-3 py-1 rounded-full text-sm transition-colors ${
									searchParams.what === category
										? "bg-blue-600 text-white"
										: "bg-gray-700 text-gray-300 hover:bg-gray-600"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Job Listings */}
				<div className="space-y-4">
					{loading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
							<p className="text-gray-400">Searching for opportunities...</p>
						</div>
					) : jobs.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">🔍</div>
							<p className="text-gray-400">
								No jobs found. Try adjusting your search criteria.
							</p>
						</div>
					) : (
						jobs.map((job) => (
							<div
								key={job.id}
								className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-semibold text-white mb-2">
											{job.title}
										</h3>
										<div className="flex items-center gap-4 text-gray-400 text-sm">
											<span className="font-medium">
												{job.company.display_name}
											</span>
											<div className="flex items-center gap-1">
												<MapPin className="h-4 w-4" />
												{job.location.display_name}
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-4 w-4" />
												{formatDate(job.created)}
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-lg font-semibold text-green-400 mb-1">
											{formatSalary(job.salary_min, job.salary_max)}
										</div>
										<div className="flex gap-2">
											<span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
												{job.contract_type}
											</span>
											{job.contract_time && (
												<span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
													{job.contract_time.replace("_", " ")}
												</span>
											)}
										</div>
									</div>
								</div>

								<p className="text-gray-300 mb-4 line-clamp-3">
									{job.description.length > 200
										? `${job.description.substring(0, 200)}...`
										: job.description}
								</p>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
											{job.category?.label || "General"}
										</span>
									</div>
									<a
										href={job.redirect_url}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
									>
										Apply Now
										<ExternalLink className="h-4 w-4" />
									</a>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default JobMarket;
