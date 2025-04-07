// // // // export default function Carousol({ images = [] }) {
// // // //   if (!Array.isArray(images)) {
// // // //     console.error("Carousol Error: Expected an array but received", images);
// // // //     return <p>Error loading carousel. Please check image data.</p>;
// // // //   }

// // // //   return (
// // // //     <div className="container">
// // // //       <div
// // // //         id="carouselExampleFade"
// // // //         className="carousel slide carousel-fade"
// // // //         data-bs-ride="carousel"
// // // //         data-bs-interval="3000"
// // // //       >
// // // //         <div className="carousel-indicators">
// // // //           {images.map((_, index) => (
// // // //             <button
// // // //               key={index}
// // // //               type="button"
// // // //               data-bs-target="#carouselExampleFade"
// // // //               data-bs-slide-to={index}
// // // //               className={index === 0 ? "active" : ""}
// // // //               aria-current={index === 0 ? "true" : "false"}
// // // //               aria-label={`Slide ${index + 1}`}
// // // //             ></button>
// // // //           ))}
// // // //         </div>

// // // //         <div className="carousel-inner">
// // // //           {images.map((image, index) => (
// // // //             <div
// // // //               key={index}
// // // //               className={`carousel-item ${index === 0 ? "active" : ""}`}
// // // //             >
// // // //               <img
// // // //                 src={image.src}
// // // //                 className="d-block w-100 custom-carousel-image"
// // // //                 alt={image.alt}
// // // //               />
// // // //               {image.caption && (
// // // //                 <div className="carousel-caption">
// // // //                   <h5>{image.caption.title}</h5>
// // // //                   <p>{image.caption.text}</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         <button
// // // //           className="carousel-control-prev"
// // // //           type="button"
// // // //           data-bs-target="#carouselExampleFade"
// // // //           data-bs-slide="prev"
// // // //         >
// // // //           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
// // // //           <span className="visually-hidden">Previous</span>
// // // //         </button>
// // // //         <button
// // // //           className="carousel-control-next"
// // // //           type="button"
// // // //           data-bs-target="#carouselExampleFade"
// // // //           data-bs-slide="next"
// // // //         >
// // // //           <span className="carousel-control-next-icon" aria-hidden="true"></span>
// // // //           <span className="visually-hidden">Next</span>
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import React, { useState, useEffect } from 'react';
// // // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // // export default function Carousel({ images = [], autoplaySpeed = 5000, height = 500 }) {
// // //   const [activeIndex, setActiveIndex] = useState(0);
// // //   const [isHovering, setIsHovering] = useState(false);
// // //   const [touchStart, setTouchStart] = useState(null);
// // //   const [touchEnd, setTouchEnd] = useState(null);

// // //   // Handle automatic sliding
// // //   useEffect(() => {
// // //     if (images.length <= 1 || isHovering) return;
    
// // //     const interval = setInterval(() => {
// // //       setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
// // //     }, autoplaySpeed);
    
// // //     return () => clearInterval(interval);
// // //   }, [images.length, isHovering, autoplaySpeed]);

// // //   // Navigate to previous slide
// // //   const prevSlide = () => {
// // //     setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
// // //   };

// // //   // Navigate to next slide
// // //   const nextSlide = () => {
// // //     setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
// // //   };

// // //   // Handle touch events for mobile swiping
// // //   const handleTouchStart = (e) => {
// // //     setTouchStart(e.touches[0].clientX);
// // //   };

// // //   const handleTouchMove = (e) => {
// // //     setTouchEnd(e.touches[0].clientX);
// // //   };

// // //   const handleTouchEnd = () => {
// // //     if (!touchStart || !touchEnd) return;
// // //     const distance = touchStart - touchEnd;
// // //     const isLeftSwipe = distance > 50;
// // //     const isRightSwipe = distance < -50;

// // //     if (isLeftSwipe) {
// // //       nextSlide();
// // //     } else if (isRightSwipe) {
// // //       prevSlide();
// // //     }

// // //     setTouchStart(null);
// // //     setTouchEnd(null);
// // //   };

// // //   if (!Array.isArray(images) || images.length === 0) {
// // //     console.error("Carousel Error: Expected a non-empty array but received", images);
// // //     return <div className="p-4 text-center text-gray-500">No images available to display.</div>;
// // //   }

