// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { useEffect, useState } from "react";
// // import JournalList from "../components/JournalList";
// // import JournalHero from "../components/JournalHero";
// // import Navigation from "../components/Navigation";
// // import Sidebar from "../components/Sidebar";
// // import Footer from "../components/Footer";
// // import './Home.css';
// // import Carousol from "../components/Carousol";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // export default function HomePage() {
// //     const [stats, setStats] = useState([]);

// //     useEffect(() => {
// //         async function fetchStats() {
// //             try {
// //                 const response = await fetch("/api/stats");
// //                 const data = await response.json();
// //                 setStats([
// //                     { label: "Published Papers", value: `${data.publishedPapers || 0}+` },
// //                     { label: "Registered Authors", value: `${data.registeredAuthors || 0}+` },
// //                     { label: "Global Readers", value: `${data.globalReaders || 0}+` },
// //                 ]);
// //             } catch (error) {
// //                 console.error("Error fetching stats:", error);
// //             }
// //         }

// //         fetchStats();
// //     }, []);

// //     return (
// //         <div className="min-h-screen bg-gray-50 text-gray-900">
           

// //             <div className="main-container flex flex-col lg:flex-row">
// //                 <Sidebar className="site-sidebar" />
                
// //                 <main className="main-content flex-1 p-4 sm:p-6 lg:p-8 lg:pl-[280px]">
// //                     {/* Hero Section */}
// //                     <Carousol 
// //                             images={[
// //                                 {
// //                                   src: "images/image3.jpg",
// //                                   caption: {
// //                                     title: "Amazing Sahara Journal Back Cover",
// //                                     text: "Discover the beautiful and seasoned journal"
// //                                   }
// //                                 },
// //                                 {
// //                                   src: "images/image4.jpg",
// //                                   alt: "The Sahara Jourrnal Frontend Page",
// //                                   caption: {
// //                                     title: "Stunning Design of a Journal of the Sahara",
// //                                     text: "Discover more creative and stunning contents at Sahara Journal"
// //                                   }
// //                                 },
// //                                 {
// //                                   src: "images/image3.jpg",
// //                                   alt: "The Journal Front and Back Cover Design",
// //                                   caption: {
// //                                     title: "The Journal Design and Complete Appearance",
// //                                     text: "The Looks and Feel of the Sahara Journal"
// //                                   }
// //                                 }, {
// //                                     src: "images/image4.jpg",
// //                                     alt: "The Sahara Journal is Our Pride",
// //                                     caption: {
// //                                       title: "The Sahara Journal",
// //                                       text: "The Sahara Journal"
// //                                     }
// //                                   }, {
// //                                     src: "images/image5.jpg",
// //                                     alt: "The Sahara Journal",
// //                                     caption: {
// //                                       title: "The Beautiful Sahara Journal",
// //                                       text: "The Beautiful Sahara Journal"
// //                                     }
// //                                   },{
// //                                     src: "images/image3.jpg",
// //                                     caption: {
// //                                       title: "Amazing Sahara Journal Back Cover",
// //                                       text: "Discover the beautiful and seasoned journal"
// //                                     }
// //                                   },
// //                                   {
// //                                     src: "images/image4.jpg",
// //                                     alt: "The Sahara Jourrnal Frontend Page",
// //                                     caption: {
// //                                       title: "Stunning Design of a Journal of the Sahara",
// //                                       text: "Discover more creative and stunning contents at Sahara Journal"
// //                                     }
// //                                   },
// //                                   {
// //                                     src: "images/image3.jpg",
// //                                     alt: "The Journal Front and Back Cover Design",
// //                                     caption: {
// //                                       title: "The Journal Design and Complete Appearance",
// //                                       text: "The Looks and Feel of the Sahara Journal"
// //                                     }
// //                                   }, {
// //                                       src: "images/image4.jpg",
// //                                       alt: "The Sahara Journal is Our Pride",
// //                                       caption: {
// //                                         title: "The Sahara Journal",
// //                                         text: "The Sahara Journal"
// //                                       }
// //                                     }, {
// //                                       src: "images/image5.jpg",
// //                                       alt: "The Sahara Journal",
// //                                       caption: {
// //                                         title: "The Beautiful Sahara Journal",
// //                                         text: "The Beautiful Sahara Journal"
// //                                       }
// //                                     },
// //                                 ]}

// //                                 height={900}
// //                                 autoplaySpeed={4000}
// //                     />
// //                     <JournalHero />

