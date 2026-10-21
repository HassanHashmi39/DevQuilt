import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

const caseStudies = [
    { id: 1, title: "Skinzy — AI Skin Care & Wellness App", category: "AI & Mobile App", color: "bg-purple-600", text: "text-white" },
    { id: 2, title: "React Native Portfolio App", category: "Cross-Platform", color: "bg-blue-600", text: "text-white" },
    { id: 3, title: "ReactJs Portfolio Website", category: "Modern Web", color: "bg-lime-400", text: "text-black" },
    { id: 4, title: "Java GUI Task Manager", category: "Desktop Application", color: "bg-amber-500", text: "text-black" },
];

const CaseStudies = () => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-tomato outline-none transition-colors duration-300 ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-5xl md:text-7xl lg:text-[80px] font-tomatoGrotesk text-center mb-8 leading-[1.1] tracking-tight ${
                        isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    Real Results, <br />
                    <span className={`italic font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>Real Impact.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-center max-w-2xl text-lg md:text-xl font-medium mb-16 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    Explore how we've helped startups and businesses build digital products that communicate value and drive growth.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                    {caseStudies.map((item, index) => (
                        <Link to={`/case-studies/${item.id}`} key={item.id} className="block">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                className={`group relative rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer border ${
                                    isDarkMode
                                        ? "bg-[#121214] border-white/10 hover:border-white/30"
                                        : "bg-gray-50 border-gray-200 hover:border-gray-400 shadow-md"
                                }`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150 ease-out ${
                                    isDarkMode ? "bg-white/5" : "bg-black/5"
                                }`} />
                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${item.color} ${item.text}`}>
                                            {item.category}
                                        </span>
                                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                                            isDarkMode
                                                ? "border-white/20 group-hover:bg-white group-hover:border-white"
                                                : "border-gray-300 group-hover:bg-gray-900 group-hover:border-gray-900"
                                        }`}>
                                            <svg className={`w-4 h-4 transition-colors ${isDarkMode ? "text-white group-hover:text-black" : "text-gray-600 group-hover:text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className={`text-3xl font-tomatoGrotesk font-bold mt-12 transition-colors ${
                                        isDarkMode ? "text-white group-hover:text-gray-200" : "text-gray-900 group-hover:text-gray-700"
                                    }`}>
                                        {item.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CaseStudies;
