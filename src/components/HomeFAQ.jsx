import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const faqs = [
    {
        question: "How much does a startup website cost?",
        answer: "The cost depends on the number of pages, design requirements, integrations, and functionality. DevQuilt offers starting packages for landing pages ($499+) and business websites ($999+), with custom estimates for larger projects and startup MVPs."
    },
    {
        question: "How long does website development take?",
        answer: "Timelines depend on the scope, content readiness, feedback, and technical requirements. A landing page typically takes 1–2 weeks. A multi-page business website takes 2–4 weeks. We define an estimated timeline before development begins."
    },
    {
        question: "Can you build an MVP for my startup?",
        answer: "Yes. We can discuss your idea, identify the core features, and define a practical first version based on your requirements. MVPs are scoped and quoted individually after a discovery conversation."
    },
    {
        question: "Will my website be mobile-friendly?",
        answer: "Responsive design is included in all our website packages, covering desktop, tablet, and mobile layouts. The exact breakpoints and layout are confirmed during the design phase."
    },
    {
        question: "Do you provide support after launch?",
        answer: "Post-launch support and ongoing maintenance can be discussed and scoped separately. We offer maintenance agreements for clients who want regular updates, security patches, and improvements after launch."
    }
];

function FaqItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border-b border-gray-100">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-start justify-between text-left group cursor-pointer"
            >
                <span className={`font-semibold text-base md:text-lg pr-8 leading-snug transition-colors duration-200 ${isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${isOpen
                    ? "rotate-180 bg-gray-900 text-white border-gray-900"
                    : "text-gray-400 border-gray-200 group-hover:border-gray-400"
                    }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed pb-6 pr-12">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                    <div>
                        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">
                            Common Questions
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <Link
                        to="/faqs"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4 shrink-0"
                    >
                        View all FAQs →
                    </Link>
                </div>

                <div>
                    {faqs.map((faq, idx) => (
                        <FaqItem
                            key={idx}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === idx}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
