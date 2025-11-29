// components/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types/landing';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems: NavItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-gray-900 shadow-md sticky top-0 z-50 transition-all duration-300 hover:shadow-xl">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-extralight">
                        <span className="text-gray-100">Career</span>
                        <span className="text-blue-400">Boost</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center font-extralight">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`transition duration-300 ${isActive(item.href)
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-gray-100 hover:text-blue-300 hover:scale-105'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-100 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300`}></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 animate-fadeIn font-extralight">
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={`py-2 transition duration-300 ${isActive(item.href)
                                        ? 'text-blue-400'
                                        : 'text-gray-100 hover:text-blue-300 hover:translate-x-2'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
