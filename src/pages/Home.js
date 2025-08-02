import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import ImprovedCarousel from "../components/Carousol";
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const carouselImages = [
        {
            src: `/images/image4.JPG`,
            fallbackSrc: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=800&q=60",
            alt: 'The Provost',
            title: 'The Sahara Desert, the Great Symbol of the Sahara Journal',
            description: 'The Desert'
        },
        {
            src: `/images/image5.JPG`,
            fallbackSrc: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=800&q=60",
            alt: 'The Sahara Journal',
            title: 'The Camel in the Sahara',
            description: 'The Great Sahara International Journal of Teacher Education'
        },
        {
            src: `/images/image3.JPG`,
            fallbackSrc: "https://images.unsplash.com/photo-1682687218147-9cac31a0c0f2?auto=format&fit=crop&w=800&q=60",
            alt: 'The Sahara Journal',
            title: 'The Sahara International Journal of Teacher Education',
            description: 'The Sahara Journal'
        }
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <main className="main-content">
                {/* Carousel Section */}
                <div className="home-carousel-wrapper">
                    <ImprovedCarousel
                        images={carouselImages}
                        height={isMobile ? 300 : 500}
                        autoplaySpeed={4000}
                        title="Sahara International Journal of Teacher Education"
                    />
                </div>

                <JournalHero />

                {/* Welcome Section */}
                <header className="welcome-header">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="welcome-title"
                    >
                        Welcome to the Sahara International Journal of Teacher Education
                    </motion.h1>
                    <p className="welcome-description">
                        A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
                    </p>
                    <Link to="/submission" className="submit-button">
                        Submit Your Manuscript
                    </Link>
                </header>

                {/* Featured Journals Section */}
                <section className="featured-section">
                    <h2 className="featured-title">Featured Publications</h2>
                    <JournalList />
                    <div className="view-all-link">
                        <Link to="/journals" className="text-blue-600 font-medium hover:underline">
                            View All Journals →
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}