// // //   return (
// // //     <div 
// // //       className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 w-full"
// // //       style={{ height: `${height}px` }}
// // //       onMouseEnter={() => setIsHovering(true)}
// // //       onMouseLeave={() => setIsHovering(false)}
// // //       onTouchStart={handleTouchStart}
// // //       onTouchMove={handleTouchMove}
// // //       onTouchEnd={handleTouchEnd}
// // //     >
// // //       {/* Images container with smooth transition */}
// // //       <div className="h-full relative">
// // //         {images.map((image, index) => (
// // //           <div
// // //             key={index}
// // //             className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
// // //               index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
// // //             }`}
// // //           >
// // //             <div className="relative w-full h-full">
// // //               <img
// // //                 src={image.src}
// // //                 alt={image.alt || `Slide ${index + 1}`}
// // //                 className="w-full h-full object-cover"
// // //               />
              
// // //               {/* Gradient overlay for better caption visibility */}
// // //               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
              
// // //               {/* Caption with animation */}
// // //               {image.caption && (
// // //                 <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-1000 ${
// // //                   index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
// // //                 }`}>
// // //                   <h3 className="text-2xl font-bold mb-2">{image.caption.title}</h3>
// // //                   <p className="text-lg opacity-90">{image.caption.text}</p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Navigation arrows with improved styling */}
// // //       <button 
// // //         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20"
// // //         onClick={prevSlide}
// // //         aria-label="Previous slide"
// // //       >
// // //         <ChevronLeft size={24} />
// // //       </button>
      
// // //       <button 
// // //         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20"
// // //         onClick={nextSlide}
// // //         aria-label="Next slide"
// // //       >
// // //         <ChevronRight size={24} />
// // //       </button>

// // //       {/* Indicator dots */}
// // //       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
// // //         {images.map((_, index) => (
// // //           <button
// // //             key={index}
// // //             className={`w-3 h-3 rounded-full transition-all ${
// // //               index === activeIndex 
// // //                 ? "bg-white scale-125" 
// // //                 : "bg-white bg-opacity-50 hover:bg-opacity-75"
// // //             }`}
// // //             onClick={() => setActiveIndex(index)}
// // //             aria-label={`Go to slide ${index + 1}`}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // export default function Carousel({ 
// //   images = [], 
// //   autoplaySpeed = 5000, 
// //   height = 500,
// //   title = "Image Gallery" 
// // }) {
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isHovering, setIsHovering] = useState(false);
// //   const [touchStart, setTouchStart] = useState(null);
// //   const [touchEnd, setTouchEnd] = useState(null);

// //   // Handle automatic sliding
// //   useEffect(() => {
// //     if (images.length <= 1 || isHovering) return;
    
// //     const interval = setInterval(() => {
// //       setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
// //     }, autoplaySpeed);
    
// //     return () => clearInterval(interval);
// //   }, [images.length, isHovering, autoplaySpeed]);

// //   // Navigate to previous slide
// //   const prevSlide = () => {
// //     setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
// //   };

// //   // Navigate to next slide
// //   const nextSlide = () => {
// //     setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
// //   };

// //   // Handle touch events for mobile swiping
// //   const handleTouchStart = (e) => {
// //     setTouchStart(e.touches[0].clientX);
// //   };

// //   const handleTouchMove = (e) => {
// //     setTouchEnd(e.touches[0].clientX);
// //   };

// //   const handleTouchEnd = () => {
// //     if (!touchStart || !touchEnd) return;
// //     const distance = touchStart - touchEnd;
// //     const isLeftSwipe = distance > 50;
// //     const isRightSwipe = distance < -50;

// //     if (isLeftSwipe) {
// //       nextSlide();
// //     } else if (isRightSwipe) {
// //       prevSlide();
// //     }

// //     setTouchStart(null);
// //     setTouchEnd(null);
// //   };

// //   if (!Array.isArray(images) || images.length === 0) {
// //     console.error("Carousel Error: Expected a non-empty array but received", images);
// //     return <div className="p-4 text-center text-gray-500">No images available to display.</div>;
// //   }

// //   return (
// //     <div className="w-full">
// //       {/* Title above carousel */}
// //       <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      
// //       {/* Main carousel container with enhanced border */}
// //       <div 
// //         className="relative overflow-hidden rounded-lg shadow-xl bg-gray-900 w-full border-4 border-gray-200"
// //         style={{ 
// //           height: `${height}px`,
// //           boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
// //         }}
// //         onMouseEnter={() => setIsHovering(true)}
// //         onMouseLeave={() => setIsHovering(false)}
// //         onTouchStart={handleTouchStart}
// //         onTouchMove={handleTouchMove}
// //         onTouchEnd={handleTouchEnd}
// //       >
// //         {/* Images container with smooth transition */}
// //         <div className="h-full relative">
// //           {images.map((image, index) => (
// //             <div
// //               key={index}
// //               className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
// //                 index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
// //               }`}
// //             >
// //               <div className="relative w-full h-full">
// //                 <img
// //                   src={image.src}
// //                   alt={image.alt || `Slide ${index + 1}`}
// //                   className="w-full h-full object-contain bg-gray-900"
// //                 />
                
