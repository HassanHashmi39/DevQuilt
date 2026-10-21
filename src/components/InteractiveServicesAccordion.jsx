import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const accordionServices = [
    {
        id: "branding",
        title: "BRANDING",
        subtitle: "Visual Identity & Design Systems",
        description:
            "Distinctive brand identities, typography guidelines, logo systems, and cohesive visual languages that make early-stage ventures unforgettable and trustworthy.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
        accent: "#7C3AED", // Royal Purple
        ctaText: "Book a call",
        ctaLink: "/contact",
    },
    {
        id: "web-development",
        title: "WEB DEVELOPMENT",
        subtitle: "High-Performance Modern Web Apps",
        description:
            "Custom React web applications engineered with sub-second load times, responsive architecture, conversion-focused user journeys, and clean code that scales seamlessly.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
        accent: "#EF4444", // Vibrant Red
        ctaText: "Book a call",
        ctaLink: "/contact",
    },
    {
        id: "ux-ui-design",
        title: "UX/UI DESIGN",
        subtitle: "Product Architecture & Prototypes",
        description:
            "Intuitive user journeys, design systems, and clickable Figma prototypes engineered to reduce user churn, simplify complex workflows, and maximize retention.",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
        accent: "#916FFF", // Purple / Violet
        ctaText: "Book a call",
        ctaLink: "/contact",
    },
    {
        id: "app-development",
        title: "APP DEVELOPMENT",
        subtitle: "Cross-Platform Mobile Apps",
        description:
            "Mobile applications and startup MVPs built with React Native and modern full-stack APIs. Smooth animations, offline support, and production-ready architecture.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
        accent: "#10B981", // Emerald Green
        ctaText: "Book a call",
        ctaLink: "/contact",
    },
    {
        id: "ai-integration",
        title: "AI INTEGRATION",
        subtitle: "Vision Models & Automation",
        description:
            "PyTorch computer vision classification pipelines (like Skinzy Health), custom conversational chatbots, and automated workflows that eliminate manual bottlenecks.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        accent: "#10B981", // Emerald Green
        ctaText: "Book a call",
        ctaLink: "/contact",
    },
];

export default function InteractiveServicesAccordion() {
    const { isDarkMode } = useTheme();
    // Background image shows as long as mouse is hovering on the service card
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className={`relative w-full font-tomato py-20 sm:py-28 md:py-36 border-t overflow-hidden transition-colors duration-300 ${
            isDarkMode ? "bg-[#0a0a0a] text-white border-white/10" : "bg-white text-gray-900 border-gray-200"
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <div>
                        <span className={`text-xs uppercase tracking-[0.25em] font-bold ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                            Our Capabilities
                        </span>
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-1 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                            Everything we do, built for scale.
                        </h2>
                    </div>
                    <p className={`text-sm md:text-base max-w-md font-medium leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                        Hover over any capability to reveal our scope and book a call with our engineering team.
                    </p>
                </div>

                {/* Interactive Services List (Pinterest Pin Reference) */}
                <div className={`w-full border-t divide-y ${
                    isDarkMode ? "border-white/10 divide-white/10" : "border-gray-200 divide-gray-200"
                }`}>
                    {accordionServices.map((service) => {
                        const isActive = hoveredId === service.id;

                        return (
                            <div
                                key={service.id}
                                onMouseEnter={() => setHoveredId(service.id)}
                                onMouseLeave={() => setHoveredId((current) => (current === service.id ? null : current))}
                                onClick={() => setHoveredId(service.id)}
                                data-keep-white={isActive ? "true" : undefined}
                                className={`relative w-full cursor-pointer transition-colors duration-300 overflow-hidden ${
                                    isActive
                                        ? "text-white keep-white shadow-2xl rounded-2xl md:rounded-3xl border border-white/10"
                                        : (isDarkMode ? "hover:bg-white/[0.03]" : "hover:bg-black/[0.03]")
                                }`}
                            >
                                {/* Active State Background Image: Crisp, vibrant & clearly visible throughout hover */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            key={`bg-${service.id}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                                        >
                                            {/* Curtain reveal: image slides up from y:100% (fully below) to y:0
                                                overflow:hidden on wrapper clips it → clean bottom-to-top wipe */}
                                            <motion.img
                                                initial={{ y: "100%", opacity: 0.7, scale: 1.06 }}
                                                animate={{ y: "0%", opacity: 1, scale: 1 }}
                                                exit={{ y: "40%", opacity: 0, scale: 1.03 }}
                                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                                src={service.image}
                                                alt={service.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover object-center brightness-85 contrast-105 pointer-events-none will-change-transform"
                                            />
                                            {/* Gradient scrim overlay: dark on left for text readability, clear on right so the image is 100% visible */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20 pointer-events-none"
                                            />
                                            {/* Ambient glow accent rising from bottom */}
                                            <div
                                                className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-35 pointer-events-none"
                                                style={{ backgroundColor: service.accent }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Row Content Container */}
                                <div
                                    className={`relative z-10 w-full transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                                        isActive
                                            ? "py-10 sm:py-14 md:py-16 px-6 sm:px-10 md:px-14 min-h-[220px] md:min-h-[260px]"
                                            : "py-7 sm:py-9 px-4 sm:px-6 min-h-[90px] md:min-h-[105px]"
                                    }`}
                                >
                                    {/* Left: Service Title */}
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <span
                                            className={`text-xs font-mono font-bold tracking-widest transition-colors ${
                                                isActive ? "text-white/60" : (isDarkMode ? "text-gray-400" : "text-gray-500")
                                            }`}
                                        >
                                            0{accordionServices.indexOf(service) + 1}
                                        </span>
                                        <h3
                                            className={`font-tomato font-bold uppercase tracking-tight transition-all duration-300 ${
                                                isActive
                                                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-sm"
                                                    : (isDarkMode ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 group-hover:text-white" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900/80 group-hover:text-gray-900")
                                            }`}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Right: Description & CTA Button */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-8 max-w-xl">
                                        <p
                                            className={`text-xs sm:text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                                                isActive
                                                    ? "text-white/90 font-medium"
                                                    : (isDarkMode ? "text-gray-400 font-normal line-clamp-2 md:line-clamp-none" : "text-gray-600 font-normal line-clamp-2 md:line-clamp-none")
                                            }`}
                                        >
                                            {service.description}
                                        </p>

                                        {/* "Book a call" CTA Button with animated slide-up */}
                                        {isActive ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
                                                className="shrink-0 self-start md:self-auto"
                                            >
                                                <Link
                                                    to={service.ctaLink}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                                                >
                                                    <span>{service.ctaText}</span>
                                                    <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                                                        →
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        ) : (
                                            <span className={`hidden md:inline-block text-lg transition-transform group-hover:translate-x-1 ${
                                                isDarkMode ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-gray-900"
                                            }`}>
                                                →
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
