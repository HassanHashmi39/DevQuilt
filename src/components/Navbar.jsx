import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useScrollContainer } from "../context/ScrollContext";
import { useTheme } from "../context/ThemeContext";
import logoImg from "../assets/logowithoutbg.png";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const { isDarkMode } = useTheme();

    // Close menu when route changes
    React.useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const scrollContainerRef = useScrollContainer();

    return (
        <>

            <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                    <filter id="glass-lens" x="-20%" y="-100%" width="140%" height="300%" colorInterpolationFilters="sRGB">
                        <feImage
                            href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2cpIi8+CjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJibGFjayIvPgo8c3RvcCBvZmZzZXQ9IjIwJSIgc3RvcC1jb2xvcj0iYmxhY2siLz4KPHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiM4MDgwODAiLz4KPHN0b3Agb2Zmc2V0PSI3MCUiIHN0b3AtY29sb3I9IiM4MDgwODAiLz4KPHN0b3Agb2Zmc2V0PSI4MCUiIHN0b3AtY29sb3I9IndoaXRlIi8+CjxzdG9wIG9mZmNldD0iMTAwJSIgc3RvcC1jb2xvcj0id2hpdGUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9zdmc+"
                            result="dispMap"
                            preserveAspectRatio="none"
                            x="0" y="0" width="100%" height="100%"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="dispMap"
                            scale="50"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <motion.nav
                className="fixed top-0 left-0 right-0 z-[100] w-full"
            >
                <div className="w-full px-4 md:px-10 flex items-center justify-between relative h-[52px]">

                    {/* Layer 1: Triple-Zone Refraction Lens */}
                    <div className="absolute inset-0  pointer-events-none overflow-hidden"
                        style={{
                            backdropFilter: 'url(#glass-lens)',
                            WebkitBackdropFilter: 'url(#glass-lens)',
                        }}
                    />

                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            background: isDarkMode
                                ? 'rgba(10, 10, 10, 0.85)'
                                : 'rgba(255, 255, 255, 0.65)',
                            boxShadow: isDarkMode
                                ? '0px 2px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
                                : '0px 2px 10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.7)',
                            border: isDarkMode
                                ? '1px solid rgba(255, 255, 255, 0.06)'
                                : '1px solid rgba(255, 255, 255, 0.4)',
                        }}
                    />

                    {/* Layer 3: Top Reflection Highlight */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-[1.5px] rounded-full pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        }}
                    />

                    {/* Layer 4: Bottom Edge Light Catch */}
                    <div className="absolute bottom-0 left-[15%] right-[15%] h-[1px] rounded-full pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                    />

                    {/* Logo */}
                    <div className="flex items-center shrink-0 relative z-10">
                        <Link to="/" aria-label="DevQuilt Home">
                            <img src={logoImg} alt="DevQuilt" width="100" height="100" decoding="async"
                                className={`h-13 w-auto object-contain ${isDarkMode ? 'brightness-0 invert' : 'brightness-0'}`}
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-1 p-1 rounded-full relative z-10">
                        {["Home", "Services", "Projects"].map((item) => {
                            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <li key={item}>
                                    <Link
                                        to={path}
                                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 block text-sm ${isActive
                                                ? isDarkMode
                                                    ? "text-white bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)] border border-white/10"
                                                    : "text-gray-900 bg-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-black/10"
                                                : isDarkMode
                                                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                                            }`}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>


                    {/* Desktop Right: Theme Toggle & CTA */}
                    <div className="hidden md:flex items-center gap-3 relative z-10">
                        <ThemeToggle />
                        <Link
                            to="/contact"
                            className="relative z-10"
                        >
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                aria-label="Get in touch with DevQuilt"
                                variants={{
                                    initial: { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)" },
                                    hover: { backgroundColor: isDarkMode ? "#ffffff" : "#000000" }
                                }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-center justify-center relative shadow-sm overflow-hidden px-7 py-2 rounded-full font-bold text-sm min-w-[145px] h-[40px] border transition-all ${isDarkMode ? "text-white border-white/15" : "text-gray-900 border-black/10"
                                    }`}
                            >
                                {/* Layer 1: Base Static Text */}
                                <div className="flex items-center justify-center gap-2 w-full h-full relative z-0">
                                    Let's Talk
                                </div>

                                {/* Layer 2: Shutter + Revealed Text */}
                                <motion.div
                                    className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none ${isDarkMode ? "bg-white text-black" : "bg-black text-white"
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
                                        <span className="whitespace-nowrap">Let's Talk</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Mobile Menu & Theme Toggle */}
                    <div className="flex md:hidden items-center gap-2 relative z-10">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            className={`p-2 focus:outline-none relative z-10 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-700 hover:text-black"
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {isOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 mt-3 rounded-3xl p-4 md:hidden flex flex-col gap-4 overflow-hidden mx-2 z-20"
                                style={{
                                    background: isDarkMode ? '#111111' : '#ffffff',
                                    border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
                                    boxShadow: isDarkMode ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.12)',
                                }}
                            >
                                <ul className="flex flex-col gap-2">
                                    {["Home", "Services", "Projects", "About"].map((item) => {
                                        const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                                        const isActive = location.pathname === path;
                                        return (
                                            <li key={item}>
                                                <Link
                                                    to={path}
                                                    className={`block px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${isActive
                                                            ? isDarkMode ? "text-white bg-white/10" : "text-gray-900 bg-black/8"
                                                            : isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                                                        }`}
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <Link
                                    to="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full block"
                                >
                                    <motion.div
                                        whileHover="hover"
                                        initial="initial"
                                        aria-label="Get in touch — Let's Talk"
                                        variants={{
                                            initial: { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)" },
                                            hover: { backgroundColor: isDarkMode ? "#ffffff" : "#000000" }
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex items-center justify-center relative overflow-hidden gap-2 w-full px-6 py-4 rounded-xl font-bold text-sm h-[52px] border ${isDarkMode ? "text-white border-white/15" : "text-gray-900 border-black/10"
                                            }`}
                                    >
                                        {/* Layer 1: Base Static Text */}
                                        <div className="flex items-center justify-center gap-2 w-full h-full relative z-0">
                                            Let's Talk
                                        </div>

                                        {/* Layer 2: Shutter + Revealed Text */}
                                        <motion.div
                                            className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none ${isDarkMode ? "bg-white text-black" : "bg-black text-white"
                                                }`}
                                            variants={{
                                                initial: { y: "100%" },
                                                hover: { y: "0%" }
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                                delay: 0.1
                                            }}
                                        >
                                            <div className="flex items-center justify-center gap-2 w-full px-6">
                                                <span className="whitespace-nowrap">Let's Talk</span>
                                                <div
                                                    className="w-7 h-7 bg-lime-400 rounded-full flex items-center justify-center text-black shrink-0"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.nav>
        </>
    );
}
