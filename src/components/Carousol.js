import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ImprovedCarousel.css';
import './images'

export default function ImprovedCarousel({
  images = [],
  autoplaySpeed = 5000,
  title = "Sahara International Journal of Teacher Education"
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageStatus, setImageStatus] = useState({});

  // Process images to ensure they have all required properties
  const processedImages = images.map((image, index) => ({
    src: image.src || '',
    alt: image.alt || `Slide ${index + 1}`,
    title: image.title || '',
    description: image.description || ''
  }));

  // Handle image loading
  const handleImageLoad = (index) => {
    setImageStatus(prev => ({
      ...prev,
      [index]: 'loaded'
    }));
  };

  // Handle image error
  const handleImageError = (index) => {
    setImageStatus(prev => ({
      ...prev,
      [index]: 'error'
    }));
  };

  // Navigation functions
  const nextSlide = () => {
    setActiveIndex((current) => 
      current === processedImages.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) => 
      current === 0 ? processedImages.length - 1 : current - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    if (autoplaySpeed <= 0) return;

    const interval = setInterval(nextSlide, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplaySpeed]);

  // If no images provided, show placeholder
  if (processedImages.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-image-container">
          <div className="carousel-main-title">
            <h1>{title}</h1>
          </div>
          <div className="flex items-center justify-center h-full">
            <p className="text-white">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="carousel-image-container">
        <div className="carousel-main-title">
          <h1>{title}</h1>
        </div>
        
        {processedImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            style={{
              transform: index === activeIndex ? 'translateX(0)' : 'translateX(100%)'
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out'
              }}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />

            {imageStatus[index] === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white">
                <div className="text-center p-4">
                  <p className="text-xl font-bold">{image.title}</p>
                  <p className="text-base mt-2">{image.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}

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
      </div>

      <div className="carousel-content">
        <div className="carousel-caption">
          <h3 className="carousel-caption-title text-base md:text-lg lg:text-xl font-medium mb-1">
            {processedImages[activeIndex].title}
          </h3>
          <p className="carousel-caption-text text-sm md:text-base text-gray-200">
            {processedImages[activeIndex].description}
          </p>
        </div>

        <div className="carousel-dots">
          {processedImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}