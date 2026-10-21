import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import bdImg from "../assets/bd.webp";
import starImg from "../assets/Star 3.webp";
import CalendarServicesDeck from "./CalendarServicesDeck";
import InteractiveServicesAccordion from "./InteractiveServicesAccordion";

// ================= MAIN PAGE =================

const ServicesPage = () => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-screen font-tomato outline-none transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
                }`}
        >
            {/* BACKGROUND */}
            <div
                className={`fixed inset-0 bg-cover bg-center -z-30 ${isDarkMode ? "opacity-20" : "opacity-10"}`}
                style={{ backgroundImage: `url(${bdImg})` }}
            />
            <div
                className={`fixed inset-0 bg-contain bg-center -z-20 pointer-events-none bg-no-repeat ${isDarkMode ? "opacity-30" : "opacity-15"}`}
                style={{ backgroundImage: `url(${starImg})` }}
            />

            {/* HERO - ROTATING ORBITAL GALLERY */}
            <section
                style={{
                    "--orbit-radius": "clamp(175px, 26vw, 390px)",
                }}
                className={`relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#fbfbfd] text-gray-900"
                    }`}
            >


                {/* Center Hero Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl pointer-events-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 25, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Design. Develop. Grow.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className={`text-sm sm:text-base md:text-lg mb-8 font-medium tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                    >
                        DevQuilt Studio — Design that means business.
                    </motion.p>


                </div>

                {/* Bottom Fade Out Gradient Overlay */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-44 pointer-events-none z-20 bg-gradient-to-t ${isDarkMode
                        ? "from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"
                        : "from-white via-white/70 to-transparent"
                        }`}
                />
            </section>

            {/* INTERACTIVE SERVICES ACCORDION (PINTEREST DESIGN) */}
            <div className="relative z-20">
                <InteractiveServicesAccordion />
            </div>

            {/* CALENDAR SCROLL SERVICES DECK */}
            <div className={`relative z-20 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"}`}>
                <CalendarServicesDeck />
            </div>
        </motion.div>
    );
};

export default ServicesPage;
