import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface SkillTagProps {
	skill: string;
	type: "identified" | "missing";
	className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, type, className = "" }) => {
	const baseClasses =
		"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors";

	const typeClasses = {
		identified: "bg-green-900/50 text-green-400 border border-green-700",
		missing: "bg-orange-900/50 text-orange-400 border border-orange-700",
	};

	const Icon = type === "identified" ? CheckCircle : AlertCircle;

	return (
		<span className={`${baseClasses} ${typeClasses[type]} ${className}`}>
			<Icon className="h-4 w-4" />
			{skill}
		</span>
	);
};

export default SkillTag;
