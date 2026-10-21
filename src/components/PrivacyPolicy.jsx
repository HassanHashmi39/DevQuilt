import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const PolicySection = ({ title, content, isDarkMode }) => {
    return (
        <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
            <div className={`text-lg leading-relaxed space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content}
            </div>
        </div>
    );
};

export default function PrivacyPolicy() {
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
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Privacy Background"
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
                        {"PRIVACY POLICY".split(" ").map((word, i) => (
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
                        Learn how DevQuilt protects and handles your personal data with transparency.
                    </motion.p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 pb-32">
                <div className={`rounded-[3rem] p-8 md:p-16 border shadow-2xl ${isDarkMode ? 'bg-[#121214] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <PolicySection isDarkMode={isDarkMode}
                        title="1. Introduction"
                        content={
                            <p> At DevQuilt ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                        }
                    />

                    <PolicySection isDarkMode={isDarkMode}
                        title="2. Data Collection"
                        content={
                            <ul className="list-disc pl-6 space-y-3">
                                <li>Identity Data: Includes first name, last name, and title.</li>
                                <li>Contact Data: Includes email address and telephone numbers.</li>
                                <li>Technical Data: Includes internet protocol (IP) address, browser type and version, and time zone setting.</li>
                                <li>Usage Data: Includes information about how you use our website and services.</li>
                            </ul>
                        }
                    />

                    <PolicySection isDarkMode={isDarkMode}
                        title="3. How We Use Your Data"
                        content={
                            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, or where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</p>
                        }
                    />

                    <PolicySection isDarkMode={isDarkMode}
                        title="4. Data Security"
                        content={
                            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
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
