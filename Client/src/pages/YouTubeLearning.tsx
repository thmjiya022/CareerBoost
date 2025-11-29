import React, { useState } from "react";
import VideoInput from "../components/youtube/VideoInput";
import LessonList from "../components/youtube/LessonList";
import LessonContent from "../components/youtube/LessonContent";
import EmptyState from "../components/youtube/EmptyState";
import { useYouTube } from "../hooks/useYouTubeReturn";

const YouTubeLearning: React.FC = () => {
	const [videoUrl, setVideoUrl] = useState<string>("");

	const {
		lessons,
		selectedLesson,
		processing,
		error,
		processVideo,
		selectLesson,
		clearError,
	} = useYouTube();

	const extractVideoId = (url: string): string | null => {
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	const handleProcessVideo = async (): Promise<void> => {
		if (!videoUrl) return;

		const videoId = extractVideoId(videoUrl);
		if (!videoId) {
			alert("Invalid YouTube URL");
			return;
		}

		clearError();

		await processVideo(videoUrl);

		setVideoUrl("");
	};

	return (
		<div className="p-6 space-y-6 min-h-screen bg-slate-900 text-white overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">
						YouTube Learning
					</h1>
					<p className="text-gray-400">
						Transform any YouTube video into structured learning content
					</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
						<p className="text-red-400 text-sm">{error}</p>
					</div>
				)}

				<VideoInput
					videoUrl={videoUrl}
					setVideoUrl={setVideoUrl}
					onProcess={handleProcessVideo}
					isProcessing={processing}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<LessonList
						lessons={lessons}
						selectedLesson={selectedLesson}
						onSelectLesson={selectLesson}
					/>

					<div className="lg:col-span-2">
						{selectedLesson ? (
							<LessonContent
								lesson={selectedLesson}
								extractVideoId={extractVideoId}
							/>
						) : (
							<EmptyState />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default YouTubeLearning;
