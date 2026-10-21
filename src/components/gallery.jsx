import React from "react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

import img1 from "../assets/gallery/gallery_card_1_1772459959090.webp";
import img2 from "../assets/gallery/gallery_card_2_1772460030044.webp";
import img3 from "../assets/gallery/gallery_card_3_1772460051336.webp";
import img4 from "../assets/gallery/gallery_card_4_1772460064329.webp";
import img5 from "../assets/gallery/gallery_card_5_1772460099840.webp";
import img6 from "../assets/gallery/gallery_card_6_1772460116593.webp";

const Gallery = () => {
    const cards = [
        { id: 1, image: img1, rotation: -15, x: -120, y: 10 },
        { id: 2, image: img2, rotation: -8, x: -60, y: 5 },
        { id: 3, image: img3, rotation: -2, x: 0, y: 0 },
        { id: 4, image: img4, rotation: 4, x: 60, y: 5 },
        { id: 5, image: img5, rotation: 10, x: 120, y: 10 },
        { id: 6, image: img6, rotation: 18, x: 180, y: 20 },
    ];

    const { isDarkMode } = useTheme();

    return (
        <section className={`relative px-6 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-4xl md:text-6xl font-bold mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    A place to display your <br className="hidden md:block" /> masterpiece.
                </motion.h2>

                {/* Fan Out Cards Container */}
                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center mb-12">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, scale: 0.8, x: 0, rotate: 0 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                x: card.x,
                                rotate: card.rotation,
                                y: card.y
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1,
                                delay: index * 0.1,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                zIndex: 50,
                                transition: { duration: 0.3 }
                            }}
                            className="absolute w-[180px] h-[240px] md:w-[260px] md:h-[340px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100 cursor-pointer"
                            style={{ zIndex: index }}
                        >
                            <img
                                src={card.image}
                                alt={`Masterpiece ${card.id}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                            />
                            {/* Play Button Overlay on Center Card (Card 3) */}
                            {card.id === 3 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 ml-1">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-medium">
                        Artists can display their masterpieces, and buyers can discover art.
                    </p>

                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-900/30 to-violet-900/20 rounded-full blur-[120px]" />
            </div>
        </section>
    );
};

export default Gallery;