// //                     {/* Welcome Section */}
// //                     <header className="relative bg-blue-900 text-white py-10 md:py-20 text-center">
// //                         <motion.h1
// //                             initial={{ opacity: 0, y: -20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ duration: 0.8 }}
// //                             className="text-3xl md:text-5xl lg:text-6xl font-bold"
// //                         >
// //                             Welcome to the Sahara International Journal Hub
// //                         </motion.h1>
// //                         <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
// //                             A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
// //                         </p>
// //                         <Link
// //                             to="/submission"
// //                             className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
// //                         >
// //                             Submit Your Manuscript
// //                         </Link>
// //                     </header>

// //                     {/* Featured Journals Section */}
// //                     <section className="py-10 md:py-16 px-4 md:px-20 text-center">
// //                         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
// //                         <JournalList />
// //                         <div className="mt-4 md:mt-6">
// //                             <Link
// //                                 to="/journals"
// //                                 className="text-blue-600 font-medium hover:underline"
// //                             >
// //                                 View All Journals →
// //                             </Link>
// //                         </div>
// //                     </section>
// //                 </main>
// //             </div>

// //             {/* Footer */}
           
// //         </div>
// //     );
// // }

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import JournalList from "../components/JournalList";
// import JournalHero from "../components/JournalHero";
// import Navigation from "../components/Navigation";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";
// import './Home.css';
// import Carousol from "../components/Carousol";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "../components/Carousel"; // Assuming you have a Carousel component

// export default function HomePage() {
//     const [stats, setStats] = useState([]);

//     useEffect(() => {
//         async function fetchStats() {
//             try {
//                 const response = await fetch("/api/stats");
//                 const data = await response.json();
//                 setStats([
//                     { label: "Published Papers", value: `${data.publishedPapers || 0}+` },
//                     { label: "Registered Authors", value: `${data.registeredAuthors || 0}+` },
//                     { label: "Global Readers", value: `${data.globalReaders || 0}+` },
//                 ]);
//             } catch (error) {
//                 console.error("Error fetching stats:", error);
//             }
//         }

//         fetchStats();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 text-gray-900">
//             {/* Always include Sidebar component first */}
//             <Sidebar className="site-sidebar" />
            
//             <div className="main-container">
//                 <main className="main-content">
//                     {/* Carousel Section */}
//                     <div className="carousel-container">
//                         <Carousol 
//                             images={[
//                                 {
//                                   src: "images/image3.jpg",
//                                   caption: {
//                                     title: "Amazing Sahara Journal Back Cover",
//                                     text: "Discover the beautiful and seasoned journal"
//                                   }
//                                 },
//                                 {
//                                   src: "images/image4.jpg",
//                                   alt: "The Sahara Jourrnal Frontend Page",
//                                   caption: {
//                                     title: "Stunning Design of a Journal of the Sahara",
//                                     text: "Discover more creative and stunning contents at Sahara Journal"
//                                   }
//                                 },
//                                 {
//                                     src: "images/image3.jpg",
//                                     caption: {
//                                       title: "Amazing Sahara Journal Back Cover",
//                                       text: "Discover the beautiful and seasoned journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image4.jpg",
//                                     alt: "The Sahara Jourrnal Frontend Page",
//                                     caption: {
//                                       title: "Stunning Design of a Journal of the Sahara",
//                                       text: "Discover more creative and stunning contents at Sahara Journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image5.jpg",
//                                     caption: {
//                                       title: "Amazing Sahara Journal Back Cover",
//                                       text: "Discover the beautiful and seasoned journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image4.jpg",
//                                     alt: "The Sahara Jourrnal Frontend Page",
//                                     caption: {
//                                       title: "Stunning Design of a Journal of the Sahara",
//                                       text: "Discover more creative and stunning contents at Sahara Journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image3.jpg",
//                                     caption: {
//                                       title: "Amazing Sahara Journal Back Cover",
//                                       text: "Discover the beautiful and seasoned journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image4.jpg",
//                                     alt: "The Sahara Jourrnal Frontend Page",
//                                     caption: {
//                                       title: "Stunning Design of a Journal of the Sahara",
//                                       text: "Discover more creative and stunning contents at Sahara Journal"
//                                     }
//                                   },{
//                                     src: "images/image5.jpg",
//                                     caption: {
//                                       title: "Amazing Sahara Journal Back Cover",
//                                       text: "Discover the beautiful and seasoned journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image4.jpg",
//                                     alt: "The Sahara Jourrnal Frontend Page",
//                                     caption: {
//                                       title: "Stunning Design of a Journal of the Sahara",
//                                       text: "Discover more creative and stunning contents at Sahara Journal"
//                                     }
//                                   },{
//                                     src: "images/image3.jpg",
//                                     caption: {
//                                       title: "Amazing Sahara Journal Back Cover",
//                                       text: "Discover the beautiful and seasoned journal"
//                                     }
//                                   },
//                                   {
//                                     src: "images/image4.jpg",
//                                     alt: "The Sahara Jourrnal Frontend Page",
//                                     caption: {
//                                       title: "Stunning Design of a Journal of the Sahara",
//                                       text: "Discover more creative and stunning contents at Sahara Journal"
//                                     }
//                                   },
//                                 /* Other carousel items */
//                             ]}
//                             height={500} /* Reduced height for better responsiveness */
//                             autoplaySpeed={4000}
//                         />
//                     </div>
                    
