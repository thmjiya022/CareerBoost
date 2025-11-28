import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import CVAnalyzer from "./pages/cv-analyzer/CVAnalyzer";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/cv-analyzer" element={<CVAnalyzer />} />
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
