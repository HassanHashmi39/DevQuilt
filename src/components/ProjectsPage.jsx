import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import bdImg from "../assets/bd.webp";
import starImg from "../assets/Star 3.webp";
import ProjectDetail from "./ProjectDetail";
import skinzyImg from "../assets/projects/skinzy.jpg";
import skinzyDetail1 from "../assets/projects/skinzy-detail-1.jpg";
import skinzyDetail2 from "../assets/projects/skinzy-detail-2.jpg";

import reactNativePortfolioImg from "../assets/projects/react-native-portfolio.jpg";
import reactNativePortfolioDetail1 from "../assets/projects/react-native-portfolio-detail-1.jpg";
import reactNativePortfolioDetail2 from "../assets/projects/react-native-portfolio-detail-2.jpg";

import reactjsPortfolioImg from "../assets/projects/reactjs-portfolio.jpg";
import reactjsPortfolioDetail1 from "../assets/projects/reactjs-portfolio-detail-1.jpg";
import reactjsPortfolioDetail2 from "../assets/projects/reactjs-portfolio-detail-2.jpg";

import javaTaskManagerImg from "../assets/projects/java-task-manager.jpg";
import javaTaskManagerDetail1 from "../assets/projects/java-task-manager-detail-1.jpg";
import javaTaskManagerDetail2 from "../assets/projects/java-task-manager-detail-2.jpg";

import apexSaasImg from "../assets/projects/apex-saas.jpg";
import apexSaasDetail1 from "../assets/projects/apex-saas-detail-1.jpg";
import apexSaasDetail2 from "../assets/projects/apex-saas-detail-2.jpg";

import aiMedicalImg from "../assets/projects/ai-medical-diagnostics.jpg";
import aiMedicalDetail1 from "../assets/projects/ai-medical-diagnostics-detail-1.jpg";
import aiMedicalDetail2 from "../assets/projects/ai-medical-diagnostics-detail-2.jpg";

import cloudInfraImg from "../assets/projects/cloud-infrastructure.jpg";
import cloudInfraDetail1 from "../assets/projects/cloud-infrastructure-detail-1.jpg";
import cloudInfraDetail2 from "../assets/projects/cloud-infrastructure-detail-2.jpg";

