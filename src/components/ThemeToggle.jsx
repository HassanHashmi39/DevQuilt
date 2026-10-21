import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden border ${
                isDarkMode
                    ? "bg-white/[0.08] hover:bg-white/[0.14] border-white/15 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                    : "bg-black/[0.05] hover:bg-black/[0.08] border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            } ${className}`}
        >
            {/* Ambient Background Aura Glow */}
            <div
                className={`absolute inset-0 rounded-full opacity-60 transition-colors duration-500 pointer-events-none ${
                    isDarkMode
                        ? "bg-gradient-to-tr from-indigo-500/10 via-sky-400/10 to-transparent"
                        : "bg-gradient-to-tr from-amber-400/20 via-yellow-300/15 to-transparent"
                }`}
            />

            <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                    /* ─── REALISTIC MOON WITH CRATERS & TWINKLE STARS ─── */
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        className="relative w-5 h-5 flex items-center justify-center"
                    >
                        {/* Moon SVG with realistic crater texture and glow */}
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 drop-shadow-[0_0_5px_rgba(226,232,240,0.7)]"
                            fill="none"
                        >
                            {/* Moon body gradient definition */}
                            <defs>
                                <linearGradient id="lunar-surface" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" />
                                    <stop offset="45%" stopColor="#E2E8F0" />
                                    <stop offset="85%" stopColor="#CBD5E1" />
                                    <stop offset="100%" stopColor="#94A3B8" />
                                </linearGradient>
                                <radialGradient id="lunar-glow" cx="40%" cy="40%" r="60%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                                    <stop offset="70%" stopColor="rgba(226,232,240,0.4)" />
                                    <stop offset="100%" stopColor="rgba(148,163,184,0)" />
                                </radialGradient>
                            </defs>

                            {/* Realistic Crescent Moon Body */}
                            <path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                                fill="url(#lunar-surface)"
                                stroke="#CBD5E1"
                                strokeWidth="0.5"
                                strokeLinejoin="round"
                            />

                            {/* Realistic Crater 1 (Top) */}
                            <ellipse
                                cx="10.5"
                                cy="8.5"
                                rx="1.1"
                                ry="0.9"
                                fill="#94A3B8"
                                opacity="0.65"
                            />
                            <ellipse
                                cx="10.3"
                                cy="8.3"
                                rx="0.8"
                                ry="0.6"
                                fill="#64748B"
                                opacity="0.5"
                            />

                            {/* Realistic Crater 2 (Center-Left) */}
                            <circle
                                cx="8"
                                cy="13.5"
                                r="1.3"
                                fill="#94A3B8"
                                opacity="0.6"
                            />
                            <circle
                                cx="7.8"
                                cy="13.3"
                                r="0.9"
                                fill="#64748B"
                                opacity="0.55"
                            />

                            {/* Realistic Crater 3 (Bottom) */}
                            <circle
                                cx="12"
                                cy="17"
                                r="0.8"
                                fill="#94A3B8"
                                opacity="0.55"
                            />
                        </svg>

                        {/* Twinkling Celestial Star 1 */}
                        <motion.svg
                            animate={{
                                scale: [0.7, 1.25, 0.7],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 text-sky-200 pointer-events-none drop-shadow-[0_0_3px_#38bdf8]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                        </motion.svg>

                        {/* Twinkling Celestial Star 2 */}
                        <motion.svg
                            animate={{
                                scale: [1, 0.6, 1],
                                opacity: [0.8, 0.3, 0.8]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6
                            }}
                            className="absolute -bottom-0.5 left-0.5 w-1.5 h-1.5 text-indigo-200 pointer-events-none drop-shadow-[0_0_2px_#818cf8]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                        </motion.svg>
                    </motion.div>
                ) : (
                    /* ─── REALISTIC SUN WITH ROTATING BEAMS & WARM CORONA ─── */
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        className="relative w-5 h-5 flex items-center justify-center"
                    >
                        {/* Sun SVG with realistic glowing rays and depth */}
                        <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 24,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            viewBox="0 0 24 24"
                            className="w-5 h-5 drop-shadow-[0_0_6px_rgba(245,158,11,0.65)]"
                            fill="none"
                        >
                            <defs>
                                <linearGradient id="solar-core" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FEF08A" />
                                    <stop offset="40%" stopColor="#FBBF24" />
                                    <stop offset="85%" stopColor="#F59E0B" />
                                    <stop offset="100%" stopColor="#EA580C" />
                                </linearGradient>
                                <linearGradient id="ray-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FBBF24" />
                                    <stop offset="100%" stopColor="#F59E0B" />
                                </linearGradient>
                            </defs>

                            {/* 8 Tapered Solar Beams with rounded caps */}
                            <line x1="12" y1="1.5" x2="12" y2="4.2" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="12" y1="19.8" x2="12" y2="22.5" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="1.5" y1="12" x2="4.2" y2="12" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="19.8" y1="12" x2="22.5" y2="12" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="4.5" y1="4.5" x2="6.6" y2="6.6" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="17.4" y1="17.4" x2="19.5" y2="19.5" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="4.5" y1="19.5" x2="6.6" y2="17.4" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="17.4" y1="6.6" x2="19.5" y2="4.5" stroke="url(#ray-grad)" strokeWidth="1.8" strokeLinecap="round" />

                            {/* Central Sun Core */}
                            <circle
                                cx="12"
                                cy="12"
                                r="4.8"
                                fill="url(#solar-core)"
                                stroke="#FDE047"
                                strokeWidth="0.6"
                            />

                            {/* Inner Solar Specular Highlight */}
                            <circle
                                cx="10.5"
                                cy="10.5"
                                r="1.4"
                                fill="#FFFFFF"
                                opacity="0.6"
                            />
                        </motion.svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
