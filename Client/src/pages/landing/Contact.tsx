import React from 'react';
import Header from '../../components/landing/Header';
import Footer from '../../components/Footer';

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">

            {/* Header */}
            <Header />

            {/* Page Content */}
            <div className="py-16">
                <div className="container mx-auto px-4">

                    <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Us</h1>

                    <p className="text-center text-slate-300 max-w-2xl mx-auto mb-12">
                        Have questions, feedback, or need support? We'd love to hear from you.
                        Fill in the form below and our team will get back to you.
                    </p>

                    {/* Contact Form */}
                    <form className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10">

                        <div className="mb-6">
                            <label className="block text-slate-200 mb-2">Your Name</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-slate-200 mb-2">Your Email</label>
                            <input
                                type="email"
                                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-slate-200 mb-2">Message</label>
                            <textarea
                                rows={5}
                                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
