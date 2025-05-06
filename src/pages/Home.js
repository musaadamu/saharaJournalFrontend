import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import './Home.css';
import ImprovedCarousel from "../components/Carousol";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    const [stats, setStats] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Define carousel images
    const carouselImages = [
        {
            src: 'images/image4.jpg',
            alt: 'The Provost',
            title: 'The Sahara Desert, the Great Symbol of the Sahara Journal',
            description: 'The Desert'
        },
        {
            src: 'images/image5.jpg',
            alt: 'The Sahara Journal',
            title: 'The Camel in the Sahara',
            description: 'The Great Sahara International Journal of Teacher Education'
        },
        {
            src: 'images/image3.jpg',
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

        // Only apply horizontal scroll fixes on desktop
        const handleScrollLayout = () => {
            if (!isMobile) {
                const fixedScrollbar = document.querySelector('.fixed-scrollbar');
                if (fixedScrollbar) {
                    fixedScrollbar.scrollLeft = 250;
                }

                // Fix for the sidebar gap issue and center carousel
                const sidebar = document.querySelector('.site-sidebar');
                const mainContainer = document.querySelector('.main-container');
                const carouselContainer = document.querySelector('.carousel-container');

                if (sidebar && mainContainer) {
                    const sidebarWidth = sidebar.getBoundingClientRect().width;
                    mainContainer.style.marginLeft = `${sidebarWidth}px`;
                    mainContainer.style.width = `calc(100% - ${sidebarWidth + 50}px)`;
                }

                if (carouselContainer) {
                    carouselContainer.style.margin = '0 auto';
                    carouselContainer.style.display = 'flex';
                    carouselContainer.style.justifyContent = 'center';
                    carouselContainer.style.width = '100%';
                    carouselContainer.style.maxWidth = '1200px';
                }
            } else {
                // Reset styles for mobile
                const mainContainer = document.querySelector('.main-container');
                if (mainContainer) {
                    mainContainer.style.marginLeft = '0';
                    mainContainer.style.width = '100%';
                }
            }
        };

        handleScrollLayout();
        window.addEventListener('resize', handleScrollLayout);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', handleScrollLayout);
        };
    }, [isMobile]);

    // Function to handle scrollbar movement - only active on desktop
    const handleScrollbarScroll = (e) => {
        if (!isMobile) {
            try {
                const scrollableElements = [
                    document.documentElement,
                    document.body,
                    document.querySelector('.min-h-screen'),
                    document.querySelector('.main-container'),
                    document.querySelector('.main-content')
                ];

                scrollableElements.forEach(element => {
                    if (element) {
                        element.scrollLeft = e.target.scrollLeft;
                    }
                });

                window.scrollTo({
                    left: e.target.scrollLeft,
                    top: window.scrollY,
                    behavior: 'auto'
                });
            } catch (error) {
                console.error('Error in handleScrollbarScroll:', error);
            }
        }
    };

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

                {/* Right margin container - only shown on desktop */}
                {!isMobile && <div className="right-margin"></div>}

                <div className="main-container">
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

            {/* Fixed horizontal scrollbar - only shown on desktop */}
            {!isMobile && (
                <div className="fixed-scrollbar" onScroll={handleScrollbarScroll}>
                    <div className="fixed-scrollbar-content">
                        <div className="scrollbar-text">
                            Scroll horizontally to see more content →
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}