// //                 {/* Gradient overlay for better caption visibility */}
// //                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                
// //                 {/* Caption with animation and improved styling */}
// //                 <div 
// //                   className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-1000 ${
// //                     index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
// //                   }`}
// //                 >
// //                   <h3 className="text-2xl font-bold mb-2">
// //                     {image.caption?.title || (image.title || `Image ${index + 1}`)}
// //                   </h3>
// //                   <p className="text-lg opacity-90">
// //                     {image.caption?.text || image.description || ''}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Navigation arrows with improved styling */}
// //         <button 
// //           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20 shadow-lg"
// //           onClick={prevSlide}
// //           aria-label="Previous slide"
// //         >
// //           <ChevronLeft size={24} />
// //         </button>
        
// //         <button 
// //           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20 shadow-lg"
// //           onClick={nextSlide}
// //           aria-label="Next slide"
// //         >
// //           <ChevronRight size={24} />
// //         </button>

// //         {/* Enhanced indicator dots */}
// //         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
// //           {images.map((_, index) => (
// //             <button
// //               key={index}
// //               className={`w-3 h-3 rounded-full transition-all ${
// //                 index === activeIndex 
// //                   ? "bg-white scale-125" 
// //                   : "bg-white bg-opacity-50 hover:bg-opacity-75"
// //               }`}
// //               onClick={() => setActiveIndex(index)}
// //               aria-label={`Go to slide ${index + 1}`}
// //             />
// //           ))}
// //         </div>
        
// //         {/* Current slide info */}
// //         <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full z-20">
// //           {activeIndex + 1} / {images.length}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

// export default function Carousel({ 
//   images = [], 
//   autoplaySpeed = 5000, 
//   height = 500,
//   title = "Images of The Sahara International Journal",
//   showImageInfo = false
// }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const [showInfoPanel, setShowInfoPanel] = useState(showImageInfo);

//   // Handle automatic sliding
//   useEffect(() => {
//     if (images.length <= 1 || isHovering) return;
    
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, autoplaySpeed);
    
//     return () => clearInterval(interval);
//   }, [images.length, isHovering, autoplaySpeed]);

//   // Navigate to previous slide
//   const prevSlide = () => {
//     setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   // Navigate to next slide
//   const nextSlide = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   // Handle touch events for mobile swiping
//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.touches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       nextSlide();
//     } else if (isRightSwipe) {
//       prevSlide();
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   // Toggle info panel
//   const toggleInfoPanel = () => {
//     setShowInfoPanel(!showInfoPanel);
//   };

//   if (!Array.isArray(images) || images.length === 0) {
//     console.error("Carousel Error: Expected a non-empty array but received", images);
//     return <div className="p-4 text-center text-gray-500">No images available to display.</div>;
//   }

//   const currentImage = images[activeIndex];

//   return (
//     <div className="w-full">
//       {/* Title above carousel */}
//       <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      
//       {/* Main carousel container with enhanced border */}
//       <div 
//         className="relative overflow-hidden rounded-lg shadow-xl bg-gray-900 w-full border-4 border-gray-200"
//         style={{ 
//           height: `${height}px`,
//           boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
//         }}
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {/* Images container with smooth transition */}
//         <div className="h-full relative">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
//                 index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//               }`}
//             >
//               <div className="relative w-full h-full">
//                 <img
//                   src={image.src}
//                   alt={image.alt || `Slide ${index + 1}`}
//                   className="w-full h-full object-contain bg-gray-900"
//                 />
                
//                 {/* Gradient overlay for better caption visibility */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                
//                 {/* Caption with animation and improved styling */}
//                 <div 
//                   className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-1000 ${
//                     index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//                   }`}
//                 >
//                   <h3 className="text-2xl font-bold mb-2">
//                     {image.caption?.title || (image.title || `Image ${index + 1}`)}
//                   </h3>
//                   <p className="text-lg opacity-90">
//                     {image.caption?.text || image.description || ''}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Image information panel (side panel) */}
//         {showInfoPanel && (
//           <div className="absolute top-0 right-0 bottom-0 w-64 bg-black bg-opacity-75 text-white p-4 z-30 transform transition-transform duration-300 overflow-y-auto">
//             <h4 className="text-xl font-bold mb-3 border-b border-white pb-2">Image Details</h4>
            
