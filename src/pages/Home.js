
// // // import { Link } from "react-router-dom";
// // // import { motion } from "framer-motion";
// // // import { useEffect, useState } from "react";
// // // import JournalList from "../components/JournalList";
// // // import JournalHero from "../components/JournalHero";
// // // import Sidebar from "../components/Sidebar";
// // // import Footer from "../components/Footer";
// // // import './Home.css';
// // // import ImprovedCarousel from "../components/Carousol";
// // // import "bootstrap/dist/css/bootstrap.min.css";


// // // export default function HomePage() {
// // //     const [stats, setStats] = useState([]);

// // //     // Add useEffect to set the initial scroll position of the fixed scrollbar
// // //     useEffect(() => {
// // //         // Function to set the initial scroll position
// // //         const setInitialScrollPosition = () => {
// // //             // Get the fixed scrollbar
// // //             const fixedScrollbar = document.querySelector('.fixed-scrollbar');
// // //             if (fixedScrollbar) {
// // //                 // Set its scroll position to 250px (sidebar width)
// // //                 fixedScrollbar.scrollLeft = 250;
// // //                 console.log('Set fixed scrollbar position to 250px');

// // //                 // Also update all scrollable elements
// // //                 const scrollableElements = [
// // //                     document.documentElement,
// // //                     document.body,
// // //                     document.querySelector('.min-h-screen'),
// // //                     document.querySelector('.main-container'),
// // //                     document.querySelector('.main-content')
// // //                 ];

// // //                 scrollableElements.forEach(element => {
// // //                     if (element) {
// // //                         element.scrollLeft = 250;
// // //                     }
// // //                 });
// // //             }
// // //         };

// // //         // Set initial scroll position
// // //         setInitialScrollPosition();

// // //         // Set it again after delays to ensure it works
// // //         setTimeout(setInitialScrollPosition, 100);
// // //         setTimeout(setInitialScrollPosition, 500);
// // //         setTimeout(setInitialScrollPosition, 1000);

// // //         // Also set it when the window is resized
// // //         window.addEventListener('resize', setInitialScrollPosition);

// // //         // Cleanup function
// // //         return () => {
// // //             window.removeEventListener('resize', setInitialScrollPosition);
// // //         };
// // //     }, []);

// // //     // Define carousel images with explicit paths for better compatibility
// // //     const carouselImages = [
// // //         {
// // //             src: "images/image3.JPG",  // Use correct case for extension
// // //             title: "Amazing Sahara Journal Back Cover",
// // //             description: "Discover the beautiful and seasoned journal"
// // //         },
// // //         {
// // //             src: "images/image4.JPG",
// // //             alt: "The Sahara Journal Frontend Page",
// // //             title: "Stunning Design of a Journal of the Sahara",
// // //             description: "Discover more creative and stunning contents at Sahara Journal"
// // //         },
// // //         {
// // //             src: "images/image5.JPG",
// // //             title: "The Beautiful Sahara Journal",
// // //             description: "The Beautiful Sahara Journal"
// // //         },
// // //         {
// // //             src: "images/image1.JPG",
// // //             title: "Sahara Journal Publication",
// // //             description: "Quality research publications"
// // //         },
// // //         {
// // //             src: "images/image2.JPG",
// // //             title: "International Journal of Teacher Education",
// // //             description: "Advancing education research globally"
// // //         }
// // //     ];

// // //     // Log image paths for debugging
// // //     console.log('Carousel images:', carouselImages);

// // //     // Function to handle scrollbar movement
// // //     const handleScrollbarScroll = (e) => {
// // //         try {
// // //             // Get all scrollable elements
// // //             const scrollableElements = [
// // //                 document.documentElement,
// // //                 document.body,
// // //                 document.querySelector('.min-h-screen'),
// // //                 document.querySelector('.main-container'),
// // //                 document.querySelector('.main-content')
// // //             ];

// // //             // Sync all scrollable elements with the fixed scrollbar
// // //             scrollableElements.forEach(element => {
// // //                 if (element) {
// // //                     // Set scrollLeft directly for maximum compatibility
// // //                     element.scrollLeft = e.target.scrollLeft;
// // //                 }
// // //             });

// // //             // Also use window.scrollTo for maximum compatibility
// // //             window.scrollTo({
// // //                 left: e.target.scrollLeft,
// // //                 top: window.scrollY,
// // //                 behavior: 'auto'
// // //             });

