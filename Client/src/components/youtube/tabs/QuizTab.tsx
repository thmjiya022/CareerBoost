import React, { useState } from 'react';
import type { QuizTabProps } from '../../../types/youtube';

interface SelectedAnswers {
    [key: number]: string;
}

const QuizTab: React.FC<QuizTabProps> = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
    const [showResults, setShowResults] = useState<boolean>(false);

    const handleAnswerSelect = (questionIdx: number, answer: string): void => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIdx]: answer
        });
    };

    const handleShowResults = (): void => {
        setShowResults(true);
    };

    const handleReset = (): void => {
        setSelectedAnswers({});
        setShowResults(false);
    };

    const calculateScore = (): number => {
        let correct = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correct_answer) {
                correct++;
            }
        });
        return correct;
    };

    return (
        <div className="bg-[#1A1B3A] border border-[#2A2B4A] rounded-lg">
            <div className="p-4 border-b border-[#2A2B4A]">
                <h2 className="text-white text-xl font-semibold">Test Your Knowledge</h2>
            </div>

            <div className="p-6">
                {showResults && (
                    <div className="mb-6 p-4 bg-[#4F46E5] rounded-lg text-center">
                        <p className="text-white text-lg font-semibold">
                            Score: {calculateScore()} / {questions.length}
                        </p>
                        <button
                            onClick={handleReset}
                            className="mt-2 px-4 py-2 bg-white text-[#4F46E5] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <div className="space-y-6">
                    {questions && questions.length > 0 ? (
                        questions.map((q, idx) => (
                            <div key={idx} className="p-4 bg-[#0F0F23] rounded-lg">
                                <p className="text-white font-medium mb-3">
                                    {idx + 1}. {q.question}
                                </p>
                                <div className="space-y-2">
                                    {q.options?.map((option, oIdx) => {
                                        const isSelected = selectedAnswers[idx] === option;
                                        const isCorrect = option === q.correct_answer;
                                        const showCorrect = showResults && isCorrect;
                                        const showIncorrect = showResults && isSelected && !isCorrect;

                                        return (
                                            <div
                                                key={oIdx}
                                                onClick={() => !showResults && handleAnswerSelect(idx, option)}
                                                className={`p-3 rounded border transition-all ${showCorrect
                                                        ? 'border-green-500 bg-green-500/10'
                                                        : showIncorrect
                                                            ? 'border-red-500 bg-red-500/10'
                                                            : isSelected
                                                                ? 'border-[#4F46E5] bg-[#4F46E5]/10'
                                                                : 'border-[#2A2B4A] hover:bg-[#2A2B4A]'
                                                    } ${!showResults ? 'cursor-pointer' : ''}`}
                                            >
                                                <p className="text-gray-300 text-sm">{option}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No quiz questions available</p>
                    )}
                </div>

                {questions && questions.length > 0 && !showResults && (
                    <button
                        onClick={handleShowResults}
                        disabled={Object.keys(selectedAnswers).length !== questions.length}
                        className="w-full mt-6 px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizTab;