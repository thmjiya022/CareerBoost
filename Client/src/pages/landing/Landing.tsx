import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className="min-h-screen bg-gray-900 text-white p-8">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-4xl font-bold mb-8">CareerBoost AI</h1>
				<p className="text-xl text-gray-300 mb-12">
					Transform your career with AI-powered tools
				</p>

				<div className="grid md:grid-cols-2 gap-8">
					<Link
						to="/cv-analyzer"
						className="bg-blue-600 hover:bg-blue-700 p-8 rounded-xl transition-colors"
					>
						<div className="text-4xl mb-4">📄</div>
						<h2 className="text-2xl font-bold mb-4">CV Analyzer</h2>
						<p className="text-gray-200">
							Upload your CV and get instant AI-powered analysis and
							optimization
						</p>
					</Link>

					<Link
						to="/learn"
						className="bg-blue-600 hover:bg-blue-700 p-8 rounded-xl transition-colors"
					>
						<div className="text-4xl mb-4">📄</div>
						<h2 className="text-2xl font-bold mb-4">YouTube Learning</h2>
						<p className="text-gray-200">
							Explore curated YouTube content to boost your skills
						</p>
					</Link>

					<Link
						to="/job-market"
						className="bg-green-600 hover:bg-green-700 p-8 rounded-xl transition-colors"
					>
						<div className="text-4xl mb-4">💼</div>
						<h2 className="text-2xl font-bold mb-4">Job Market Intelligence</h2>
						<p className="text-gray-200">
							Explore South African job opportunities, salary insights, and
							market trends
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Landing;
