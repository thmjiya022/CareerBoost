import React from "react";
import type { LessonListProps } from "../../types/youtube";

const LessonList: React.FC<LessonListProps> = ({
	lessons,
	selectedLesson,
	onSelectLesson,
}) => {
	return (
		<div className="lg:col-span-1">
			<div className="bg-gray-800 border border-[#2A2B4A] rounded-lg">
				<div className="p-3 sm:p-4 border-b border-[#2A2B4A]">
					<h2 className="text-white text-base sm:text-lg font-semibold">
						Your Lessons ({lessons.length})
					</h2>
				</div>

				<div className="p-2 sm:p-4">
					<div className="space-y-2 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
						{lessons.length > 0 ? (
							lessons.map((lesson: any) => (
								<div
									key={lesson.id}
									onClick={() => onSelectLesson(lesson)}
									className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all ${
										selectedLesson?.id === lesson.id
											? "bg-[#4F46E5] border border-[#4F46E5]"
											: "bg-[#0F0F23] hover:bg-[#2A2B4A] border border-transparent"
									}`}
								>
									<div className="flex gap-2 sm:gap-3">
										<img
											src={lesson.thumbnail_url}
											alt={lesson.video_title}
											className="w-16 h-10 sm:w-20 sm:h-12 object-cover rounded flex-shrink-0"
											onError={(e) => {
												e.currentTarget.src =
													"https://via.placeholder.com/120x90?text=Video";
											}}
										/>
										<div className="flex-1 min-w-0">
											<p className="text-white text-xs sm:text-sm font-medium line-clamp-2 mb-1">
												{lesson.video_title}
											</p>
											<p className="text-gray-400 text-[10px] sm:text-xs">
												{lesson.duration_minutes} min • {lesson.category}
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-gray-500 text-xs sm:text-sm text-center py-6 sm:py-8">
								No lessons yet. Add your first video!
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonList;
