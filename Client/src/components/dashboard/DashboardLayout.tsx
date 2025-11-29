import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="flex h-screen bg-gray-950">
			<Sidebar
				isMobileOpen={isMobileMenuOpen}
				setIsMobileOpen={setIsMobileMenuOpen}
			/>

			<div className="flex-1 flex flex-col overflow-hidden md:ml-0">
				<div className="md:hidden bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">CB</span>
						</div>
						<span className="ml-3 text-lg font-semibold text-white">
							CareerBoost
						</span>
					</div>
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				<main className="flex-1 overflow-auto bg-gray-950">
					<div className="h-full">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
