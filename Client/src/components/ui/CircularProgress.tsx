import React from "react";

interface CircularProgressProps {
	percentage: number;
	size?: number;
	strokeWidth?: number;
	color?: string;
	backgroundColor?: string;
	showPercentage?: boolean;
	className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
	percentage,
	size = 120,
	strokeWidth = 8,
	color = "#6366f1",
	backgroundColor = "#374151",
	showPercentage = true,
	className = "",
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDasharray = `${circumference} ${circumference}`;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div
			className={`relative ${className}`}
			style={{ width: size, height: size }}
		>
			<svg
				className="transform -rotate-90"
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
			>
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={backgroundColor}
					strokeWidth={strokeWidth}
					fill="transparent"
				/>

				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					className="transition-all duration-1000 ease-out"
				/>
			</svg>

			{showPercentage && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="text-2xl font-bold text-white">{percentage}</div>
						<div className="text-sm text-gray-400">/ 100</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CircularProgress;
