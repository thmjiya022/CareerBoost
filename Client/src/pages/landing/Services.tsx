// pages/Services.tsx
import React from 'react';
import Header from '../../components/landing/Header';
import Footer from '../../components/Footer';
import { Brain, BookOpen, Video, Briefcase, UserCheck, Search } from 'lucide-react';

const Services: React.FC = () => {

    const services = [
        {
            icon: <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />,
            title: "AI CV Analysis",
            description:
                "Upload your CV and get instant AI-powered feedback with improvements, score breakdowns, and job relevance checks.",
        },
        {
            icon: <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-4" />,
            title: "30-Day Learning Plan",
            description:
                "Receive a personalized skills roadmap tailored to your career goals and job market demand in South Africa.",
        },
        {
            icon: <Video className="w-12 h-12 text-purple-400 mx-auto mb-4" />,
            title: "YouTube Learning Assistant",
            description:
                "Paste any YouTube link and our AI automatically creates summaries, notes, quizzes, and skill tags for your learning.",
        },
        {
            icon: <Briefcase className="w-12 h-12 text-cyan-400 mx-auto mb-4" />,
            title: "Job Matching",
            description:
                "Get matched to real job opportunities that fit your CV, skills, and learning path using our AI matching system.",
        },
        {
            icon: <UserCheck className="w-12 h-12 text-pink-400 mx-auto mb-4" />,
            title: "Interview Coaching",
            description:
                "Practice interview questions with AI coaching and receive personalized feedback to boost your confidence.",
        },
        {
            icon: <Search className="w-12 h-12 text-yellow-400 mx-auto mb-4" />,
            title: "Career Guidance",
            description:
                "Discover careers that match your profile, strengths, and interests through AI-powered assessments.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="py-20 bg-linear-to-br from-slate-800 via-blue-900 to-emerald-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Powerful AI tools built to help South African youth become job-ready in 30 days.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-4">What We Offer</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            CareerBoost combines advanced technology with real-world insights to help you grow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto place-items-center">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 w-full"
                            >
                                {service.icon}
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-slate-300 text-sm">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-800 border-t border-slate-700 mt-10">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-6">Start Your Career Journey Today</h2>
                        <p className="text-slate-300 mb-8">
                            Whether you're looking for your first job or trying to level up your skills,
                            CareerBoost gives you the tools to succeed.
                        </p>
                        <a
                            href="/register"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white transition-all"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
