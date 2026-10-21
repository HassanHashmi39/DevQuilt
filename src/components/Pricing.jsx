import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const PricingCard = ({ tier, onHover }) => {
    const { isDarkMode } = useTheme();
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const colors = {
        Launch: {
            gradient: "rgba(239, 68, 68, 0.25)",
            shadow: isDarkMode ? "hover:shadow-[0_0_150px_rgba(239,68,68,0.5)]" : "hover:shadow-[0_20px_40px_rgba(239,68,68,0.2)]",
            button: "group-hover:bg-red-500",
        },
        Growth: {
            gradient: "rgba(169, 248, 42, 0.25)",
            shadow: isDarkMode ? "hover:shadow-[0_0_150px_rgba(140,200,45,0.5)]" : "hover:shadow-[0_20px_40px_rgba(140,200,45,0.25)]",
            button: "group-hover:bg-lime-500",
        },
        "Startup MVP": {
            gradient: "rgba(168, 85, 247, 0.25)",
            shadow: isDarkMode ? "hover:shadow-[0_0_150px_rgba(168,85,247,0.5)]" : "hover:shadow-[0_20px_40px_rgba(168,85,247,0.25)]",
            button: "group-hover:bg-purple-600",
        },
    };

    const style = colors[tier.name] || colors.Growth;

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => onHover(tier.name)}
            onMouseLeave={() => onHover(null)}
            className={`relative group w-full sm:max-w-[400px] lg:w-[350px] min-h-[550px] rounded-[16px] overflow-hidden cursor-pointer
                  transition-all duration-300 hover:-translate-y-2 border ${style.shadow} ${
                      isDarkMode
                          ? "bg-[#111] border-white/10 shadow-lg text-white"
                          : "bg-white border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-gray-900"
                  }`}
        >
            {/* Desktop-only Glow Effect (Hidden on mobile/touch) */}
            <div
                className="absolute inset-0 pointer-events-none rounded-[16px] transition-all duration-300 opacity-0 lg:group-hover:opacity-100 hidden lg:block"
                style={{
                    background: `radial-gradient(
            400px circle at ${pos.x}% ${pos.y}%,
            ${style.gradient},
            transparent 100%
          )`,
                }}
            />

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{tier.subtitle}</span>
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{tier.price}</span>
                    {tier.priceSuffix && <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} font-medium`}>{tier.priceSuffix}</span>}
                </div>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-6 leading-relaxed`}>{tier.description}</p>

                <div className={`h-px mb-8 ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                <ul className="space-y-4 mb-8 flex-1 text-left">
                    {tier.features.map((feature) => (
                        <li key={feature} className={`flex gap-3 text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-lime-500 font-bold">✓</span> {feature}
                        </li>
                    ))}
                </ul>

                <a
                    href="/contact"
                    className={`w-full py-4 rounded-2xl font-bold text-center block transition-all duration-300 active:scale-95 border-0 shadow-sm ${
                        isDarkMode
                            ? "bg-white/10 text-white hover:bg-white hover:text-black"
                            : "bg-black text-white hover:bg-gray-800"
                    } ${style.button} group-hover:text-white`}
                >
                    {tier.cta}
                </a>
            </div>
        </div>
    );
};

export default function Pricing() {
    const { isDarkMode } = useTheme();
    const [, setHoveredTier] = useState(null);

    const tiers = [
        {
            name: "Launch",
            subtitle: "Landing page",
            price: "$499+",
            priceSuffix: " one-time",
            description: "For founders who need a focused, professional page to introduce and validate an offer.",
            cta: "Get Started",
            features: [
                "One custom landing page",
                "Responsive desktop and mobile layouts",
                "Contact form integration",
                "Basic on-page SEO setup",
                "Two defined revision rounds",
            ],
        },
        {
            name: "Growth",
            subtitle: "Business website",
            price: "$999+",
            priceSuffix: " one-time",
            description: "For businesses that need a polished multi-page website and a stronger online presence.",
            cta: "Get Started",
            features: [
                "Up to five agreed pages",
                "Custom UI/UX and responsive development",
                "Contact form and essential integrations",
                "Basic technical and on-page SEO",
                "Three defined revision rounds",
            ],
        },
        {
            name: "Startup MVP",
            subtitle: "Custom digital product",
            price: "Custom",
            priceSuffix: " quote",
            description: "For founders building a web application or digital product with specific functionality.",
            cta: "Request Estimate",
            features: [
                "Requirements and feature planning",
                "UI/UX and application development",
                "Backend, database and API integration",
                "Testing and deployment",
                "Optional maintenance agreement",
            ],
        },
    ];

    return (
        <section
            style={{ backgroundColor: isDarkMode ? "#0a0a0a" : "#f5f5f7" }}
            className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <h2 className={`text-4xl md:text-6xl font-bold mb-6 lg:mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Pricing
                    </h2>
                    <p className={`text-base md:text-xl max-w-2xl mx-auto mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Clear starting points. Solutions that fit your scope.
                    </p>
                    <p className={`text-sm max-w-xl mx-auto ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                        Final pricing depends on scope, features, integrations, content, and delivery requirements. Payment structured as deposit, milestone, and final payment before handover.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-4 px-4">
                    {tiers.map((tier) => (
                        <PricingCard key={tier.name} tier={tier} onHover={setHoveredTier} />
                    ))}
                </div>

                <p className={`text-center text-xs mt-10 max-w-2xl mx-auto ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Pricing excludes hosting, domain, paid plugins/APIs, content writing, and third-party services unless specified in the project scope.
                </p>
            </div>
        </section>
    );
}
