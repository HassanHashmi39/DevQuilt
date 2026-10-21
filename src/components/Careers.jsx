import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const jobs = [
    { title: "Full-Stack Web Engineer (React & Node.js)", location: "Remote / Lahore", type: "Full-Time", dept: "Engineering", id: "eng-01" },
    { title: "Mobile App Developer (Flutter / React Native)", location: "Remote / Islamabad", type: "Full-Time", dept: "Mobile", id: "mob-02" },
    { title: "Lead UI/UX Product Designer", location: "Remote / Karachi", type: "Full-Time", dept: "Design", id: "dsn-03" },
    { title: "Digital Marketing & SEO Strategist", location: "Remote / Pakistan", type: "Full-Time", dept: "Marketing", id: "mkt-04" },
];

const Careers = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-[#f3f3f2] pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-tomato outline-none"
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* ... existing hero and jobs list content ... */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center relative w-full mb-16"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-lime-200 to-yellow-100 rounded-full blur-[100px] opacity-40 mix-blend-multiply z-0" />
                    <h1 className="text-6xl md:text-8xl lg:text-[120px] font-tomatoGrotesk text-center leading-[0.9] tracking-tighter text-gray-900 z-10 relative">
                        Build the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600 italic font-light">Future</span>
                    </h1>
                    <p className="text-gray-600 mt-8 max-w-2xl text-center text-lg md:text-xl font-medium z-10">
                        Join an elite team of makers, thinkers, and rule-breakers designing the next generation of digital experiences.
                    </p>
                </motion.div>

                <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden py-4 z-10 border border-gray-100 relative">
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <h2 className="text-2xl font-bold font-tomatoGrotesk">Open Roles</h2>
                        <div className="text-sm font-semibold text-gray-500 bg-gray-200 px-4 py-1.5 rounded-full">
                            4 Positions
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {jobs.map((job, index) => (
                            <Link to={`/careers/${job.id}`} key={job.id} className="block group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    className="px-8 py-8 hover:bg-black transition-colors duration-500 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                >
                                    <div className="flex-1">
                                        <div className="flex gap-2 mb-3">
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-lime-500 border border-lime-500/30 px-2 py-0.5 rounded">
                                                {job.dept}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 border border-gray-200 px-2 py-0.5 rounded group-hover:text-gray-400 group-hover:border-gray-700 transition-colors">
                                                {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-tomatoGrotesk font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                                            {job.title}
                                        </h3>
                                        <p className="text-gray-500 font-medium mt-2 flex items-center gap-2 group-hover:text-gray-400 transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {job.location}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-500 shrink-0 self-end md:self-center">
                                        <svg className="w-5 h-5 text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Careers;
