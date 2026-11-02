import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "motion/react";
import { Link } from "react-router-dom";
import { useScrollContainer } from "../context/ScrollContext";
import { useTheme } from "../context/ThemeContext";

// Real project screenshots
import imgSkinzy from "../assets/projects/skinzy.jpg";
import imgSkinzyD1 from "../assets/projects/skinzy-detail-1.jpg";
import imgSkinzyD2 from "../assets/projects/skinzy-detail-2.jpg";
import imgPortfolio from "../assets/projects/reactjs-portfolio.jpg";
import imgPortfolioD1 from "../assets/projects/reactjs-portfolio-detail-1.jpg";
import imgAgency from "../assets/projects/react-native-portfolio.jpg";
import imgAgencyD1 from "../assets/projects/react-native-portfolio-detail-1.jpg";
import imgSaas from "../assets/projects/apex-saas.jpg";
import imgSaasD1 from "../assets/projects/apex-saas-detail-1.jpg";
import imgSaasD2 from "../assets/projects/apex-saas-detail-2.jpg";

const services = [
    {
        id: "01",
        name: "Website Development",
        shortName: "Website",
        title: "Websites Built for Startup Growth.",
        description:
            "We design and develop fast, responsive websites that communicate your value, build trust, and help turn visitors into potential customers.",
        // ServiceShowcase WD panel — purple
        color: "#7c3aed",
        gradient: "from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]",
        shadowColor: "rgba(124, 58, 237, 0.5)",
        focusLabel: "What we focus on",
        focusPoints: [
            "Responsive layouts that work on every device",
            "Fast-loading pages optimised for performance",
            "Clear calls to action that guide your visitors",
        ],
        ctaText: "EXPLORE WEB PROJECTS",
        ctaLink: "/projects",
        previews: [
            { img: imgPortfolio,   caption: "Portfolio Website" },
            { img: imgAgency,      caption: "Agency Landing Page" },
            { img: imgPortfolioD1, caption: "Booking UI" },
        ],
    },
    {
        id: "02",
        name: "Startup MVP Development",
        shortName: "Startup MVP",
        title: "Turn Your Startup Idea into a Working Product.",
        description:
            "Build a focused first version of your digital product, test it with real users, and use their feedback to decide what to improve next.",
        // ServiceShowcase Social panel — orange
        color: "#ff5e00",
        gradient: "from-[#FF5E00] via-[#E85500] to-[#C44700]",
        shadowColor: "rgba(255, 94, 0, 0.5)",
        focusLabel: "What we focus on",
        focusPoints: [
            "Core product features that solve the real problem",
            "Essential user flows built for clarity",
            "A solid foundation ready for iteration",
        ],
        ctaText: "EXPLORE OUR PROJECTS",
        ctaLink: "/projects",
        previews: [
            { img: imgSaas,   caption: "SaaS Dashboard" },
            { img: imgSaasD1, caption: "Analytics View" },
            { img: imgSkinzy, caption: "AI Product" },
        ],
    },
    {
        id: "03",
        name: "AI Integration",
        shortName: "AI Integration",
        title: "Make Your Digital Product Smarter with AI.",
        description:
            "Integrate practical AI features, chatbots, image analysis, and automated workflows into digital products to improve user experiences and simplify repetitive tasks.",
        // ServiceShowcase Marketing panel — blue
        color: "#0ea5e9",
        gradient: "from-[#0EA5E9] via-[#0284C7] to-[#0369A1]",
        shadowColor: "rgba(14, 165, 233, 0.5)",
        focusLabel: "What we focus on",
        focusPoints: [
            "Practical AI use cases \u2014 not AI for the sake of it",
            "Automation that saves your team real time",
            "Seamless integration within your existing product",
        ],
        ctaText: "EXPLORE AI PROJECTS",
        ctaLink: "/projects",
        previews: [
            { img: imgSkinzy,   caption: "Skinzy \u2014 AI Skin App" },
            { img: imgSkinzyD1, caption: "Doctor Booking" },
            { img: imgSkinzyD2, caption: "Skincare Routine" },
        ],
    },
    {
        id: "04",
        name: "UI/UX & Branding",
        shortName: "UI/UX & Branding",
        title: "Design Experiences People Understand and Trust.",
        description:
            "Create intuitive user journeys, clean interfaces, and consistent brand visuals that make your product easier to use and your startup easier to recognise.",
        // ServiceShowcase Branding panel — deep purple
        color: "#5b21b6",
        gradient: "from-[#7C3AED] via-[#5B21B6] to-[#3B0764]",
        shadowColor: "rgba(91, 33, 182, 0.5)",
        focusLabel: "What we focus on",
        focusPoints: [
            "Intuitive user flows from first click to conversion",
            "Clean, consistent interface systems",
            "A brand visual identity that builds recognition",
        ],
        ctaText: "EXPLORE DESIGN WORK",
        ctaLink: "/projects",
        previews: [
            { img: imgPortfolioD1, caption: "Service Booking UI" },
            { img: imgAgencyD1,    caption: "Agency Website" },
            { img: imgSaasD2,      caption: "Dashboard UI" },
        ],
    },
    {
        id: "05",
        name: "Technical SEO",
        shortName: "Technical SEO",
        title: "Build a Strong Foundation for Search Visibility.",
        description:
            "Improve your website\u2019s technical foundations with search-friendly structure, metadata, indexing essentials, and performance improvements that support organic discovery.",
        // ServiceShowcase WD dark bg style — navy dark gradient
        color: "#7c3aed",
        gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
        shadowColor: "rgba(124, 58, 237, 0.4)",
        focusLabel: "What we focus on",
        focusPoints: [
            "Semantic HTML structure search engines can read",
            "Core Web Vitals and page speed improvements",
            "Proper indexing, sitemaps and schema markup",
        ],
        ctaText: "DISCUSS YOUR PROJECT",
        ctaLink: "/contact",
        previews: [
            { img: imgAgency,    caption: "Optimised Website" },
            { img: imgSaas,      caption: "Performance Metrics" },
            { img: imgPortfolio, caption: "Clean Architecture" },
        ],
    },
];

