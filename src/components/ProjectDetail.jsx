import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import defaultDetail1 from "../assets/projects/project-detail-1.jpg";
import defaultDetail2 from "../assets/projects/project-detail-2.jpg";

const ProjectDetail = ({ project, projects, onSelectProject, onClose }) => {
    const [showCredits, setShowCredits] = useState(false);
    const { isDarkMode } = useTheme();

    const [isLiked, setIsLiked] = useState(() => {
        try {
            return localStorage.getItem(`devquilt_liked_${project.title}`) === 'true';
        } catch {
            return false;
        }
    });

    const [isSaved, setIsSaved] = useState(() => {
        try {
            return localStorage.getItem(`devquilt_saved_${project.title}`) === 'true';
        } catch {
            return false;
        }
    });

    const [isCopied, setIsCopied] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // Sync state when project changes
    useEffect(() => {
        try {
            setIsLiked(localStorage.getItem(`devquilt_liked_${project.title}`) === 'true');
            setIsSaved(localStorage.getItem(`devquilt_saved_${project.title}`) === 'true');
        } catch {}
        setIsCopied(false);
    }, [project.title]);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage((cur) => (cur === msg ? null : cur));
        }, 2600);
    };

    const handleToggleLike = (e) => {
        e.stopPropagation();
        const next = !isLiked;
        setIsLiked(next);
        try {
            localStorage.setItem(`devquilt_liked_${project.title}`, String(next));
        } catch {}
        showToast(next ? "Added to favorites! ❤️" : "Removed from favorites");
    };

    const handleToggleSave = (e) => {
        e.stopPropagation();
        const next = !isSaved;
        setIsSaved(next);
        try {
            localStorage.setItem(`devquilt_saved_${project.title}`, String(next));
        } catch {}
        showToast(next ? "Saved for later! ⏱️" : "Removed from saved");
    };

    const getShareUrl = () => {
        return window.location.href.includes('/projects')
            ? window.location.href
            : `${window.location.origin}/projects`;
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        const shareUrl = getShareUrl();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${project.title} — DevQuilt`,
                    text: project.description || `Check out ${project.title} on DevQuilt`,
                    url: shareUrl,
                });
                showToast("Shared successfully! 🚀");
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            showToast("Link copied to clipboard! 📋");
        } catch {
            showToast(`Project link: ${shareUrl}`);
        }
    };

    const handleFacebookShare = () => {
        const shareUrl = getShareUrl();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
    };

    const handleTwitterShare = () => {
        const shareUrl = getShareUrl();
        const text = `Check out ${project.title} by DevQuilt!`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
    };

    // Find next project
    const currentIndex = projects.findIndex(p => p.title === project.title);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    // Prevent background scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <motion.div
            key={project.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[150] overflow-y-auto transition-colors duration-300 ${
                isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
            }`}
        >
            {/* Project Header */}
            <div className="max-w-7xl mx-auto px-6 py-10 relative">
                <div className="flex flex-col items-center text-center">
                    <h2 className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{project.title}</h2>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Product Showcase ~ {project.title} by DevQuilt</p>

                    <button
                        onClick={onClose}
                        className={`absolute right-6 top-10 transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-900"}`}
                        aria-label="Close project"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className={`w-full h-px mt-10 mb-20 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />
                </div>

                {/* Left Sidebar Label (Functional - Back to Projects) */}
                <div
                    onClick={onClose}
                    className="hidden lg:block fixed left-8 top-1/2 -rotate-90 origin-left cursor-pointer group/sidebar z-50"
                >
                    <div className="flex items-center gap-4">
                        <span className={`text-sm font-bold tracking-[0.4em] uppercase transition-all duration-300 border-r pr-6 ${
                            isDarkMode
                                ? "text-gray-400 group-hover/sidebar:text-white border-white/10"
                                : "text-gray-500 group-hover/sidebar:text-gray-900 border-gray-200"
                        }`}>
                            Work
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest opacity-0 -translate-x-4 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 transition-all duration-500 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                            ← Back to Gallery
                        </span>
                    </div>
                </div>

                {/* Project Intro Content */}
                <div className="max-w-2xl mx-auto text-center space-y-12 mb-20">
                    <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        The Strategic Art of Building <br /> {project.title}
                    </h1>

                    {project.tech && (
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                isDarkMode ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}>
                                {project.tech}
                            </span>
                        </div>
                    )}

                    <div className={`space-y-6 leading-relaxed text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <p>
                            {project.description || `Working closely with the ${project.title} team, DevQuilt engineered and delivered a high-performance digital product. We aligned modern architecture, intuitive UI/UX design, and scalable infrastructure to drive real impact.`}
                        </p>
                        <p>
                            From interactive prototypes and seamless integrations to rigorous performance tuning,
                            every module was built with responsiveness, speed, and real user value in mind.
                        </p>
                    </div>

                    {project.github && (
                        <div className="pt-2 flex justify-center">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-3 px-6 py-3 font-semibold rounded-xl transition-all shadow-md hover:shadow-lg ${
                                    isDarkMode
                                        ? "bg-gray-900 hover:bg-black text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                }`}
                            >
                                {project.github.includes("github.com") ? (
                                    <>
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        View Source on GitHub ↗
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                        Visit Live Website ↗
                                    </>
                                )}
                            </a>
                        </div>
                    )}
                </div>

                {/* Hero Showcase Image */}
                <div className="relative group mb-8">
                    <img
                        src={project.image}
                        alt="Hero view"
                        loading="lazy"
                        className="w-full h-auto aspect-video object-cover rounded-sm shadow-sm"
                    />
                    {/* Social Floating Icons Style */}
                    <div className="absolute right-4 top-4 flex flex-col gap-2 z-20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                        {/* Like Button */}
                        <motion.button
                            type="button"
                            onClick={handleToggleLike}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.85 }}
                            aria-label={isLiked ? "Unlike project" : "Like project"}
                            title={isLiked ? "Unlike project" : "Like project"}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer ${
                                isLiked
                                    ? "bg-rose-600/90 text-white border border-rose-400/50 shadow-rose-500/30"
                                    : "bg-black/80 hover:bg-black text-white hover:text-rose-400 border border-white/10"
                            }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={isLiked ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-200"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </motion.button>

                        {/* Save / Watch Later Button */}
                        <motion.button
                            type="button"
                            onClick={handleToggleSave}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.85 }}
                            aria-label={isSaved ? "Remove from saved" : "Save for later"}
                            title={isSaved ? "Remove from saved" : "Save for later"}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer ${
                                isSaved
                                    ? "bg-amber-600/90 text-white border border-amber-400/50 shadow-amber-500/30"
                                    : "bg-black/80 hover:bg-black text-white hover:text-amber-400 border border-white/10"
                            }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill={isSaved ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-200"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </motion.button>

                        {/* Share Button */}
                        <motion.button
                            type="button"
                            onClick={handleShare}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.85 }}
                            aria-label="Share project"
                            title={isCopied ? "Link copied!" : "Share project"}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg cursor-pointer ${
                                isCopied
                                    ? "bg-emerald-600 text-white border border-emerald-400/50 shadow-emerald-500/30"
                                    : "bg-black/80 hover:bg-black text-white hover:text-blue-400 border border-white/10"
                            }`}
                        >
                            {isCopied ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Supporting Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <img
                        src={project.detailImage1 || defaultDetail1}
                        alt={`${project.title} Detail 1`}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-sm"
                    />
                    <img
                        src={project.detailImage2 || defaultDetail2}
                        alt={`${project.title} Detail 2`}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-sm"
                    />
                </div>

                {/* Credits Toggle Section */}
                <div className={`border-t mt-20 ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between py-10">
                        <button
                            onClick={() => setShowCredits(!showCredits)}
                            className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                            <div className="flex flex-col gap-1 w-4">
                                <div className="h-[2px] w-full bg-current" />
                                <div className="h-[2px] w-3/4 bg-current" />
                                <div className="h-[2px] w-full bg-current" />
                            </div>
                            {showCredits ? "Close Credits" : "View Credits"}
                        </button>

                        <div className={`flex items-center gap-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            <button
                                type="button"
                                onClick={handleFacebookShare}
                                aria-label="Share on Facebook"
                                title="Share on Facebook"
                                className={`transition-colors cursor-pointer ${isDarkMode ? "hover:text-white" : "hover:text-gray-900"}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </button>
                            <button
                                type="button"
                                onClick={handleTwitterShare}
                                aria-label="Share on X (Twitter)"
                                title="Share on X (Twitter)"
                                className={`transition-colors cursor-pointer ${isDarkMode ? "hover:text-white" : "hover:text-gray-900"}`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {showCredits && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="py-20 space-y-12">
                                    <h2 className={`text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Credits</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                                        <div className="space-y-2">
                                            <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Client:</p>
                                            <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{project.title} with DevQuilt</p>
                                        </div>

                                        <div className="space-y-2">
                                            <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Engineering, UI/UX &amp; Cloud:</p>
                                            <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>DevQuilt Product &amp; Engineering Team</p>
                                        </div>

                                        <div className="space-y-4">
                                            <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>DevQuilt Core Team:</p>
                                            <div className={`space-y-1 font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                <p>Ahmed Raza</p>
                                                <p>Sami Khan</p>
                                                <p>Uzair Ahmed</p>
                                                <p>Hassan Ali</p>
                                                <p>Zainab Khalid</p>
                                                <p>Bilal Mansoor</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Quote Area */}
                <div className={`py-20 border-t text-center ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                    <p className={`text-xl font-medium mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Next Project</p>
                    <h2
                        onClick={() => onSelectProject(nextProject)}
                        className={`text-4xl font-bold cursor-pointer hover:text-purple-500 transition-colors ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Discover {nextProject.title} →
                    </h2>
                </div>
            </div>

            {/* Interactive Feedback Toast */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-6 right-6 z-[250] px-4 py-3 rounded-xl bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2.5 text-sm font-semibold pointer-events-none"
                    >
                        <span>{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectDetail;
