import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
// Images imported normally — Vite handles webp efficiently
import contactVisual from "../assets/contact1.png";
import contactBg from "../assets/contact2.png";

const ContactPage = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        comments: "",
        services: [],
    });
    const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const canvasInitialized = useRef(false);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || canvasInitialized.current) return;
        canvasInitialized.current = true;

        const ctx = canvas.getContext("2d");
        const img = new Image();
        // Load the image only when we actually need it
        img.src = contactVisual;

        const draw = () => {
            const ratio = window.devicePixelRatio || 1;
            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            if (!width || !height) return;

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(ratio, ratio);

            document.fonts.ready.then(() => {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
                ctx.shadowBlur = 0;
                ctx.fillStyle = "black";
                ctx.font = "900 60px 'Tomato Grotesk', sans-serif";
                ctx.textAlign = "left";
                ctx.textBaseline = "top";

                const startX = 64;
                const startY = 90;



            });
        };

        img.onload = draw;
        if (img.complete) draw();

        const onResize = () => {
            canvasInitialized.current = false;
            initCanvas();
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Only init canvas when the visual column scrolls into view
    useEffect(() => {
        const el = canvasRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) initCanvas(); },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [initCanvas]);

    const [cursorPos, setCursorPos] = useState(null);
    const lastPos = useRef(null);

    const handleScratch = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCursorPos({ x, y });

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 100;

        if (lastPos.current) {
            ctx.beginPath();
            ctx.moveTo(lastPos.current.x, lastPos.current.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        lastPos.current = { x, y };
    };

    // Reset last position when mouse leaves
    const handleMouseLeave = () => {
        lastPos.current = null;
        setCursorPos(null);
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(1.05); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleCheckboxChange = (service) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitState('loading');
        try {
            const res = await fetch('https://formspree.io/f/xeoqgvrl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phoneNumber,
                    message: formData.comments,
                    services: formData.services.join(', '),
                }),
            });
            if (res.ok) {
                setSubmitState('success');
                setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', comments: '', services: [] });
                setTimeout(() => setSubmitState('idle'), 5000);
            } else {
                setSubmitState('error');
                setTimeout(() => setSubmitState('idle'), 4000);
            }
        } catch {
            setSubmitState('error');
            setTimeout(() => setSubmitState('idle'), 4000);
        }
    };

    const servicesList = [
        "Website Development",
        "Landing Page Design",
        "Startup MVP Development",
        "AI Integration",
        "UI/UX Design",
        "Other",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ backgroundColor: isDarkMode ? "#121214" : "#ffffff" }}
            className={`font-tomato outline-none min-h-screen py-10 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
            {/* Left Column: Form */}
            <div
                className={`min-h-90vh w-90vw mx-auto px-5 lg:px-10 py-10 lg:py-20 rounded-3xl flex flex-col lg:flex-row shadow-2xl border transition-all ${isDarkMode ? "bg-[#121214] border-white/10" : "bg-white border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                    }`}
            >
                <div className="w-80vw lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md mx-auto w-90vw"
                    >
                        {/* Logo Placeholder */}
                        <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform ${isDarkMode ? "bg-black" : "bg-black"}`}>
                                <span className="text-white font-bold text-xs">✦</span>
                            </div>
                            <span className={`text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>DevQuilt</span>
                        </div>

                        <h1 className={`text-xl lg:text-2xl font-bold mb-4 leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Tell us about your project. We'll discuss the right approach together.
                        </h1>

                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>First name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleInputChange('firstName')}
                                        className={`w-full px-3.5 py-2 rounded-lg border outline-none transition-all text-sm ${isDarkMode
                                            ? "bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-white/40 focus:border-white/40 placeholder:text-gray-500"
                                            : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
                                            }`}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Last name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange('lastName')}
                                        className={`w-full px-3.5 py-2 rounded-lg border outline-none transition-all text-sm ${isDarkMode
                                            ? "bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-white/40 focus:border-white/40 placeholder:text-gray-500"
                                            : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    required
                                    className={`w-full px-3.5 py-2 rounded-lg border outline-none transition-all text-sm ${isDarkMode
                                        ? "bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-white/40 focus:border-white/40 placeholder:text-gray-500"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
                                        }`}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Phone number</label>
                                <div className="flex gap-2">
                                    <div className="relative group">
                                        <select
                                            className={`appearance-none border px-3 py-2 pr-7 rounded-lg outline-none cursor-pointer transition-all text-sm ${isDarkMode
                                                ? "bg-[#1e1e24] border-white/10 text-white focus:ring-1 focus:ring-white/40"
                                                : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-1 focus:ring-black"
                                                }`}
                                        >
                                            <option>US</option>
                                            <option>UK</option>
                                            <option>CA</option>
                                            <option>PK</option>
                                            <option>UAE</option>
                                            <option>DE</option>
                                        </select>
                                        <div className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange('phoneNumber')}
                                        className={`flex-1 px-3.5 py-2 rounded-lg border outline-none transition-all text-sm ${isDarkMode
                                            ? "bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-white/40 focus:border-white/40 placeholder:text-gray-500"
                                            : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
                                            }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Comments</label>
                                <textarea
                                    rows="3"
                                    placeholder="Tell us about your project..."
                                    value={formData.comments}
                                    onChange={handleInputChange('comments')}
                                    className={`w-full px-3.5 py-2 rounded-lg border outline-none transition-all resize-none text-sm ${isDarkMode
                                        ? "bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-white/40 focus:border-white/40 placeholder:text-gray-500"
                                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white focus:ring-1 focus:ring-black focus:border-black placeholder:text-gray-400"
                                        }`}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className={`text-[13px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Services</label>
                                <div className="grid grid-cols-2 gap-y-2">
                                    {servicesList.map((service) => (
                                        <label key={service} className="flex items-center gap-2.5 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className={`peer h-4 w-4 cursor-pointer appearance-none rounded border transition-all ${isDarkMode
                                                        ? "border-white/20 checked:bg-white checked:border-white bg-white/5"
                                                        : "border-gray-300 checked:bg-black checked:border-black bg-gray-50"
                                                        }`}
                                                    onChange={() => handleCheckboxChange(service)}
                                                />
                                                <svg className={`absolute w-3 h-3 opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none ${isDarkMode ? "text-black" : "text-white"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`text-xs transition-colors ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900"}`}>{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitState === 'loading'}
                                className={`w-full font-semibold py-3 rounded-lg transition-all active:scale-[0.98] mt-2 shadow-lg flex items-center justify-center gap-2 ${submitState === 'success' ? 'bg-green-500 text-white' :
                                    submitState === 'error' ? 'bg-red-500 text-white' :
                                        submitState === 'loading' ? 'bg-white/60 text-black cursor-not-allowed' :
                                            isDarkMode
                                                ? 'bg-white text-black hover:bg-gray-200'
                                                : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                            >
                                {submitState === 'loading' && (
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                {submitState === 'success' ? '✓ Message Sent!' :
                                    submitState === 'error' ? '✕ Failed — Try Again' :
                                        submitState === 'loading' ? 'Sending...' : 'SEND'}
                            </button>
                            <div
                                className="flex flex-col md:flex-row justify-center items-center gap-8 pt-5 pb-5 border-b"
                                style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                            >
                                <div
                                    className="flex items-center gap-8"
                                    style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
                                >
                                    <a href="https://calendly.com/devquilt0/30min" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="https://www.facebook.com/share/1FCsS1EMtk/" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                    </a>
                                    <a href="https://www.linkedin.com/company/devquilt/home/" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/devquilt_tech/" target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.75-.75a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* Right Column: Visual */}
                <div className="hidden lg:flex w-1/2 p-6 h-screen sticky top-0">
                    <div className="relative w-full h-full overflow-hidden group bg-transparent">
                        {/* Custom Cutout Shape using absolute masking trick */}
                        <div className="absolute inset-0 bg-transparent overflow-hidden rounded-[3rem]" ref={containerRef}>
                            {/* Background Layer (revealed by rubbing) */}
                            <img
                                src={contactBg}
                                alt="Background"
                                loading="lazy"
                                decoding="async"
                                className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover"
                            />
                            {/* Text Layer (Behind Canvas, revealed by rubbing) */}
                            <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center text-center px-12 z-0 pointer-events-none">

                            </div>

                            {/* Custom Rubber Cursor */}
                            <div
                                className={`absolute pointer-events-none z-50 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-md transition-opacity duration-200 flex items-center justify-center ${cursorPos ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    left: cursorPos ? `${cursorPos.x}px` : '-100px',
                                    top: cursorPos ? `${cursorPos.y}px` : '-100px',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                            </div>

                            {/* Top Layer Canvas (the "rubber" surface) */}
                            <canvas
                                ref={canvasRef}
                                onMouseMove={handleScratch}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={(e) => {
                                    const rect = canvasRef.current.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    setCursorPos({ x, y });
                                }}
                                className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover z-10 cursor-none"

                            />
                        </div>

                        {/* Inward rounded corner mask (Top Left) */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-[var(--page-bg,#121214)] rounded-br-[2rem] z-20" />
                        {/* Inward rounded corner mask (Bottom Right) */}
                        <div className="absolute bottom-0 right-0 w-16 h-16 bg-[var(--page-bg,#121214)] rounded-tl-[2rem] z-20" />


                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
