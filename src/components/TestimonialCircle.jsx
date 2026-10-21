import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
    {
        id: 1,
        name: "James K.",
        role: "Product Designer",
        feedback: "The branding work elevated our product to a whole new level. Clients noticed immediately.",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Sarah L.",
        role: "Marketing Head",
        feedback: "The user experience is seamless and intuitive. A game changer for our entire team.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Michael R.",
        role: "Tech Lead",
        feedback: "Incredible performance and reliability. I can't imagine working without it now.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "Emily M.",
        role: "Founder & CEO",
        feedback: "Simply the best software engineering partner we've worked with. Delivery was fast and flawless.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "Daniel W.",
        role: "E-commerce Director",
        feedback: "Our conversion rate jumped 38% after the redesign. Worth every penny invested.",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "Priya S.",
        role: "Brand Strategist",
        feedback: "They understood our vision perfectly and delivered beyond expectations. Highly recommend!",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 7,
        name: "Lucas B.",
        role: "Creative Director",
        feedback: "A fantastic collaboration from start to finish. The attention to detail is unmatched.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 8,
        name: "Aisha T.",
        role: "Startup Founder",
        feedback: "From logo to full brand identity — everything was cohesive, modern, and on-brand.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 9,
        name: "Noah C.",
        role: "VP of Growth",
        feedback: "We saw a measurable increase in conversion and digital reach after partnering with DevQuilt.",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 10,
        name: "Elena V.",
        role: "UX Researcher",
        feedback: "The research-driven approach is refreshing. They don't just make things look good — they work.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 11,
        name: "Omar F.",
        role: "Restaurant Owner",
        feedback: "My restaurant's social following tripled in 3 months thanks to their content strategy.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 12,
        name: "Mia J.",
        role: "Fashion Blogger",
        feedback: "My personal brand has never looked this polished. The team truly gets the fashion space.",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 13,
        name: "Raj P.",
        role: "SaaS Founder",
        feedback: "Onboarding drop-off cut by half after the UX overhaul. Phenomenal result.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 14,
        name: "Clara N.",
        role: "Non-profit Director",
        feedback: "They helped us tell our story in a way that resonated and drove real donations.",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=50&w=400&auto=format&fit=crop",
    },
    {
        id: 15,
        name: "Tom H.",
        role: "Real Estate Agent",
        feedback: "Professional, creative, and fast. The new brand helped me close more high-end clients.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=50&w=400&auto=format&fit=crop",
    },
];

