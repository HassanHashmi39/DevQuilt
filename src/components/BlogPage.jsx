import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const BlogCard = ({ children, className = "" }) => (
    <motion.div
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
        {children}
    </motion.div>
);

const BlogPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#f5f5f5] min-h-screen pt-24 pb-20 px-4 md:px-10 font-tomato outline-none"
        >
            <div className="max-w-7xl mx-auto">


                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[1100px]">

                    {/* 1. Featured Post (Left Large) */}
                    <div className="md:col-span-6 h-full">
                        <Link to="/blog/full-body-home-gym">
                            <BlogCard className="bg-white rounded-[3rem] p-4 flex flex-col h-full relative group">
                                <div className="relative flex-grow overflow-hidden rounded-[2.5rem]">
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                                    <img
                                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                        alt="Featured Post"
                                        loading="eager"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Fire Tag */}
                                    <div className="absolute top-6 left-6 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-xl shadow-lg border border-white/40 z-20">
                                        ⚡
                                    </div>

                                    {/* Text Area floating on image */}
                                    <div className="absolute bottom-0 left-0 bg-white pt-8 pr-12 rounded-tr-[3rem]">
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                                            <span className="text-black">Category .</span> Web Dev <span className="ml-2">| Tech Insights</span>
                                        </div>
                                        <h2 className="text-3xl md:text-[44px] leading-[0.95] font-black text-black uppercase tracking-tighter mb-2">
                                            Next-Gen Full-Stack<br />Web Architecture !
                                        </h2>

                                        {/* Read Article Button inside featured card */}
                                        <motion.div
                                            className="inline-flex items-center gap-2 mt-2 bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ x: -20 }}
                                            whileInView={{ x: 0 }}
                                        >
                                            Read Article <span className="text-lime-400">→</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </BlogCard>
                        </Link>
                    </div>

                    {/* Right Column Container (6 columns) */}
                    <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* 2. Lime Green Highlight (Middle Top) */}
                        <div className="md:col-span-2">
                            <Link to="/blog/start-running">
                                <BlogCard className="bg-[#D9F99D] rounded-[3rem] p-10 flex flex-col justify-between h-[550px] relative overflow-hidden">
                                    <div className="relative z-10">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/60 block mb-6">
                                            Category . Product Engineering
                                        </span>
                                        <h3 className="text-[40px] md:text-[50px] leading-[1] font-black text-black uppercase tracking-tighter mb-6 max-w-[80%]">
                                            From Idea to MVP: How to Launch High-Impact Software
                                        </h3>
                                        <p className="text-sm text-black/70 leading-relaxed max-w-[90%] font-medium">
                                            Building successful digital products starts with clear product discovery, modular software architecture, and fast user validation sprints. Discover how DevQuilt turns complex ideas into world-class software... <span className="text-black font-bold border-b border-black cursor-pointer">More</span>
                                        </p>
                                    </div>

                                    {/* Circle Pattern */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[50px] border-black/5 rounded-full pointer-events-none opacity-50"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[50px] border-black/5 rounded-full pointer-events-none opacity-30"></div>

                                    {/* Arrow Button */}
                                    <div className="absolute top-8 right-8 w-14 h-14 bg-[#bef264] rounded-full flex items-center justify-center border border-black/5 group-hover:bg-black transition-colors duration-300 group-hover:text-white">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rotate-45">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>

                                    {/* Inner List Links */}
                                    <div className="border-t border-black/10 mt-10 pt-4 relative z-10 flex flex-col gap-5">
                                        <div className="flex items-center justify-between group/link cursor-pointer">
                                            <span className="text-sm font-black uppercase tracking-tight">Designing High-Converting UI/UX Design Systems</span>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/link:translate-x-1">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                            </svg>
                                        </div>
                                        <div className="border-t border-black/10 pt-4 flex items-center justify-between group/link cursor-pointer">
                                            <span className="text-sm font-black uppercase tracking-tight">Top Performance Optimizations for Modern React Web Apps</span>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover/link:translate-x-1">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                            </svg>
                                        </div>
                                    </div>
                                </BlogCard>
                            </Link>
                        </div>

                        {/* 3. Tiny Blue Vertical Card (Bottom Right 1) */}
                        <Link to="/blog/laziness-in-sports">
                            <BlogCard className="bg-[#BAE6FD] rounded-[3rem] p-6 flex flex-col h-[530px] relative">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block mb-2">
                                    Category . Mobile
                                </span>
                                <span className="text-[10px] font-medium text-black/40 block mb-4 italic">Trending . 2026</span>
                                <h3 className="text-2xl font-black text-black uppercase leading-tight mb-4 tracking-tight">
                                    Cross-Platform Apps: Flutter vs React Native
                                </h3>
                                <div className="flex-grow rounded-t-full overflow-hidden mt-2">
                                    <img
                                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                        className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        alt="Mobile App Development"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </BlogCard>
                        </Link>

                        {/* 4. Video/Image Card (Bottom Middle) */}
                        <div className="flex flex-col gap-5">
                            <Link to="/blog/training-styles">
                                <BlogCard className="bg-white rounded-[3rem] p-3 h-[280px] shadow-sm flex flex-col">
                                    <div className="relative flex-grow overflow-hidden rounded-[2.5rem]">
                                        <img
                                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                            alt="Cloud Infrastructure"
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/40 group-hover:scale-110 transition-transform">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-[#f8f8f8] rounded-b-[2.5rem] mt-1 pr-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block mb-1">
                                            Category . Cloud &amp; AI
                                        </span>
                                        <h4 className="text-[11px] font-black text-black uppercase leading-tight tracking-tight">
                                            Enterprise Cloud Architecture &amp; CI/CD Pipelines
                                        </h4>
                                        <span className="text-[9px] text-gray-400 mt-2 block">5 Min Read . DevQuilt</span>
                                    </div>
                                </BlogCard>
                            </Link>

                            {/* 5. Categories Card (Bottom Right 2) */}
                            <BlogCard className="bg-[#DDD6FE] rounded-[3.5rem] p-8 flex flex-col h-[230px] justify-between shadow-sm relative overflow-hidden">
                                <div className="flex flex-wrap gap-2 relative z-10 pr-10">
                                    {["Web Development", "Mobile Apps", "UI/UX Design", "Cloud & DevOps", "API Integration", "AI Automation", "SEO Strategy", "Next.js & React"].map((cat) => (
                                        <motion.span
                                            key={cat}
                                            whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#FEF987" }}
                                            className="bg-[#FEF987] transition-all duration-300 px-4 py-2 rounded-full text-[10px] font-bold text-black border border-black/5 whitespace-nowrap cursor-pointer shadow-sm"
                                        >
                                            {cat}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between relative z-10 mt-4">
                                    <span className="text-sm font-black text-black uppercase tracking-tight">View All Categories</span>
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:bg-black hover:text-white transition-colors duration-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Circle Highlight behind button */}
                                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#FEF987] rounded-full blur-[2px] opacity-40"></div>
                            </BlogCard>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPage;
