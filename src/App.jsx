import React, { Suspense, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy load non-critical components
const Gallery = React.lazy(() => import("./components/gallery"));
const Services = React.lazy(() => import("./components/Services"));
const ServiceShowcase = React.lazy(() => import("./components/ServiceShowcase"));
const WhyDevQuilt = React.lazy(() => import("./components/WhyDevQuilt"));
const Process = React.lazy(() => import("./components/Process"));
const Pricing = React.lazy(() => import("./components/Pricing"));
const Projects = React.lazy(() => import("./components/Projects"));
const TestimonialCircle = React.lazy(() => import("./components/TestimonialCircle"));
const CTA = React.lazy(() => import("./components/CTA"));
const Footer = React.lazy(() => import("./components/Footer"));
const ProjectsPage = React.lazy(() => import("./components/ProjectsPage"));
const ServicesPage = React.lazy(() => import("./components/ServicesPage"));
const AboutPage = React.lazy(() => import("./components/AboutPage"));
const FaqsPage = React.lazy(() => import("./components/FaqsPage"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions"));
const ContactPage = React.lazy(() => import("./components/ContactPage"));
const CaseStudies = React.lazy(() => import("./components/CaseStudies"));
const CaseStudyDetail = React.lazy(() => import("./components/CaseStudyDetail"));

import { ScrollContext } from "./context/ScrollContext";
import { useTheme } from "./context/ThemeContext";

// ─── ScrollToTop on route change ─────────────────────────────────────────────
function ScrollToTop({ containerRef }) {
    const { pathname } = useLocation();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.style.overflowY = "scroll"; // ensure unlocked on route change
        el.scrollTop = 0;
        const t1 = setTimeout(() => { if (el) el.scrollTop = 0; }, 50);
        const t2 = setTimeout(() => { if (el) el.scrollTop = 0; }, 150);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [pathname, containerRef]);

    return null;
}

// ─── Scroll Gates Hook ────────────────────────────────────────────────────────
// Scroll freely → stops ONCE at Services top
// User scrolls again → continues freely
function useScrollGates(containerRef, enabled) {
    const gatesPassed = useRef({ services: false });
    const frozen = useRef(false);
    const frozenAt = useRef(0);

    useEffect(() => {
        if (!enabled) return;
        const container = containerRef.current;
        if (!container) return;

        // Reset gates when hook mounts (e.g., on navigation back to home)
        gatesPassed.current = { services: false };
        frozen.current = false;

        // Timestamp of last freeze — prevents same wheel momentum from
        // immediately unfreezing the gate that was just triggered
        let lastFreezeAt = 0;
        const FREEZE_PROTECT_MS = 450;

        // Get scrollTop position of a section's top edge
        const getSectionScrollTop = (name) => {
            const el = container.querySelector(`[data-gate="${name}"]`);
            if (!el) return null;
            const cRect = container.getBoundingClientRect();
            const eRect = el.getBoundingClientRect();
            return Math.round(container.scrollTop + eRect.top - cRect.top);
        };

        // Lock: set overflow hidden so no further scrolling possible
        const freeze = (atScrollTop) => {
            container.scrollTop = atScrollTop;
            frozenAt.current = atScrollTop;
            frozen.current = true;
            lastFreezeAt = Date.now();
            container.style.overflowY = "hidden";
        };

        // Unlock: restore normal scrolling (only after protection window has passed)
        const unfreeze = () => {
            if (!frozen.current) return;
            if (Date.now() - lastFreezeAt < FREEZE_PROTECT_MS) return;
            frozen.current = false;
            container.style.overflowY = "scroll";
        };

        // Check gates on every scroll event
        const onScroll = () => {
            if (frozen.current) return;

            const scrollTop = container.scrollTop;

            // Gate: Services
            if (!gatesPassed.current.services) {
                const pos = getSectionScrollTop("services");
                if (pos !== null && scrollTop >= pos - 2) {
                    gatesPassed.current.services = true;
                    freeze(pos);
                    return;
                }
            }
        };

        // Any user scroll intent (wheel/touch) unfreezes the gate
        const onWheel = () => { unfreeze(); };
        const onTouchStart = () => { unfreeze(); };

        container.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });

        return () => {
            container.removeEventListener("scroll", onScroll);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            // Ensure unlocked on unmount
            container.style.overflowY = "scroll";
        };
    }, [enabled, containerRef]);
}

// ─── Inner App ────────────────────────────────────────────────────────────────
function InnerApp({ mainRef }) {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const { isDarkMode } = useTheme();

    useScrollGates(mainRef, isHome);

    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{ backgroundColor: isDarkMode ? '#0a0a0a' : '#f8f8f8', transition: 'background-color 0.4s ease' }}
        >
            <Navbar />
            <main
                ref={mainRef}
                className="overflow-y-scroll h-screen"
                style={{ overscrollBehavior: "none" }}
            >
                <Suspense fallback={
                    <div className="w-full min-h-screen flex items-center justify-center">
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            src="/logo-icon-dark.png"
                            alt=""
                            className="w-16 h-16 object-contain"
                        />
                    </div>
                }>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <section className="relative w-full">
                                        <Hero />
                                    </section>

                                    {/* Gate: scroll stops HERE first */}
                                    <section data-gate="services" className="relative w-full z-10">
                                        <div className={`relative z-10 transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f5f5f7]"}`}>
                                            <Services />
                                        </div>
                                    </section>

                                    <section className={`relative w-full z-10 -mt-16 transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a]" : "bg-white"}`}>
                                        <ServiceShowcase />
                                    </section>

                                    <section className="relative h-[200vh] z-20">
                                        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
                                            <Gallery />
                                        </div>
                                    </section>

                                    <section className="relative h-[200vh] z-40 -mt-[100vh]">
                                        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
                                            <Process />
                                        </div>
                                    </section>

                                    <section className="relative h-[200vh] z-30 -mt-[100vh]">
                                        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
                                            <WhyDevQuilt />
                                        </div>
                                    </section>

                                    <section className={`relative z-50 pt-20 transition-colors duration-400 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                                        <Projects />
                                        <Pricing />
                                        <TestimonialCircle />
                                    </section>
                                </motion.div>
                            } />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/faqs" element={<FaqsPage />} />
                            <Route path="/faq" element={<FaqsPage />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-conditions" element={<TermsAndConditions />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/case-studies" element={<CaseStudies />} />
                            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
                        </Routes>
                    </AnimatePresence>
                </Suspense>

                <Suspense fallback={<div className={`h-40 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`} />}>
                    <section className={`relative z-50 transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                        <CTA />
                        <Footer />
                    </section>
                </Suspense>
            </main>
        </div >
    );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
function App() {
    const mainRef = useRef(null);

    return (
        <ScrollContext.Provider value={mainRef}>
            <Router>
                <ScrollToTop containerRef={mainRef} />
                <InnerApp mainRef={mainRef} />
            </Router>
        </ScrollContext.Provider>
    );
}

export default App;
