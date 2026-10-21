import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import starImg from "../assets/Star 3.webp";
import { Link } from "react-router-dom";

export default function Hero() {
    const words = ["Websites", "Brand Identity", "UX/UI", "Digital Products", "E-commerce"];
    const colors = ["text-purple-400", "text-lime-400", "text-red-400", "text-blue-400", "text-indigo-400"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <section className="min-h-[90vh] px-4 flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">

            <div
                className="fixed inset-0 bg-contain bg-center bg-no-repeat opacity-10 z-0 pointer-events-none"
                style={{ backgroundImage: `url(${starImg})` }}
            />

            {/* Subtle purple glow top-left */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-800/8 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 items-end px-4 md:px-10 pb-12">

                {/* Left Content: Bold Heading */}
                <div className="flex flex-col items-start">
                    <p className="text-gray-400 font-medium tracking-tight mb-6 text-base">
                        Web Development for Startups
                    </p>

                    <h1 className="text-4xl sm:text-6xl lg:text-[85px] font-bold leading-[1] tracking-tighter text-white text-left">
                        {/* Line 1: We Build [Animated Word] */}
                        <div className="flex items-center gap-x-3 whitespace-nowrap">
                            <span>We Build</span>
                            <span className="inline-flex relative h-[1.1em] w-[8ch] sm:w-[10ch] lg:w-[12ch] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        initial={{ y: "80%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        exit={{ y: "-80%", opacity: 0 }}
                                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                        className={`absolute inset-0 flex items-center whitespace-nowrap ${colors[index]}`}
                                    >
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </div>

                        {/* Line 2: That Launch & Grow */}
                        <div className="text-white block whitespace-nowrap">That Launch &</div>

                        {/* Line 3: Your Startup */}
                        <div className="text-white block whitespace-nowrap">Grow Startups</div>
                    </h1>
                </div>

                {/* Right Content: Subtext and Button */}
                <div className="flex flex-col items-start gap-5 lg:mb-4 lg:ml-[-4rem] max-w-xs translate-y-30">
                    <div className="text-gray-300 text-lg font-medium leading-tight">
                        <p>From idea to</p>
                        <p>digital product — we build what comes next.</p>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <Link to="/contact">
                            <motion.button
                                whileHover="hover"
                                className="flex items-center justify-center relative shadow-sm overflow-hidden px-5 py-2.5 border border-white/20 rounded-full bg-white/5 text-white hover:text-black hover:bg-white transition-all duration-500 min-w-[220px]"
                            >
                                {/* Default Content */}
                                <motion.div
                                    className="flex items-center gap-3"
                                    variants={{
                                        hover: { x: 140, opacity: 0 }
                                    }}
                                    transition={{ duration: 0.4, ease: "easeIn" }}
                                >
                                    <span className="text-base font-medium">Book a Discovery Call</span>
                                    <span className="text-xl">✦</span>
                                </motion.div>

                                {/* Hover Content */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center gap-3 px-5 text-black"
                                    initial={{ x: -140, opacity: 0 }}
                                    variants={{
                                        hover: { x: 0, opacity: 1 }
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <span className="text-base font-medium whitespace-nowrap">Book a Discovery Call</span>
                                    <motion.div
                                        className="w-5 h-5 flex items-center justify-center text-black shrink-0"
                                        variants={{
                                            hover: { rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }
                                        }}
                                    >
                                        <span className="text-lg">✦</span>
                                    </motion.div>
                                </motion.div>
                            </motion.button>
                        </Link>

                        <Link
                            to="/projects"
                            className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4 ml-2"
                        >
                            Explore Our Projects →
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
