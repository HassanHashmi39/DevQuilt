import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const TermsSection = ({ title, content, isDarkMode }) => {
    return (
        <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
            <div className={`text-lg leading-relaxed space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content}
            </div>
        </div>
    );
};

export default function TermsAndConditions() {
    const { isDarkMode } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-screen font-tomato outline-none transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Hero Section */}
            <div className="relative h-[50vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Terms Background"
                        className="w-full h-full object-cover grayscale opacity-20"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${isDarkMode ? 'via-[#0a0a0a]/60 to-[#0a0a0a]' : 'via-white/60 to-white'}`} />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl"
                >
                    <h1 className="text-[4rem] md:text-[6rem] font-black leading-[0.9] mb-6 tracking-tighter overflow-hidden text-white">
                        {"TERMS & CONDITIONS".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl font-medium max-w-2xl mx-auto text-gray-400"
                    >
                        Please read these terms carefully before engaging with DevQuilt's services.
                    </motion.p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 pb-32">
                <div className={`rounded-[3rem] p-8 md:p-16 border shadow-2xl ${isDarkMode ? 'bg-[#121214] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <TermsSection isDarkMode={isDarkMode}
                        title="1. Terms"
                        content={
                            <p>By accessing the website at devquilt.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                        }
                    />

                    <TermsSection isDarkMode={isDarkMode}
                        title="2. Use License"
                        content={
                            <p>Permission is granted to temporarily download one copy of the materials (information or software) on DevQuilt's website for personal, non-commercial transitory viewing only.</p>
                        }
                    />

                    <TermsSection isDarkMode={isDarkMode}
                        title="3. Disclaimer"
                        content={
                            <p>The materials on DevQuilt's website are provided on an 'as is' basis. DevQuilt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        }
                    />

                    <TermsSection isDarkMode={isDarkMode}
                        title="4. Limitations"
                        content={
                            <p>In no event shall DevQuilt or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DevQuilt's website.</p>
                        }
                    />

                    {/* Bottom CTA to return */}
                    <div className={`mt-16 pt-12 border-t text-center ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                        <Link
                            to="/"
                            className={`font-bold uppercase text-sm tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-gray-400' : 'text-gray-900 hover:text-gray-500'}`}
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