//             <div className="space-y-4">
//               <div>
//                 <h5 className="font-semibold text-gray-300">Title</h5>
//                 <p>{currentImage.caption?.title || currentImage.title || "Untitled"}</p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-gray-300">Description</h5>
//                 <p>{currentImage.caption?.text || currentImage.description || "No description available"}</p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-gray-300">Alt Text</h5>
//                 <p>{currentImage.alt || "No alt text provided"}</p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-gray-300">File</h5>
//                 <p className="text-sm break-all">{currentImage.src}</p>
//               </div>
              
//               <div>
//                 <h5 className="font-semibold text-gray-300">Position</h5>
//                 <p>{activeIndex + 1} of {images.length}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation arrows with improved styling */}
//         <button 
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20 shadow-lg"
//           onClick={prevSlide}
//           aria-label="Previous slide"
//         >
//           <ChevronLeft size={24} />
//         </button>
        
//         <button 
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors rounded-full p-2 text-white z-20 shadow-lg"
//           onClick={nextSlide}
//           aria-label="Next slide"
//         >
//           <ChevronRight size={24} />
//         </button>

//         {/* Enhanced indicator dots */}
//         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 index === activeIndex 
//                   ? "bg-white scale-125" 
//                   : "bg-white bg-opacity-50 hover:bg-opacity-75"
//               }`}
//               onClick={() => setActiveIndex(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
        
//         {/* Current slide info */}
//         <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full z-20">
//           {activeIndex + 1} / {images.length}
//         </div>
        
//         {/* Info toggle button */}
//         <button
//           className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full z-20 transition-colors"
//           onClick={toggleInfoPanel}
//           aria-label={showInfoPanel ? "Hide image information" : "Show image information"}
//         >
//           <Info size={20} />
//         </button>
        
//         {/* Current image title badge at top */}
//         <div className="absolute top-14 left-0 right-0 flex justify-center z-20">
//           <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg max-w-md">
//             <h3 className="text-center text-lg font-semibold">
//               {currentImage.caption?.title || currentImage.title || `Image ${activeIndex + 1}`}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselWithErrorHandling({ 
  images = [], 
  autoplaySpeed = 5000, 
  height = 500,
  title = "Image Gallery"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageStatus, setImageStatus] = useState({});

  useEffect(() => {
    // Log all image sources on component mount
    console.log("Carousel images:", images);
    images.forEach((img, idx) => {
      console.log(`Image ${idx} src:`, img.src);
    });
  }, [images]);

  // Handle automatic sliding
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [images.length, isHovering, autoplaySpeed]);

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Image load handlers
  const handleImageLoad = (index) => {
    console.log(`Image ${index} loaded successfully`);
    setImageStatus(prev => ({
      ...prev,
      [index]: 'loaded'
    }));
  };

  const handleImageError = (index) => {
    console.error(`Image ${index} failed to load`);
    setImageStatus(prev => ({
      ...prev,
      [index]: 'error'
    }));
  };

  // Check if we have valid images
  if (!Array.isArray(images) || images.length === 0) {
    console.log("Carousel Error: No images provided or invalid format");
    return <div className="p-4 text-center text-gray-500">No images available to display.</div>;
  }

  return (
    <div className="w-full">
      {/* Title above carousel */}
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-lg bg-gray-900 w-full border border-gray-200"
        style={{ height: `${height}px` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Images container */}
        <div className="h-full relative">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image with error handling */}
              <img
                src={image.src}
                alt={image.alt || `Slide ${index + 1}`}
                className="w-full h-full object-contain bg-gray-900"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
              
              {/* Error overlay */}
              {imageStatus[index] === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white">
                  <div className="text-center p-4">
                    <p className="text-red-400 font-bold">Image Failed to Load</p>
                    <p className="text-sm mt-2 break-all">{image.src}</p>
                  </div>
                </div>
              )}
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <h3 className="text-xl font-bold">
                  {image.title || `Image ${index + 1}`}
                </h3>
                {image.description && (
                  <p className="text-sm">{image.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-20"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 z-20"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image debugging info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs p-2 rounded z-20">
          Images: {images.length} | Current: {activeIndex + 1} | 
          Status: {imageStatus[activeIndex] || 'loading'}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex 
                  ? "bg-white" 
                  : "bg-white bg-opacity-50"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}