// // //             console.log('Scrolled to position:', e.target.scrollLeft);
// // //         } catch (error) {
// // //             console.error('Error in handleScrollbarScroll:', error);
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <div className="min-h-screen bg-gray-50 text-gray-900">
// // //                 {/* Always include Sidebar component first */}
// // //                 <Sidebar className="site-sidebar" />

// // //                 <div className="main-container">
// // //                     <main className="main-content">
// // //                     {/* Carousel Section - Use the improved component */}
// // //                     <div className="carousel-container">
// // //                         <ImprovedCarousel
// // //                             images={carouselImages}
// // //                             height={500}
// // //                             autoplaySpeed={4000}
// // //                             title="Sahara International Journal of Teacher Education"
// // //                         />
// // //                     </div>

// // //                     <JournalHero />

// // //                     {/* Welcome Section */}
// // //                     <header className="relative bg-blue-900 text-white py-10 md:py-20 text-center">
// // //                         <motion.h1
// // //                             initial={{ opacity: 0, y: -20 }}
// // //                             animate={{ opacity: 1, y: 0 }}
// // //                             transition={{ duration: 0.8 }}
// // //                             className="text-3xl md:text-5xl lg:text-6xl font-bold"
// // //                         >
// // //                             Welcome to the Sahara International Journal of Teacher Education
// // //                         </motion.h1>
// // //                         <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
// // //                             A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
// // //                         </p>
// // //                         <Link
// // //                             to="/submission"
// // //                             className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
// // //                         >
// // //                             Submit Your Manuscript
// // //                         </Link>
// // //                     </header>

// // //                     {/* Featured Journals Section */}
// // //                     <section className="py-10 md:py-16 px-2 md:px-10 text-center">
// // //                         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
// // //                         <JournalList />
// // //                         <div className="mt-4 md:mt-6">
// // //                             <Link
// // //                                 to="/journals"
// // //                                 className="text-blue-600 font-medium hover:underline"
// // //                             >
// // //                                 View All Journals →
// // //                             </Link>
// // //                         </div>
// // //                     </section>
// // //                     {/* Include Footer inside the main-container */}
// // //                     <Footer />
// // //                 </main>
// // //             </div>
// // //             </div>

// // //             {/* Fixed horizontal scrollbar at the bottom of the viewport */}
// // //             <div className="fixed-scrollbar" onScroll={handleScrollbarScroll}>
// // //                 <div className="fixed-scrollbar-content">
// // //                     <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-2px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Scroll horizontally to see more content →</div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { useEffect, useState } from "react";
// // import JournalList from "../components/JournalList";
// // import JournalHero from "../components/JournalHero";
// // import Sidebar from "../components/Sidebar";
// // import Footer from "../components/Footer";
// // import './Home.css';
// // import ImprovedCarousel from "../components/Carousol";
// // import "bootstrap/dist/css/bootstrap.min.css";


// // export default function HomePage() {
// //     const [stats, setStats] = useState([]);

// //     // Add useEffect to set the initial scroll position of the fixed scrollbar
// //     useEffect(() => {
// //         // Function to set the initial scroll position
// //         const setInitialScrollPosition = () => {
// //             // Get the fixed scrollbar
// //             const fixedScrollbar = document.querySelector('.fixed-scrollbar');
// //             if (fixedScrollbar) {
// //                 // Set its scroll position to 250px (sidebar width)
// //                 fixedScrollbar.scrollLeft = 250;
// //                 console.log('Set fixed scrollbar position to 250px');

// //                 // Also update all scrollable elements
// //                 const scrollableElements = [
// //                     document.documentElement,
// //                     document.body,
// //                     document.querySelector('.min-h-screen'),
// //                     document.querySelector('.main-container'),
// //                     document.querySelector('.main-content')
// //                 ];

// //                 scrollableElements.forEach(element => {
// //                     if (element) {
// //                         element.scrollLeft = 250;
// //                     }
// //                 });
// //             }
// //         };

// //         // Set initial scroll position
// //         setInitialScrollPosition();

// //         // Set it again after delays to ensure it works
// //         setTimeout(setInitialScrollPosition, 100);
// //         setTimeout(setInitialScrollPosition, 500);
// //         setTimeout(setInitialScrollPosition, 1000);

