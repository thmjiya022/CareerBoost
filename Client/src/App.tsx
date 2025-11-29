import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import CVAnalyzer from "./pages/cv-analyzer/CVAnalyzer";
import { Toaster } from "react-hot-toast";
import YouTubeLearning from "./pages/YouTubeLearning";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/cv-analyzer" element={<CVAnalyzer />} />
                <Route path="/learn" element={<YouTubeLearning />} />
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