const QuickView = ({ project, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute right-6 top-6 text-white/60 hover:text-white transition-colors z-[160]"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-5xl w-full h-auto max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent keep-white" data-keep-white="true" style={{ color: '#ffffff' }}>
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ color: '#ffffff' }}>{project.title}</h3>
                    <p className="text-white/80" style={{ color: '#ffffff' }}>Engineering & Design ~ DevQuilt</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectsPage = () => {
    const { isDarkMode } = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const [quickViewProject, setQuickViewProject] = useState(null);

    const projects = [
        {
            title: "Skinzy — AI Skincare App",
            category: "AI & Healthcare Mobile App",
            tech: "TypeScript • PyTorch (ResNet18) • React Native",
            github: "https://github.com/HassanHashmi39/Skinzy",
            description: "Full-stack AI-driven application combining computer vision (PyTorch ResNet18) with medical history for professional-grade skin analysis, personalized morning/night routines, dermatologist chat, and appointment booking.",
            image: skinzyImg,
            detailImage1: skinzyDetail1,
            detailImage2: skinzyDetail2,
            span: "lg:col-span-2 lg:row-span-2"
        },
        {
            title: "Personal Website",
            category: "Digital Services & Portfolio",
            tech: "Strikingly • Website Builder",
            github: "https://hashmitech.mystrikingly.com/",
            description: "Personal website built with Strikingly showcasing digital services and expertise, modern presentation layouts, and integrated contact channels for professional inquiries.",
            image: reactNativePortfolioImg,
            detailImage1: reactNativePortfolioDetail1,
            detailImage2: reactNativePortfolioDetail2,
            span: "lg:col-span-1 lg:row-span-1"
        },
        {
            title: "ReactJs Portfolio Website",
            category: "Modern Web Application",
            tech: "React.js • Tailwind CSS • JavaScript",
            github: "https://portfoliowebsitepages.netlify.app/",
            description: "Modern, responsive, dark/light mode web platform built with React.js and Tailwind CSS featuring interactive booking, project showcases, and seamless animations.",
            image: reactjsPortfolioImg,
            detailImage1: reactjsPortfolioDetail1,
            detailImage2: reactjsPortfolioDetail2,
            span: "lg:col-span-1 lg:row-span-1"
        },
        {
            title: "Java GUI Task Manager",
            category: "Desktop Application",
            tech: "Java • Java Swing • OOP",
            github: "https://github.com/HassanHashmi39/Java-GUI-based-Task-Manager-application",
            description: "Modular desktop task management system built using Java Swing for daily task scheduling, productivity tracking, and workflow efficiency.",
            image: javaTaskManagerImg,
            detailImage1: javaTaskManagerDetail1,
            detailImage2: javaTaskManagerDetail2,
            span: "lg:col-span-1 lg:row-span-1"
        },
        {
            title: "Apex SaaS Platform",
            category: "B2B Startup Launchpad",
            tech: "Next.js • Tailwind CSS • PostgreSQL",
            github: "https://github.com/HassanHashmi39",
            description: "High-converting B2B SaaS web application with onboarding funnels, analytics dashboard, and subscription billing.",
            image: apexSaasImg,
            detailImage1: apexSaasDetail1,
            detailImage2: apexSaasDetail2,
            span: "lg:col-span-1 lg:row-span-1"
        },
        {
            title: "AI Medical Diagnostics",
            category: "Machine Learning & Vision",
            tech: "PyTorch • Python • FastAPI",
            github: "https://github.com/HassanHashmi39/Skinzy",
            description: "Computer vision pipeline for automated condition classification, diagnostic reporting, and secure patient records.",
            image: aiMedicalImg,
            detailImage1: aiMedicalDetail1,
            detailImage2: aiMedicalDetail2,
            span: "lg:col-span-2 lg:row-span-1"
        },
        {
            title: "Cloud Infrastructure Setup",
            category: "DevOps & Cloud Architecture",
            tech: "Docker • AWS • CI/CD",
            github: "https://github.com/HassanHashmi39",
            description: "Containerized deployment pipeline with automated testing, SSL provisioning, and load balancing for high-traffic apps.",
            image: cloudInfraImg,
            detailImage1: cloudInfraDetail1,
            detailImage2: cloudInfraDetail2,
            span: "lg:col-span-2 lg:row-span-1"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-screen font-tomato outline-none transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
                }`}
        >

            {/* Project Full Detail Overlay */}
            <AnimatePresence mode="wait">
                {selectedProject && (
                    <ProjectDetail
                        project={selectedProject}
                        projects={projects}
                        onSelectProject={setSelectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {quickViewProject && (
                    <QuickView
                        project={quickViewProject}
                        onClose={() => setQuickViewProject(null)}
                    />
                )}
            </AnimatePresence>


            <div
                className={`fixed inset-0 bg-contain bg-center bg-no-repeat pointer-events-none -z-20 ${isDarkMode ? "opacity-90" : "opacity-30"
                    }`}
                style={{ backgroundImage: `url(${starImg})` }}
            />



            {/* ================= HERO ================= */}

            <section className={`min-h-screen pt-24 px-4 flex items-center justify-center relative z-10 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
                }`}>

                <div className="max-w-6xl text-center px-6 py-10">

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`tracking-widest text-xs sm:text-sm font-semibold mb-4 uppercase ${isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}>
                        Real Projects • Thoughtful Solutions
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className={`text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-8 max-w-5xl mx-auto ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Your Next Big Idea Deserves{" "}
                        <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            More Than Just a Website
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                        We combine thoughtful design, modern web development, and practical technology to help startups launch and grow.
                    </motion.p>

                </div>
            </section>

            <section className={`relative z-20 px-4 sm:px-8 lg:px-16 pb-32 pt-10 max-w-[1500px] mx-auto transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"
                }`}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px] sm:auto-rows-[300px]">
                    {projects.map((project, index) => {
                        const themes = [
                            { shadow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]", overlay: "bg-purple-900/30", grad: "from-purple-900/95 via-purple-900/60" },
                            { shadow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]", overlay: "bg-red-900/30", grad: "from-red-900/95 via-red-900/60" },
                            { shadow: "hover:shadow-[0_0_40px_rgba(163,230,53,0.4)]", overlay: "bg-lime-950/40", grad: "from-lime-950/95 via-lime-900/70" },
                            { shadow: "hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]", overlay: "bg-black/40", grad: "from-black/95 via-black/60" }
                        ];
                        const theme = themes[index % 4];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedProject(project)}
                                className={`group relative bg-[#18181b] border-0 rounded-[1.5rem] overflow-hidden ${project.span}
                            transition-all duration-500 cursor-pointer shadow-md ${theme.shadow}`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Persistent Top Info */}
                                <div className="absolute top-6 left-6 z-10 text-white keep-white drop-shadow-lg" data-keep-white="true" style={{ color: '#ffffff' }}>
                                    <h3 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-md text-white" style={{ color: '#ffffff' }}>
                                        {project.title}
                                    </h3>
                                    <p className="text-sm md:text-base opacity-90 font-medium text-white" style={{ color: '#ffffff' }}>
                                        DevQuilt {project.tech && <span className="opacity-75 text-xs ml-2 px-2 py-0.5 bg-black/40 rounded-full text-white" style={{ color: '#ffffff' }}>{project.tech}</span>}
                                    </p>
                                </div>

                                {/* Hover Overlay with Bottom Buttons */}
                                <div className={`absolute inset-0 ${theme.overlay} opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.grad} to-transparent flex flex-col justify-end p-8`}>
                                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white keep-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500" data-keep-white="true">
                                            {/* Quick View */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setQuickViewProject(project);
                                                }}
                                                className="flex items-center gap-2 text-sm md:text-base font-semibold text-white hover:text-white hover:opacity-80 transition-opacity cursor-pointer"
                                                style={{ color: '#ffffff' }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                                <span style={{ color: '#ffffff' }} className="text-white hover:text-white">Quick View</span>
                                            </button>

                                            {/* Full Project */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProject(project);
                                                }}
                                                className="flex items-center gap-2 text-sm md:text-base font-semibold text-white hover:text-white hover:opacity-80 transition-opacity cursor-pointer"
                                                style={{ color: '#ffffff' }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
                                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"></path>
                                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"></path>
                                                </svg>
                                                <span style={{ color: '#ffffff' }} className="text-white hover:text-white">Full Project</span>
                                            </button>

                                            {/* GitHub Repo */}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-2 text-sm md:text-base font-semibold text-white hover:text-white hover:opacity-80 transition-opacity ml-auto"
                                                    style={{ color: '#ffffff' }}
                                                >
                                                    {project.github.includes("github.com") ? (
                                                        <>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
                                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                            </svg>
                                                            <span style={{ color: '#ffffff' }} className="text-white hover:text-white">GitHub</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff' }}>
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="2" y1="12" x2="22" y2="12" />
                                                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                            </svg>
                                                            <span style={{ color: '#ffffff' }} className="text-white hover:text-white">Live Site ↗</span>
                                                        </>
                                                    )}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ================= BEYOND DEVELOPMENT (BEHANCE SHOWCASE) ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 sm:mt-28 relative"
                >
                    {/* Ambient Glows */}
                    <div
                        className="absolute -top-12 left-1/4 w-72 h-72 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none -z-10"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-indigo-600/15 blur-[110px] pointer-events-none -z-10"
                        aria-hidden="true"
                    />

                    {/* Showcase Box */}
                    <div
                        className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border transition-all duration-500 ${isDarkMode
                                ? "bg-gradient-to-br from-[#121216] via-[#16161c] to-[#0d0d12] border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                                : "bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-black/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]"
                            }`}
                    >
                        {/* Subtle grid pattern */}
                        <div
                            className={`absolute inset-0 bg-[radial-gradient(#0057ff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none ${isDarkMode ? "opacity-[0.07]" : "opacity-[0.04]"
                                }`}
                        />

                        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">

                            {/* Left Content */}
                            <div className="max-w-2xl text-center lg:text-left">
                                {/* Pill Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 ${isDarkMode
                                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                            : "bg-blue-50 text-blue-600 border border-blue-200"
                                        }`}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    Creative &amp; Visual Lab
                                </motion.div>

                                {/* Heading (### Beyond Development) */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    Beyond Development
                                </motion.h3>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className={`text-lg sm:text-xl lg:text-2xl font-medium mb-4 leading-snug ${isDarkMode ? "text-gray-200" : "text-gray-800"
                                        }`}
                                >
                                    Great digital products need{" "}
                                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                                        thoughtful design
                                    </span>
                                    , too.
                                </motion.p>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className={`text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    Explore more of our creative work, visual concepts, and design projects on Behance.
                                </motion.p>

                                {/* Call to action button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <motion.a
                                        href="https://www.behance.net/hassanhashmi39"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group inline-flex items-center gap-3.5 px-7 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#0057ff] to-[#0043c7] hover:from-[#004ce6] hover:to-[#0038a8] shadow-[0_12px_28px_rgba(0,87,255,0.35)] hover:shadow-[0_16px_36px_rgba(0,87,255,0.5)] transition-all duration-300 cursor-pointer"
                                    >
                                        {/* Behance Logo */}
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.274 0-5.625-3.04-5.625-5.962 0-3.328 1.831-6.038 5.7-6.038 4.094 0 5.253 2.871 5.074 5.955h-7.954c.05 2.115 1.554 3.498 3.513 3.498 1.488 0 2.502-.638 2.894-1.453h1.498zm-5.068-6.425c-1.921 0-2.825 1.157-2.915 2.842h5.727c-.042-1.62-.871-2.842-2.812-2.842zm-13.658 9.425h-5v-14h5.688c2.973 0 4.708 1.401 4.708 3.824 0 1.517-.798 2.684-2.106 3.197 1.764.444 2.71 1.848 2.71 3.585 0 2.477-1.874 3.394-5.999 3.394zm-2.183-8.328h2.091c1.378 0 2.376-.456 2.376-1.745 0-1.19-.877-1.603-2.327-1.603h-2.14v3.348zm0 6.012h2.388c1.659 0 2.684-.564 2.684-1.957 0-1.392-1.04-1.89-2.714-1.89h-2.358v3.847z" />
                                        </svg>
                                        <span>Explore Our Behance</span>
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </motion.a>
                                </motion.div>
                            </div>

                            {/* Right Interactive / Visual Graphic */}
                            <div className="w-full lg:w-auto flex-1 max-w-md">
                                <motion.div
                                    animate={{ y: [-4, 4, -4] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className={`relative p-6 sm:p-7 rounded-2xl border backdrop-blur-md ${isDarkMode
                                            ? "bg-white/[0.03] border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                                            : "bg-white/80 border-black/5 shadow-[0_10px_35px_rgba(0,0,0,0.06)]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5 dark:border-white/5 border-black/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[#0057ff] flex items-center justify-center text-white shadow-md shadow-blue-500/30 font-black text-sm">
                                                Bē
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                                    DevQuilt Visual Studio
                                                </h4>
                                                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                    Curated Design Concepts
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-lime-500/15 text-lime-400 border border-lime-500/30">
                                            Active
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {[
                                            "UI/UX Design",
                                            "Brand Identity",
                                            "Design Systems",
                                            "Visual Concepts",
                                            "Interactive Prototypes",
                                            "Mobile Interfaces"
                                        ].map((tag, idx) => (
                                            <motion.span
                                                key={idx}
                                                whileHover={{ scale: 1.05 }}
                                                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-default ${isDarkMode
                                                        ? "bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] hover:text-white"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                                    }`}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <a
                                        href="https://www.behance.net/hassanhashmi39"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3.5 rounded-xl text-xs flex items-center justify-between transition-colors ${isDarkMode
                                                ? "bg-black/30 hover:bg-black/50 text-gray-400 hover:text-gray-200"
                                                : "bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        <span>Check our full gallery &amp; case studies</span>
                                        <span className="font-semibold text-blue-500 flex items-center gap-1">Visit ↗</span>
                                    </a>
                                </motion.div>
                            </div>

                        </div>
                    </div>
                </motion.div>

            </section>

        </motion.div>
    );
};

export default ProjectsPage;
