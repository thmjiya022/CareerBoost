// pages/About.tsx
import React from 'react';
import Header from '../../components/landing/Header';
import Footer from '../../components/Footer';
import thobaniImg from '../../assets/thobani.jpg';
import massambaImg from '../../assets/massamba.jpg';
import { Activity, Cpu, Users } from 'lucide-react';

const About: React.FC = () => {
    const teamMembers = [
        {
            name: "Thobani Mjiyakho",
            role: "CEO & Career Strategist",
            bio: "Former Microsoft AI researcher with ML expertise",
            image: thobaniImg
        },
        {
            name: "Massamba Maphalala",
            role: "CTO & AI Specialist",
            bio: "Former Microsoft AI researcher with ML expertise",
            image: massambaImg
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Header />

            {/* Hero Section */}
            <section className="py-20 bg-linear-to-br from-slate-800 via-blue-900 to-emerald-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">
                            About CareerBoost AI
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Empowering South African Youth Through AI-Powered Career Development
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-black mb-6">Our Mission</h2>
                                <div className="space-y-4 text-slate-300">
                                    <p>
                                        CareerBoost AI was born from a simple observation: millions of talented South African youth
                                        struggle to find meaningful employment despite their potential. We believe everyone deserves
                                        a fair shot at building a successful career.
                                    </p>
                                    <p>
                                        Our platform combines artificial intelligence with human expertise to provide personalized
                                        career guidance, skills development, and job matching specifically designed for the
                                        South African market.
                                    </p>
                                    <p>
                                        We're committed to breaking down barriers to employment and creating equal opportunities
                                        for all South Africans to thrive in their careers.
                                    </p>
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-6 bg-slate-700 rounded-lg">
                                        <div className="text-3xl font-black text-blue-400 mb-2">AI</div>
                                        <div className="text-slate-300">Personalized Guidance</div>
                                    </div>
                                    <div className="text-center p-6 bg-slate-700 rounded-lg">
                                        <div className="text-3xl font-black text-emerald-400 mb-2">CV</div>
                                        <div className="text-slate-300">Analysis & Feedback</div>
                                    </div>
                                    <div className="text-center p-6 bg-slate-700 rounded-lg">
                                        <div className="text-3xl font-black text-purple-400 mb-2">30 Days</div>
                                        <div className="text-slate-300">Learning Plans</div>
                                    </div>
                                    <div className="text-center p-6 bg-slate-700 rounded-lg">
                                        <div className="text-3xl font-black text-cyan-400 mb-2">Jobs</div>
                                        <div className="text-slate-300">Matched to You</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Values */}
            <section className="py-16 bg-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-4">Our Values</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                                <Users className="text-blue-400 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Accessibility</h3>
                            <p className="text-slate-300">
                                Making career development accessible to every South African, regardless of background or location.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                                <Cpu className="text-emerald-400 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                            <p className="text-slate-300">
                                Leveraging cutting-edge AI technology to provide personalized career guidance at scale.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                                <Activity className="text-purple-400 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Impact</h3>
                            <p className="text-slate-300">
                                Measuring our success by the real career outcomes and lives we transform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-4">Meet Our Team</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Passionate experts dedicated to South Africa's youth development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto justify-items-center">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="text-center bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-600">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-blue-400 font-semibold mb-3">{member.role}</p>
                                <p className="text-slate-300 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
