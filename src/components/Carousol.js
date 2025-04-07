import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselWithErrorHandling({ 
  images = [], 
  autoplaySpeed = 5000, 
  height = 500,
  title = "Sahara International Journals of "
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageStatus, setImageStatus] = useState({});

  // Modified image path handling
  const updatedImages = images.map((image) => ({
    ...image,
    src: image.src.startsWith('/') 
      ? image.src.substring(1) // Remove leading slash if present
      : image.src
  }));

  useEffect(() => {
    // Log all image sources on component mount
    console.log("Carousel images:", updatedImages);
    updatedImages.forEach((img, idx) => {
      console.log(`Image ${idx} src:`, img.src);
    });
  }, [updatedImages]);

  // Handle automatic sliding
  useEffect(() => {
    if (updatedImages.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % updatedImages.length);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [updatedImages.length, isHovering, autoplaySpeed]);

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? updatedImages.length - 1 : prevIndex - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % updatedImages.length);
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
  if (!Array.isArray(updatedImages) || updatedImages.length === 0) {
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
          {updatedImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image with error handling */}
              <img
                // Updated image src handling
                src={`${window.location.origin}/${image.src}`}
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
          Images: {updatedImages.length} | Current: {activeIndex + 1} | 
          Status: {imageStatus[activeIndex] || 'loading'}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {updatedImages.map((_, index) => (
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