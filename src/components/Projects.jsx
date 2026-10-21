import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import skinzyImg from '../assets/projects/skinzy.jpg';
import reactNativePortfolioImg from '../assets/projects/react-native-portfolio.jpg';
import reactjsPortfolioImg from '../assets/projects/reactjs-portfolio.jpg';
import javaTaskManagerImg from '../assets/projects/java-task-manager.jpg';
import apexSaasImg from '../assets/projects/apex-saas.jpg';

export default function Projects() {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { amount: 0.2 });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    const projectItems = [
        {
            title: "Skinzy",
            category: "AI Skincare & Wellness App",
            tech: "TypeScript • PyTorch (ResNet18) • React Native",
            github: "https://github.com/HassanHashmi39/Skinzy",
            image: skinzyImg,
            color: "bg-purple-500",
            highlights: [
                "PyTorch ResNet18 AI detection (Acne, Dryness, Oiliness, Pigmentation)",
                "Automated morning & night routines with personalized action plans",
                "Patient & Doctor dashboards with real-time chat & appointment booking"
            ]
        },
        {
            title: "Personal Website",
            category: "Digital Services",
            tech: "Strikingly • Website Builder",
            github: "https://hashmitech.mystrikingly.com/",
            image: reactNativePortfolioImg,
            color: "bg-blue-500",
            highlights: [
                "Personal website showcasing digital services and expertise",
                "Website layout designed to present services and skills",
                "Contact and social links for professional inquiries"
            ]
        },
        {
            title: "ReactJs Portfolio Website",
            category: "Modern Web Application",
            tech: "React.js • Tailwind CSS • JavaScript",
            github: "https://github.com/HassanHashmi39/ReactJs-PortfolioWebsite",
            image: reactjsPortfolioImg,
            color: "bg-lime-400",
            highlights: [
                "Responsive architecture with seamless dark & light mode toggles",
                "Client consultation booking flow and interactive service catalog",
                "Fast performance metrics, semantic SEO, and micro-interactions"
            ]
        },
        {
            title: "Java GUI Task Manager",
            category: "Desktop Application",
            tech: "Java • Java Swing • OOP",
            github: "https://github.com/HassanHashmi39/Java-GUI-based-Task-Manager-application",
            image: javaTaskManagerImg,
            color: "bg-amber-500",
            highlights: [
                "Modular desktop task management system built using Java Swing",
                "Daily task scheduling, priority workflows, and progress tracking",
                "Robust object-oriented design built for collaborative extension"
            ]
        },
        {
            title: "Apex SaaS Platform",
            category: "B2B Startup Launchpad",
            tech: "Next.js • Tailwind CSS • PostgreSQL",
            github: "https://github.com/HassanHashmi39",
            image: apexSaasImg,
            color: "bg-emerald-400",
            highlights: [
                "Conversion-optimized landing page and onboarding funnel",
                "SaaS dashboard analytics with real-time metrics tracking",
                "Stripe subscription integration and auth workflows"
            ]
        }
    ];


    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projectItems.length);
    }, [projectItems.length]);

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projectItems.length) % projectItems.length);
    };

    // Auto-slide logic
    useEffect(() => {
        let interval;
        if (isSectionInView && !isAutoplayPaused) {
            interval = setInterval(() => {
                nextSlide();
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isSectionInView, isAutoplayPaused, nextSlide]);

    // Reset when out of view
    useEffect(() => {
        if (!isSectionInView) {
            setCurrentIndex(0);
        }
    }, [isSectionInView]);

    const current = projectItems[currentIndex];

    // Upcoming images: next 3 in queue
    const upcomingIndices = [1, 2, 3].map((offset) => (currentIndex + offset) % projectItems.length);

    return (
        <section
            style={{ backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff" }}
            ref={sectionRef}
            className={`min-h-screen flex flex-col justify-center pt-20 lg:pt-12 transition-colors duration-400 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 pb-20 lg:pb-20">
                <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-center mb-12 h-auto lg:h-[280px]">

                    {/* ─── MOBILE: Image with arrows + title ─── */}
                    <div className="flex lg:hidden items-center justify-center gap-4 w-full relative z-30">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevSlide();
                            }}
                            className="text-3xl hover:scale-125 transition-transform cursor-pointer p-4 -ml-2 select-none"
                        >
                            ←
                        </button>

                        {/* Mobile Active Image - fade in/out */}
                        <div
                            className="w-[220px] h-[220px] rounded-[24px] flex-shrink-0 overflow-hidden shadow-lg relative"
                            onMouseEnter={() => setIsAutoplayPaused(true)}
                            onMouseLeave={() => setIsAutoplayPaused(false)}
                        >
                            <AnimatePresence mode="sync">
                                <motion.img
                                    key={currentIndex}
                                    src={current.image}
                                    alt={current.title}
                                    width="220"
                                    height="220"
                                    decoding="async"
                                    className="w-full h-full object-cover absolute inset-0"
                                    initial={{ opacity: 0, scale: 0.4 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1 }}
                                    transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
                                />
                            </AnimatePresence>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextSlide();
                            }}
                            className="text-3xl hover:scale-125 transition-transform cursor-pointer p-4 -mr-2 select-none"
                        >
                            →
                        </button>
                    </div>

                    {/* Mobile Title - animated */}
                    <div className="flex lg:hidden flex-col items-center text-center overflow-hidden min-h-[60px] justify-center">
                        <div className="grid">
                            <AnimatePresence mode="sync">
                                <motion.h3
                                    key={currentIndex}
                                    className={`text-xl font-bold leading-tight col-start-1 row-start-1 ${isDarkMode ? "text-white" : "text-gray-900"
                                        }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.08, ease: "easeInOut" }}
                                >
                                    {current.title} — {current.category}
                                </motion.h3>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ─── DESKTOP: Large Active Image ─── */}
                    <div
                        className="hidden lg:block w-[280px] h-[280px] rounded-[24px] flex-shrink-0 overflow-hidden shadow-lg relative cursor-pointer"
                        onMouseEnter={() => setIsAutoplayPaused(true)}
                        onMouseLeave={() => setIsAutoplayPaused(false)}
                    >
                        <AnimatePresence mode="sync">
                            <motion.img
                                key={currentIndex}
                                src={current.image}
                                alt={current.title}
                                width="280"
                                height="280"
                                fetchPriority="high"
                                decoding="async"
                                className="w-full h-full object-cover absolute inset-0"
                                initial={{ opacity: 0, scale: 0.4 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1 }}
                                transition={{ duration: 0.08, ease: [0.34, 1.2, 0.64, 1] }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* ─── DESKTOP: Title & Controls ─── */}
                    <div className="hidden lg:flex flex-col justify-center gap-2 min-w-[200px] overflow-hidden relative z-30">
                        {/* Title fades + slides up on change */}
                        <div className="grid min-h-[60px] items-center">
                            <AnimatePresence mode="sync">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.08, ease: "easeInOut" }}
                                    className="col-start-1 row-start-1"
                                >
                                    <h3 className={`text-xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                        {current.title} <br />
                                        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                            {current.category}
                                        </span>
                                    </h3>
                                    {current.tech && (
                                        <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded ${isDarkMode ? "bg-white/10 text-gray-300" : "bg-black/5 text-gray-700"
                                            }`}>
                                            {current.tech}
                                        </span>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevSlide();
                                }}
                                aria-label="Previous project"
                                className="text-2xl hover:scale-125 transition-transform cursor-pointer p-2 -ml-2 select-none"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextSlide();
                                }}
                                aria-label="Next project"
                                className="text-2xl hover:scale-125 transition-transform cursor-pointer p-2 select-none"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* ─── DESKTOP: Upcoming images queue ─── */}
                    <div className="hidden lg:flex flex-1 gap-4 overflow-hidden items-center h-full">
                        <AnimatePresence mode="popLayout">
                            {upcomingIndices.map((idx, position) => (
                                <motion.div
                                    key={`${idx}-${currentIndex}`}
                                    className="flex-shrink-0 rounded-[24px] overflow-hidden cursor-pointer"
                                    style={{ width: 180, height: 180 }}
                                    initial={{
                                        opacity: 0,
                                        x: 60,
                                        scale: 0.88,
                                    }}
                                    animate={{
                                        opacity: position === 0 ? 0.92 : position === 1 ? 0.72 : 0.50,
                                        x: 0,
                                        scale: position === 0 ? 1 : position === 1 ? 0.96 : 0.92,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -60,
                                        scale: 0.88,
                                    }}
                                    transition={{
                                        duration: 0.1,
                                        ease: [0.15, 0.36, 0.35, 0.84],
                                        delay: position * 0.01,
                                    }}
                                    onClick={nextSlide}
                                >
                                    <img
                                        src={projectItems[idx].image}
                                        alt={projectItems[idx].title}
                                        width="180"
                                        height="180"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ─── BOTTOM CONTENT ─── */}
                <div className="flex flex-col md:flex-row pb-20 items-start md:items-center gap-y-8 md:gap-x-12">

                    {/* Left Side */}
                    <div className="space-y-4 md:space-y-6 flex-1">
                        <div className="flex items-center gap-4 md:gap-6">
                            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                Real Projects.
                            </h2>
                            <svg className={`hidden sm:block w-12 h-6 flex-shrink-0 ${isDarkMode ? "text-white" : "text-gray-900"}`} viewBox="0 0 50 24" fill="none">
                                <path d="M0 12H48M48 12L37 1M48 12L37 23" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <p className={`text-lg md:text-xl leading-tight ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                            Thoughtful solutions <span className="text-lime-500">✦</span> for our clients
                        </p>
                    </div>

                    {/* Right Side - highlights change with current slide */}
                    <div
                        className="flex-1 mt-8 md:mt-0 flex flex-col items-start"
                        onMouseEnter={() => setIsAutoplayPaused(true)}
                        onMouseLeave={() => setIsAutoplayPaused(false)}
                    >
                        <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Explore <br />
                            selected projects from DevQuilt
                        </p>
                        <div className="w-full max-w-lg">
                            <div className="grid min-h-[180px] items-start">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15, ease: "easeInOut" }}
                                        className="space-y-3 col-start-1 row-start-1"
                                    >
                                        {current.highlights.map((highlight, i) => (
                                            <div
                                                key={i}
                                                className={`flex items-center justify-between py-2 border-b group cursor-pointer transition-colors ${isDarkMode
                                                        ? "border-white/10 hover:border-white"
                                                        : "border-black/10 hover:border-black"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 ${current.color} rounded-full`}></div>
                                                    <p className={`font-medium text-sm ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
                                                        {highlight}
                                                    </p>
                                                </div>
                                                <svg className={`w-4 h-4 transition-colors ${isDarkMode ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-gray-900"
                                                    }`} viewBox="0 0 16 16" fill="none" stroke="currentColor">
                                                    <path d="M4 12L12 4M12 4H6M12 4V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                                {current.github && (
                                    <a
                                        href={current.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative z-10 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-sm ${isDarkMode
                                                ? "bg-white/10 hover:bg-white/20 text-white"
                                                : "bg-gray-900 hover:bg-black text-white"
                                            }`}
                                    >
                                        {current.github.includes("github.com") ? (
                                            <>
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                </svg>
                                                <span>View on GitHub</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="2" y1="12" x2="22" y2="12" />
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                                </svg>
                                                <span>Visit Website ↗</span>
                                            </>
                                        )}
                                    </a>
                                )}
                                <Link to="/projects" aria-label="Explore all our projects" className={`relative z-10 font-bold flex items-center gap-2 hover:gap-4 transition-all ml-auto text-sm ${isDarkMode ? "text-white" : "text-gray-900"
                                    }`}>
                                    Explore all our Projects <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
