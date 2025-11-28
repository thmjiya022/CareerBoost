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

					<div className="bg-gray-800 p-8 rounded-xl">
						<div className="text-4xl mb-4">🎓</div>
						<h2 className="text-2xl font-bold mb-4">Learning Hub</h2>
						<p className="text-gray-400">
							Coming soon - Personalized learning paths
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
