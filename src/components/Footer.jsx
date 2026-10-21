import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
    const { isDarkMode } = useTheme();

    return (
        <footer
            style={{
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
                borderTopColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
            }}
        >
            <div className="max-w-7xl mx-auto px-8 lg:px-16">

                {/* ── Top: 4 link columns ── */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 py-8 border-b"
                    style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)' }}
                >

                    {/* Company */}
                    <div>
                        <h4 className="text-base font-bold mb-6" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Company</h4>
                        <ul className="space-y-4 text-sm" style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}>
                            <li>
                                <Link to="/about" className="transition-colors duration-200 text-lime-500 font-medium hover:text-lime-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gray-900 transition-colors duration-200" style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-6" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Services</h4>
                        <ul className="space-y-4 text-sm" style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}>
                            <li>
                                <a href="/services" className="hover:text-gray-900 transition-colors duration-200">
                                    Website Development
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="hover:text-gray-900 transition-colors duration-200">
                                    Startup MVP Development
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="hover:text-gray-900 transition-colors duration-200">
                                    AI Integration
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="hover:text-gray-900 transition-colors duration-200">
                                    UI/UX &amp; Branding
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="hover:text-gray-900 transition-colors duration-200">
                                    Technical SEO
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-base font-bold mb-6" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Resources</h4>
                        <ul className="space-y-4 text-sm" style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}>
                            <li>
                                <Link to="/projects" className="hover:text-gray-900 transition-colors duration-200">
                                    Featured Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/case-studies" className="hover:text-gray-900 transition-colors duration-200">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className="hover:text-gray-900 transition-colors duration-200">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-base font-bold mb-6" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>Connect</h4>
                        <ul className="space-y-4 text-sm" style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}>
                            <li>
                                <a
                                    href="https://github.com/HassanHashmi39"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gray-900 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    GitHub Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/HassanHashmi39/Skinzy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gray-900 transition-colors duration-200"
                                >
                                    Skinzy AI App ↗
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="transition-colors duration-200 font-semibold"
                                    style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
                                >
                                    Book a Call →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            {/* ── Bottom Bar ── */}
            <div
                className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
                style={{ color: isDarkMode ? '#4b5563' : '#9ca3af' }}
            >
                <div className="flex items-center gap-3">
                    <img
                        src={isDarkMode ? "/logo-icon-dark.png" : "/logo-icon-light.png"}
                        alt="DevQuilt"
                        className="h-7 w-auto object-contain opacity-70"
                    />
                    <span>© {new Date().getFullYear()} DevQuilt. All rights reserved.</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors duration-200">Privacy Policy</Link>
                    <Link to="/terms-conditions" className="hover:text-gray-600 transition-colors duration-200">Terms &amp; Conditions</Link>
                </div>
            </div>

        </div>
    </footer>
    );
}
