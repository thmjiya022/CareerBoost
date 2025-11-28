export interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface Flashcard {
    front: string;
    back: string;
}

export interface Lesson {
    id: number;
    video_url: string;
    video_title: string;
    thumbnail_url: string;
    ai_summary: string;
    ai_notes: string[];
    quiz_questions: QuizQuestion[];
    flashcards: Flashcard[];
    category: string;
    duration_minutes: number;
    created_at?: Date;
    user_id?: number;
}

export interface VideoInputProps {
    videoUrl: string;
    setVideoUrl: (url: string) => void;
    onProcess: () => void;
    isProcessing: boolean;
}

export interface LessonListProps {
    lessons: Lesson[];
    selectedLesson: Lesson | null;
    onSelectLesson: (lesson: Lesson) => void;
}

export interface LessonContentProps {
    lesson: Lesson;
    extractVideoId: (url: string) => string | null;
}

export interface SummaryTabProps {
    lesson: Lesson;
    extractVideoId: (url: string) => string | null;
}

export interface NotesTabProps {
    notes: string[];
}

export interface QuizTabProps {
    questions: QuizQuestion[];
}

export interface FlashcardsTabProps {
    flashcards: Flashcard[];
}