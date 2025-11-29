# CareerBoost AI

[Live App](https://career-boost-ten.vercel.app/)

---

## Overview

**CareerBoost AI** is a digital career coach for young people in South Africa. It helps users improve their CVs, learn new skills, and prepare for jobs using AI and personalized learning plans. By combining CV analysis, YouTube-based learning, and job market insights, CareerBoost AI empowers users to become job-ready within 30 days.

---

## Purpose

Many young South Africans face challenges such as:

* Not knowing how to improve their CV
* Uncertainty about which skills are in demand
* Confusion about what to learn first
* Difficulty finding matching jobs
* Lack of guidance for interviews

CareerBoost AI provides step-by-step guidance to solve these challenges. It acts like a 24/7 career coach tailored for the South African job market.

---

## Features

### 1. AI CV Analyzer

* Upload your CV and get instant feedback.
* AI identifies missing skills and suggests improvements.
* Matches your CV to job descriptions for better results.

### 2. Personalized Learning Roadmaps

* Custom learning plan based on your target career.
* Daily checklist and progress tracking.
* Automatically updates as you complete lessons.

### 3. YouTube Learning Extractor

* Convert YouTube videos into structured study materials.
* Generates summaries, flashcards, and quizzes.
* Integrates lessons into your learning plan automatically.

### 4. South African Job Market Insights

* Shows in-demand jobs, salaries, and required skills.
* Helps you choose a realistic career path with opportunities.

---

## Tech Stack

**Frontend:**

* React
* TypeScript
* Tailwind CSS

**Backend:**

* Node.js
* Express

**AI Services:**

* Google Generative AI (Gemini 2.0 Flash)

**External APIs:**

* YouTube Data API v3

**Other:**

* Axios (HTTP requests)
* FormData (CV uploads)
* Environment variables:

  * `GEMINI_API_KEY` → AI
  * `YOUTUBE_API_KEY` → YouTube

---

## Pages & UX

* **Landing Page:** Hero section, feature cards, CTAs.
* **Login Page:** Google login, clean layout.
* **Dashboard:** Career score, progress tracker, quick actions.
* **CV Analyzer:** Upload CV, view AI feedback, download optimized CV.
* **Learning Hub:** Timeline, checklist, YouTube lessons.
* **Job Market:** In-demand jobs, salaries, skill trends.
* **Mobile-First:** Easy navigation, swipe-friendly, large buttons.

---

## Backend Services Overview

### CV Analysis

* Uses Gemini AI to analyze CV text.
* Returns structured JSON:

```json
{
  "matchScore": 0-100,
  "identifiedSkills": [],
  "skillsToAdd": [],
  "recommendations": [],
  "optimizedSummary": "",
  "careerReadinessScore": 0
}
```

### YouTube Learning

* Fetches video data using YouTube Data API.
* AI generates educational content:

  * Summary
  * Notes
  * Flashcards
  * Quiz questions
* Handles fallback if AI fails.

### CV Upload & Analyze

* Upload CV via backend endpoint.
* Optional job description for targeted feedback.
* Returns actionable suggestions.

---

## Usage

1. Clone the repo:

```bash
git clone https://github.com/your-username/careerboost-ai.git
```

2. Install dependencies:

```bash
cd careerboost-ai
npm install
```

3. Set environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Run frontend and backend:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to use the app.

---

## Why This Matters

* Reduces youth unemployment in South Africa.
* Makes career guidance accessible and affordable.
* Turns YouTube videos into effective learning content.
* Prepares users for real jobs with actionable guidance.

---

##  Summary

CareerBoost AI is a **one-stop platform** to help South African youth become job-ready quickly. It combines AI-powered CV analysis, learning roadmaps, YouTube study material, and job market insights into a single easy-to-use platform.

---

## License

MIT License
