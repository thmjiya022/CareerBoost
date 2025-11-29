import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../../types/landing';
import Footer from '../../components/Footer';
import Header from '../../components/landing/Header';
import { FileText, GraduationCap, Briefcase, Zap, Target, Flag, BarChart, CheckCircle, Upload, Map, Book, Award } from 'lucide-react';

const Landing: React.FC = () => {
    const [scrollY, setScrollY] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const featuredServices: Service[] = [
        {
            id: 1,
            title: "AI CV Analyzer",
            description: "Get instant AI-powered analysis of your CV. Identify gaps, get optimization tips, and stand out to employers.",
            price: "Free",
            duration: "Instant",
            features: ["ATS Optimization", "Skills Gap Analysis", "Industry-specific Tips", "Real-time Feedback"],
            icon: <FileText className="w-12 h-12 text-blue-400" />,
        },
        {
            id: 2,
            title: "YouTube Learning",
            description: "Turn YouTube into your classroom. Get curated content, notes, flashcards, and personalized learning plans.",
            price: "Free",
            duration: "Self-paced",
            features: ["Curated Content", "Progress Tracking", "Skill Assessments", "Personalized Roadmaps"],
            icon: <GraduationCap className="w-12 h-12 text-purple-400" />,
        },
        {
            id: 3,
            title: "Job Market Intelligence",
            description: "Discover South African job opportunities, salary insights, in-demand skills, and market trends tailored to you.",
            price: "Free",
            duration: "Real-time",
            features: ["Local Job Matches", "Salary Insights", "Skill Demand Data", "Company Research"],
            icon: <Briefcase className="w-12 h-12 text-green-400" />,
        }
    ];

    const technologies = [
        "AI Analysis", "Machine Learning", "Real-time Data", "Career Analytics", "Skill Tracking", "Progress Monitoring", "Personalized Learning", "Job Matching"
    ];

    const benefits = [
        {
            icon: <Zap className="w-12 h-12 text-yellow-400" />,
            title: "30-Day Ready",
            description: "Become job-ready in just 30 days with our structured learning paths"
        },
        {
            icon: <Target className="w-12 h-12 text-pink-400" />,
            title: "AI-Powered",
            description: "Smart recommendations and personalized career guidance powered by AI"
        },
        {
            icon: <Flag className="w-12 h-12 text-red-400" />,
            title: "Local Focus",
            description: "Tailored specifically for South Africa's job market and opportunities"
        },
        {
            icon: <BarChart className="w-12 h-12 text-green-400" />,
            title: "Proven Success",
            description: "85% success rate with thousands of South African youth empowered"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
            <Header />
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
                <div
                    className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl -top-48 -right-24 animate-pulse"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                />
                <div
                    className="absolute w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl -bottom-36 -left-24 animate-pulse"
                    style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
                />
            </div>

            {/* Enhanced Hero Section */}
            <section className="pt-20 pb-20 px-6 text-center relative">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        <span className="bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                            Become Job-Ready in
                        </span>
                        <br />
                        <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                            30 Days
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Your AI-powered career coach. Fix your CV, learn in-demand skills, and discover real job opportunities in South Africa.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/cv-analyzer"
                            className="px-8 py-4 text-lg bg-linear-to-r from-blue-500 to-blue-600 rounded-full font-bold hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            Start Your Journey
                            <span className="text-xl">→</span>
                        </Link>
                        <button className="px-8 py-4 text-lg bg-transparent border-2 border-blue-500/50 rounded-full font-bold hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Trusted Technologies Section */}
            <section className="py-12 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Powered By Advanced Technology</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
                        {technologies.map((tech, index) => (
                            <div key={index} className="text-white font-medium text-lg hover:scale-110 transition-transform duration-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose CareerBoost Section */}
            <section className="py-20 bg-linear-to-b from-transparent via-blue-500/5 to-transparent">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose CareerBoost AI</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            We're transforming career development with AI-powered tools designed for South African youth
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
                                <div className="text-5xl mb-6 flex justify-center">{benefit.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Featured Services */}
            <section className="py-20 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Your Career Toolkit</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Everything you need to launch your career in South Africa's competitive job market
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredServices.map((service) => (
                            <Link
                                key={service.id}
                                to={service.id === 1 ? '/cv-analyzer' : service.id === 2 ? '/learn' : '/job-market'}
                                className="group relative bg-linear-to-br from-blue-500/10 to-blue-600/10 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 overflow-hidden text-left"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="text-5xl mb-6">{service.icon}</div>
                                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                        Get Started <span className="ml-2">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/features"
                            className="inline-flex items-center px-8 py-4 border-2 border-blue-500/50 rounded-full font-semibold text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300"
                        >
                            Explore All Features
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 bg-linear-to-b from-transparent via-blue-500/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Your 30-Day Journey</h2>
                        <p className="text-xl text-slate-400">Four simple steps to career success</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: "01", title: "Upload CV", desc: "Start with a quick CV analysis to identify your strengths and gaps", icon: <Upload className="w-8 h-8 mx-auto" /> },
                            { num: "02", title: "Get Your Plan", desc: "Receive a personalized learning roadmap based on your career goals", icon: <Map className="w-8 h-8 mx-auto" /> },
                            { num: "03", title: "Learn & Grow", desc: "Study with curated YouTube content and track your progress daily", icon: <Book className="w-8 h-8 mx-auto" /> },
                            { num: "04", title: "Land Your Job", desc: "Apply to matched opportunities with confidence and preparation", icon: <Award className="w-8 h-8 mx-auto" /> }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70 transition-all duration-300">
                                    {step.num}
                                </div>
                                <div className="text-4xl mb-3">{step.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Ready to Transform Your <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Career</span>?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                                In today's competitive job market, having the right skills and a standout CV is crucial for success.
                                We combine AI technology with local market insights to help South African youth launch their careers.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "AI-powered CV analysis and optimization",
                                    "Personalized learning paths with YouTube integration",
                                    "Real-time job market intelligence for South Africa",
                                    "Progress tracking and skill development monitoring"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                                        </div>
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative bg-linear-to-br from-blue-500/20 to-emerald-500/20 border-2 border-white/20 rounded-3xl p-8 text-center overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4">Start Your Journey Today</h3>
                                <p className="text-slate-300 mb-6">
                                    Join thousands of South African youth who are taking control of their future with CareerBoost AI.
                                </p>
                                <Link
                                    to="/cv-analyzer"
                                    className="inline-block bg-linear-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Landing;
