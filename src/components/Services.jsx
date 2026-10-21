import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { useScrollContainer } from "../context/ScrollContext";
import { useTheme } from "../context/ThemeContext";

// --- Custom Visuals ---
const AnimatedNumber = ({ end }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1200;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, isInView]);
    return <span ref={ref}>{count}</span>;
};

const CounterVisual = ({ small = false }) => {
    const { isDarkMode } = useTheme();
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.9 });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = 4362;
        const duration = 2000;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView]);

    return (
        <div ref={ref} className={`${
            isDarkMode ? "bg-[#111] text-white" : "bg-gray-100 text-gray-900 border border-gray-200"
        } rounded-2xl flex flex-col items-center justify-center text-center mt-auto shadow-inner relative overflow-hidden group ${
            small ? "p-3 h-24" : "p-6 h-48 sm:h-56"
        }`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${isDarkMode ? "text-white" : "text-gray-900"} font-bold font-mono tracking-tighter tabular-nums inline-block text-center ${
                    small ? "text-3xl" : "text-5xl sm:text-7xl min-w-[4ch]"
                }`}
            >
                {count}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${isDarkMode ? "text-white/60" : "text-gray-500"} mt-1 ${
                    small ? "text-[10px]" : "text-sm sm:text-base max-w-[200px]"
                }`}
            >
                followers
            </motion.div>
        </div>
    );
};

