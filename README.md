# CareerBoost By PhantomDev

**[🌐 Live Demo](https://career-boost-ten.vercel.app/)**

**AI-Powered Career Development Platform for South African Youth Unemployment Hackathon**

A comprehensive web application that empowers job seekers with AI-driven CV analysis, real-time job market intelligence, and personalized skill learning through YouTube content.

---

## **Problem Addressed**
South African youth unemployment crisis requires innovative career development tools that are:
- **Accessible**: Free, web-based platform
- **AI-Powered**: Modern technology for personalized guidance
- **Real-Time**: Live job market data and opportunities
- **Skill-Focused**: Learning pathways tied to market demands

## **Innovation Highlights**
- **AI-First Approach**: Leveraging latest Gemini 2.0-flash for intelligent analysis
- **Real Market Data**: Direct integration with job market APIs
- **Learning Integration**: YouTube-to-education pipeline for skill development
- **Mobile Responsive**: Accessible on any device for wider reach

---

## Key Features

### **CV Analyzer**
- **AI-Powered Analysis**: Upload CV and get instant feedback using Google Gemini 2.0-flash
- **Skills Gap Detection**: Identify missing skills for target positions
- **Actionable Insights**: Personalized recommendations to improve your resume
- **PDF Support**: Seamless PDF parsing and text extraction

### **Job Market Intelligence**
- **Real Job Data**: Live integration with Adzuna Jobs API for South African market
- **Smart Filtering**: Search by location, salary range, job type, and categories
- **Pagination**: Browse thousands of opportunities efficiently
- **10-Hour Caching**: Optimized performance with intelligent caching

### **YouTube Learning Hub**
- **AI Content Generation**: Transform any YouTube video into structured learning material
- **4 Learning Formats**: Summary, detailed notes, flashcards, and interactive quizzes
- **Skill Development**: Targeted learning based on CV analysis results
- **Mobile Responsive**: Learn on any device, anywhere

### **Smart Dashboard**
- **Unified Interface**: Access all tools from a beautiful, responsive dashboard
- **Hover Effects**: Engaging UI with glow animations and smooth transitions
- **Quick Actions**: Fast access to core features
- **Progress Tracking**: Monitor your career development journey

---

## Technology Stack

### **Frontend** (React 19 + TypeScript)
```bash
• React 19 with TypeScript
• Vite for fast development
• Tailwind CSS 4 for styling
• Lucide React icons
• React Router for navigation
• Axios for API communication
• React Hot Toast notifications
```

### **Backend** (Node.js + Express)
```bash
• Express.js REST API
• Google Gemini 2.0-flash AI
• Adzuna Jobs API integration
• YouTube transcript extraction
• PDF parsing with pdf-parse
• Multer for file uploads
• CORS & security middleware
```

### **Key APIs & Services**
- **Google Gemini 2.0-flash**: CV analysis and content generation
- **Adzuna Jobs API**: Real South African job market data
- **YouTube Data API**: Video metadata and transcript extraction

---

## Quick Start

### Prerequisites
- Node.js 18+
- Google Gemini API key
- Adzuna API credentials

### 1. Clone & Install
```bash
git clone https://github.com/thmjiya022/CareerBoost.git
cd CareerBoost

cd Server && npm install

cd ../Client && npm install
```

### 2. Environment Setup
Create `Server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
PORT=5000
```

### 3. Launch Application
```bash
# Start backend (from Server directory)
npm run dev

# Start frontend (from Client directory) 
npm run dev
```

**Access:** Frontend at `http://localhost:5173` | Backend at `http://localhost:5000`


## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cv/analyze` | POST | AI-powered CV analysis |
| `/api/jobs/search` | GET | Search job opportunities |
| `/api/jobs/categories` | GET | Get job categories |
| `/api/youtube/analyze` | POST | Generate learning content from YouTube |

---

## Development Team

**Tech Stack Chosen For:**
- **Performance**: React 19 + Vite for fast development
- **AI Integration**: Google Gemini for intelligent content analysis  
- **User Experience**: Tailwind CSS 4 for modern, responsive design
- **Reliability**: TypeScript for type safety and better code quality

---

## Mobile Responsive

Fully optimized for mobile devices with:
- Touch-friendly interfaces
- Responsive layouts
- Mobile-specific navigation
- Optimized loading and caching

*Ready to empower South African youth with AI-driven career tools!* 🇿🇦