//                     <JournalHero />

//                     {/* Welcome Section */}
//                     <header className="relative bg-blue-900 text-white py-10 md:py-20 text-center">
//                         <motion.h1
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="text-3xl md:text-5xl lg:text-6xl font-bold"
//                         >
//                             Welcome to the Sahara International Journal Hub
//                         </motion.h1>
//                         <p className="mt-4 text-base md:text-lg lg:text-xl max-w-xl md:max-w-3xl mx-auto">
//                             A global platform for scholars, researchers, and academics to publish and discover cutting-edge research.
//                         </p>
//                         <Link
//                             to="/submission"
//                             className="mt-6 inline-block bg-white text-blue-900 font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
//                         >
//                             Submit Your Manuscript
//                         </Link>
//                     </header>

//                     {/* Featured Journals Section */}
//                     <section className="py-10 md:py-16 px-4 md:px-20 text-center">
//                         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Featured Publications</h2>
//                         <JournalList />
//                         <div className="mt-4 md:mt-6">
//                             <Link
//                                 to="/journals"
//                                 className="text-blue-600 font-medium hover:underline"
//                             >
//                                 View All Journals →
//                             </Link>
//                         </div>
//                     </section>
//                 </main>
//             </div>

//             {/* Footer will be on the bottom after main content
//             <Footer /> */}
//         </div>
//     );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import JournalList from "../components/JournalList";
import JournalHero from "../components/JournalHero";
import Sidebar from "../components/Sidebar";
import './Home.css';
import Carousol from "../components/Carousol";
import "bootstrap/dist/css/bootstrap.min.css";


export default function HomePage() {
    const [stats, setStats] = useState([]);

    // Determine the base path based on environment
    // You'll need to adjust this based on your Vercel configuration
    const getImageBasePath = () => {
        // Check if we're running on Vercel
        if (process.env.VERCEL) {
            // For Vercel, you might need a different base path
            return "";  // This might need to be adjusted based on your Vercel setup
        }
        // For local development
        return "";  // Empty string to use relative paths
    };

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                setStats([
                    { label: "Published Papers", value: `${data.publishedPapers || 0}+` },
                    { label: "Registered Authors", value: `${data.registeredAuthors || 0}+` },
                    { label: "Global Readers", value: `${data.globalReaders || 0}+` },
                ]);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

        fetchStats();
    }, []);

    // Define carousel images with consistent paths
    const carouselImages = [
        {
            src: "/images/image3.jpg",
            title: "Amazing Sahara Journal Back Cover", 
            description: "Discover the beautiful and seasoned journal"
        },
        {
            src: "/images/image4.jpg",
            alt: "The Sahara Journal Frontend Page",
            title: "Stunning Design of a Journal of the Sahara", 
            description: "Discover more creative and stunning contents at Sahara Journal"
        },
        {
            src: "/images/image5.jpg",
            title: "The Beautiful Sahara Journal", 
            description: "The Beautiful Sahara Journal"
        }
        // You can add more images but I reduced duplicates for clarity
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Always include Sidebar component first */}
            <Sidebar className="site-sidebar" />
            
            <div className="main-container">
                <main className="main-content">
                    {/* Carousel Section - Use the updated component */}
                    <div className="carousel-container">
                        <Carousol 
                            images={carouselImages}
                            height={500}
                            autoplaySpeed={4000}
                            basePath={getImageBasePath()}
                            title="Sahara International Journals"
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
                            Welcome to the Sahara International Journal Hub
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
                    <section className="py-10 md:py-16 px-4 md:px-20 text-center">
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
                </main>
            </div>
        </div>
    );
}