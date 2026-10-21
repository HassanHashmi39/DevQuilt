import React, { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import middle1 from "../assets/middle1.png";
import middle2 from "../assets/middle2.png";
import middle3 from "../assets/middle4.png";
import middle4 from "../assets/middle3.png";

// Import Generated 3D Icons (Bottom)
import bottom1 from "../assets/instagram_3d_icon_1774511355022.png";
import bottom2 from "../assets/branding_star_3d_icon_1774511495444.png";
import bottom3 from "../assets/marketing_rocket_3d_icon_1774511517026.png";
import bottom4 from "../assets/laptop_3d_icon_1774511584988.png";

// ─── Centre Image Component per Panel ──────────────────────────────────────
function ImageArt({ src, active }) {
  return (
    <div className="relative w-[300px] h-[350px] flex items-center justify-center">
      <motion.img
        src={src}
        alt="Service Visual"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        animate={{
          scale: active ? 1.05 : 0.95,
          filter: active ? "brightness(1.1)" : "brightness(0.9)"
        }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      />
      {/* Subtle background glow */}
      <div className={`absolute inset-0 bg-white/10 blur-[100px] rounded-full transition-opacity duration-1000 ${active ? 'opacity-40' : 'opacity-0'}`} />
    </div>
  );
}

// ─── 3D Bottom Element Wrapper ──────────────────────────────────────────
const BottomIcon = ({ src }) => (
  <div className="w-[140px] h-[140px] flex items-center justify-center">
    <img src={src} alt="3D Detail" loading="lazy" decoding="async" className="w-full h-full object-contain filter drop-shadow-2xl" />
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const panels = [
  {
    id: "social",
    monogram: "SM",
    agencyTag: "SOCIAL GROWTH",
    titleLines: ["SCALE", "VIRAL"],
    subItems: [
      { category: "STRATEGY", name: "GROWTH", icon: null },
      { category: "CONTENT", name: "MANAGEMENT", icon: null },
    ],
    playColor: "#ff5e00",
    bg: "linear-gradient(to bottom, #ff5e00, #ff8c42)",
    image: middle1,
    Art: (props) => <ImageArt src={middle1} {...props} />,
    BottomArt: () => <BottomIcon src={bottom1} />,
  },
  {
    id: "branding",
    monogram: "BI",
    agencyTag: "IDENTITY",
    titleLines: ["BRAND", "IDENTITY"],
    subItems: [
      { category: "DESIGN", name: "VISUAL", icon: null },
      { category: "STRATEGY", name: "LOGOS", icon: null },
    ],
    playColor: "#7c3aed",
    bg: "linear-gradient(to bottom, #7c3aed, #5b21b6)",
    image: middle2,
    Art: (props) => <ImageArt src={middle2} {...props} />,
    BottomArt: () => <BottomIcon src={bottom2} />,
  },
  {
    id: "marketing",
    monogram: "PM",
    agencyTag: "MARKETING",
    titleLines: ["GROW", "REACH"],
    subItems: [
      { category: "ADVERTISING", name: "CAMPAIGNS", icon: null },
      { category: "ANALYTICS", name: "RESULTS", icon: null },
    ],
    playColor: "#0ea5e9",
    bg: "linear-gradient(to bottom, #0ea5e9, #0284c7)",
    image: middle3,
    Art: (props) => <ImageArt src={middle3} {...props} />,
    BottomArt: () => <BottomIcon src={bottom3} />,
  },
  {
    id: "web",
    monogram: "W",
    agencyTag: "DEVELOPMENT",
    titleLines: ["APP &", "WEB DEV"],
    subItems: [
      { category: "FULLSTACK", name: "MOBILE", icon: null },
      { category: "DESIGN", name: "UI/UX", icon: null },
    ],
    playColor: "#000000ff",
    bg: "#111", // Grid Background panel
    isGrid: true,
    image: middle4,
    Art: (props) => <ImageArt src={middle4} {...props} />,
    BottomArt: () => <BottomIcon src={bottom4} />,
  },
];

function Panel({ panel, isActive, isHovered, onMouseEnter, index, anyHovered }) {
  const { Art } = panel;
  const tc = panel.textDark ? "rgba(0,0,0,0.85)" : "#fff";
  const tcM = panel.textDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.6)";

  // Layout Logic:
  // Default (anyHovered=false): 40/30/30 -> 4, 3, 3
  // Hovered: 5 vs 1.25 each
  let targetFlex = 1;
  if (!anyHovered) {
    targetFlex = index === 0 ? 4 : 3;
  } else {
    targetFlex = isHovered ? 5 : 1.25;
  }

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer select-none"
      onMouseEnter={onMouseEnter}
      animate={{ flex: `${targetFlex} 1 0%` }}
      transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
      style={{ minWidth: 100, background: panel.bg }}
    >
      {/* Grid Background Overlay (Conditional) */}
      {panel.isGrid && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      )}
      {/* ── CONTENT REVEALER CONTAINER ── 
          Anchored to the right so the left edge of the panel reveals content as it expands 
      */}
      <div className="absolute right-0 top-0 bottom-0 w-[800px] h-full pointer-events-none">
        {/* ── TOP BAR ── */}
        <div className="absolute top-0 right-0 left-0 flex items-start justify-between p-8 z-30 pointer-events-auto">
          <motion.div animate={{ opacity: isActive ? 1 : 0 }} className="flex flex-col gap-1.5">
            <div style={{ width: 24, height: 1.5, background: "#fff" }} />
            <div style={{ width: 16, height: 1.5, background: "#fff" }} />
            <div style={{ width: 24, height: 1.5, background: "#fff" }} />
          </motion.div>

          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-4 mb-2">

              <span className="font-bold text-3xl leading-none uppercase" style={{ color: "#fff", fontFamily: "Georgia,serif" }}>
                {panel.monogram}
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase opacity-60" style={{ color: "#fff" }}>
              {panel.agencyTag}
            </span>
          </div>
        </div>

        {/* ── LARGE CENTRE ART ── */}
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{ top: "50%", y: "-50%" }}
          animate={{
            scale: isHovered ? 1.15 : 0.95,
            right: isHovered ? 150 : 180,
            x: "50%"
          }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative">
            {Art && <Art active={isHovered} />}
            <motion.div
              className="absolute rounded-full flex items-center justify-center shadow-2xl"
              style={{
                top: "38%", right: "20%",
                width: 52, height: 52,
                background: panel.playColor,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: (anyHovered && isHovered) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg viewBox="0 0 24 24" fill={panel.playColor === "#F5F5F5" ? "#E63946" : "#fff"} width="18" height="18" style={{ marginLeft: 2 }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── BIG TITLE (Will be revealed as left border moves) ── */}
        <motion.div
          className="absolute z-20 pointer-events-none flex flex-col"
          style={{ top: "40%", right: "450px" }} // Anchored so it reveals as width grows beyond 450
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {panel.titleLines.map((line, i) => (
            <span
              key={i}
              className="font-black leading-[0.8] tracking-tighter text-white mb-2"
              style={{ fontSize: "4rem", fontFamily: "Georgia,serif" }}
            >
              {line}
            </span>
          ))}
        </motion.div>

        {/* ── BOTTOM ROW (Stationary / Reveal-from-behind) ── */}
        <div className="absolute bottom-10 right-0 w-[800px] flex items-end pointer-events-none z-30 px-12">
          {/* 3D Art - Fixed relative to right edge */}
          {panel.BottomArt && (
            <motion.div
              className="pointer-events-none"
              style={{ position: 'absolute', right: 540 }} // Fixed position in the 800px strip
              initial={{ y: 80, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 80,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 2.8, ease: [0.32, 0.72, 0, 1] }}
            >
              {panel.BottomArt && <panel.BottomArt />}
            </motion.div>
          )}

          {/* Subtitles - Fixed relative to right edge, revealed as panel grows */}
          <motion.div
            className="flex gap-16"
            style={{ position: 'absolute', right: 80 }} // Near the rightmost area of expanded panel
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {panel.subItems.map((item, i) => (
              <motion.div
                key={i}
                className={`flex flex-col ${isHovered ? "items-start" : "items-center text-center"}`}
                animate={{ opacity: 1 }} // Always show in both default and hover modes
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1 opacity-50" style={{ color: "#fff" }}>
                  {item.category}
                </span>
                <span className="text-[13px] font-bold uppercase tracking-widest mb-6" style={{ color: "#fff" }}>
                  {item.name}
                </span>
                <div style={{ color: "#fff", opacity: 0.8 }}>
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────
function MobileCard({ panel, index }) {
  const { Art } = panel;
  const tc = panel.textDark ? "rgba(0,0,0,0.85)" : "#fff";
  const tcM = panel.textDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)";

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-xl" style={{ background: panel.bg }}>
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, rgba(0,0,0,${panel.textDark ? 0.2 : 0.65}) 0%, transparent 100%)` }}
      />
      {/* art centered */}
      <div className="absolute z-10 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.9 }}>
        {Art && <Art active={true} />}
      </div>
      {/* top */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
        <div className="text-center">
          <div className="font-bold text-xl" style={{ color: tc, fontFamily: "Georgia,serif" }}>{panel.monogram}</div>
          <div className="text-[9px] tracking-widest uppercase" style={{ color: tcM }}>{panel.agencyTag}</div>
        </div>
      </div>
      {/* title */}
      <div className="absolute top-16 left-4 z-20">
        {panel.titleLines.map((l, i) => (
          <div key={i} className="font-extrabold leading-none text-3xl" style={{ color: tc, fontFamily: "Georgia,serif" }}>{l}</div>
        ))}
      </div>
      {/* play */}
      <div className="absolute z-30 rounded-full flex items-center justify-center"
        style={{
          top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 52, height: 52,
          background: panel.playColor, boxShadow: `0 6px 24px ${panel.playColor}88`
        }}>
        <svg viewBox="0 0 24 24" fill={panel.playColor === "#fff" ? "#333" : "#fff"} width={18} height={18} style={{ marginLeft: 3 }}>
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
      {/* bottom */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end z-20">
        <div className="flex gap-7">
          {panel.subItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: tcM }}>{item.category}</span>
              <span className="text-sm font-bold uppercase" style={{ color: tc }}>{item.name}</span>
              <div className="mt-0.5" style={{ color: tcM }}>{item.icon}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { isDarkMode } = useTheme();

  return (
    <section className={`relative pt-0 pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <p className={`text-[11px] font-semibold tracking-[0.28em] uppercase mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>What we do</p>
        <div className="flex items-end justify-between gap-4">
          <h2 className={`text-4xl md:text-5xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Grow Your{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#ef4444,#7c3aed)" }}>
              BRAND
            </span>
          </h2>
          <a href="/services"
            className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors mb-1 flex-shrink-0 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            View all services
            <span className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${isDarkMode ? 'border-white/20 hover:border-white' : 'border-gray-300 hover:border-gray-900'}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="relative max-w-full mx-auto hidden md:block overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="flex h-[580px]"
          onMouseLeave={() => setActiveIndex(-1)}
        >
          {panels.map((panel, i) => (
            <Panel
              key={panel.id}
              panel={panel}
              isActive={activeIndex === i || (activeIndex === -1 && i === 0)}
              isHovered={activeIndex === i}
              anyHovered={activeIndex !== -1}
              onMouseEnter={() => setActiveIndex(i)}
              index={i}
            />
          ))}
        </div>
      </div>
      {/* Mobile */}
      <div className="max-w-7xl mx-auto flex md:hidden flex-col gap-4">
        {panels.map((panel, i) => (
          <MobileCard key={panel.id} panel={panel} index={i} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-5 flex md:hidden justify-end">
        <a href="/services" className={`flex items-center gap-2 text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          View all services
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
