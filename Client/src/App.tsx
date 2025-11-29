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
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardLayout from "./components/dashboard/DashboardLayout";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />

				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="cv-analyzer" element={<CVAnalyzer />} />
					<Route path="job-market" element={<JobMarket />} />
					<Route path="learn" element={<YouTubeLearning />} />
					<Route path="youtube" element={<YouTubeLearning />} />
					<Route
						path="analytics"
						element={
							<div className="p-6 space-y-6 h-full bg-slate-900 text-white overflow-hidden">
								<h1 className="text-white text-2xl">Analytics Coming Soon</h1>
							</div>
						}
					/>
				</Route>
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
