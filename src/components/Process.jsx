import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const TypingText = ({ text }) => {
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
        let i = 0;
        setDisplayText("");
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
};

const VideoButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <motion.div
            animate={{ height: (isMobile && isHovered) ? 320 : 56 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
            }}
            className="flex justify-center mb-6 md:mb-16 px-6 relative z-20"
        >
            <motion.div
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)}
                className={`absolute top-0 cursor-pointer overflow-hidden rounded-[28px] shadow-2xl w-[220px] transition-colors duration-300 ${
                    isDarkMode
                        ? "bg-[#1d1d1d] border border-white/10"
                        : "bg-white border border-gray-200 shadow-md"
                }`}
                animate={{
                    height: isHovered ? 320 : 56,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }}
            >
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        !isDarkMode && !isHovered ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                </video>

                {/* Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isDarkMode
                        ? (isHovered ? 'bg-black/10' : 'bg-black/30 opacity-40')
                        : (isHovered ? 'bg-black/20' : 'bg-white opacity-100')
                }`} />

                {/* Button Content (Collapsed) */}
                <motion.div
                    className="absolute inset-x-0 h-14 flex items-center justify-center gap-3 px-6 z-10"
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        y: isHovered ? -20 : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <span className={`font-semibold text-sm tracking-wide transition-colors ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                        How it works!
                    </span>
                </motion.div>

                {/* Card Content (Expanded) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                    }}
                    transition={{ duration: 0.4, delay: isHovered ? 0.1 : 0 }}
                >
                </motion.div>

                {/* Bottom Shine */}
                {isDarkMode && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                )}
            </motion.div>
        </motion.div>
    );
};

export default function Process() {
    const { isDarkMode } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [hoveredStep, setHoveredStep] = useState(null);

    const steps = [
        {
            number: 1,
            title: "Discover",
            description: "Understand your idea, audience, goals, and requirements before choosing a solution.",
            pos: { x: 100, y: 45 },
            align: "top",
        },
        {
            number: 2,
            title: "Plan",
            description: "Define the scope, priorities, timeline, and deliverables together.",
            pos: { x: 279, y: 60 },
            align: "bottom",
        },
        {
            number: 3,
            title: "Design",
            description: "Shape the user experience and visual direction before development begins.",
            pos: { x: 500, y: 140 },
            align: "bottom",
        },
        {
            number: 4,
            title: "Develop",
            description: "Build, integrate, and test the solution with regular progress updates.",
            pos: { x: 700, y: 55 },
            align: "bottom",
        },
        {
            number: 5,
            title: "Launch",
            description: "Prepare, configure, and deploy the project for release — ready for real users.",
            pos: { x: 850, y: 45 },
            align: "top",
        },
    ];

    const pathData = "M 50 100 C 150 20, 250 20, 350 100 S 550 180, 650 100 S 850 20, 950 100";

    return (
        <section
            ref={ref}
            className={`relative w-full min-h-screen overflow-hidden z-0 font-tomato pt-24 pb-10 md:pt-12 flex flex-col items-center justify-start transition-colors duration-300 shadow-[0_-40px_80px_rgba(0,0,0,0.1),0_40px_80px_rgba(0,0,0,0.1)] ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f7] text-gray-900"
            }`}
        >

            <div className="max-w-[1400px] mx-auto px-6 relative z-10" key={isInView ? "active" : "inactive"}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`text-[28px] md:text-[54px] font-medium text-center lg:tracking-tight mb-4 md:mb-6 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    From First Conversation to Launch
                </motion.h2>

                <div>
                    <VideoButton />
                </div>


                {/* Desktop Curve */}
                <div className="hidden lg:block relative w-full aspect-[1000/200] max-w-[1200px] mx-auto mb-25 mt-32">
                    {/* SVG Progress Line */}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 1000 200"
                            preserveAspectRatio="xMidYMid meet"
                            fill="none"
                        >
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#e5e5e5" />
                                    <stop offset="25%" stopColor="#a3a3a3" />
                                    <stop offset="50%" stopColor="#000000" />
                                    <stop offset="75%" stopColor="#a3a3a3" />
                                    <stop offset="100%" stopColor="#e5e5e5" />
                                </linearGradient>

                                {/* Static bold center mask */}
                                <linearGradient id="thickMaskGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="black" />
                                    <stop offset="20%" stopColor="black" />
                                    <stop offset="45%" stopColor="white" />
                                    <stop offset="55%" stopColor="white" />
                                    <stop offset="80%" stopColor="black" />
                                    <stop offset="100%" stopColor="black" />
                                </linearGradient>
                                <mask id="thickMask">
                                    <rect x="0" y="0" width="1000" height="200" fill="url(#thickMaskGrad)" />
                                </mask>

                                {/* Static medium mask */}
                                <linearGradient id="mediumMaskGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="black" />
                                    <stop offset="5%" stopColor="black" />
                                    <stop offset="25%" stopColor="white" />
                                    <stop offset="75%" stopColor="white" />
                                    <stop offset="95%" stopColor="black" />
                                    <stop offset="100%" stopColor="black" />
                                </linearGradient>
                                <mask id="mediumMask">
                                    <rect x="0" y="0" width="1000" height="200" fill="url(#mediumMaskGrad)" />
                                </mask>

                            </defs>

                            <motion.path
                                d={pathData}
                                stroke="url(#lineGrad)"
                                strokeWidth="0.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 10, ease: [0.45, 0, 0.55, 1] }}
                            />

                            <motion.path
                                d={pathData}
                                stroke="#555"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                fill="none"
                                mask="url(#mediumMask)"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 10, ease: [0.45, 0, 0.55, 1] }}
                            />

                            {/* Bold center — static mask, stays in middle */}
                            <motion.path
                                d={pathData}
                                stroke="#111"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                fill="none"
                                mask="url(#thickMask)"
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 10, ease: [0.45, 0, 0.55, 1] }}
                            />

                            {/* Moving dash tip */}
                            <motion.path
                                d={pathData}
                                pathLength="100"
                                stroke="#111"
                                strokeWidth="0.1"
                                strokeLinecap="round"
                                strokeDasharray="5 100"
                                initial={{ strokeDashoffset: 5 }}
                                animate={isInView ? { strokeDashoffset: -95 } : { strokeDashoffset: 5 }}
                                transition={{ duration: 10, ease: [0.45, 0, 0.55, 1] }}
                                fill="none"
                                style={{ pointerEvents: 'none' }}
                            />
                        </svg>
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                            transition={{
                                delay: isInView
                                    ? (i === 0 ? 0 : i === 1 ? 2 : i === 2 ? 5 : i === 3 ? 6.5 : 8.2)
                                    : 0,
                                duration: 1,
                                type: "spring"
                            }}
                            className="absolute flex flex-col items-center"
                            style={{
                                left: `${(step.pos.x / 1000) * 100}%`,
                                top: `${(step.pos.y / 200) * 100}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            onMouseEnter={() => setHoveredStep(step)}
                            onMouseLeave={() => setHoveredStep(null)}
                        >
                            <AnimatePresence>
                                {hoveredStep?.number === step.number && (
                                    <motion.div
                                        initial={{ opacity: 0, y: step.align === "top" ? 20 : -10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: step.align === "top" ? 20 : -10, scale: 0.9 }}
                                        className={`absolute z-[50] w-[280px] pointer-events-none 
                                            ${step.align === "top" ? "-top-48" : "top-24"} 
                                            left-1/2 -translate-x-1/2`}
                                    >
                                        <div className={`p-5 rounded-2xl backdrop-blur-2xl border shadow-2xl text-center ${
                                            isDarkMode ? "bg-[#18181b]/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-gray-900"
                                        }`}>
                                            <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                                            <p className="text-sm font-light leading-relaxed">
                                                <TypingText text={step.description} />
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {step.align === "top" && (
                                <div className={`absolute -top-15 w-64 text-center transition-opacity duration-300 ${hoveredStep ? "opacity-0" : "opacity-100"}`}>
                                    <h3 className={`font-semibold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
                                </div>
                            )}
                            <div
                                className={`w-[35px] h-[35px] rounded-full border-2 ${
                                    isDarkMode
                                        ? "border-white/20 bg-[#18181b] text-white"
                                        : "border-black/20 bg-white text-gray-900"
                                } flex items-center justify-center text-xs font-bold shadow-sm z-10 transition-transform duration-300 transform cursor-pointer ${
                                    hoveredStep?.number === step.number
                                        ? "scale-125 shadow-md"
                                        : "hover:scale-110"
                                }`}
                            >
                                {step.number}
                            </div>
                            {step.align === "bottom" && (
                                <div className={`absolute top-16 w-64 text-center transition-opacity duration-300 ${hoveredStep ? "opacity-0" : "opacity-100"}`}>
                                    <h3 className={`font-semibold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                        {step.title}
                                    </h3>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Mobile/Tablet Layout */}
                <div className="lg:hidden space-y-8 md:space-y-16 relative py-6 md:py-12">
                    <div className={`absolute left-[15px] top-4 bottom-4 w-[2px] ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: isInView ? i * 0.2 : 0 }}
                            className="flex items-start gap-6 relative"
                            onMouseEnter={() => setHoveredStep(step)}
                            onMouseLeave={() => setHoveredStep(null)}
                        >
                            <div className={`w-[32px] h-[32px] shrink-0 rounded-full border-2 ${
                                isDarkMode
                                    ? "border-white/20 bg-[#18181b] text-white"
                                    : "border-black/20 bg-white text-gray-900"
                            } flex items-center justify-center text-xs font-bold shadow-sm z-10 relative transition-transform duration-300 ${
                                hoveredStep?.number === step.number
                                    ? "scale-110 shadow-md"
                                    : ""
                            }`}>
                                {step.number}
                            </div>
                            <div className="flex flex-col pt-1 relative">
                                <h3 className={`font-semibold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    {step.title}
                                </h3>
                                <AnimatePresence>
                                    {hoveredStep?.number === step.number && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className={`mt-2 p-4 rounded-xl backdrop-blur-xl border shadow-lg max-w-[260px] ${
                                                isDarkMode ? "bg-[#18181b]/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-gray-900"
                                            }`}
                                        >
                                            <p className="text-sm font-light leading-relaxed">
                                                <TypingText text={step.description} />
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-1 lg:mt-3 mb-4 max-w-5xl mx-auto text-white"
                >
                    <p className="text-[10px] md:text-[20px] font-small leading-relaxed tracking-tight">
                        With over 5 years of combined experience, we'll help you become a
                        trusted expert in your field and turn your audience into potential
                        customers.
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
