import React, { useState } from "react";
import {
	FileText,
	Lightbulb,
	CheckCircle,
	BookOpen,
	type LucideIcon,
} from "lucide-react";
import SummaryTab from "./tabs/SummaryTab";
import NotesTab from "./tabs/NotesTab";
import QuizTab from "./tabs/QuizTab";
import FlashcardsTab from "./tabs/FlashcardsTab";
import type { LessonContentProps } from "../../types/youtube";

interface Tab {
	id: string;
	label: string;
	icon: LucideIcon;
}

const LessonContent: React.FC<LessonContentProps> = ({
	lesson,
	extractVideoId,
}) => {
	const [activeTab, setActiveTab] = useState<string>("summary");

	const tabs: Tab[] = [
		{ id: "summary", label: "Summary", icon: FileText },
		{ id: "notes", label: "Notes", icon: Lightbulb },
		{ id: "quiz", label: "Quiz", icon: CheckCircle },
		{ id: "flashcards", label: "Flashcards", icon: BookOpen },
	];

	return (
		<div className="space-y-4">
			{/* Tab Navigation */}
			<div className="bg-gray-800 border border-[#2A2B4A] rounded-lg p-1 flex gap-1">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
								activeTab === tab.id
									? "bg-[#4F46E5] text-white"
									: "text-gray-400 hover:text-white hover:bg-[#2A2B4A]"
							}`}
						>
							<Icon className="w-4 h-4" />
							<span className="font-medium">{tab.label}</span>
						</button>
					);
				})}
			</div>

			{/* Tab Content */}
			<div>
				{activeTab === "summary" && (
					<SummaryTab lesson={lesson} extractVideoId={extractVideoId} />
				)}
				{activeTab === "notes" && <NotesTab notes={lesson.ai_notes} />}
				{activeTab === "quiz" && <QuizTab questions={lesson.quiz_questions} />}
				{activeTab === "flashcards" && (
					<FlashcardsTab flashcards={lesson.flashcards} />
				)}
			</div>
		</div>
	);
};

export default LessonContent;
