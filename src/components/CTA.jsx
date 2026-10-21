import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CTA() {
    const { isDarkMode } = useTheme();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: true });
    const [, setInitialRun] = useState(false);

    useEffect(() => {
        if (isInView) {
            setInitialRun(true);
            const timer = setTimeout(() => {
                setInitialRun(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={ref}
            style={{
                backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
            }}
            className="px-4 sm:px-6 lg:px-8 transition-colors duration-400"
        >
            <div className="max-w-6xl mx-auto">

                {/* CTA Content */}
                <div
                    className="py-16 md:py-24 text-center border-b"
                    style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                        style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
                    >
                        Ready to Turn Your Idea{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(90deg,#a855f7,#ef4444)" }}
                        >
                            Into Something Real?
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
                        style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}
                    >
                        Tell us what you're building. We'll discuss your goals, explore the right approach, and identify the next steps.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            to="/contact"
                            className="relative z-10 inline-block"
                        >
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                aria-label="Book a Free Discovery Call"
                                variants={{
                                    initial: { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)" },
                                    hover: { backgroundColor: isDarkMode ? "#ffffff" : "#000000" }
                                }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-center justify-center relative shadow-sm overflow-hidden px-8 py-3.5 rounded-full font-semibold text-sm min-h-[46px] border transition-all cursor-pointer ${
                                    isDarkMode ? "text-white border-white/15" : "text-gray-900 border-black/10"
                                }`}
                            >
                                {/* Layer 1: Base Static Text & Icon */}
                                <div className="flex items-center justify-center gap-2 w-full h-full relative z-0">
                                    <span>Book a Free Discovery Call</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" />
                                    </svg>
                                </div>

                                {/* Layer 2: Shutter + Revealed Text & Icon */}
                                <motion.div
                                    className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none ${
                                        isDarkMode ? "bg-white text-black" : "bg-black text-white keep-white"
                                    }`}
                                    variants={{
                                        initial: { y: "100%" },
                                        hover: { y: "0%" }
                                    }}
                                    transition={{
                                        duration: 0.15,
                                        ease: "easeInOut",
                                        delay: 0.05
                                    }}
                                >
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <span className="whitespace-nowrap">Book a Free Discovery Call</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
                        <span
                            className="text-sm"
                            style={{ color: isDarkMode ? '#6b7280' : '#6b7280' }}
                        >
                            Have a project in mind? Let's talk.
                        </span>
                    </motion.div>
                </div>

                {/* Socials & Logo Row */}
                <div
                    className="flex flex-col md:flex-row justify-between items-center gap-8 pt-5 pb-5 border-b"
                    style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                >
                    <div
                        className="flex items-center gap-8"
                        style={{ color: isDarkMode ? '#9ca3af' : '#111827' }}
                    >
                        <a href="https://calendly.com/devquilt0/30min" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="https://www.facebook.com/share/1FCsS1EMtk/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/devquilt/home/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/devquilt_tech/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" /></svg>
                        </a>
                    </div>

                    <img
                        src="/logo-wordmark.png"
                        alt="DevQuilt"
                        className={`h-14 w-auto object-contain transition-all ${isDarkMode ? 'brightness-0 invert' : ''}`}
                    />

                    <div
                        className="font-bold tracking-tight text-lg"
                        style={{ color: isDarkMode ? '#9ca3af' : '#111827' }}
                    >
                        WEBSITE DEVELOPMENT FOR STARTUPS
                    </div>
                </div>

            </div>
        </section>
    );
}
