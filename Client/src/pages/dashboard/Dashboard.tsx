import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Briefcase,
	FileText,
	GraduationCap,
	BarChart3,
	ArrowRight,
} from "lucide-react";

interface DashboardCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
	href: string;
	stats?: string;
	gradient: string;
	glowColor: string;
}

const DashboardCard = ({
	title,
	description,
	icon,
	href,
	stats,
	gradient,
	glowColor,
}: DashboardCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			to={href}
			className="relative group block"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`absolute inset-0 ${
					isHovered ? glowColor : "opacity-0"
				} rounded-2xl blur-xl transition-all duration-500 transform ${
					isHovered ? "scale-105" : "scale-95"
				}`}
			/>

			<div
				className={`relative backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full transition-all duration-300 hover:border-gray-700/50 ${
					isHovered ? "transform scale-105 shadow-2xl" : ""
				}`}
			>
				<div
					className={`absolute inset-0 ${gradient} opacity-10 rounded-2xl`}
				/>

				<div className="relative z-10">
					<div className="flex items-center justify-between mb-4">
						<div className={`p-3 rounded-xl ${gradient} bg-opacity-20`}>
							{icon}
						</div>
						{stats && (
							<span className="text-sm font-semibold text-gray-400">
								{stats}
							</span>
						)}
					</div>

					<h3 className="text-xl font-bold text-white mb-2">{title}</h3>
					<p className="text-gray-400 mb-4 text-sm">{description}</p>

					<div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
						Get Started
						<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
					</div>
				</div>
			</div>
		</Link>
	);
};

const Dashboard = () => {
	const dashboardCards = [
		{
			title: "CV Analysis",
			description:
				"Get AI-powered insights on your resume and improve your job prospects",
			icon: <FileText className="w-6 h-6 text-blue-400" />,
			href: "/dashboard/cv-analyzer",
			stats: "Last analyzed 2 days ago",
			gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
			glowColor: "bg-blue-500/20",
		},
		{
			title: "Job Market",
			description:
				"Explore opportunities tailored to your skills and career goals",
			icon: <Briefcase className="w-6 h-6 text-purple-400" />,
			href: "/dashboard/job-market",
			stats: "150+ new jobs today",
			gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
			glowColor: "bg-purple-500/20",
		},
		{
			title: "Skill Learning",
			description:
				"Learn new skills through curated YouTube content and interactive lessons",
			icon: <GraduationCap className="w-6 h-6 text-green-400" />,
			href: "/dashboard/learn",
			stats: "5 courses in progress",
			gradient: "bg-gradient-to-br from-green-500 to-green-700",
			glowColor: "bg-green-500/20",
		},
		{
			title: "Career Analytics",
			description:
				"Track your career progress and get personalized recommendations",
			icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
			href: "/dashboard/analytics",
			stats: "Progress tracked",
			gradient: "bg-gradient-to-br from-orange-500 to-orange-700",
			glowColor: "bg-orange-500/20",
		},
	];

	return (
		<div className="p-6 space-y-6 h-full bg-slate-900 text-white overflow-hidden ">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white mb-2">Dahboard</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
				{dashboardCards.map((card, index) => (
					<DashboardCard key={index} {...card} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
