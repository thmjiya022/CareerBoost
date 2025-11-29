import React, { useState, useEffect } from "react";
import {
	Search,
	MapPin,
	Clock,
	ExternalLink,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import jobService, {
	type Job,
	type JobSearchParams,
	type JobCategory,
} from "../../services/jobService";
import toast from "react-hot-toast";

const JobMarket: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<JobCategory[]>([]);
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
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [showAllCategories, setShowAllCategories] = useState(false);

	useEffect(() => {
		loadCategories();
		searchJobs();
	}, []);

	useEffect(() => {
		if ((searchParams.page || 1) > 1) {
			searchJobs();
		}
	}, [searchParams.page]);

	const loadCategories = async () => {
		try {
			const cats = await jobService.getCategories();
			setCategories(cats);
		} catch (error) {
			console.error("Failed to load categories:", error);
		}
	};

	const searchJobs = async () => {
		setLoading(true);
		try {
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

			const resultsPerPage = searchParams.results_per_page || 20;
			const totalPagesCalc = Math.ceil((response.count || 0) / resultsPerPage);
			setTotalPages(totalPagesCalc);
			setCurrentPage(searchParams.page || 1);
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

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setSearchParams((prev) => ({ ...prev, page: newPage }));
		}
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
		<div className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-screen bg-slate-900 text-white overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center gap-4 mb-6 sm:mb-8">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
							Job Market Intelligence
						</h1>
						<p className="text-gray-400 text-sm sm:text-base">
							Explore opportunities and market insights across South Africa
						</p>
					</div>
				</div>
				<div className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-8">
					<h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
						🔍 Find Your Perfect Job
					</h2>

					{totalJobs > 0 && (
						<div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
							Found {totalJobs.toLocaleString()} jobs
							{totalPages > 1 && (
								<span className="ml-2">
									• Showing page {currentPage} of {totalPages}
								</span>
							)}
						</div>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
						<div className="relative">
							<Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Job title, keywords, or company..."
								value={searchParams.what}
								onChange={(e) =>
									setSearchParams((prev) => ({ ...prev, what: e.target.value }))
								}
								className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
						<div className="relative">
							<MapPin className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Location (e.g., Cape Town)"
								value={searchParams.where}
								onChange={(e) =>
									setSearchParams((prev) => ({
										...prev,
										where: e.target.value,
									}))
								}
								className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
						<button
							onClick={handleSearch}
							disabled={loading}
							className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
						>
							{loading ? (
								<div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
							) : (
								<Search className="h-4 w-4 sm:h-5 sm:w-5" />
							)}
							Search Jobs
						</button>
					</div>

					<div className="border-t border-gray-700 pt-3 sm:pt-4">
						<h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-3 sm:mb-4">
							Filters & Sort
						</h3>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 sm:gap-3 mb-3 sm:mb-4">
							<label className="flex items-center gap-2 text-xs sm:text-sm">
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
							<label className="flex items-center gap-2 text-xs sm:text-sm">
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
									className="w-full px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
									className="w-full px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
									className="w-full px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
								>
									<option value="relevance">Relevance</option>
									<option value="date">Newest</option>
									<option value="salary">Salary</option>
								</select>
							</div>
						</div>
					</div>

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
						{(showAllCategories ? categories : categories.slice(0, 5)).map(
							(category) => (
								<button
									key={category.tag}
									onClick={() =>
										setSearchParams((prev) => ({
											...prev,
											what: category.label,
										}))
									}
									className={`px-3 py-1 rounded-full text-sm transition-colors ${
										searchParams.what === category.label
											? "bg-blue-600 text-white"
											: "bg-gray-700 text-gray-300 hover:bg-gray-600"
									}`}
								>
									{category.label}
								</button>
							)
						)}
						{categories.length > 5 && (
							<button
								onClick={() => setShowAllCategories(!showAllCategories)}
								className="px-3 py-1 rounded-full text-sm transition-colors bg-gray-600 text-gray-200 hover:bg-gray-500"
							>
								{showAllCategories
									? "Show Less"
									: `View More (${categories.length - 5})`}
							</button>
						)}
					</div>
				</div>
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
								className="bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-750 transition-colors"
							>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-2 sm:space-y-0">
									<div className="flex-1">
										<h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
											{job.title}
										</h3>
										<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
											<span className="font-medium">
												{job.company.display_name}
											</span>
											<div className="flex items-center gap-1">
												<MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
												<span className="truncate">
													{job.location.display_name}
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-3 w-3 sm:h-4 sm:w-4" />
												{formatDate(job.created)}
											</div>
										</div>
									</div>
									<div className="text-left sm:text-right">
										<div className="text-base sm:text-lg font-semibold text-green-400 mb-1">
											{formatSalary(job.salary_min, job.salary_max)}
										</div>
										<div className="flex gap-1 sm:gap-2">
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

								<p className="text-gray-300 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
									{job.description.length > 200
										? `${job.description.substring(0, 200)}...`
										: job.description}
								</p>

								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
									<div className="flex items-center gap-2">
										<span className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 text-xs sm:text-sm rounded-full">
											{job.category?.label || "General"}
										</span>
									</div>
									<a
										href={job.redirect_url}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
									>
										Apply Now
										<ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
									</a>
								</div>
							</div>
						))
					)}
				</div>
				{!loading && jobs.length > 0 && totalPages > 1 && (
					<div className="mt-6 md:mt-8">
						{/* Page info - hidden on mobile */}
						<div className="hidden sm:flex text-xs md:text-sm text-gray-400 mb-4 justify-center">
							Showing page {currentPage} of {totalPages} (
							{totalJobs.toLocaleString()} total jobs)
						</div>

						{/* Mobile-friendly pagination */}
						<div className="flex items-center justify-center gap-1 md:gap-2 bg-gray-800/50 rounded-lg p-3 md:p-4">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage <= 1}
								className="flex items-center gap-1 px-2 md:px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-md md:rounded-lg transition-colors disabled:cursor-not-allowed text-xs md:text-sm min-w-[60px] md:min-w-auto"
							>
								<ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
								<span className="hidden sm:inline">Previous</span>
								<span className="sm:hidden">Prev</span>
							</button>

							<div className="flex items-center gap-1">
								{(() => {
									// Show fewer pages on mobile
									const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;
									let startPage = Math.max(
										1,
										currentPage - Math.floor(maxPagesToShow / 2)
									);
									const endPage = Math.min(
										totalPages,
										startPage + maxPagesToShow - 1
									);

									if (endPage - startPage + 1 < maxPagesToShow) {
										startPage = Math.max(1, endPage - maxPagesToShow + 1);
									}

									const pages = [];
									for (let i = startPage; i <= endPage; i++) {
										pages.push(i);
									}

									return pages.map((pageNum) => (
										<button
											key={`page-${pageNum}`}
											onClick={() => handlePageChange(pageNum)}
											className={`px-2 md:px-3 py-2 rounded-md md:rounded-lg transition-colors text-xs md:text-sm min-w-[32px] md:min-w-[40px] ${
												pageNum === currentPage
													? "bg-blue-600 text-white shadow-lg"
													: "bg-gray-700 hover:bg-gray-600 text-gray-300"
											}`}
										>
											{pageNum}
										</button>
									));
								})()}
							</div>

							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage >= totalPages}
								className="flex items-center gap-1 px-2 md:px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-md md:rounded-lg transition-colors disabled:cursor-not-allowed text-xs md:text-sm min-w-[60px] md:min-w-auto"
							>
								<span className="hidden sm:inline">Next</span>
								<span className="sm:hidden">Next</span>
								<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
							</button>
						</div>

						{/* Mobile page info */}
						<div className="sm:hidden text-xs text-gray-400 text-center mt-3">
							Page {currentPage} of {totalPages}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobMarket;
