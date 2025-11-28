import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import YouTubeLearning from "./pages/YouTubeLearning";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
            <Route path="/learn" element={<YouTubeLearning />} />
		</Routes>
	);
};

export default App;
