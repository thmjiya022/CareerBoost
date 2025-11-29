import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import CVAnalyzer from "./pages/cv-analyzer/CVAnalyzer";
import JobMarket from "./pages/job-market/JobMarket";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import YouTubeLearning from "./pages/YouTubeLearning";
import Contact from "./pages/landing/Contact";
import About from "./pages/landing/About";
import Services from "./pages/landing/Services";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/cv-analyzer" element={<CVAnalyzer />} />
				<Route path="/job-market" element={<JobMarket />} />
				<Route path="/learn" element={<YouTubeLearning />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
			</Routes>
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "#374151",
						color: "#fff",
					},
				}}
			/>
		</>
	);
};

export default App;
