"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Updated with your personal information
  const TimeLineData = [
    { year: 2019, text: 'Started my journey in Computer Science', icon: '🎓' },
    { year: 2020, text: 'Built my first web application projects', icon: '💻' },
    { year: 2021, text: 'Explored mobile app development', icon: '📱' },
    { year: 2022, text: 'Honed my frontend development skills', icon: '⚛️' },
    { year: 2023, text: 'Graduated in Computer Science & joined the industry', icon: '🚀' }
  ];

  const scroll = (node, left) => {
    if (node) {
      node.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round((carouselRef.current.scrollLeft / (carouselRef.current.scrollWidth * 0.7)) * TimeLineData.length);
      setActiveItem(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      scroll(carouselRef.current, 0);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-16 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            About Me
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Software engineer based in Bengaluru, India with 1.5 years of industry experience. 
            Passionate about frontend development, building websites and mobile apps.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Items */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
          >
            {TimeLineData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex-none w-[260px] md:w-[300px] snap-center ${
                  activeItem === index ? 'scale-100' : 'scale-[0.92] opacity-60'
                } transition-all duration-300`}
              >
                <div 
                  className={`relative p-6 rounded-2xl backdrop-blur-sm border 
                    ${activeItem === index 
                      ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/10 bg-gradient-to-br from-white/10 to-white/5' 
                      : 'border-white/10 bg-white/5'} 
                    hover:bg-white/10 transition-all duration-300 cursor-pointer h-full group`}
                  onClick={() => setActiveItem(index)}
                >
                  {/* Year with icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {item.year}
                    </span>
                    <span className="text-2xl" role="img" aria-label="icon">
                      {item.icon}
                    </span>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-cyan-500/40 to-transparent mb-4" />

                  {/* Content */}
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {item.text}
                  </p>

                  {/* Dot Indicator - Removed */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Arrows - Hide on very small screens */}
          {!isMobile && (
            <>
              <button 
                onClick={() => {
                  const newIndex = Math.max(0, activeItem - 1);
                  setActiveItem(newIndex);
                  if (carouselRef.current) {
                    const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (newIndex / TimeLineData.length));
                    scroll(carouselRef.current, scrollLeft);
                  }
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button 
                onClick={() => {
                  const newIndex = Math.min(TimeLineData.length - 1, activeItem + 1);
                  setActiveItem(newIndex);
                  if (carouselRef.current) {
                    const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (newIndex / TimeLineData.length));
                    scroll(carouselRef.current, scrollLeft);
                  }
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Timeline Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TimeLineData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveItem(index);
                if (carouselRef.current) {
                  const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (index / TimeLineData.length));
                  scroll(carouselRef.current, scrollLeft);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 
                ${activeItem === index 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-400 w-6' 
                  : 'bg-white/20 hover:bg-white/40 w-2'}`}
              aria-label={`Go to ${TimeLineData[index].year}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
  .hide-scrollbar {
    -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
    scrollbar-width: none;      /* Hide scrollbar for Firefox */
    overflow-x: auto;           /* Ensure scrolling still works */
    white-space: nowrap;        /* Prevent wrapping of elements */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Hide scrollbar for Chrome, Safari, and Edge */
  }
`}</style>

    </section>
  );
};

export default Timeline;