const Orbit = ({ radius, duration, isPaused, children, reverse = false, isDarkMode = true }) => {
    return (
        <div
            className={`absolute flex items-center justify-center rounded-full border transition-colors duration-300 ${
                isDarkMode ? "border-white/10" : "border-black/10"
            }`}
            style={{
                width: radius * 2,
                height: radius * 2,
                animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`,
                animationPlayState: isPaused ? 'paused' : 'running'
            }}
        >
            {children}
        </div>
    );
};

const PositionedItem = ({ radius, angle, duration, isPaused, reverse, children }) => {
    return (
        <div
            className="absolute"
            style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
            }}
        >
            <div
                style={{
                    animation: `spin ${duration}s linear infinite ${reverse ? 'normal' : 'reverse'}`,
                    animationPlayState: isPaused ? 'paused' : 'running'
                }}
            >
                {children}
            </div>
        </div>
    );
};

const TestimonialCard = ({ testimonial, size = 64, onHover, isActive, onClick, isMobile, isDarkMode }) => {
    const cardRef = React.useRef(null);
    const [vPos, setVPos] = useState('top');
    const [hPos, setHPos] = useState('center');
    const [isHovered, setIsHovered] = useState(false);

    const showCard = isMobile ? isActive : isHovered;

    useEffect(() => {
        if (showCard && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const winW = window.innerWidth;
            const winH = window.innerHeight;

            // Vertical check
            if (rect.top < winH * 0.35) {
                setVPos('bottom');
            } else {
                setVPos('top');
            }

            // Horizontal check
            if (rect.left < winW * 0.25) {
                setHPos('right');
            } else if (rect.left > winW * 0.75) {
                setHPos('left');
            } else {
                setHPos('center');
            }
        }
    }, [showCard]);

    const getInitialAndExit = () => {
        if (hPos === 'center') return { opacity: 0, scale: 0.9, y: vPos === 'top' ? 10 : -10, x: "-50%" };
        if (hPos === 'right') return { opacity: 0, scale: 0.9, x: 10, y: "-50%" };
        return { opacity: 0, scale: 0.9, x: -10, y: "-50%" };
    };

    const getAnimate = () => {
        if (hPos === 'center') return { opacity: 1, scale: 1, y: vPos === 'top' ? -20 : 20, x: "-50%" };
        if (hPos === 'right') return { opacity: 1, scale: 1, x: 20, y: "-50%" };
        return { opacity: 1, scale: 1, x: -20, y: "-50%" };
    };

    const getCardClasses = () => {
        let classes = isDarkMode
            ? "absolute bg-[#18181b]/95 backdrop-blur-xl p-3 md:p-5 rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.6)] z-[100] border border-white/10 w-[220px] md:w-64 text-left "
            : "absolute bg-white/95 backdrop-blur-xl p-3 md:p-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] border border-gray-200/90 w-[220px] md:w-64 text-left ";

        if (hPos === 'center') {
            classes += `left-1/2 ${vPos === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'}`;
        } else if (hPos === 'right') {
            classes += "left-full top-1/2 ml-4";
        } else {
            classes += "right-full top-1/2 mr-4";
        }
        return classes;
    };

    return (
        <div
            ref={cardRef}
            className="relative flex items-center justify-center transition-all duration-300"
            onMouseEnter={() => {
                if (!isMobile) {
                    setIsHovered(true);
                    onHover(true);
                }
            }}
            onMouseLeave={() => {
                if (!isMobile) {
                    setIsHovered(false);
                    onHover(false);
                }
            }}
            onClick={(e) => {
                if (isMobile) {
                    e.stopPropagation();
                    onClick();
                }
            }}
        >
            {/* Avatar */}
            <div
                className={`relative rounded-full overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                    isActive || isHovered
                        ? 'scale-110 border-blue-500 shadow-lg'
                        : isDarkMode
                            ? 'border-white/40 grayscale hover:grayscale-0 hover:border-white'
                            : 'border-gray-300 grayscale hover:grayscale-0 hover:border-gray-900'
                }`}
                style={{ width: size, height: size }}
            >
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/10' : 'bg-transparent'}`} />
            </div>

            {/* Tooltip/Card */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={getInitialAndExit()}
                        animate={getAnimate()}
                        exit={getInitialAndExit()}
                        className={getCardClasses()}
                    >
                        <h4 className={`font-bold text-[13px] md:text-sm mb-0.5 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                            {testimonial.name}
                        </h4>
                        <p className={`text-[9px] md:text-[10px] font-medium mb-1.5 md:mb-2 uppercase tracking-wider ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            {testimonial.role}
                        </p>
                        <p className={`text-[11px] md:text-xs leading-relaxed italic ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                            "{testimonial.feedback}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function TestimonialCircle() {
    const { isDarkMode } = useTheme();
    const [activeId, setActiveId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const sectionRef = React.useRef(null);
    const isInView = useInView(sectionRef, { margin: "200px" });

    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => setWindowWidth(window.innerWidth), 150);
        };
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    const effectivePaused = isPaused || !isInView;

    const isMobile = windowWidth < 768;
    const r1 = isMobile ? 300 : 350;
    const r2 = isMobile ? 350 : 500;
    const r3 = isMobile ? 400 : 650;

    // Unique sizes per avatar — desktop / mobile
    const ring1Sizes = [80, 95, 70];
    const ring2Sizes = [88, 72, 104, 78, 92];
    const ring3Sizes = [70, 84, 68, 88, 75, 80];
    const ring1SizesMobile = [38, 48, 42];
    const ring2SizesMobile = [46, 38, 54, 42, 50];
    const ring3SizesMobile = [50, 43, 56, 46, 52, 48];

    const toggleTestimonial = (id) => {
        if (activeId === id) {
            setActiveId(null);
            setIsPaused(false);
        } else {
            setActiveId(id);
            setIsPaused(true);
        }
    };

    const handleClose = () => {
        setActiveId(null);
        setIsPaused(false);
    };

    return (
        <section
            style={{ backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff" }}
            ref={sectionRef}
            className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-400 ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}
            onClick={handleClose}
        >
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .orbit-ring {
                    will-change: transform;
                }
                .section-mask {
                    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
                    mask-composite: intersect;
                    -webkit-mask-composite: source-in;
                }
            `}</style>

            {/* Solar System / Concentric Circles Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 section-mask z-0">
                <div className={`absolute border rounded-full transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} style={{ width: r1 * 2, height: r1 * 2 }} />
                <div className={`absolute border rounded-full transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} style={{ width: r2 * 2, height: r2 * 2 }} />
                <div className={`absolute border rounded-full transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`} style={{ width: r3 * 2, height: r3 * 2 }} />
            </div>

            {/* Central Content */}
            <div className="relative z-10 text-center max-w-2xl px-4 pointer-events-none">
                <div className="pointer-events-none p-4 md:p-8 ">
                    <h2 className={`text-[26px] md:text-6xl font-bold mb-3 md:mb-6 tracking-tight leading-[1.2] md:leading-[1.1] transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                        Discover What Our <br /> Users Have to Say
                    </h2>
                    <p className={`text-[13px] md:text-xl font-medium px-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                        Real Stories, Real Experiences, Real Satisfaction
                    </p>
                </div>
            </div>

            {/* Rotating System — pointer-events-none on wrapper so orbit ring divs don't block hover */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-[50] ${!isMobile ? 'section-mask' : ''}`}>

                {/* Ring 1 - Inner: 3 avatars at 120° apart */}
                <Orbit radius={r1} duration={100} isPaused={effectivePaused} isDarkMode={isDarkMode}>
                    {[0, 120, 240].map((angle, i) => (
                        <div key={i} className="pointer-events-auto" style={{ zIndex: (hoveredId === testimonials[i].id || activeId === testimonials[i].id) ? 200 : 1 }}>
                            <PositionedItem radius={r1} angle={angle} duration={100} isPaused={effectivePaused}>
                                <TestimonialCard
                                    testimonial={{ ...testimonials[i], image: testimonials[i].image.replace('q=50&w=400', 'q=50&w=200') }}
                                    size={isMobile ? ring1SizesMobile[i] : ring1Sizes[i]}
                                    onHover={(active) => { setIsPaused(active); setHoveredId(active ? testimonials[i].id : null); }}
                                    isActive={activeId === testimonials[i].id}
                                    onClick={() => toggleTestimonial(testimonials[i].id)}
                                    isMobile={isMobile}
                                    isDarkMode={isDarkMode}
                                />
                            </PositionedItem>
                        </div>
                    ))}
                </Orbit>

                {/* Ring 2 - Mid: 5 avatars at 72° apart */}
                <Orbit radius={r2} duration={140} isPaused={effectivePaused} isDarkMode={isDarkMode}>
                    {[0, 72, 144, 216, 288].map((angle, i) => (
                        <div key={i} className="pointer-events-auto" style={{ zIndex: (hoveredId === testimonials[i + 3].id || activeId === testimonials[i + 3].id) ? 200 : 1 }}>
                            <PositionedItem radius={r2} angle={angle} duration={140} isPaused={effectivePaused}>
                                <TestimonialCard
                                    testimonial={{ ...testimonials[i + 3], image: testimonials[i + 3].image.replace('q=50&w=400', 'q=50&w=200') }}
                                    size={isMobile ? ring2SizesMobile[i] : ring2Sizes[i]}
                                    onHover={(active) => { setIsPaused(active); setHoveredId(active ? testimonials[i + 3].id : null); }}
                                    isActive={activeId === testimonials[i + 3].id}
                                    onClick={() => toggleTestimonial(testimonials[i + 3].id)}
                                    isMobile={isMobile}
                                    isDarkMode={isDarkMode}
                                />
                            </PositionedItem>
                        </div>
                    ))}
                </Orbit>

                {/* Ring 3 - Outer: 6 avatars at 60° apart */}
                <Orbit radius={r3} duration={180} isPaused={effectivePaused} isDarkMode={isDarkMode}>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <div key={i} className="pointer-events-auto" style={{ zIndex: (hoveredId === testimonials[i + 8].id || activeId === testimonials[i + 8].id) ? 200 : 1 }}>
                            <PositionedItem radius={r3} angle={angle} duration={180} isPaused={effectivePaused}>
                                <TestimonialCard
                                    testimonial={{ ...testimonials[i + 8], image: testimonials[i + 8].image.replace('q=50&w=400', 'q=50&w=300') }}
                                    size={isMobile ? ring3SizesMobile[i] : ring3Sizes[i]}
                                    onHover={(active) => { setIsPaused(active); setHoveredId(active ? testimonials[i + 8].id : null); }}
                                    isActive={activeId === testimonials[i + 8].id}
                                    onClick={() => toggleTestimonial(testimonials[i + 8].id)}
                                    isMobile={isMobile}
                                    isDarkMode={isDarkMode}
                                />
                            </PositionedItem>
                        </div>
                    ))}
                </Orbit>

            </div>
        </section>
    );
}