// Single 3D Deck Card
function CalendarCard({ service, index, total, progress, onNext, onPrev }) {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    // Use Framer Motion useTransform with custom derivation function
    // Computes continuous 3D front-to-back flip upward motion for any card in the deck
    const y = useTransform(progress, (val) => {
        // Map progress [0.03, 0.97] to [0, total - 1]
        const clamped = Math.max(0, Math.min(1, (val - 0.03) / 0.94));
        const currentPos = clamped * (total - 1);
        const delta = index - currentPos;

        if (delta >= 0) {
            // Card is currently resting in front or waiting in stack underneath
            // Uniform 7px step down for every card deeper in the deck
            return `${delta * 7}px`;
        }

        // Card is flipping away or has flipped
        if (isLast) {
            return "0px";
        }

        // Lift upward
        const flipProgress = Math.min(1, -delta / 0.75);
        return `${-flipProgress * 135}%`;
    });

    const rotateX = useTransform(progress, (val) => {
        if (isLast) return 0;
        const clamped = Math.max(0, Math.min(1, (val - 0.03) / 0.94));
        const currentPos = clamped * (total - 1);
        const delta = index - currentPos;

        if (delta >= 0) return 0;

        // Tilts top edge backwards into 3D space (+rotateX)
        const flipProgress = Math.min(1, -delta / 0.75);
        return flipProgress * 32;
    });

    const scale = useTransform(progress, (val) => {
        const clamped = Math.max(0, Math.min(1, (val - 0.03) / 0.94));
        const currentPos = clamped * (total - 1);
        const delta = index - currentPos;

        if (delta >= 0) {
            return 1 - delta * 0.012;
        }

        if (isLast) return 1;

        const flipProgress = Math.min(1, -delta / 0.75);
        return 1 - flipProgress * 0.04;
    });

    const opacity = useTransform(progress, (val) => {
        if (isLast) return 1;
        const clamped = Math.max(0, Math.min(1, (val - 0.03) / 0.94));
        const currentPos = clamped * (total - 1);
        const delta = index - currentPos;

        if (delta >= 0) return 1;

        const flipProgress = Math.min(1, -delta / 0.75);
        if (flipProgress > 0.85) {
            return Math.max(0, 1 - (flipProgress - 0.85) / 0.15);
        }
        return 1;
    });

    const pointerEvents = useTransform(progress, (val) => {
        const clamped = Math.max(0, Math.min(1, (val - 0.03) / 0.94));
        const currentPos = clamped * (total - 1);
        const delta = index - currentPos;

        if (Math.abs(delta) < 0.45) return "auto";
        return "none";
    });

    return (
        <motion.div
            style={{
                y,
                rotateX,
                scale,
                opacity,
                pointerEvents,
                transformOrigin: "50% 60%",
                zIndex: (total - index) * 10,
            }}
            className="absolute inset-x-0 top-0 max-w-5xl mx-auto px-4 w-full will-change-transform"
        >
            <div
                data-keep-white="true"
                className={`w-full h-[435px] sm:h-[445px] md:h-[455px] rounded-[1.75rem] md:rounded-[2.2rem] text-white keep-white shadow-2xl relative overflow-hidden bg-gradient-to-br ${service.gradient}`}
                style={{
                    boxShadow: `0 35px 80px -15px ${service.shadowColor}, 0 10px 30px rgba(0, 0, 0, 0.15)`,
                }}
            >
                {/* Subtle inner highlight */}
                <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />

                {/* ── CARD CONTENT GRID ── */}
                <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-7 md:p-8 lg:p-9 gap-0">

                    {/* ── TOP ROW: Large Title + Counter/Nav ── */}
                    <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
                        {/* Big bold title — the hero of the card */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-tomato font-black tracking-tight leading-[1.1] max-w-xl">
                            {service.title}
                        </h2>

                        {/* Counter + Nav buttons — top-right */}
                        <div className="flex items-center gap-2 shrink-0 pt-1">
                            <span className="text-xl md:text-2xl font-mono font-semibold text-white/80 tracking-wider">
                                ({service.id})
                            </span>
                            <div className="flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/20">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                    disabled={isFirst}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:pointer-events-none text-white transition-all text-xs"
                                    aria-label="Previous card"
                                >↑</button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                                    disabled={isLast}
                                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:pointer-events-none text-white transition-all text-xs"
                                    aria-label="Next card"
                                >↓</button>
                            </div>
                        </div>
                    </div>

                    {/* ── DESCRIPTION ── sits below title, left side */}
                    <p className="text-white/85 text-[12.5px] sm:text-[13px] md:text-sm leading-relaxed max-w-md mb-5 md:mb-6">
                        {service.description}
                    </p>

                    {/* ── BOTTOM ROW: Focus Points left | Previews right ── */}
                    <div className="flex flex-col lg:flex-row items-end gap-5 mt-auto pt-2">

                        {/* Left: What we focus on */}
                        <div className="flex flex-col gap-2 max-w-xs shrink-0">
                            <p className="text-white/50 text-[10px] uppercase tracking-[0.18em] font-bold">
                                {service.focusLabel}
                            </p>
                            <ul className="flex flex-col gap-1.5">
                                {service.focusPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2 text-white/80 text-[11px] sm:text-xs leading-snug">
                                        <span className="mt-0.5 w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                                            <span className="w-1 h-1 rounded-full bg-white/70" />
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Horizontal preview images with CTA overlaid */}
                        <div className="relative flex-1 w-full lg:w-auto min-h-[130px] sm:min-h-[145px]">
                            {/* Preview images — horizontal row, slightly staggered */}
                            <div className="flex items-end gap-2.5 h-full">
                                {service.previews.map((preview, pIdx) => (
                                    <div
                                        key={pIdx}
                                        className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 flex-1 group/prev"
                                        style={{
                                            height: pIdx === 1 ? "140px" : "120px",
                                            transform: pIdx === 0 ? "rotate(-2deg)" : pIdx === 2 ? "rotate(2deg)" : "none",
                                        }}
                                    >
                                        <img
                                            src={preview.img}
                                            alt={preview.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/prev:scale-105"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {/* Subtle dark scrim on hover for readability */}
                                        <div className="absolute inset-0 bg-black/20 group-hover/prev:bg-black/30 transition-colors" />
                                    </div>
                                ))}
                            </div>

                            {/* CTA pill overlaid on the image area — centered, just like the reference */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <Link
                                    to={service.ctaLink}
                                    onClick={(e) => e.stopPropagation()}
                                    className="pointer-events-auto inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/95 hover:bg-white text-gray-900 font-black text-[11px] sm:text-xs tracking-widest uppercase rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    {service.ctaText} →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CalendarServicesDeck() {
    const containerRef = useRef(null);
    const scrollContainerRef = useScrollContainer();

    // Single motion value drives all card transforms — no React re-renders on scroll
    const backupProgress = useMotionValue(0);
    const [activeTab, setActiveTab] = useState(0);
    // Ref to avoid calling setActiveTab on every frame (only on actual tab change)
    const activeTabRef = useRef(0);

    // Single scroll listener — no useScroll, no useMotionValueEvent duplication
    useEffect(() => {
        const getScrollEl = () =>
            scrollContainerRef?.current || document.querySelector("main") || window;

        const onScroll = () => {
            const scrollEl = getScrollEl();
            const el = containerRef.current;
            if (!el) return;

            const scrollTop = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
            const clientHeight = scrollEl === window ? window.innerHeight : scrollEl.clientHeight;
            const elRect = el.getBoundingClientRect();
            const scrollElRect =
                scrollEl === window ? { top: 0 } : scrollEl.getBoundingClientRect();

            const start = elRect.top - scrollElRect.top + scrollTop;
            const totalScrollable = el.offsetHeight - clientHeight;
            if (totalScrollable <= 0) return;

            const computed = Math.min(Math.max((scrollTop - start) / totalScrollable, 0), 1);
            // Update motion value every frame (no React re-render)
            backupProgress.set(computed);

            // Only trigger React re-render when the visible tab actually changes
            const currentPos = Math.min(
                Math.max(Math.round(computed * (services.length - 1)), 0),
                services.length - 1
            );
            if (currentPos !== activeTabRef.current) {
                activeTabRef.current = currentPos;
                setActiveTab(currentPos);
            }
        };

        const scrollEl = getScrollEl();
        scrollEl.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // set initial state

        return () => {
            scrollEl.removeEventListener("scroll", onScroll);
        };
    }, [scrollContainerRef, backupProgress]);

    // Programmatically scroll container to specific card
    const scrollToCard = (cardIndex) => {
        const scrollEl = scrollContainerRef?.current || document.querySelector("main") || window;
        const el = containerRef.current;
        if (!el) return;

        const scrollTop = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
        const clientHeight = scrollEl === window ? window.innerHeight : scrollEl.clientHeight;
        const elRect = el.getBoundingClientRect();
        const scrollElRect = scrollEl === window ? { top: 0 } : scrollEl.getBoundingClientRect();

        const start = elRect.top - scrollElRect.top + scrollTop;
        const totalScrollable = el.offsetHeight - clientHeight;

        // Spread target fractions across [0.04, 0.96]
        const targetFraction = 0.04 + (cardIndex / (services.length - 1)) * 0.92;
        const targetScrollTop = start + totalScrollable * targetFraction;

        scrollEl.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
        });
    };

    const { isDarkMode } = useTheme();

    return (
        <section
            ref={containerRef}
            className={`relative font-tomato transition-colors duration-300 ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}
            style={{
                // 450vh provides ample scroll runway for 5 services
                height: "450vh",
            }}
        >
            {/* Sticky Viewport Container */}
            <div className="sticky top-10 sm:top-12 md:top-14 min-h-[80vh] md:min-h-[84vh] flex flex-col justify-center items-center px-2 sm:px-6">
                {/* Section Header with Clickable Indicator Tabs */}
                <div className="max-w-5xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 md:mb-4 px-4">
                    <div>
                        <span className={`text-xs uppercase tracking-[0.25em] font-bold ${
                            isDarkMode ? "text-white/80" : "text-gray-600"
                        }`}>
                            Our Core Services
                        </span>
                        <h3 className={`text-xl md:text-2xl font-bold tracking-tight mt-0.5 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                            Digital Solutions Built for Startup Growth
                        </h3>
                    </div>

                    {/* Interactive Clickable Tabs */}
                    <div className={`flex flex-wrap items-center gap-1.5 backdrop-blur p-1 rounded-full text-xs font-semibold ${
                        isDarkMode
                            ? "bg-white/10 border border-white/10 text-gray-300"
                            : "bg-black/5 border border-black/10 text-gray-700 shadow-sm"
                    }`}>
                        {services.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToCard(idx)}
                                className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                                    activeTab === idx
                                        ? (isDarkMode ? "bg-white text-black shadow-md font-bold scale-105" : "bg-black text-white shadow-md font-bold scale-105")
                                        : (isDarkMode ? "hover:text-white opacity-70 hover:opacity-100" : "hover:text-black opacity-70 hover:opacity-100")
                                }`}
                            >
                                <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span>({item.id}) {item.shortName}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3D Perspective Card Stage */}
                <div
                    className="relative w-full max-w-5xl h-[450px] sm:h-[470px] md:h-[490px]"
                    style={{
                        perspective: "1200px",
                    }}
                >
                    {services.map((service, index) => (
                        <CalendarCard
                            key={service.id}
                            service={service}
                            index={index}
                            total={services.length}
                            progress={backupProgress}
                            onNext={() => scrollToCard(Math.min(index + 1, services.length - 1))}
                            onPrev={() => scrollToCard(Math.max(index - 1, 0))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
