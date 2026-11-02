import React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const reactjsPortfolioImg = "/projects/reactjs-portfolio.jpg";
const apexSaasImg         = "/projects/apex-saas.jpg";
const skinzyImg           = "/projects/skinzy.jpg";
const aiMedicalImg        = "/projects/ai-medical-diagnostics.jpg";
const javaTaskManagerImg  = "/projects/java-task-manager.jpg";
const cloudInfraImg       = "/projects/cloud-infrastructure.jpg";

const Gallery = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const cards = [
        {
            id: 1,
            title: "React.js Portfolio",
            category: "Modern Web App",
            image: reactjsPortfolioImg,
            rotation: -15,
            x: -120,
            y: 10
        },
        {
            id: 2,
            title: "Apex SaaS Platform",
            category: "B2B SaaS Launchpad",
            image: apexSaasImg,
            rotation: -8,
            x: -60,
            y: 5
        },
        {
            id: 3,
            title: "Skinzy AI Platform",
            category: "AI Skincare & Mobile App",
            image: skinzyImg,
            rotation: -2,
            x: 0,
            y: 0
        },
        {
            id: 4,
            title: "AI Medical Diagnostics",
            category: "Machine Learning & Vision",
            image: aiMedicalImg,
            rotation: 4,
            x: 60,
            y: 5
        },
        {
            id: 5,
            title: "Java Task Manager",
            category: "Desktop Application",
            image: javaTaskManagerImg,
            rotation: 10,
            x: 120,
            y: 10
        },
        {
            id: 6,
            title: "Cloud Infrastructure",
            category: "DevOps & Cloud Architecture",
            image: cloudInfraImg,
            rotation: 18,
            x: 180,
            y: 20
        },
    ];

    return (
        <section className={`relative px-4 sm:px-6 py-12 md:py-16 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    A place to display our <br className="hidden md:block" /> masterpieces.
                </motion.h2>

                {/* Fan Out Cards Container */}
                <div className="relative h-[280px] sm:h-[380px] md:h-[500px] flex items-center justify-center mb-8 md:mb-12">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, scale: 0.8, x: 0, rotate: 0 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                x: isMobile ? card.x * 0.45 : card.x,
                                rotate: isMobile ? card.rotation * 0.75 : card.rotation,
                                y: isMobile ? card.y * 0.6 : card.y
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 1,
                                delay: index * 0.1,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 50,
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => navigate('/projects')}
                            className="group absolute w-[130px] h-[180px] sm:w-[180px] sm:h-[240px] md:w-[260px] md:h-[340px] rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/90 bg-gray-900 cursor-pointer transition-shadow hover:shadow-purple-500/30"
                            style={{ zIndex: index }}
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Card Hover Overlay with Project Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-purple-300">
                                    {card.category}
                                </span>
                                <h3 className="text-white text-sm md:text-base font-bold leading-tight mt-0.5">
                                    {card.title}
                                </h3>
                                <p className="text-gray-300 text-[11px] md:text-xs mt-1 flex items-center gap-1 font-medium">
                                    <span>View project</span>
                                    <span>→</span>
                                </p>
                            </div>

                            {/* Featured Indicator on Center Card (Card 3 - Skinzy) */}
                            {card.id === 3 && (
                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wide flex items-center gap-1 shadow-md group-hover:opacity-0 transition-opacity">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Featured</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium">
                        Explore our featured engineering masterpieces and real-world client applications.
                    </p>

                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                    >
                        <span>View All Projects</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/30 to-violet-900/20 rounded-full blur-[120px]" />
            </div>
        </section>
    );
};

export default Gallery;
