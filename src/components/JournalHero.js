import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./JournalHero.css";

// Import images directly to ensure they're included in the build
import image4 from "../assets/image4.JPG";
import image5 from "../assets/image5.JPG";

export default function JournalHero() {
    // State for background image rotation
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    // Array of background images using imported images
    // This approach ensures the images are included in the build
    // Add fallback URLs in case the imported images fail
    const backgroundImages = [
        image4 || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop',
        image5 || 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=2070&auto=format&fit=crop'
    ];

    // Rotate background images every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) =>
                (prevIndex + 1) % backgroundImages.length
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="journal-hero">
            {/* Background Image with crossfade effect */}
            {backgroundImages.map((image, index) => (
                <div
                    key={index}
                    className="journal-hero__background"
                    style={{
                        backgroundImage: `url('${typeof image === 'string' ? image : (image && typeof image === 'object' ? image.toString() : '')}')`,
                        opacity: index === backgroundIndex ? 1 : 0,
                        transition: "opacity 1.5s ease-in-out"
                    }}
                />
            ))}

            {/* Overlay */}
            <div className="journal-hero__overlay"></div>

            {/* Hero Content with staggered animations */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="journal-hero__content"
            >
                <motion.h1
                    variants={itemVariants}
                    className="journal-hero__title"
                >
                    Explore Cutting-Edge Research
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="journal-hero__description"
                >
                    Stay informed with the latest academic breakthroughs and innovative discoveries
                    that shape the future of education and research.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="journal-hero__buttons"
                >
                    <Link
                        to="/journals"
                        className="journal-hero__button-primary"
                    >
                        Browse Journals
                    </Link>
                    <Link
                        to="/submission"
                        className="journal-hero__button-secondary"
                    >
                        Submit Your Research
                    </Link>
                </motion.div>

                <div className="journal-hero__badge">
                    Peer-Reviewed
                </div>
            </motion.div>
        </section>
    );
}