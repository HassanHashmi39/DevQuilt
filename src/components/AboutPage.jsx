import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import founderImg from "../assets/founder.png";

// ─── Fade-up wrapper ──────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="w-full border-t border-gray-100 my-0" />;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  {
    title: "Web Development",
    desc: "Modern, responsive websites and web applications designed around your business goals.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Mobile App Development",
    desc: "User-friendly mobile applications built for iOS and Android.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    desc: "AI-powered features and automation designed to make businesses more efficient.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle cx="19" cy="5" r="3" />
      </svg>
    ),
  },
  {
    title: "UI/UX & Branding",
    desc: "Clean interfaces and memorable visual identities that help businesses stand out.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </svg>
    ),
  },
  {
    title: "SEO & Growth",
    desc: "Practical optimization strategies that help businesses improve their online visibility and reach.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

const approach = [
  {
    num: "01",
    title: "Understand First",
    desc: "Every project starts with understanding your business, audience, goals, and challenges.",
  },
  {
    num: "02",
    title: "Build With Purpose",
    desc: "We focus on creating solutions that are useful, scalable, and aligned with your objectives.",
  },
  {
    num: "03",
    title: "Keep It Simple",
    desc: "We believe good technology should make things easier — not more complicated.",
  },
  {
    num: "04",
    title: "Grow Together",
    desc: "Launching a product is only the beginning. We remain available for improvements, support, and future growth.",
  },
];

const reasons = [
  {
    title: "Business-Focused",
    desc: "We don't build just for the sake of technology. We build around real business needs.",
  },
  {
    title: "Clear Communication",
    desc: "You stay informed throughout the project, from planning to launch.",
  },
  {
    title: "Modern Solutions",
    desc: "We use modern technologies and development practices to create reliable digital products.",
  },
  {
    title: "Flexible Approach",
    desc: "Whether you need a simple website or a custom digital product, we adapt our approach to your project.",
  },
  {
    title: "Long-Term Support",
    desc: "Our relationship doesn't have to end at launch. We can continue helping you maintain, improve, and grow your product.",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
        }`}
    >

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className={`min-h-[92vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-20 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-4xl">
          <FadeUp>
            <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              About DevQuilt
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              We Build Digital<br className="hidden sm:block" /> Products That Grow<br className="hidden sm:block" />{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#ef4444,#7c3aed)" }}
              >
                Businesses
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              DevQuilt is a young, energetic software house based in Pakistan, helping businesses
              build digital products that grow, including modern websites, mobile applications, and scalable platforms.
            </p>
            <p className={`text-base md:text-lg leading-relaxed max-w-2xl mb-10 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              We combine technology, design, and strategic thinking to build solutions that
              actually work — not just look good.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-colors duration-200 ${isDarkMode
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" />
                </svg>
              </Link>
              <Link
                to="/projects"
                className={`inline-flex items-center gap-2 px-7 py-3.5 border text-sm font-semibold rounded-full transition-colors duration-200 ${isDarkMode
                  ? "border-white/20 text-gray-300 hover:border-white hover:text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  }`}
              >
                Explore Our Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. WHO WE ARE ────────────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <FadeUp>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Who We Are
            </h2>
          </FadeUp>
          <div className="space-y-5">
            <FadeUp delay={0.06}>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                We're a passionate team of developers, designers, and digital strategists
                from Pakistan, focused on building products that solve real business problems.
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                From a company's first website to a custom application or AI-powered feature, we work
                closely with our clients to understand what they need and turn their ideas into
                practical digital solutions.
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <p className={`font-medium text-base md:text-lg leading-relaxed ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Our approach is straightforward: understand the problem, craft the right solution,
                and keep improving it over time.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE DO ────────────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10 bg-[#0a0a0a]" : "border-gray-200 bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Our Services</p>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${isDarkMode ? "text-white" : "text-gray-900"}`}>What We Do</h2>
          </FadeUp>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}>
            {services.map((s, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className={`p-8 h-full group transition-colors duration-300 ${isDarkMode
                  ? "bg-[#121214] hover:bg-[#1a1a1e]"
                  : "bg-white hover:bg-gray-50"
                  }`}>
                  <div className={`group-hover:text-purple-500 transition-colors duration-300 mb-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {s.icon}
                  </div>
                  <h3 className={`font-semibold text-[15px] mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR APPROACH ──────────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Process</p>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${isDarkMode ? "text-white" : "text-gray-900"}`}>How We Think</h2>
          </FadeUp>
          <div className={`grid md:grid-cols-2 gap-0 border ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
            {approach.map((a, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className={`p-10 h-full ${isDarkMode ? "bg-[#121214]" : "bg-white"
                  } ${i % 2 === 0 ? `border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}` : ""} ${i < 2 ? `border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}` : ""
                  }`}>
                  <span className={`text-[11px] font-bold tracking-[0.2em] mb-4 block ${isDarkMode ? "text-white/90" : "text-gray-400"}`}>
                    {a.num}
                  </span>
                  <h3 className={`font-semibold text-lg mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{a.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{a.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY DEVQUILT ─────────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10 bg-[#0a0a0a]" : "border-gray-200 bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Why Us</p>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Why DevQuilt?</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((r, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className={`flex flex-col gap-2 p-6 rounded-2xl border ${isDarkMode
                  ? "bg-[#121214] border-white/5"
                  : "bg-white border-gray-200 shadow-sm"
                  }`}>
                  <div className={`w-8 h-[2px] mb-1 ${isDarkMode ? "bg-white/60" : "bg-gray-300"}`} />
                  <h3 className={`font-semibold text-[15px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>{r.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{r.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MISSION ───────────────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16 items-center">
          <FadeUp>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>Our Mission</h2>
          </FadeUp>
          <div className="space-y-5">
            <FadeUp delay={0.06}>
              <p className={`text-base md:text-xl leading-relaxed font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                To help businesses of all sizes turn ideas into useful, reliable, and impactful
                digital products — built in Pakistan, delivered globally.
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                We believe that great technology should be accessible, practical, and built around the
                people who use it.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 7. FOUNDER'S NOTE ──────────────────────────────────────────── */}
      <section className={`px-6 md:px-16 lg:px-24 py-24 border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <FadeUp>
            <div className="space-y-6">
              <div>
                <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Founder's Note</p>
                <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Hassan Hashmi</h2>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Founder &amp; CEO, DevQuilt</p>
                {/* Accent bar */}
                <div
                  className="w-16 h-1 rounded-full mt-4"
                  style={{ background: isDarkMode ? "linear-gradient(90deg,#ffffff,#9ca3af)" : "linear-gradient(90deg,#111827,#6b7280)" }}
                />
              </div>

              <div className={`relative group overflow-hidden rounded-2xl md:rounded-3xl border shadow-xl aspect-[3/4] max-w-sm w-full ${isDarkMode ? "border-white/10 bg-[#121214]" : "border-gray-200 bg-gray-100"
                }`}>
                <img
                  src={founderImg}
                  alt="Hassan Hashmi - Founder & CEO, DevQuilt"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeUp>
          <div className="space-y-6 md:pt-33">
            <FadeUp delay={0.06}>
              <blockquote className={`text-lg md:text-xl font-medium leading-relaxed border-l-4 pl-6 ${isDarkMode ? "text-gray-200 border-white" : "text-gray-800 border-gray-900"}`}>
                "I started DevQuilt with a simple goal: help businesses turn their ideas into useful digital products through thoughtful design and reliable development."
              </blockquote>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="space-y-4">
                <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  As a Software Engineering professional focused on web development and digital experiences, I work on building practical solutions that bring together technology, usability, and business goals.
                </p>
                <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Through projects spanning websites, application development, and AI-powered concepts, my focus is on helping founders move from an idea to a clear, functional digital experience.
                </p>
                <p className={`font-medium text-base leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                  At DevQuilt, the goal is to make the development process collaborative, transparent, and focused on what each business actually needs.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.18}>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://github.com/HassanHashmi39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <span className={isDarkMode ? "text-gray-700" : "text-gray-300"}>·</span>
                <a
                  href="https://github.com/HassanHashmi39/Skinzy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Skinzy AI ↗
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>


    </motion.div>
  );
}
