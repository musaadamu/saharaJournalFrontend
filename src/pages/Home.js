import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import './Home.css';
import ImprovedCarousel from "../components/Carousol";
import "bootstrap/dist/css/bootstrap.min.css";

// Import images directly to ensure they're included in the build
import image3 from "../assets/image3.JPG";
import image4 from "../assets/image4.JPG";
import image5 from "../assets/image5.JPG";

export default function HomePage() {
    const [stats, setStats] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Define carousel images using imported images
    // This approach ensures the images are included in the build
    const carouselImages = [
        {
            src: image4,
            alt: 'The Provost',
            title: 'The Sahara Desert, the Great Symbol of the Sahara Journal',
            description: 'The Desert'
        },
        {
            src: image5,
            alt: 'The Sahara Journal',
            title: 'The Camel in the Sahara',
            description: 'The Great Sahara International Journal of Teacher Education'
        },
        {
            src: image3,
            alt: 'The Sahara Journal',
            title: 'The Sahara International Journal of Teacher Education',
            description: 'The Sahara Journal'
        }
    ];

    // Function to check if device is mobile
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        // Check mobile on mount and window resize
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className={`home-container ${isMobile ? 'mobile' : ''}`}>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Mobile sidebar toggle button - only shown on mobile */}
                {isMobile && (
                    <button
                        className="mobile-sidebar-toggle"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                )}

                <div className="main-container" style={{ marginLeft: 0, width: '100%' }}>
                    <main className="main-content" style={{ marginLeft: 0, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
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
                            <Link
                                to="/submission"
                                className="submit-button"
                            >
                                Submit Your Manuscript
                            </Link>
                        </header>

                        {/* Featured Journals Section */}
                        <section className="featured-section">
                            <h2 className="featured-title">Featured Publications</h2>
                            <JournalList />
                            <div className="view-all-link">
                                <Link
                                    to="/journals"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    View All Journals →
                                </Link>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}