const StatsSliderVisual = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });

    useEffect(() => {
        if (!isInView) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [isInView]);

    const slides = [
        { type: 'number', end: 500, label: "comments" },
        { type: 'number', end: 237, label: "reposts" },
        { type: 'number', end: 937, label: "likes" },
    ];

    return (
        <div ref={ref} className="bg-[#EBE5FF] rounded-[32px] p-6 flex flex-col items-center justify-center text-center mt-auto h-48 sm:h-64 shadow-sm relative overflow-hidden group">

            {/* Top Progress Indicators */}
            <div className="absolute top-6 left-8 right-8 flex gap-2">
                {[0, 1, 2].map(idx => (
                    <div key={idx} className="flex-1 h-[3px] rounded-full bg-[#1A1A1A]/10 overflow-hidden relative">
                        {activeIndex === idx && isInView && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="absolute top-0 left-0 h-full bg-[#1A1A1A]"
                            />
                        )}
                        {activeIndex > idx && (
                            <div className="absolute top-0 left-0 w-full h-full bg-[#1A1A1A]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex-1 w-full flex flex-col items-center justify-center mt-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        {slides[activeIndex].type === 'number' ? (
                            <>
                                <span className="text-[#1A1A1A] text-7xl sm:text-[84px] leading-none font-medium tracking-tight tabular-nums min-w-[3ch] inline-block text-center">
                                    <AnimatedNumber end={slides[activeIndex].end} />
                                </span>
                                <span className="text-[#1A1A1A]/80 text-[13px] mt-2 font-medium tracking-[0.2em] uppercase">
                                    {slides[activeIndex].label}
                                </span>
                            </>
                        ) : (
                            <div className="grid grid-cols-3 gap-2 w-28 h-20 opacity-90 mx-auto mt-2">
                                {/* Row 1 */}
                                <div className="flex justify-center items-end pb-1"><div className="w-8 h-4 border-[4px] border-[#1A1A1A] rounded-t-full border-b-0" /></div>
                                <div className="flex justify-center items-start pt-2"><div className="w-8 h-4 border-[4px] border-[#1A1A1A] rounded-b-full border-t-0" /></div>
                                <div className="flex justify-center items-center"><div className="w-6 h-10 border-[4px] border-[#1A1A1A] rounded-full" /></div>
                                {/* Row 2 */}
                                <div className="flex justify-center items-start pt-1"><div className="w-8 h-4 border-[4px] border-[#1A1A1A] rounded-b-full border-t-0" /></div>
                                <div className="flex justify-center items-end pb-2"><div className="w-8 h-4 border-[4px] border-[#1A1A1A] rounded-t-full border-b-0" /></div>
                                <div className="flex justify-center items-end pb-2 pr-2"><div className="w-6 h-[4px] bg-[#1A1A1A] rounded-full" /></div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const CircleProgressVisual = () => {
    const { isDarkMode } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.9 });

    return (
        <div ref={ref} className={`${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-[#F8F9FA] border-gray-100"
        } pb-5 rounded-3xl p-4 flex flex-col items-center justify-center mt-auto h-48 sm:h-56 shadow-sm relative overflow-hidden group border`}>
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "#f1f1f1"} strokeWidth="8" fill="none" />
                    <motion.circle cx="80" cy="80" r="70" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={440} strokeDashoffset={440} animate={isInView ? { strokeDashoffset: 440 - (440 * 0.75) } : { strokeDashoffset: 440 }} transition={{ duration: 2, ease: "easeOut" }} />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#C9A9E9" />
                            <stop offset="100%" stopColor="#7B61FF" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="flex flex-col items-center justify-center z-10 text-center">
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.9, duration: 0.9 }} className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-gray-500"} font-medium tracking-wide uppercase mb-1`}>
                        Level 2<br />10 to 20 miles
                    </motion.span>
                    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.6, duration: 0.9 }} className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} leading-none`}>
                        191V
                    </motion.span>
                </div>
                <motion.div animate={isInView ? { opacity: 1, scale: 1, x: -30, y: -40 } : { opacity: 0, scale: 0, x: -10, y: -20 }} transition={{ delay: 0.8 }} className={`absolute z-20 top-8 left-4 w-8 h-8 ${isDarkMode ? "bg-[#222] text-white shadow-black/40" : "bg-white text-gray-600 shadow-lg"} rounded-full flex items-center justify-center shadow`}>
                    <span className="text-[10px]">✦</span>
                </motion.div>
                <motion.div animate={isInView ? { opacity: 1, scale: 1, x: -45, y: 0 } : { opacity: 0, scale: 0, x: -5, y: -10 }} transition={{ delay: 1.0 }} className={`absolute z-20 top-1/2 left-4 w-10 h-10 ${isDarkMode ? "bg-[#222] text-white shadow-black/40" : "bg-white text-gray-600 shadow-lg"} rounded-full flex items-center justify-center shadow`}>
                    <span className="text-xs text-center w-full leading-none">❤️</span>
                </motion.div>
            </div>
        </div>
    );
};

const ServiceCard = ({ title, description, tags, image, bgColor, textColor, tagBg, tagText, sharedLayoutId, customVisual, small = false, fullBackground = false, showTags = true, showDescription = true }) => {
    const { isDarkMode } = useTheme();

    const isDarkCard = fullBackground || (bgColor ? (bgColor.includes("black") || bgColor.includes("[#1") || bgColor.includes("[#0")) : isDarkMode);

    const resolvedBg = fullBackground
        ? "bg-black"
        : (bgColor || (isDarkMode ? "bg-[#111]" : "bg-white"));

    const resolvedBorder = fullBackground
        ? "border-white/10"
        : (isDarkMode ? "border-white/10 shadow-lg" : "border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]");

    const resolvedText = isDarkCard
        ? "text-white"
        : (textColor || (isDarkMode ? "text-white" : "text-gray-900"));

    const resolvedDesc = isDarkCard
        ? "text-white/80"
        : (isDarkMode ? "text-white/70" : "text-gray-600");

    const resolvedTagBg = tagBg || (isDarkCard ? "bg-white/15 backdrop-blur-sm" : (isDarkMode ? "bg-white/10" : "bg-gray-100"));
    const resolvedTagText = tagText || (isDarkCard ? "text-white" : (isDarkMode ? "text-white/80" : "text-gray-700"));

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 1.3 }}
            className={`${resolvedBg} ${small ? "p-4 rounded-[24px]" : "p-8 rounded-[40px]"} border ${resolvedBorder} flex flex-col h-full hover:shadow-2xl cursor-pointer overflow-hidden relative group`}
        >
            {fullBackground && image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Tags */}
                {showTags && tags && tags.length > 0 && (
                    <div className={`flex flex-wrap gap-1.5 ${small ? "mb-3" : "mb-6"}`}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className={`${small ? "px-2 py-0.5 text-[9px]" : "px-4 py-1.5 text-xs"} ${resolvedTagBg} ${resolvedTagText} font-medium rounded-full`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3 className={`${small ? "text-lg" : "text-3xl"} font-bold ${resolvedText} ${small ? "mb-1.5" : "mb-3"}`}>
                    {title}
                </h3>

                {/* Description */}
                {showDescription && description && (
                    <p className={`${resolvedDesc} ${small ? "text-[11px]" : "text-sm"} leading-relaxed`}>
                        {description}
                    </p>
                )}

                {/* Image Box (Below description) */}
                {image && !fullBackground && (
                    <motion.div
                        className="mt-8 flex-1 w-full rounded-[32px] overflow-hidden bg-gray-100 relative"
                        layoutId={sharedLayoutId}
                    >
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </motion.div>
                )}

                {/* Custom Visual (e.g., Sliders or Charts) */}
                {customVisual && (
                    <div className={`mt-auto ${small ? "pt-3" : "pt-8"}`}>
                        {customVisual}
                    </div>
                )}

                {/* fallback Arrow for cards without image/visual */}
                {!image && !customVisual && (
                    <div className={`${small ? "mt-4" : "mt-8"} self-end`}>
                        <div className={`w-10 h-10 rounded-full border ${isDarkCard ? "border-white/20 text-white" : "border-gray-200 text-gray-900"} flex items-center justify-center transition-colors`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const ServiceIcons = {
    laptop: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="12" x="3" y="4" rx="2" />
            <line x1="2" x2="22" y1="20" y2="20" />
        </svg>
    ),
    sparkle: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    ),
    rocket: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    layers: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    bot: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="12" x="3" y="6" rx="2" />
            <circle cx="9" cy="12" r="1.5" fill="currentColor" />
            <circle cx="15" cy="12" r="1.5" fill="currentColor" />
            <path d="M12 2v4M2 12h1M21 12h1" />
        </svg>
    ),
    palette: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
    ),
    star: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    mobile: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" />
            <line x1="12" x2="12.01" y1="18" y2="18" />
        </svg>
    ),
    gear: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    refresh: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    ),
    cloud: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    ),
    link: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    ),
    fileText: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
        </svg>
    ),
    tools: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    briefcase: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    users: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    zap: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    cart: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    ),
    message: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    ),
    trend: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
};

const Tag = ({ children, icon, type, bgColor, textColor, iconColor }) => {
    const { isDarkMode } = useTheme();
    const baseStyles = "flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full cursor-default transition-all duration-300";

    if (type === "outline") {
        return (
            <div className={`${baseStyles} border ${
                isDarkMode
                    ? "border-white/20 bg-white/[0.04] text-white/90 hover:border-white/40"
                    : "border-black/15 bg-white text-gray-900 shadow-sm hover:border-black/30"
            }`}>
                <span className="flex items-center justify-center text-sm">{icon}</span>
                <span className="text-sm font-medium">{children}</span>
            </div>
        );
    }

    if (type === "circle") {
        return (
            <div className={`${baseStyles} border ${
                isDarkMode
                    ? "border-white/10 bg-white/[0.03] text-white/90"
                    : "border-black/10 bg-white text-gray-900 shadow-sm"
            }`}>
                <div className={`w-5 h-5 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${iconColor || "text-white"}`}>
                    <span className="text-[11px] flex items-center justify-center leading-none">{icon}</span>
                </div>
                <span className="text-sm font-medium">{children}</span>
            </div>
        );
    }

    if (type === "highlight") {
        return (
            <div className={`${baseStyles} ${bgColor} border border-black/10 shadow-sm`}>
                <div className="bg-black/10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-gray-950">
                    <span className="text-[11px] flex items-center justify-center leading-none">{icon}</span>
                </div>
                <span className={`text-sm font-semibold ${textColor || "text-gray-950"}`}>{children}</span>
            </div>
        );
    }

    return null;
};

const Row = ({ children, reverse = false }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const initialX = "60vw";
    const burstX = reverse ? "calc(60vw + 5%)" : "calc(60vw - 5%)";
    const endX = reverse ? "calc(60vw + 50%)" : "calc(60vw - 50%)";

    return (
        <div className="flex justify-start overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
                ref={ref}
                initial={{ x: initialX }}
                animate={inView ? {
                    x: [initialX, burstX, endX]
                } : {}}
                transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: ["easeOut", "linear"],
                    times: [0, 0.00625, 1], // 0.75s at 120s total
                    repeatType: "loop"
                }}
                className="flex gap-10 whitespace-nowrap min-w-max"
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
};







const ServiceSection = ({ id, hero, left, right, bottom }) => {
    const { isDarkMode } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef(null);
    const isSectionInView = useInView(ref, { once: true, amount: 0.9 });

    useEffect(() => {
        let resizeTimer;
        const checkMobile = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(resizeTimer);
        };
    }, []);

    const scrollContainerRef = useScrollContainer();
    const { scrollYProgress } = useScroll({
        target: ref,
        container: scrollContainerRef,
        offset: ["start end", "end start"]
    });

    // Consolidated Parallax: Side cards move SIGNIFICANTLY faster than the Hero card
    const convergePoint = 0.6;
    const sideExitY = -1400;  // Extremely high speed exit for sides/bottom
    const heroExitY = -80;   // Very slow, sticky exit for Hero

    // Hero card stays almost stationary to keep focus
    const yHero = useTransform(scrollYProgress, [0, convergePoint, 1], [80, 0, heroExitY]);

    // Side cards start from lower and zoom past the hero at high speed
    const yLeft = useTransform(scrollYProgress, [0, convergePoint, 1], [200, -128, sideExitY - 128]);
    const yRight = useTransform(scrollYProgress, [0, convergePoint, 1], [200, -192, sideExitY - 192]);

    // Bottom cards follow the extreme high-speed side parallax
    const yBottom = useTransform(scrollYProgress, [0, convergePoint, 1], [200, 0, sideExitY]);

    // Hero Entry Opacity: 50% when start showing, 100% when fully in view
    const heroRef = useRef(null);
    const { scrollYProgress: heroScrollY } = useScroll({
        target: heroRef,
        container: scrollContainerRef,
        offset: ["start end", "0.8 end"]
    });
    const heroOpacity = useTransform(heroScrollY, [0, 1], [0.5, 1]);
    const heroScale = useTransform(heroScrollY, [0, 1], [0.95, 1]);

    useEffect(() => {
        let timer;
        let unlockTimer;

        if (isSectionInView && !isExpanded) {
            // Lock the scroll briefly so they see the expansion starts
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.overflowY = "hidden";

                unlockTimer = setTimeout(() => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.style.overflowY = "";
                    }
                }, 500);
            }

            // Start animation sequence when section enters view
            timer = setTimeout(() => {
                setIsExpanded(true);
            }, 2000); // Give user time to see the Hero card first
        }
        return () => {
            clearTimeout(timer);
            clearTimeout(unlockTimer);
        };
    }, [isSectionInView, isExpanded, scrollContainerRef]);

    return (
        <div ref={ref} className={`z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr_1fr] gap-6 min-h-[600px] relative">
                {!isExpanded ? (
                    <motion.div
                        layout
                        className="md:col-span-3 flex justify-center items-center relative -mx-4 sm:-mx-6 lg:-mx-8"
                        key="hero-card-container"
                    >
                        <motion.div
                            ref={heroRef}
                            layoutId={`hero-card-container-${id}`}
                            className="w-[95vw] h-[450px] relative overflow-hidden md:rounded-[40px] group z-20"
                            whileHover="hover"
                            style={{ opacity: heroOpacity, scale: heroScale, y: !isMobile ? yHero : 0 }}
                            transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <ServiceCard {...hero} sharedLayoutId={`hero-image-${id}`} />

                            <div
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-max"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <motion.button
                                        onClick={() => setIsExpanded(true)}
                                        layout="position"
                                        className="flex flex-col items-center cursor-pointer group"
                                    >
                                        <motion.div
                                            animate={isSectionInView ? { y: 65 } : { y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                                            className="relative z-20 -mt-8"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900  overflow-visible">
                                                <path d="M12 4v16m-7-7l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </motion.div>

                                        <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-full flex flex-col items-center justify-center -mb-8 pt-1 shadow-lg border border-white/30 text-gray-800 font-medium text-[10px] leading-tight transition-colors group-hover:bg-white/90">
                                            <span>Explore</span>
                                            <span>more</span>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <>
                        {/* Card 1 - Left */}
                        <motion.div
                            className="h-auto w-[325px] md:w-[435px] min-h-[400px] md:h-[500px] md:mt-32 order-2 md:order-1"
                            style={!isMobile ? { y: yLeft } : undefined}
                            initial={{ opacity: 0, x: -100, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                            key="card-left"
                        >
                            <ServiceCard {...left} />
                        </motion.div>

                        {/* Middle — Hero card only, no bottom cards here */}
                        <motion.div layout className="flex flex-col items-center order-1 pb-10 md:order-2">
                            {/* Card 2 - Hero (Middle) */}
                            <motion.div
                                layoutId={`hero-card-container-${id}`}
                                transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1] }}
                                style={!isMobile ? { y: yHero } : undefined}
                                key="card-middle"
                                className="w-[325px] md:w-[435px] h-[320px] md:h-[380px] z-20"
                            >
                                <div className="h-full w-full relative">
                                    <ServiceCard {...hero} sharedLayoutId={`hero-image-${id}`} />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Card 3 - Right */}
                        <motion.div
                            className="h-auto w-[325px] md:w-[435px] min-h-[400px] md:h-[450px] md:mt-48 order-3"
                            style={!isMobile ? { y: yRight } : undefined}
                            initial={{ opacity: 0, x: 100, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                            key="card-right"
                        >
                            <ServiceCard {...right} />
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Bottom Cards — full-width 2-column row BELOW the top 3 cards, same ySideFast parallax */}
            {isExpanded && (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-9 "
                    style={!isMobile ? { y: yBottom } : undefined}
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                >
                    {bottom.map((card, idx) => (
                        <div key={idx} className="h-[380px] md:h-[420px]">
                            <ServiceCard {...card} />
                        </div>
                    ))}
                </motion.div>
            )}
        </div >
    );
};

export default function Services() {
    const allTags = [
        { name: "Website Development", icon: ServiceIcons.laptop, type: "highlight", bgColor: "bg-[#E9FFC2]" },
        { name: "Landing Page Design", icon: ServiceIcons.sparkle, type: "outline" },
        { name: "Startup MVP Development", icon: ServiceIcons.rocket, type: "circle", bgColor: "bg-[#7B61FF]" },
        { name: "Web Application Development", icon: ServiceIcons.layers, type: "highlight", bgColor: "bg-[#E0D7FF]" },
        { name: "AI Integration & Automation", icon: ServiceIcons.bot, type: "circle", bgColor: "bg-[#A3E635]", iconColor: "text-black" },
        { name: "UI/UX Design", icon: ServiceIcons.palette, type: "outline" },
        { name: "Branding & Identity", icon: ServiceIcons.star, type: "circle", bgColor: "bg-red-500" },
        { name: "React Native Apps", icon: ServiceIcons.mobile, type: "highlight", bgColor: "bg-rose-200" },
        { name: "Technical SEO", icon: ServiceIcons.gear, type: "circle", bgColor: "bg-[#A3E635]", iconColor: "text-black" },
        { name: "Website Redesign", icon: ServiceIcons.refresh, type: "outline" },
        { name: "SaaS Development", icon: ServiceIcons.cloud, type: "circle", bgColor: "bg-[#7B61FF]" },
        { name: "API Integration", icon: ServiceIcons.link, type: "highlight", bgColor: "bg-[#E9FFC2]" },
        { name: "CMS Development", icon: ServiceIcons.fileText, type: "circle", bgColor: "bg-red-600" },
        { name: "Website Maintenance", icon: ServiceIcons.tools, type: "outline" },
        { name: "LinkedIn Branding", icon: ServiceIcons.briefcase, type: "circle", bgColor: "bg-[#7B61FF]" },
        { name: "User Research", icon: ServiceIcons.users, type: "highlight", bgColor: "bg-[#E9FFC2]" },
        { name: "Performance Optimization", icon: ServiceIcons.zap, type: "circle", bgColor: "bg-red-600" },
        { name: "E-commerce Development", icon: ServiceIcons.cart, type: "outline" },
        { name: "Chatbot Development", icon: ServiceIcons.message, type: "highlight", bgColor: "bg-[#E0D7FF]" },
        { name: "Workflow Automation", icon: ServiceIcons.trend, type: "circle", bgColor: "bg-[#A3E635]", iconColor: "text-black" },
    ];

    const serviceSections = [
        {
            hero: {
                title: "Website Development",
                description: "Custom, responsive websites designed to communicate your value, engage visitors, and support your business goals.",
                tags: ["Responsive Design", "Custom Development"],
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=50&w=800&auto=format&fit=crop",
                fullBackground: true,
                showTags: true,
                showDescription: true
            },
            left: {
                title: "Startup MVP Development",
                description: "Turn your idea into a functional minimum viable product so you can test assumptions and gather real user feedback.",
                tags: ["MVP", "SaaS", "Web Apps"],
                customVisual: <StatsSliderVisual />
            },
            right: {
                title: "AI Integration & Automation",
                description: "Integrate AI features, chatbots, and workflow automation where they provide practical business value.",
                tags: ["AI Chatbot", "API Integration"],
                customVisual: <CircleProgressVisual />
            },
            bottom: [
                {
                    title: "UI/UX Design & Branding",
                    description: "Intuitive digital experiences and consistent brand identities that make your business easier to recognize.",
                    tags: ["UI/UX", "Brand Identity"],
                    customVisual: <CounterVisual small={true} />
                },
                {
                    title: "Landing Page Design & Development",
                    description: "Focused landing pages built around your offer, audience, and conversion goals.",
                    tags: ["Conversion-Focused", "Responsive"],
                    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=50&w=800&auto=format&fit=crop"
                }
            ]
        }
    ];

    const { isDarkMode } = useTheme();

    return (
        <section className={`relative z-0 flex flex-col justify-center pt-10 overflow-hidden transition-colors duration-300 ${
            isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"
        }`}>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-7"
                >
                    <h2 className={`text-4xl md:text-6xl mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Digital Solutions Built Around Your Goals
                    </h2>
                    <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                        Whether you're launching a startup or building a digital product, we have the right solution for your next stage of growth.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col mb-4"
            >
                <Row>
                    {allTags.map((item, idx) => (
                        <Tag key={idx} {...item}>{item.name}</Tag>
                    ))}
                </Row>
            </motion.div>

            {serviceSections.map((section, idx) => (
                <ServiceSection key={idx} id={idx} {...section} />
            ))}
        </section>
    );
}