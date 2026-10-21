import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export default function WhyDevQuilt() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState(0);

    const sectionRef = useRef(null);
    const tableRef = useRef(null);
    const lineRefs = useRef([]);
    const isInView = useInView(sectionRef, { amount: 0.3 });
    const [borderPath, setBorderPath] = useState('');
    const [tableDims, setTableDims] = useState({ w: 0, h: 0 });
    const [lineY, setLineY] = useState(0);

    const tables = [
        {
            id: 0,
            title: "Why DevQuilt?",
            headers: ["Benefits", "Features"],
            layout: "checklist",
            arrowY: 15,
            data: [
                { col1: "✔️ Business-Focused Development", col2: "✔️ Built Around Your Goals" },
                { col1: "✔️ Design Meets Engineering", col2: "✔️ Seamless UX & Performance" },
                { col1: "✔️ Clear Communication", col2: "✔️ Informed at Every Stage" },
                { col1: "✔️ Modern Technology Stack", col2: "✔️ Scalable & Maintainable Code" },
                { col1: "✔️ Startup-Friendly Process", col2: "✔️ Fast Iteration & Launch" },
                { col1: "✔️ Transparent Pricing", col2: "✔️ No Surprise Costs" },
                { col1: "✔️ Post-Launch Support", col2: "✔️ Ongoing Improvements" }
            ]
        },
        {
            id: 1,
            title: "How We Measure Project Success",

            layout: "description",
            arrowY: 52,
            description:
                "A successful project is more than a delivered website. We define success by how well the solution serves your actual business goals. Before work begins, we agree on what a great outcome looks like for your specific project.",
            data: [
                { col1: "User experience quality", col2: "How intuitive and accessible the finished product is for your visitors" },
                { col1: "Technical performance", col2: "Page speed, mobile responsiveness, and Core Web Vitals compliance" },
                { col1: "Scope delivery", col2: "All agreed features and pages delivered within the defined timeline" },
                { col1: "Communication satisfaction", col2: "Clear updates, prompt responses, and informed decisions throughout" },
                { col1: "Launch readiness", col2: "SEO basics, analytics, forms, and deployment all properly configured" }
            ]
        },
        {
            id: 2,
            title: "Our Development Workflow — From Discovery to Launch",

            layout: "description",
            arrowY: 96,
            description:
                "We follow a structured, collaborative process designed to reduce uncertainty, keep projects on track, and deliver results that match your business requirements.",
            workflowSubtitle: "Here's what your journey with us looks like:",
            data: [
                { col1: "Discover", col2: "We understand your idea, audience, goals, and technical requirements before proposing any solution." },
                { col1: "Plan", col2: "We define scope, priorities, timeline, milestones, and deliverables with full transparency." },
                { col1: "Design", col2: "We shape the user experience and visual direction, with feedback before any development begins." },
                { col1: "Develop", col2: "We build, integrate, and test the solution with regular progress updates throughout." },
                { col1: "Launch", col2: "We prepare, configure, and deploy the project — handling SEO setup, analytics, and performance checks." },
                { col1: "Improve", col2: "After launch, we discuss maintenance, feedback-driven improvements, and your next development phase." }
            ]
        }
    ];

    const handleTabClick = (index) => {
        if (index === activeTab) return;
        setBorderPath('');
        setActiveTab(index);
    };

    const premiumEase = [0.22, 1, 0.36, 1];

    useEffect(() => {
        if (!isInView) {
            setActiveTab(0);
            setBorderPath('');
        }
    }, [isInView]);

    // Build SVG path — full rounded rectangle, starting from arrowY% on the left edge, going clockwise
    const buildPath = useCallback((W, H, startYPct) => {
        const r = 11, s = 1;
        const sy = s + (H - 2 * s) * (Math.min(startYPct, 94) / 100);
        return [
            `M ${s} ${sy}`,
            `L ${s} ${r + s}`,
            `Q ${s} ${s} ${r + s} ${s}`,
            `L ${W - r - s} ${s}`,
            `Q ${W - s} ${s} ${W - s} ${r + s}`,
            `L ${W - s} ${H - r - s}`,
            `Q ${W - s} ${H - s} ${W - r - s} ${H - s}`,
            `L ${r + s} ${H - s}`,
            `Q ${s} ${H - s} ${s} ${H - r - s}`,
            `L ${s} ${sy}`,
            `Z`,
        ].join(' ');
    }, []);

    useEffect(() => {
        if (!tableRef.current) return;
        // Measure AFTER the 0.7s line animation finishes reaching the table
        const t = setTimeout(() => {
            const tableRect = tableRef.current?.getBoundingClientRect();
            const lineEl = lineRefs.current[activeTab];
            if (!tableRect || !lineEl) return;
            const lineRect = lineEl.getBoundingClientRect();
            const lineCenterY = lineRect.top + lineRect.height / 2;
            const yOffset = lineCenterY - tableRect.top;
            const yPct = Math.max(0, Math.min((yOffset / tableRect.height) * 100, 94));
            setLineY(yPct);
            setTableDims({ w: tableRect.width, h: tableRect.height });
            setBorderPath(buildPath(tableRect.width, tableRect.height, yPct));
        }, 720); // slightly after the 0.7s line animation
        return () => clearTimeout(t);
    }, [activeTab, isInView, buildPath]);

    // Also update path on resize without the delay
    useEffect(() => {
        if (!tableRef.current) return;
        const ro = new ResizeObserver(() => {
            const tableRect = tableRef.current?.getBoundingClientRect();
            if (tableRect) {
                setTableDims({ w: tableRect.width, h: tableRect.height });
                setBorderPath(buildPath(tableRect.width, tableRect.height, lineY));
            }
        });
        ro.observe(tableRef.current);
        return () => ro.disconnect();
    }, [lineY, buildPath]);

    return (
        <section ref={sectionRef} className={`relative z-0 min-h-screen flex items-center py-20 overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f5f5f7] text-gray-900"}`}>
            <style>{`
                @keyframes drawBorder { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
                @keyframes revealContent { 
                    from { clip-path: inset(0 0 100% 0); -webkit-clip-path: inset(0 0 100% 0); } 
                    to { clip-path: inset(0 0 0% 0); -webkit-clip-path: inset(0 0 0% 0); } 
                }
            `}</style>




            <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start relative z-10">


                <div className="lg:w-[344px] space-y-12 w-full relative">
                    {tables.map((table, index) => (
                        <div key={table.id} onClick={() => handleTabClick(index)} className="group cursor-pointer relative">

                            <h2 className={`font-medium mb-6 leading-tight tracking-tight transition-all duration-700
                                ${activeTab === index
                                    ? (isDarkMode ? "text-white opacity-100 scale-100" : "text-gray-900 opacity-100 scale-100")
                                    : (isDarkMode ? "text-white opacity-40 hover:opacity-70 scale-[0.98]" : "text-gray-900 opacity-40 hover:opacity-70 scale-[0.98]")}
                                ${index === 0 ? "text-[38px] leading-[42px]" : "text-[20px] leading-[28px]"}`}
                            >
                                {table.title}
                            </h2>

                            <div
                                ref={el => lineRefs.current[index] = el}
                                className="relative h-6 flex items-center overflow-visible"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width: activeTab === index ? "calc(100% + 4.1rem)" : "48px",
                                        backgroundColor: activeTab === index ? (isDarkMode ? "#ffffff" : "#111827") : (isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)")
                                    }}
                                    transition={{ duration: 0.7, ease: premiumEase }}
                                    className="absolute left-0 h-[1.5px] z-20 origin-left"
                                />

                                {activeTab !== index && (
                                    <div className="absolute left-[48px] top-1/2 -translate-y-1/2">
                                        <svg width="14" height="14" viewBox="0 0 24 24">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19"
                                                stroke={isDarkMode ? "white" : "#111827"} strokeWidth="2.5" fill="none" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* MOBILE ACCORDION CONTENT */}
                            <AnimatePresence>
                                {activeTab === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="lg:hidden mt-8 overflow-hidden"
                                    >
                                        <div className={`relative rounded-[12px] border overflow-hidden ${
                                            isDarkMode
                                                ? "bg-[#141416] border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                                                : "bg-white border-black/10 text-gray-900 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                                        }`}>

                                            {/* Rounded animated border via SVG - fading lead */}
                                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ overflow: 'visible' }}>
                                                {[
                                                    { o: 0.15, d: '0s' },
                                                    { o: 0.35, d: '0.08s' },
                                                    { o: 0.65, d: '0.16s' },
                                                    { o: 1, d: '0.24s' },
                                                ].map((layer, i) => (
                                                    <rect
                                                        key={i}
                                                        x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)"
                                                        rx="11" ry="11" fill="none"
                                                        stroke={isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)"}
                                                        strokeWidth="1.5"
                                                        pathLength="1" strokeDasharray="1"
                                                        style={{
                                                            strokeDashoffset: 1,
                                                            opacity: layer.o,
                                                            animation: `drawBorder 1.5s ease-out ${layer.d} forwards`
                                                        }}
                                                    />
                                                ))}
                                            </svg>

                                            {/* Content */}
                                            <div
                                                className="flex flex-col relative z-0"
                                                style={{
                                                    clipPath: 'inset(0 0 100% 0)',
                                                    WebkitClipPath: 'inset(0 0 100% 0)',
                                                    animation: `revealContent 1.5s ease-out forwards`
                                                }}
                                            >
                                                {table.headers && (
                                                    <div className={`grid grid-cols-2 border-b ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
                                                        {table.headers.map((h, i) => (
                                                             <div key={i} className={`p-6 text-center text-lg font-bold ${i === 0 ? (isDarkMode ? "border-r border-white/10" : "border-r border-black/10") : ""}`}>
                                                                {h}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {table.description && (
                                                    <div className={`p-8 pb-6 text-[13px] leading-[20px] ${isDarkMode ? "text-white/80" : "text-gray-600"}`}>
                                                        {table.description}
                                                    </div>
                                                )}

                                                <div className={`mx-8 h-[1px] ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                                                <div className="px-8 py-4">
                                                    {table.data.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`grid grid-cols-2 border-b last:border-0 py-3 ${isDarkMode ? "border-white/5" : "border-black/5"}`}
                                                        >
                                                            <div className={`font-bold text-[14px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.col1}</div>
                                                            <div className={`text-[12.5px] ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>{item.col2}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {index < tables.length - 1 && (
                                <div className={`w-full h-[1px] mt-12 ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE TABLE - Desktop Only */}
                <div className="hidden lg:block lg:w-[696px] w-full relative">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div ref={tableRef} className={`relative rounded-[12px] border overflow-hidden ${
                                isDarkMode
                                    ? "bg-[#141416] border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                                    : "bg-white border-black/10 text-gray-900 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                            }`}>

                                {/* Border draws from where the title line connects — multi-layer faded head */}
                                {borderPath && (
                                    <svg
                                        key={`border-${activeTab}-${isInView}`}
                                        className="absolute inset-0 w-full h-full pointer-events-none z-30"
                                        viewBox={tableDims.w && tableDims.h ? `0 0 ${tableDims.w} ${tableDims.h}` : undefined}
                                        style={{ overflow: 'visible' }}
                                    >
                                        {[
                                            { o: 0.15, d: '0s' },
                                            { o: 0.35, d: '0.08s' },
                                            { o: 0.65, d: '0.16s' },
                                            { o: 1, d: '0.24s' },
                                        ].map((layer, i) => (
                                            <path
                                                key={i}
                                                d={borderPath}
                                                fill="none"
                                                stroke={isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)"}
                                                strokeWidth="1.5"
                                                pathLength="1" strokeDasharray="1"
                                                style={{
                                                    strokeDashoffset: 1,
                                                    opacity: layer.o,
                                                    animation: `drawBorder 1.5s ease-out ${layer.d} forwards`
                                                }}
                                            />
                                        ))}
                                    </svg>
                                )}

                                {/* TABLE CONTENT */}
                                <div
                                    className="flex flex-col relative z-0"
                                    style={{
                                        clipPath: 'inset(0 0 100% 0)',
                                        WebkitClipPath: 'inset(0 0 100% 0)',
                                        animation: borderPath ? `revealContent 1.5s ease-out forwards` : 'none',
                                        opacity: borderPath ? 1 : 0
                                    }}
                                >

                                    {tables[activeTab].headers && (
                                        <div className={`grid grid-cols-2 border-b ${isDarkMode ? "border-white/10" : "border-black/10"}`}>
                                            {tables[activeTab].headers.map((h, i) => (
                                                <div key={i}
                                                    className={`p-6 md:p-8 text-center text-lg font-bold ${i === 0 ? (isDarkMode ? "border-r border-white/10" : "border-r border-black/10") : ""}`}>
                                                    {h}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {tables[activeTab].description && (
                                        <div className={`p-8 md:p-10 pb-6 text-[13px] leading-[20px] ${isDarkMode ? "text-white/80" : "text-gray-600"}`}>
                                            {tables[activeTab].description}
                                        </div>
                                    )}

                                    <div className={`mx-8 md:mx-10 h-[1px] ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                                    <div className="px-8 md:px-10 py-4">
                                        {tables[activeTab].data.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className={`grid grid-cols-2 border-b last:border-0 py-3 ${isDarkMode ? "border-white/5" : "border-black/5"}`}
                                            >
                                                <div className={`font-bold text-[14px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.col1}</div>
                                                <div className={`text-[12.5px] ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>{item.col2}</div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
