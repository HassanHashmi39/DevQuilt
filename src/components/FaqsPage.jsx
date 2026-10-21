import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const categories = [
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "pricing", label: "Pricing & Billing" },
    { id: "support", label: "General Support" },
];

const faqData = {
    services: [
        {
            question: "What specific services does DevQuilt offer?",
            answer: "DevQuilt specializes in website development, startup MVP development, landing page design, web application development, AI integration, UI/UX design, and branding. We primarily work with startups and growing businesses in the USA, UK, and Germany."
        },
        {
            question: "Can you build an MVP for my startup?",
            answer: "Yes. We discuss your idea, identify the core features, define the scope, and build a practical first version based on your requirements. MVPs are scoped and quoted individually after a discovery conversation."
        },
        {
            question: "Do you offer individual services or only full packages?",
            answer: "We offer individual services such as landing page design, website development, or AI integration, as well as more comprehensive scopes for startups needing a full digital product built from scratch."
        }
    ],
    process: [
        {
            question: "How does your development process work?",
            answer: "We follow a six-step process: Discover, Plan, Design, Develop, Launch, and Improve. We start by understanding your goals and requirements, then define scope and timeline, design the experience, build the solution, deploy it, and discuss improvements afterward."
        },
        {
            question: "How long does website development take?",
            answer: "Timelines depend on scope, content readiness, and feedback cycles. A landing page typically takes 1–2 weeks. A multi-page business website takes 2–4 weeks. An MVP or web application is estimated after the discovery and planning phase."
        },
        {
            question: "Will my website be mobile-friendly?",
            answer: "Yes. Responsive design across desktop, tablet, and mobile is included in all our website packages. The exact breakpoints and layout are confirmed during the design phase."
        }
    ],
    pricing: [
        {
            question: "How much does a startup website cost?",
            answer: "Our landing page packages start at $499 and business website packages start at $999. Final pricing depends on the number of pages, design requirements, integrations, and functionality. Startup MVPs are scoped and quoted separately."
        },
        {
            question: "Do you require a deposit to start a project?",
            answer: "Yes. We structure payments as a deposit to begin, a milestone payment at an agreed development stage, and a final payment before handover. The exact structure is confirmed in the project agreement."
        },
        {
            question: "What costs are NOT included in the package price?",
            answer: "Hosting, domain registration, paid plugins or APIs, content writing, third-party service subscriptions, and ongoing maintenance are not included unless explicitly agreed in the project scope."
        }
    ],
    support: [
        {
            question: "How do we communicate during the project?",
            answer: "We use email for formal communication, and can set up a shared messaging channel (Slack, WhatsApp, or similar) for day-to-day updates. You will receive milestone updates and progress reports throughout the project."
        },
        {
            question: "Do you provide support after launch?",
            answer: "Post-launch support and ongoing maintenance can be discussed and scoped separately. We offer maintenance agreements for clients who want regular updates, security patches, and improvements after launch."
        },
        {
            question: "Can you help with SEO for my website?",
            answer: "Basic on-page SEO setup — including semantic HTML, descriptive titles, meta descriptions, image alt text, and sitemap — is included in all our website packages. Advanced technical SEO and ongoing optimization are available as separate services."
        }
    ]
};

import { useTheme } from "../context/ThemeContext";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className="mb-4">
            <button
                onClick={onClick}
                className={`w-full transition-all duration-300 rounded-[1.5rem] p-6 text-left flex items-start justify-between group ${isDarkMode ? 'bg-[#1A1A1A] hover:bg-[#222]' : 'bg-white hover:bg-gray-50 border border-black/5 shadow-sm'
                    }`}
            >
                <span className={`font-bold text-lg md:text-xl pr-8 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen
                    ? (isDarkMode ? 'rotate-180 bg-white text-black border-white' : 'rotate-180 bg-black text-white border-black')
                    : (isDarkMode ? 'text-white border-gray-700' : 'text-black border-gray-200')
                    }`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className={`p-8 pt-4 text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FaqsPage() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState("services");
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`transition-colors duration-500 min-h-screen font-tomato outline-none ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}
        >
            {/* Hero Section */}
            <div className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="City Background"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale opacity-25"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${isDarkMode ? 'via-[#0a0a0a]/70 to-[#0a0a0a]' : 'via-white/70 to-white'}`} />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl"
                >
                    <h1 className={`text-[4rem] md:text-[6rem] font-black leading-[0.9] mb-6 tracking-tighter overflow-hidden ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {"FREQUENTLY ASKED QUESTIONS".split(" ").map((word, i) => (
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
                        className={`text-xl font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        We're here to help with any questions about our services,
                        process, pricing, and how we can support your startup's digital growth.
                    </motion.p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 pb-32">

                {/* Tab Switcher */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveTab(cat.id);
                                setOpenIndex(null);
                            }}
                            className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${activeTab === cat.id
                                ? (isDarkMode ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-black text-white border-black shadow-lg")
                                : (isDarkMode ? "bg-[#111] text-gray-500 border-gray-800 hover:border-gray-600" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400")
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {faqData[activeTab].map((item, index) => (
                        <FaqItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <p className={`mb-8 font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Still have questions? We're just a message away.
                    </p>
                    <Link
                        to="/contact"
                        className={`inline-flex items-center gap-4 px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform duration-300 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
                            }`}
                    >
                        Contact Our Team
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
