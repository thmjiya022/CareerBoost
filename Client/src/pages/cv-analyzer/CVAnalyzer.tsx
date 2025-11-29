import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import { useCV } from "../../hooks/useCV";
import FileUpload from "../../components/ui/FileUpload";
import CircularProgress from "../../components/ui/CircularProgress";
import SkillTag from "../../components/ui/SkillTag";
import toast from "react-hot-toast";

const CVAnalyzer: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [jobDescription, setJobDescription] = useState("");

	const { analysis, uploading, uploadAndAnalyze } = useCV();

	const handleAnalyze = async () => {
		if (!selectedFile) {
			toast.error("Please select a CV file first");
			return;
		}

		await uploadAndAnalyze(selectedFile, jobDescription || undefined);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">CV Analyzer</h1>
					<p className="text-gray-400">
						Upload your CV and get instant AI-powered analysis and optimization
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					{/* Left Column - Upload & Input */}
					<div className="space-y-6">
						{/* Upload Section */}
						<div className="bg-gray-800 rounded-xl p-6">
							<h2 className="text-xl font-semibold mb-4">Upload & Analyze</h2>

							<FileUpload
								selectedFile={selectedFile}
								onFileSelect={setSelectedFile}
								disabled={uploading}
							/>
						</div>

						{/* Job Description Section */}
						<div className="bg-gray-800 rounded-xl p-6">
							<h3 className="text-lg font-medium mb-4">
								Target Job Description{" "}
								<span className="text-gray-400 text-sm">(Optional)</span>
							</h3>

							<textarea
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
								placeholder="Paste the job description here for better matching..."
								className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								disabled={uploading}
							/>

							<div className="text-xs text-gray-400 mt-2">
								Adding a job description helps to match your CV better and
								identify skill gaps.
							</div>
						</div>

						{/* Analyze Button */}
						<button
							onClick={handleAnalyze}
							disabled={!selectedFile || uploading}
							className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
						>
							{uploading ? (
								<>
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
									Analyzing CV with AI...
								</>
							) : (
								"Analyze CV with AI"
							)}
						</button>
					</div>

					{/* Right Column - Results */}
					<div className="space-y-6">
						{!analysis ? (
							<div className="bg-gray-800 rounded-xl p-8 text-center">
								<div className="text-6xl mb-4">📄</div>
								<p className="text-gray-400">
									Upload a CV to see analysis results here
								</p>
							</div>
						) : (
							<>
								{/* Match Score */}
								<div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-center">
									<h3 className="text-lg font-medium mb-4">CV Match Score</h3>
									<div className="flex justify-center mb-4">
										<CircularProgress
											percentage={analysis.matchScore}
											color="#ffffff"
										/>
									</div>
									<p className="text-sm opacity-90">Match with target job</p>
								</div>

								{/* Skills Analysis */}
								<div className="grid grid-cols-1 gap-4">
									{/* Identified Skills */}
									<div className="bg-gray-800 rounded-xl p-6">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-3 h-3 bg-green-500 rounded-full"></div>
											<h3 className="font-semibold">Identified Skills</h3>
										</div>
										<div className="flex flex-wrap gap-2">
											{analysis.identifiedSkills.map((skill, index) => (
												<SkillTag key={index} skill={skill} type="identified" />
											))}
										</div>
									</div>

									{/* Skills to Add */}
									<div className="bg-gray-800 rounded-xl p-6">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-3 h-3 bg-orange-500 rounded-full"></div>
											<h3 className="font-semibold">Skills to Add</h3>
										</div>
										<div className="flex flex-wrap gap-2">
											{analysis.skillsToAdd.slice(0, 10).map((skill, index) => (
												<SkillTag key={index} skill={skill} type="missing" />
											))}
										</div>
									</div>
								</div>

								{/* AI Recommendations */}
								<div className="bg-gray-800 rounded-xl p-6">
									<div className="flex items-center gap-2 mb-4">
										<Lightbulb className="h-5 w-5 text-yellow-500" />
										<h3 className="font-semibold">AI Recommendations</h3>
									</div>

									<div className="space-y-4">
										{analysis.recommendations.map((rec, index) => (
											<div
												key={index}
												className="border border-gray-700 rounded-lg p-4"
											>
												<div className="flex items-center gap-2 mb-2">
													<span className="text-sm font-medium text-blue-400">
														👉 {rec.title}
													</span>
												</div>
												<p className="text-sm text-gray-300">
													{rec.description}
												</p>
											</div>
										))}
									</div>
								</div>

								{/* Optimized Summary */}
								<div className="bg-gray-800 rounded-xl p-6">
									<div className="flex items-center gap-2 mb-4">
										<div className="w-3 h-3 bg-purple-500 rounded-full"></div>
										<h3 className="font-semibold">Optimized Summary</h3>
									</div>
									<p className="text-gray-300 leading-relaxed">
										{analysis.optimizedSummary}
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CVAnalyzer;
