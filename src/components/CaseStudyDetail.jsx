import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import skinzyImg from "../assets/projects/skinzy.jpg";
import reactNativePortfolioImg from "../assets/projects/react-native-portfolio.jpg";
import reactjsPortfolioImg from "../assets/projects/reactjs-portfolio.jpg";
import javaTaskManagerImg from "../assets/projects/java-task-manager.jpg";

const caseStudiesData = {
    "1": {
        title: "Skinzy — AI-Powered Skin Care & Wellness App",
        category: "AI & Mobile Health",
        tech: "TypeScript • PyTorch (ResNet18) • React Native",
        github: "https://github.com/HassanHashmi39/Skinzy",
        color: "bg-purple-600",
        text: "text-white",
        image: skinzyImg,
        overview: "Skinzy is a full-stack AI-driven application designed to revolutionize skin health by combining computer vision with personalized medical history to deliver professional-grade skin analysis, condition tracking, and localized recommendations.",
        features: [
            "AI Skin Analysis: Advanced detection of Acne, Dryness, Oiliness, Pigmentation using PyTorch (ResNet18)",
            "Personalized Action Plans: Automated morning and night skincare routines tailored to AI diagnostic findings",
            "History Tracking: Visual progress logs documenting changes in skin health over time",
            "Smart Recommendations: Product suggestions from verified local brands matched to skin profiles",
            "Real-time Chat & Booking: Secure messaging with certified dermatologists and seamless appointment scheduling",
            "Doctor Dashboard: Dedicated clinician portal for reviewing patient histories and analysis reports"
        ]
    },
    "2": {
        title: "React Native Portfolio App",
        category: "Mobile Application",
        tech: "React Native • TypeScript",
        github: "https://github.com/HassanHashmi39/React-Native-Portfolio-App",
        color: "bg-blue-600",
        text: "text-white",
        image: reactNativePortfolioImg,
        overview: "A cross-platform mobile portfolio application engineered with React Native that showcases services, technical skills, interactive project galleries, and direct client communication channels.",
        features: [
            "Cross-Platform Native Experience: Smooth performance on both iOS and Android devices",
            "Interactive Service Showcase: Dynamic presentation of development and design capabilities",
            "Animated Project Galleries: High-fidelity previews and case studies with fluid transitions",
            "Direct Contact & Inquiries: Integrated contact forms with instant message delivery",
            "Social Media Hub: Unified links to GitHub, LinkedIn, and developer platforms"
        ]
    },
    "3": {
        title: "ReactJs Portfolio Website",
        category: "Modern Web Platform",
        tech: "React.js • Tailwind CSS • JavaScript",
        github: "https://github.com/HassanHashmi39/ReactJs-PortfolioWebsite",
        color: "bg-lime-400",
        text: "text-black",
        image: reactjsPortfolioImg,
        overview: "A modern, responsive portfolio website built with React.js and Tailwind CSS featuring dark and light mode, interactive project galleries, and online meeting booking.",
        features: [
            "Adaptive Theme Engine: Seamless dark and light mode toggle with persistent state",
            "Client Meeting Scheduler: Direct online appointment booking and consultation requests",
            "Performance & SEO: Optimized asset loading, semantic HTML hierarchy, and clean metadata",
            "Interactive Component System: Modular, reusable React components with smooth hover effects"
        ]
    },
    "4": {
        title: "Java GUI Task Manager Application",
        category: "Desktop Application",
        tech: "Java • Java Swing • OOP",
        github: "https://github.com/HassanHashmi39/Java-GUI-based-Task-Manager-application",
        color: "bg-amber-500",
        text: "text-black",
        image: javaTaskManagerImg,
        overview: "A desktop productivity application built in Java Swing designed for organizing daily tasks, tracking project milestones, and streamlining task management with a clean modular structure.",
        features: [
            "Modular Architecture: Object-oriented design separating UI components, task models, and controllers",
            "Task Lifecycle Management: Creation, editing, priority setting, and status updates",
            "Intuitive Swing GUI: Lightweight desktop interface built with responsive Swing layouts",
            "Data Persistence: Structured storage to preserve user task states across sessions"
        ]
    }
};

const CaseStudyDetail = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const study = caseStudiesData[id];

    if (!study) {
        return (
            <div className={`min-h-screen flex items-center justify-center font-tomato font-bold text-2xl ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}>
                Case Study Not Found
            </div>
        );
    }

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-tomato transition-colors duration-300 ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}
        >
            <div className="max-w-4xl mx-auto flex flex-col relative z-10">
                <Link
                    to="/case-studies"
                    className={`hover:opacity-70 transition-colors mb-8 font-bold flex items-center gap-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Case Studies
                </Link>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${study.color} ${study.text}`}>
                        {study.category}
                    </span>
                    {study.tech && (
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            isDarkMode ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}>
                            {study.tech}
                        </span>
                    )}
                </div>

                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-tomatoGrotesk font-bold leading-tight tracking-tight mb-8 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                    {study.title}
                </h1>

                <div className={`w-full h-[360px] md:h-[460px] rounded-3xl mb-12 flex items-center justify-center overflow-hidden border relative group ${
                    isDarkMode ? "bg-[#141416] border-white/10" : "bg-gray-100 border-gray-200"
                }`}>
                    <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="space-y-8">
                    <div className={`border-l-4 pl-6 py-2 ${isDarkMode ? "border-white" : "border-gray-900"}`}>
                        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Project Overview</h2>
                        <p className={`leading-relaxed text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {study.overview}
                        </p>
                    </div>

                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>🚀 Key Features & Capabilities</h2>
                        <ul className="space-y-3">
                            {study.features.map((feature, idx) => (
                                <li key={idx} className={`flex items-start gap-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    <span className={`font-bold mt-0.5 ${isDarkMode ? "text-white" : "text-gray-900"}`}>✦</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {study.github && (
                        <div className={`pt-6 border-t flex items-center justify-between flex-wrap gap-4 ${
                            isDarkMode ? "border-white/10" : "border-gray-200"
                        }`}>
                            <a
                                href={study.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-3 px-6 py-3 font-semibold rounded-xl transition-all shadow-md ${
                                    isDarkMode
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-gray-900 text-white hover:bg-gray-700"
                                }`}
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                View Repository on GitHub ↗
                            </a>

                            <Link
                                to="/contact"
                                className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
                                    isDarkMode ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-600"
                                }`}
                            >
                                Start a similar project with us →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CaseStudyDetail;
