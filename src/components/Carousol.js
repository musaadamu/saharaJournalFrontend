import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImprovedCarousel.css';

export default function ImprovedCarousel({
  images = [],
  autoplaySpeed = 5000,
  height = 500,
  title = "Sahara International Journals of Teacher Education"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageStatus, setImageStatus] = useState({});

  // Process images to handle paths correctly for both local and Vercel environments
  const processImagePath = (path) => {
    if (!path) return '';

    // Remove leading slash if present
    let cleanPath = path.startsWith('/') ? path.substring(1) : path;

    // Handle case where path might already include 'images/'
    if (!cleanPath.startsWith('images/')) {
      cleanPath = `images/${cleanPath}`;
    }

    // Handle missing file extension
    const hasExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(cleanPath);
    const pathWithExtension = hasExtension ? cleanPath : `${cleanPath}.jpg`;

    // For Vercel, we need to use the public URL pattern
    // This works in both development and production
    return `/${pathWithExtension}`;
  };

  // Process all image paths and structure
  const processedImages = images.map((image) => {
    // Handle different image object structures
    const processedImage = {
      originalSrc: image.src, // Keep original for debugging
      src: processImagePath(image.src),
      alt: image.alt || image.title || 'Carousel image',
      title: image.title || (image.caption && image.caption.title) || '',
      description: image.description || (image.caption && image.caption.text) || ''
    };

    console.log('Processed image path:', processedImage.src);
    return processedImage;
  });

  // Preload images to improve loading performance
  useEffect(() => {
    // Log all image sources on component mount for debugging
    console.log("Carousel images:", processedImages);

    // Preload all images
    processedImages.forEach((img, idx) => {
      console.log(`Preloading image ${idx} src:`, img.src);
      const preloadImage = new Image();
      preloadImage.src = img.src;
      preloadImage.onload = () => console.log(`Image ${idx} preloaded successfully`);
      preloadImage.onerror = (e) => console.error(`Failed to preload image ${idx}:`, e);
    });
  }, [processedImages]);

  // Handle automatic sliding
  useEffect(() => {
    if (processedImages.length <= 1 || isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % processedImages.length);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [processedImages.length, isHovering, autoplaySpeed]);

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? processedImages.length - 1 : prevIndex - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % processedImages.length);
  };

  // Image load handlers
  const handleImageLoad = (index) => {
    console.log(`Image ${index} loaded successfully`);
    setImageStatus(prev => ({
      ...prev,
      [index]: 'loaded'
    }));
  };

  const handleImageError = (index, e) => {
    console.error(`Image ${index} failed to load:`, e.target.src);
    setImageStatus(prev => ({
      ...prev,
      [index]: 'error'
    }));

    // Log additional information for debugging
    console.error('Image error details:', {
      src: e.target.src,
      originalSrc: processedImages[index].originalSrc,
      navigator: navigator?.userAgent,
      location: window.location.href
    });
  };

  // Check if we have valid images
  if (!Array.isArray(processedImages) || processedImages.length === 0) {
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
          {processedImages.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image with error handling */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain bg-gray-900"
                onLoad={() => handleImageLoad(index)}
                onError={(e) => handleImageError(index, e)}
              />

              {/* Error overlay with more detailed error information */}
              {imageStatus[index] === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white">
                  <div className="text-center p-4">
                    <p className="text-red-400 font-bold">Image Failed to Load</p>
                    <p className="text-sm mt-2 break-all">Path: {image.src}</p>
                    <p className="text-sm mt-1 break-all">Original: {image.originalSrc}</p>
                    <p className="text-sm mt-1">Try refreshing the page</p>
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

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {processedImages.map((_, index) => (
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