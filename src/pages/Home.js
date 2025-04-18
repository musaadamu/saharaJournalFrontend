import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import './Home.css';
import ImprovedCarousel from "../components/Carousol";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    const [stats, setStats] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Add useEffect to set the initial scroll position and handle layout
    useEffect(() => {
        // Function to set the initial scroll position
        const setInitialScrollPosition = () => {
            // Get the fixed scrollbar
            const fixedScrollbar = document.querySelector('.fixed-scrollbar');
            if (fixedScrollbar) {
                // Set its scroll position to 250px (sidebar width)
                fixedScrollbar.scrollLeft = 250;

                // Also update all scrollable elements
                const scrollableElements = [
                    document.documentElement,
                    document.body,
                    document.querySelector('.min-h-screen'),
                    document.querySelector('.main-container'),
                    document.querySelector('.main-content')
                ];

                scrollableElements.forEach(element => {
                    if (element) {
                        element.scrollLeft = 250;
                    }
                });
            }
        };

        // Fix for the sidebar gap issue and center carousel
        const fixLayoutIssues = () => {
            const sidebar = document.querySelector('.site-sidebar');
            const mainContainer = document.querySelector('.main-container');
            const carouselContainer = document.querySelector('.carousel-container');

            if (sidebar && mainContainer) {
                // Ensure exact dimensions
                const sidebarWidth = sidebar.getBoundingClientRect().width;
                mainContainer.style.marginLeft = `${sidebarWidth}px`;
                mainContainer.style.width = `calc(100% - ${sidebarWidth + 50}px)`; // Account for right margin
            }

            // Center the carousel
            if (carouselContainer) {
                carouselContainer.style.margin = '0 auto';
                carouselContainer.style.display = 'flex';
                carouselContainer.style.justifyContent = 'center';
                carouselContainer.style.width = '100%';
                carouselContainer.style.maxWidth = '1200px';
            }
        };

        // Apply the fixes
        setInitialScrollPosition();
        fixLayoutIssues();

        // Set again after delays to ensure it works with dynamic content loading
        setTimeout(setInitialScrollPosition, 100);
        setTimeout(fixLayoutIssues, 100);
        setTimeout(setInitialScrollPosition, 500);
        setTimeout(fixLayoutIssues, 500);

        // Also set when the window is resized
        window.addEventListener('resize', setInitialScrollPosition);
        window.addEventListener('resize', fixLayoutIssues);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', setInitialScrollPosition);
            window.removeEventListener('resize', fixLayoutIssues);
        };
    }, []);

    // Define carousel images with explicit paths for better compatibility
    const carouselImages = [
        {
            src: "images/image3.JPG",
            title: "Amazing Sahara Journal Back Cover",
            description: "Discover the beautiful and seasoned journal"
        },
        {
            src: "images/image4.JPG",
            alt: "The Sahara Journal Frontend Page",
            title: "Stunning Design of a Journal of the Sahara",
            description: "Discover more creative and stunning contents at Sahara Journal"
        },
        {
            src: "images/image5.JPG",
            title: "The Beautiful Sahara Journal",
            description: "The Beautiful Sahara Journal"
        },
        {
            src: "images/image1.JPG",
            title: "Sahara Journal Publication",
            description: "Quality research publications"
        },
        {
            src: "images/image2.JPG",
            title: "International Journal of Teacher Education",
            description: "Advancing education research globally"
        }
    ];

    // Function to handle scrollbar movement
    const handleScrollbarScroll = (e) => {
        try {
            // Get all scrollable elements
            const scrollableElements = [
                document.documentElement,
                document.body,
                document.querySelector('.min-h-screen'),
                document.querySelector('.main-container'),
                document.querySelector('.main-content')
            ];

            // Sync all scrollable elements with the fixed scrollbar
            scrollableElements.forEach(element => {
                if (element) {
                    // Set scrollLeft directly for maximum compatibility
                    element.scrollLeft = e.target.scrollLeft;
                }
            });

            // Also use window.scrollTo for maximum compatibility
            window.scrollTo({
                left: e.target.scrollLeft,
                top: window.scrollY,
                behavior: 'auto'
            });
        } catch (error) {
            console.error('Error in handleScrollbarScroll:', error);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Mobile sidebar toggle button */}
                <button
                    className="mobile-sidebar-toggle"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    style={{
                        display: 'none', /* Hidden by default, shown in mobile CSS */
                        position: 'fixed',
                        top: '70px',
                        left: '10px',
                        zIndex: 1000,
                        background: '#1e3a8a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        fontSize: '18px'
                    }}
                >
                    <i className="fas fa-bars"></i>
                </button>
                {/* Apply specific styles to the Sidebar to eliminate gaps */}
                <Sidebar
                    className={`site-sidebar ${sidebarOpen ? 'open' : ''}`}
                    onClose={closeSidebar}
                />

                {/* Backdrop overlay for mobile when sidebar is open */}
                {sidebarOpen && (
                    <div
                        className="sidebar-backdrop"
                        onClick={closeSidebar}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 40,
                            display: 'none' /* Hidden by default, shown in mobile CSS */
                        }}
                    />
                )}

                {/* Add right margin container for vertical scrollbar */}
                <div className="right-margin"></div>

                <div className="main-container">
                    <main className="main-content">
                        {/* Carousel Section - Centered */}
                        <div className="carousel-container">
                            <ImprovedCarousel
                                images={carouselImages}
                                height={500}
                                autoplaySpeed={4000}
                                title="Sahara International Journal of Teacher Education"
                            />
                        </div>

                        <JournalHero />

                        {/* Welcome Section */}
                        <header className="relative bg-blue-900 text-white py-10 md:py-20 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                            >
                                Welcome to the Sahara International Journal of Teacher Education
                            </motion.h1>
                            <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
                                A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
                            </p>
                            <Link
                                to="/submission"
                                className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
                            >
                                Submit Your Manuscript
                            </Link>
                        </header>

                        {/* Featured Journals Section */}
                        <section className="py-10 md:py-16 px-2 md:px-10 text-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
                            <JournalList />
                            <div className="mt-4 md:mt-6">
                                <Link
                                    to="/journals"
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    View All Journals →
                                </Link>
                            </div>
                        </section>

                        {/* Include Footer inside the main-container */}
                        <Footer />
                    </main>
                </div>
            </div>

            {/* Fixed horizontal scrollbar at the bottom of the viewport */}
            <div className="fixed-scrollbar" onScroll={handleScrollbarScroll}>
                <div className="fixed-scrollbar-content">
                    <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-2px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        Scroll horizontally to see more content →
                    </div>
                </div>
            </div>
        </div>
    );
}