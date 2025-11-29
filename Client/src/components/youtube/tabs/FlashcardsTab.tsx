import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import type { FlashcardsTabProps } from "../../../types/youtube";

interface FlippedCards {
	[key: number]: boolean;
}

const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ flashcards }) => {
	const [flippedCards, setFlippedCards] = useState<FlippedCards>({});

	const toggleFlip = (idx: number): void => {
		setFlippedCards({
			...flippedCards,
			[idx]: !flippedCards[idx],
		});
	};

	return (
		<div className="bg-gray-800 border border-[#2A2B4A] rounded-lg">
			<div className="p-4 border-b border-[#2A2B4A]">
				<h2 className="text-white text-xl font-semibold">
					Flashcards for Review
				</h2>
			</div>

			<div className="p-6">
				{flashcards && flashcards.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{flashcards.map((card, idx) => (
							<div
								key={idx}
								onClick={() => toggleFlip(idx)}
								className="relative p-6 bg-[#0F0F23] rounded-lg cursor-pointer hover:bg-[#1A1B2E] transition-all min-h-[150px] flex flex-col justify-between"
							>
								<div className="flex-1">
									{!flippedCards[idx] ? (
										<>
											<p className="text-[#4F46E5] font-semibold text-sm mb-2">
												Question:
											</p>
											<p className="text-white text-base">
												What is {card.front}
											</p>
										</>
									) : (
										<>
											<p className="text-green-400 font-semibold text-sm mb-2">
												Answer:
											</p>
											<p className="text-gray-300 text-sm leading-relaxed">
												{card.back}
											</p>
										</>
									)}
								</div>

								<div className="flex items-center justify-end mt-4">
									<div className="flex items-center gap-2 text-gray-500 text-xs">
										<RotateCw className="w-3 h-3" />
										<span>Click to flip</span>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500 text-center py-8">
						No flashcards available
					</p>
				)}
			</div>
		</div>
	);
};

export default FlashcardsTab;
