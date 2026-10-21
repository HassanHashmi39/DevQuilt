import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "motion/react";
import { Link } from "react-router-dom";
import { useScrollContainer } from "../context/ScrollContext";
import { useTheme } from "../context/ThemeContext";

const services = [
    {
        id: "01",
        name: "Website Development",
        shortName: "Website",
        title: "Websites for growing teams & high-converting businesses.",
        description:
            "We align messaging, page architecture, and high-performance React code. The site loads fast, tells the right story, and pushes visitors to conversion without dev firefighting. Your team gets a scalable foundation they can evolve with ease.",
        color: "#7C3AED", // Royal Purple
        gradient: "from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]",
        shadowColor: "rgba(124, 58, 237, 0.45)",
        quote:
            "“DevQuilt delivered our web platform with unbelievable speed and precision. Inbound conversions jumped significantly within the first month.”",
        author: "Theo Cesarini",
        role: "Co-founder @ InCrowd",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        ctaText: "SEE WEB PROJECTS →",
        ctaLink: "/projects",
        previews: [
            {
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
                caption: "Web Architecture",
            },
            {
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
                caption: "SaaS Dashboard",
            },
            {
                img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
                caption: "Conversion UI",
            },
        ],
    },
    {
        id: "02",
        name: "Startup MVP Development",
        shortName: "Startup MVP",
        title: "Startup MVPs you can validate and launch in weeks.",
        description:
            "We start from core business goals, map critical user journeys, and prototype what actually moves the needle. Fast sprints, reusable component libraries, and clean full-stack code engineered to onboard your first 10,000 real users.",
        color: "#EF4444", // Vibrant Red
        gradient: "from-[#EF4444] via-[#DC2626] to-[#B91C1C]",
        shadowColor: "rgba(239, 68, 68, 0.45)",
        quote:
            "“The engineering speed and flexibility from DevQuilt are exactly what early-stage startups need to win and raise funding.”",
        author: "Alexis Botaya",
        role: "Managing Director @ SoundLab",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        ctaText: "EXPLORE MVP PROJECTS →",
        ctaLink: "/projects",
        previews: [
            {
                img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=600&auto=format&fit=crop",
                caption: "Rapid Prototype",
            },
            {
                img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
                caption: "Mobile Experience",
            },
            {
                img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600&auto=format&fit=crop",
                caption: "User Workflow",
            },
        ],
    },
    {
        id: "03",
        name: "AI Integration",
        shortName: "AI Integration",
        title: "AI Integration that users adopt & keep using.",
        description:
            "Integrate computer vision, smart PyTorch classification models (like Skinzy health analysis), custom conversational chatbots, and automated workflows directly into your digital product to save hours of manual work.",
        color: "#10B981", // Emerald Green
        gradient: "from-[#10B981] via-[#059669] to-[#047857]",
        shadowColor: "rgba(16, 185, 129, 0.45)",
        quote:
            "“DevQuilt delivered our AI skin analysis pipeline with PyTorch ResNet18 seamlessly. Real-time condition detection with instant personalized action plans.”",
        author: "Skinzy Health",
        role: "AI Healthcare Product",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        ctaText: "VIEW AI CASE STUDY →",
        ctaLink: "/case-studies/1",
        previews: [
            {
                img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
                caption: "Vision Pipeline",
            },
            {
                img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
                caption: "Skin Analysis",
            },
            {
                img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop",
                caption: "AI Routines",
            },
        ],
    },
    {
        id: "04",
        name: "UI/UX & Branding",
        shortName: "UI/UX & Branding",
        title: "Intuitive product design & distinctive brand identity.",
        description:
            "Design systems, user experience journeys, and memorable visual identities that make your digital product effortless to use and your brand instantly trustworthy. From wireframes and design tokens to interactive Figma prototypes.",
        color: "#8B5CF6", // Electric Purple
        gradient: "from-[#8B5CF6] via-[#7C3AED] to-[#581C87]",
        shadowColor: "rgba(139, 92, 246, 0.45)",
        quote:
            "“Our product usability scores increased dramatically after DevQuilt crafted our complete UI system. The design language feels premium and cohesive.”",
        author: "Elena Rostova",
        role: "Product Lead @ NexaDesign",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        ctaText: "SEE DESIGN WORK →",
        ctaLink: "/projects",
        previews: [
            {
                img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
                caption: "Design System",
            },
            {
                img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600&auto=format&fit=crop",
                caption: "Brand Identity",
            },
            {
                img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
                caption: "Figma Tokens",
            },
        ],
    },
    {
        id: "05",
        name: "Technical SEO",
        shortName: "Technical SEO",
        title: "Technical SEO foundations to help your product rank & scale.",
        description:
            "Semantic HTML5 architecture, Core Web Vitals optimization, automated XML sitemaps, structured schema data, and fast page speed for maximum organic discovery.",
        color: "#DC2626", // Deep Red
        gradient: "from-[#EF4444] via-[#DC2626] to-[#991B1B]",
        shadowColor: "rgba(220, 38, 38, 0.45)",
        quote:
            "“DevQuilt optimized our architecture and our organic search traffic grew 3x within two months. Clean, fast, and properly indexed.”",
        author: "Marcus Vance",
        role: "Growth Lead @ PeakMetrics",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        ctaText: "START YOUR PROJECT →",
        ctaLink: "/contact",
        previews: [
            {
                img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=600&auto=format&fit=crop",
                caption: "Core Web Vitals",
            },
            {
                img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
                caption: "Indexing Setup",
            },
            {
                img: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=600&auto=format&fit=crop",
                caption: "Schema Markup",
            },
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

                    {/* ── BOTTOM ROW: Testimonial left | Previews right ── */}
                    <div className="flex flex-col lg:flex-row items-end gap-5 mt-auto pt-2">

                        {/* Left: Testimonial */}
                        <div className="flex flex-col gap-2.5 max-w-xs shrink-0">
                            <p className="text-white/75 text-[11px] sm:text-xs italic leading-relaxed">
                                {service.quote}
                            </p>
                            <div className="flex items-center gap-2.5">
                                <img
                                    src={service.avatar}
                                    alt={service.author}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white/40 shadow-md shrink-0"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div>
                                    <p className="text-xs font-bold text-white leading-tight">{service.author}</p>
                                    <p className="text-[10px] text-white/65">{service.role}</p>
                                </div>
                            </div>
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
                            Scroll to flip through our services
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