// //         // Also set it when the window is resized
// //         window.addEventListener('resize', setInitialScrollPosition);

// //         // Fix for the sidebar gap issue
// //         const fixSidebarGap = () => {
// //             const sidebar = document.querySelector('.site-sidebar');
// //             const mainContainer = document.querySelector('.main-container');
            
// //             if (sidebar && mainContainer) {
// //                 // Ensure exact dimensions
// //                 const sidebarWidth = sidebar.getBoundingClientRect().width;
// //                 mainContainer.style.marginLeft = `${sidebarWidth}px`;
// //                 mainContainer.style.width = `calc(100% - ${sidebarWidth}px)`;
// //             }
// //         };
        
// //         // Apply the fix on load and resize
// //         fixSidebarGap();
// //         window.addEventListener('resize', fixSidebarGap);

// //         // Cleanup function
// //         return () => {
// //             window.removeEventListener('resize', setInitialScrollPosition);
// //             window.removeEventListener('resize', fixSidebarGap);
// //         };
// //     }, []);

// //     // Define carousel images with explicit paths for better compatibility
// //     const carouselImages = [
// //         {
// //             src: "images/image3.JPG",  // Use correct case for extension
// //             title: "Amazing Sahara Journal Back Cover",
// //             description: "Discover the beautiful and seasoned journal"
// //         },
// //         {
// //             src: "images/image4.JPG",
// //             alt: "The Sahara Journal Frontend Page",
// //             title: "Stunning Design of a Journal of the Sahara",
// //             description: "Discover more creative and stunning contents at Sahara Journal"
// //         },
// //         {
// //             src: "images/image5.JPG",
// //             title: "The Beautiful Sahara Journal",
// //             description: "The Beautiful Sahara Journal"
// //         },
// //         {
// //             src: "images/image1.JPG",
// //             title: "Sahara Journal Publication",
// //             description: "Quality research publications"
// //         },
// //         {
// //             src: "images/image2.JPG",
// //             title: "International Journal of Teacher Education",
// //             description: "Advancing education research globally"
// //         }
// //     ];

// //     // Function to handle scrollbar movement
// //     const handleScrollbarScroll = (e) => {
// //         try {
// //             // Get all scrollable elements
// //             const scrollableElements = [
// //                 document.documentElement,
// //                 document.body,
// //                 document.querySelector('.min-h-screen'),
// //                 document.querySelector('.main-container'),
// //                 document.querySelector('.main-content')
// //             ];

// //             // Sync all scrollable elements with the fixed scrollbar
// //             scrollableElements.forEach(element => {
// //                 if (element) {
// //                     // Set scrollLeft directly for maximum compatibility
// //                     element.scrollLeft = e.target.scrollLeft;
// //                 }
// //             });

// //             // Also use window.scrollTo for maximum compatibility
// //             window.scrollTo({
// //                 left: e.target.scrollLeft,
// //                 top: window.scrollY,
// //                 behavior: 'auto'
// //             });

// //             console.log('Scrolled to position:', e.target.scrollLeft);
// //         } catch (error) {
// //             console.error('Error in handleScrollbarScroll:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <div className="min-h-screen bg-gray-50 text-gray-900">
// //                 {/* Apply specific styles to the Sidebar to eliminate gaps */}
// //                 <Sidebar 
// //                     className="site-sidebar" 
// //                     style={{ 
// //                         marginRight: 0, 
// //                         paddingRight: 0, 
// //                         borderRight: 'none' 
// //                     }} 
// //                 />

// //                 <div 
// //                     className="main-container" 
// //                     style={{ 
// //                         marginLeft: '250px', 
// //                         paddingLeft: 0, 
// //                         borderLeft: 'none' 
// //                     }}
// //                 >
// //                     <main 
// //                         className="main-content" 
// //                         style={{ 
// //                             marginLeft: 0, 
// //                             paddingLeft: 0, 
// //                             borderLeft: 'none' 
// //                         }}
// //                     >
// //                         {/* Carousel Section - Use the improved component */}
// //                         <div 
// //                             className="carousel-container" 
// //                             style={{ 
// //                                 marginLeft: 0, 
// //                                 paddingLeft: 0 
// //                             }}
// //                         >
// //                             <ImprovedCarousel
// //                                 images={carouselImages}
// //                                 height={500}
// //                                 autoplaySpeed={4000}
// //                                 title="Sahara International Journal of Teacher Education"
// //                             />
// //                         </div>

