import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900/90 backdrop-blur-xl border-t border-white/10 py-16 text-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Company */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-black bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                                CareerBoost
                            </span>
                        </div>

                        <p className="text-slate-400 max-w-md mb-6">
                            AI-powered platform that helps South African youth become job-ready.
                            Includes CV analysis, personalized learning plans, and job-market insights.
                        </p>

                        {/* Social icons */}
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    className="text-slate-400 hover:text-white text-xl transition-colors"
                                >
                                    <i className={`fab fa-${platform}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Home', 'Services', 'Portfolio', 'About'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope"></i>
                                contact@careerboost.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-slate-500 border-t border-white/10 mt-12 pt-6">
                    © {currentYear} careerboost. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
