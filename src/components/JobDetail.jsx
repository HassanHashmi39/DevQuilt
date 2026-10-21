import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";

const jobsData = {
    "str-01": { title: "Senior Digital Strategist", location: "Remote / London", type: "Full-Time", dept: "Marketing", id: "str-01" },
    "eng-01": { title: "Creative Developer (WebGL/Three.js)", location: "New York", type: "Hybrid", dept: "Engineering", id: "eng-01" },
    "dsn-02": { title: "UI/UX Motion Designer", location: "Remote", type: "Full-Time", dept: "Design", id: "dsn-02" },
    "mkt-03": { title: "Content Marketing Manager", location: "Berlin", type: "On-Site", dept: "Marketing", id: "mkt-03" },
};

const JobDetail = () => {
    const { id } = useParams();
    const job = jobsData[id];

    if (!job) {
        return <div className="min-h-screen flex items-center justify-center text-black font-tomato font-bold text-2xl">Job Not Found</div>;
    }

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="min-h-screen bg-white text-black pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-tomato relative"
        >
            <div className="max-w-4xl mx-auto flex flex-col relative z-10">
                <Link to="/careers" className="text-gray-500 hover:text-black transition-colors mb-8 font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Open Roles
                </Link>

                <div className="flex gap-2 mb-6 uppercase tracking-widest font-bold text-[11px]">
                    <span className="text-lime-600 border border-lime-600/30 px-3 py-1 rounded-full">{job.dept}</span>
                    <span className="text-white border bg-black border-black px-3 py-1 rounded-full">{job.type}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-[80px] font-tomatoGrotesk leading-tight tracking-tighter mb-4">
                    {job.title}
                </h1>

                <p className="text-xl md:text-3xl text-gray-500 font-tomatoGrotesk font-bold mb-12 flex items-center gap-3">
                    <svg className="w-6 h-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                </p>

                <div className="prose prose-lg max-w-none text-gray-700">
                    <h2 className="text-3xl font-bold text-black mb-6">About the Role</h2>
                    <p className="leading-relaxed border-l-4 border-lime-500 pl-4 mb-8 text-xl font-medium">
                        Join our engineering and creative team at DevQuilt. Help us push the boundaries of modern software engineering, crafting high-performance web applications, mobile platforms, and sleek digital experiences.
                    </p>

                    <h2 className="text-3xl font-bold text-black mb-6">What you bring</h2>
                    <ul className="list-disc pl-6 mb-12 space-y-3">
                        <li>Solid foundations in modern software development and design patterns.</li>
                        <li>Passion for clean architecture, responsive design, and intuitive user experiences.</li>
                        <li>Ability to collaborate effectively in an agile, fast-paced team environment.</li>
                    </ul>

                    <div className="mt-12 group">
                        <a href="mailto:careers@devquilt.com" className="inline-flex items-center gap-4 bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-[5px_5px_0_0_#A3E635] border-2 border-transparent hover:border-black transition-all">
                            Apply via Email
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default JobDetail;