// //                         <JournalHero />

// //                         {/* Welcome Section */}
// //                         <header 
// //                             className="relative bg-blue-900 text-white py-10 md:py-20 text-center" 
// //                             style={{ 
// //                                 marginLeft: 0, 
// //                                 paddingLeft: 0 
// //                             }}
// //                         >
// //                             <motion.h1
// //                                 initial={{ opacity: 0, y: -20 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 transition={{ duration: 0.8 }}
// //                                 className="text-3xl md:text-5xl lg:text-6xl font-bold"
// //                             >
// //                                 Welcome to the Sahara International Journal of Teacher Education
// //                             </motion.h1>
// //                             <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
// //                                 A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
// //                             </p>
// //                             <Link
// //                                 to="/submission"
// //                                 className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
// //                             >
// //                                 Submit Your Manuscript
// //                             </Link>
// //                         </header>

// //                         {/* Featured Journals Section */}
// //                         <section 
// //                             className="py-10 md:py-16 px-2 md:px-10 text-center" 
// //                             style={{ 
// //                                 marginLeft: 0, 
// //                                 paddingLeft: 0 
// //                             }}
// //                         >
// //                             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
// //                             <JournalList />
// //                             <div className="mt-4 md:mt-6">
// //                                 <Link
// //                                     to="/journals"
// //                                     className="text-blue-600 font-medium hover:underline"
// //                                 >
// //                                     View All Journals →
// //                                 </Link>
// //                             </div>
// //                         </section>
// //                         {/* Include Footer inside the main-container */}
// //                         <Footer style={{ marginLeft: 0, paddingLeft: 0 }} />
// //                     </main>
// //                 </div>
// //             </div>

// //             {/* Fixed horizontal scrollbar at the bottom of the viewport */}
// //             <div className="fixed-scrollbar" onScroll={handleScrollbarScroll}>
// //                 <div className="fixed-scrollbar-content">
// //                     <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-2px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Scroll horizontally to see more content →</div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import JournalList from "../components/JournalList";
// import JournalHero from "../components/JournalHero";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
// import './Home.css';
// import ImprovedCarousel from "../components/Carousol";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function HomePage() {
//     const [stats, setStats] = useState([]);

//     // Add useEffect to set the initial scroll position and handle layout
//     useEffect(() => {
//         // Function to set the initial scroll position
//         const setInitialScrollPosition = () => {
//             // Get the fixed scrollbar
//             const fixedScrollbar = document.querySelector('.fixed-scrollbar');
//             if (fixedScrollbar) {
//                 // Set its scroll position to 250px (sidebar width)
//                 fixedScrollbar.scrollLeft = 250;

//                 // Also update all scrollable elements
//                 const scrollableElements = [
//                     document.documentElement,
//                     document.body,
//                     document.querySelector('.min-h-screen'),
//                     document.querySelector('.main-container'),
//                     document.querySelector('.main-content')
//                 ];

//                 scrollableElements.forEach(element => {
//                     if (element) {
//                         element.scrollLeft = 250;
//                     }
//                 });
//             }
//         };

//         // Fix for the sidebar gap issue and center carousel
//         const fixLayoutIssues = () => {
//             const sidebar = document.querySelector('.site-sidebar');
//             const mainContainer = document.querySelector('.main-container');
//             const carouselContainer = document.querySelector('.carousel-container');
            
//             if (sidebar && mainContainer) {
//                 // Ensure exact dimensions
//                 const sidebarWidth = sidebar.getBoundingClientRect().width;
//                 mainContainer.style.marginLeft = `${sidebarWidth}px`;
//                 mainContainer.style.width = `calc(100% - ${sidebarWidth + 50}px)`; // Account for right margin
//             }
            
//             // Center the carousel
//             if (carouselContainer) {
//                 carouselContainer.style.margin = '0 auto';
//                 carouselContainer.style.display = 'flex';
//                 carouselContainer.style.justifyContent = 'center';
//                 carouselContainer.style.width = '100%';
//                 carouselContainer.style.maxWidth = '1200px';
//             }
//         };
        
//         // Apply the fixes
//         setInitialScrollPosition();
//         fixLayoutIssues();
        
