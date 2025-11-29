import { Link, useLocation } from "react-router-dom";
import {
	Home,
	FileText,
	Briefcase,
	GraduationCap,
	Youtube,
	BarChart3,
	Settings,
	LogOut,
} from "lucide-react";

interface SidebarProps {
	isMobileOpen: boolean;
	setIsMobileOpen: (open: boolean) => void;
}

const Sidebar = ({ isMobileOpen, setIsMobileOpen }: SidebarProps) => {
	const location = useLocation();

	const navigationItems = [
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: Home,
			current: location.pathname === "/dashboard",
		},
		{
			name: "CV Analyzer",
			href: "/dashboard/cv-analyzer",
			icon: FileText,
			current: location.pathname === "/dashboard/cv-analyzer",
		},
		{
			name: "Job Market",
			href: "/dashboard/job-market",
			icon: Briefcase,
			current: location.pathname === "/dashboard/job-market",
		},
		{
			name: "Learning Hub",
			href: "/dashboard/learn",
			icon: GraduationCap,
			current: location.pathname === "/dashboard/learn",
		},
		{
			name: "YouTube Learning",
			href: "/dashboard/youtube",
			icon: Youtube,
			current: location.pathname === "/dashboard/youtube",
		},
		{
			name: "Analytics",
			href: "/dashboard/analytics",
			icon: BarChart3,
			current: location.pathname === "/dashboard/analytics",
		},
	];

	const handleNavClick = () => {
		setIsMobileOpen(false);
	};

	return (
		<>
			{isMobileOpen && (
				<div
					className="fixed inset-0 z-50 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
				>
					<div className="fixed inset-0 bg-black/50" />
				</div>
			)}

			<div className="hidden lg:flex flex-col h-full w-64 bg-gray-900 border-r border-gray-800">
				<div className="flex items-center px-6 py-6 border-b border-gray-800">
					<div className="flex items-center">
						<div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">CB</span>
						</div>
						<span className="ml-3 text-xl font-semibold text-white">
							CareerBoost
						</span>
					</div>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
					{navigationItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								to={item.href}
								onClick={handleNavClick}
								className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
									item.current
										? "bg-blue-600 text-white"
										: "text-gray-300 hover:bg-gray-800 hover:text-white"
								}`}
							>
								<Icon
									className={`mr-3 h-5 w-5 shrink-0 ${
										item.current
											? "text-white"
											: "text-gray-400 group-hover:text-gray-300"
									}`}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>

				<div className="px-4 py-4 border-t border-gray-800">
					<div className="space-y-1">
						<Link
							to="/settings"
							onClick={handleNavClick}
							className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
						>
							<Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
							Settings
						</Link>
						<button
							onClick={() => {
								handleNavClick();
								window.location.href = "/login";
							}}
							className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors duration-200"
						>
							<LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-400" />
							Sign Out
						</button>
					</div>
				</div>
			</div>

			<div className="hidden md:flex lg:hidden flex-col h-full w-16 bg-gray-900 border-r border-gray-800">
				<div className="flex items-center justify-center px-3 py-6 border-b border-gray-800">
					<div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">CB</span>
					</div>
				</div>

				<nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
					{navigationItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								to={item.href}
								onClick={handleNavClick}
								title={item.name}
								className={`group flex items-center justify-center p-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
									item.current
										? "bg-blue-600 text-white"
										: "text-gray-300 hover:bg-gray-800 hover:text-white"
								}`}
							>
								<Icon
									className={`h-5 w-5 shrink-0 ${
										item.current
											? "text-white"
											: "text-gray-400 group-hover:text-gray-300"
									}`}
								/>
							</Link>
						);
					})}
				</nav>

				<div className="px-2 py-4 border-t border-gray-800">
					<div className="space-y-2">
						<Link
							to="/settings"
							onClick={handleNavClick}
							title="Settings"
							className="group flex items-center justify-center p-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
						>
							<Settings className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
						</Link>
						<button
							onClick={() => {
								handleNavClick();
								window.location.href = "/login";
							}}
							title="Sign Out"
							className="w-full group flex items-center justify-center p-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors duration-200"
						>
							<LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-400" />
						</button>
					</div>
				</div>
			</div>

			<div
				className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
					isMobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center px-6 py-6 border-b border-gray-800">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">CB</span>
							</div>
							<span className="ml-3 text-xl font-semibold text-white">
								CareerBoost
							</span>
						</div>
					</div>

					<nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									to={item.href}
									onClick={handleNavClick}
									className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
										item.current
											? "bg-blue-600 text-white"
											: "text-gray-300 hover:bg-gray-800 hover:text-white"
									}`}
								>
									<Icon
										className={`mr-3 h-5 w-5 shrink-0 ${
											item.current
												? "text-white"
												: "text-gray-400 group-hover:text-gray-300"
										}`}
									/>
									{item.name}
								</Link>
							);
						})}
					</nav>

					<div className="px-4 py-4 border-t border-gray-800">
						<div className="space-y-1">
							<Link
								to="/settings"
								onClick={handleNavClick}
								className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
							>
								<Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-300" />
								Settings
							</Link>
							<button
								onClick={() => {
									handleNavClick();
									window.location.href = "/login";
								}}
								className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors duration-200"
							>
								<LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-400" />
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