//         // Set again after delays to ensure it works with dynamic content loading
//         setTimeout(setInitialScrollPosition, 100);
//         setTimeout(fixLayoutIssues, 100);
//         setTimeout(setInitialScrollPosition, 500);
//         setTimeout(fixLayoutIssues, 500);

//         // Also set when the window is resized
//         window.addEventListener('resize', setInitialScrollPosition);
//         window.addEventListener('resize', fixLayoutIssues);

//         // Cleanup function
//         return () => {
//             window.removeEventListener('resize', setInitialScrollPosition);
//             window.removeEventListener('resize', fixLayoutIssues);
//         };
//     }, []);

//     // Define carousel images with explicit paths for better compatibility
//     const carouselImages = [
//         {
//             src: "images/image3.JPG",
//             title: "Amazing Sahara Journal Back Cover",
//             description: "Discover the beautiful and seasoned journal"
//         },
//         {
//             src: "images/image4.JPG",
//             alt: "The Sahara Journal Frontend Page",
//             title: "Stunning Design of a Journal of the Sahara",
//             description: "Discover more creative and stunning contents at Sahara Journal"
//         },
//         {
//             src: "images/image5.JPG",
//             title: "The Beautiful Sahara Journal",
//             description: "The Beautiful Sahara Journal"
//         },
//         {
//             src: "images/image1.JPG",
//             title: "Sahara Journal Publication",
//             description: "Quality research publications"
//         },
//         {
//             src: "images/image2.JPG",
//             title: "International Journal of Teacher Education",
//             description: "Advancing education research globally"
//         }
//     ];

//     // Function to handle scrollbar movement
//     const handleScrollbarScroll = (e) => {
//         try {
//             // Get all scrollable elements
//             const scrollableElements = [
//                 document.documentElement,
//                 document.body,
//                 document.querySelector('.min-h-screen'),
//                 document.querySelector('.main-container'),
//                 document.querySelector('.main-content')
//             ];

//             // Sync all scrollable elements with the fixed scrollbar
//             scrollableElements.forEach(element => {
//                 if (element) {
//                     // Set scrollLeft directly for maximum compatibility
//                     element.scrollLeft = e.target.scrollLeft;
//                 }
//             });

//             // Also use window.scrollTo for maximum compatibility
//             window.scrollTo({
//                 left: e.target.scrollLeft,
//                 top: window.scrollY,
//                 behavior: 'auto'
//             });
//         } catch (error) {
//             console.error('Error in handleScrollbarScroll:', error);
//         }
//     };

//     return (
//         <div>
//             <div className="min-h-screen bg-gray-50 text-gray-900">
//                 {/* Apply specific styles to the Sidebar to eliminate gaps */}
//                 <Sidebar className="site-sidebar" />
                
//                 {/* Add right margin container for vertical scrollbar */}
//                 <div className="right-margin"></div>

//                 <div className="main-container">
//                     <main className="main-content">
//                         {/* Carousel Section - Centered */}
//                         <div className="carousel-container">
//                             <ImprovedCarousel
//                                 images={carouselImages}
//                                 height={500}
//                                 autoplaySpeed={4000}
//                                 title="Sahara International Journal of Teacher Education"
//                             />
//                         </div>

//                         <JournalHero />

//                         {/* Welcome Section */}
//                         <header className="relative bg-blue-900 text-white py-10 md:py-20 text-center">
//                             <motion.h1
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8 }}
//                                 className="text-3xl md:text-5xl lg:text-6xl font-bold"
//                             >
//                                 Welcome to the Sahara International Journal of Teacher Education
//                             </motion.h1>
//                             <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
//                                 A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
//                             </p>
//                             <Link
//                                 to="/submission"
//                                 className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
//                             >
//                                 Submit Your Manuscript
//                             </Link>
//                         </header>

//                         {/* Featured Journals Section */}
//                         <section className="py-10 md:py-16 px-2 md:px-10 text-center">
//                             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
//                             <JournalList />
//                             <div className="mt-4 md:mt-6">
//                                 <Link
//                                     to="/journals"
//                                     className="text-blue-600 font-medium hover:underline"
//                                 >
//                                     View All Journals →
//                                 </Link>
//                             </div>
//                         </section>
                        
//                         {/* Include Footer inside the main-container */}
//                         <Footer />
//                     </main>
//                 </div>
//             </div>

//             {/* Fixed horizontal scrollbar at the bottom of the viewport */}
//             <div className="fixed-scrollbar" onScroll={handleScrollbarScroll}>
//                 <div className="fixed-scrollbar-content">
//                     <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-2px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
//                         Scroll horizontally to see more content →
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import './Home.css';
import ImprovedCarousel from "../components/Carousol";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    const [stats, setStats] = useState([]);
    // Create refs for scrollable elements
    const fixedScrollbarRef = useRef(null);
    const mainContentRef = useRef(null);
    const mainContainerRef = useRef(null);

    // Add useEffect to handle scrolling synchronization
    useEffect(() => {
        // Function to set the initial scroll position
        const setInitialScrollPosition = () => {
            // Get the fixed scrollbar
            const fixedScrollbar = fixedScrollbarRef.current;
            if (fixedScrollbar) {
                // Set its scroll position to 250px (sidebar width)
                fixedScrollbar.scrollLeft = 250;
                console.log('Set fixed scrollbar position to 250px');

                // Sync other elements
                syncScrollPosition(250);
            }
        };

        // Function to sync scroll position across all scrollable elements
        const syncScrollPosition = (position) => {
            const scrollableElements = [
                document.documentElement,
                document.body,
                document.querySelector('.min-h-screen'),
                mainContainerRef.current,
                mainContentRef.current
            ];

            scrollableElements.forEach(element => {
                if (element && element !== fixedScrollbarRef.current) {
                    element.scrollLeft = position;
                }
            });

            // Also use window.scrollTo for maximum compatibility
            window.scrollTo({
                left: position,
                top: window.scrollY,
                behavior: 'auto'
            });
        };

        // Fix for the sidebar gap issue and center carousel
        const fixLayoutIssues = () => {
            const sidebar = document.querySelector('.site-sidebar');
            const mainContainer = mainContainerRef.current;
            const carouselContainer = document.querySelector('.carousel-container');
            
            if (sidebar && mainContainer) {
                // Ensure exact dimensions
                const sidebarWidth = sidebar.getBoundingClientRect().width;
                mainContainer.style.marginLeft = `${sidebarWidth}px`;
                mainContainer.style.width = `calc(100% - ${sidebarWidth + 50}px)`;
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
        const timeouts = [
            setTimeout(setInitialScrollPosition, 100),
            setTimeout(fixLayoutIssues, 100),
            setTimeout(setInitialScrollPosition, 500),
            setTimeout(fixLayoutIssues, 500)
        ];

        // Also set when the window is resized
        window.addEventListener('resize', setInitialScrollPosition);
        window.addEventListener('resize', fixLayoutIssues);

        // Cleanup function
        return () => {
            timeouts.forEach(clearTimeout);
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

    // Improved function to handle scrollbar movement
    const handleScrollbarScroll = (e) => {
        try {
            const scrollPosition = e.target.scrollLeft;
            
            // Get all scrollable elements
            const scrollableElements = [
                document.documentElement,
                document.body,
                document.querySelector('.min-h-screen'),
                mainContainerRef.current,
                mainContentRef.current
            ];

            // Sync all scrollable elements with the fixed scrollbar
            scrollableElements.forEach(element => {
                if (element && element !== e.target) {
                    // Set scrollLeft directly for maximum compatibility
                    element.scrollLeft = scrollPosition;
                }
            });

            // Also use window.scrollTo for maximum compatibility
            window.scrollTo({
                left: scrollPosition,
                top: window.scrollY,
                behavior: 'auto'
            });
            
            console.log('Scrolled to position:', scrollPosition);
        } catch (error) {
            console.error('Error in handleScrollbarScroll:', error);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Apply specific styles to the Sidebar to eliminate gaps */}
                <Sidebar className="site-sidebar" />
                
                {/* Add right margin container for vertical scrollbar */}
                <div className="right-margin"></div>

                <div className="main-container" ref={mainContainerRef}>
                    <main className="main-content" ref={mainContentRef}>
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
            <div 
                className="fixed-scrollbar" 
                ref={fixedScrollbarRef} 
                onScroll={handleScrollbarScroll}
            >
                <div className="fixed-scrollbar-content">
                    <div style={{ color: 'white', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '-2px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        Scroll horizontally to see more content →
                    </div>
                </div>
            </div>
        </div>
    );
}