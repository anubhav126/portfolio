"use client";
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/globals.css';

// Memoized timeline item component for better performance
const TimelineItem = memo(({ item, index, isActive, onClick, rotation, isMobile }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50 }}
    animate={{ 
      opacity: isActive ? 1 : 0.3,
      y: 0,
      scale: isActive ? 1 : 0.85,
      rotateX: rotation.x,
      rotateY: rotation.y,
      z: isActive ? 100 : 0
    }}
    transition={{ 
      duration: 0.5,
      rotateX: { duration: 0.1 },
      rotateY: { duration: 0.1 }
    }}
    className="perspective-1000 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]"
    style={{ transformStyle: 'preserve-3d' }}
    whileHover={{ scale: isActive ? 1.05 : 0.9 }}
    onClick={onClick}
  >
    <div 
      className={`w-full p-4 md:p-8 rounded-2xl backdrop-blur-sm border overflow-hidden ${
        isActive 
          ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/20 bg-gradient-to-br from-white/15 to-white/5' 
          : 'border-white/10 bg-white/5'
      } transition-all duration-300 cursor-pointer h-full`}
      style={{ transform: 'translateZ(20px)' }}
    >
      {isActive && (
        <>
          <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-cyan-500/30 blur-xl" />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-blue-500/30 blur-xl" />
        </>
      )}
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.text}</h3>
            <div className="inline-flex items-center gap-2">
              <div className="yearButton px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm">
                {item.year}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 text-xl md:text-2xl">
            {item.icon}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {item.details}
        </p>
        
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 right-0 -mt-2 -mr-2"
          >
            <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="2" fill="#06B6D4" fillOpacity="0.5" />
              <circle cx="20" cy="5" r="1.5" fill="#0EA5E9" fillOpacity="0.4" />
              <circle cx="35" cy="15" r="1" fill="#06B6D4" fillOpacity="0.3" />
              <circle cx="50" cy="30" r="1.5" fill="#0EA5E9" fillOpacity="0.4" />
              <circle cx="40" cy="40" r="2" fill="#06B6D4" fillOpacity="0.3" />
              <circle cx="15" cy="35" r="1" fill="#0EA5E9" fillOpacity="0.5" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
));

// Fixed typo in the timeline data
const TimeLineData = [
  { 
    year: 2019, 
    text: 'Started my journey in Computer Science', 
    icon: '🎓', 
    details: 'Began my undergraduate studies and discovered my passion for building digital experiences.' 
  },
  { 
    year: 2022, 
    text: 'Started writing articles and contributing to open source projects', 
    icon: '💻', 
    details: <>Began publishing tech blogs on <span className="yearButton inline-block px-2 py-0.5 mx-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm">Hashnode</span>, and contributing to open source projects like Jenkins and eddieHub</>
  },
  { 
    year: 2023, 
    text: 'Graduated with a degree in Computer Science and Engineering', 
    icon: '🎓', 
    details: <>Started working at <span className="yearButton inline-block px-2 py-0.5 mx-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm">HCLTech</span> as a Software Engineer</> 
  },
  { 
    year: 2024, 
    text: 'Started working in Python', 
    icon: '🐍', 
    details: 'Got tasked with writing scripts in Python that help automate the testing process, enhancing productivity over 10-fold.' 
  },
  { 
    year: 2025, 
    text: 'Started working on Embedded Systems', 
    icon: '✈️', 
    details: <>Worked on the control panel module of the <span className="yearButton inline-block px-2 py-0.5 mx-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 text-sm">Airbus A350-1000F</span>, responsible for cargo loading and unloading.</>
  }
];

const Timeline = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const cardsRef = useRef([]);
  const autoplayTimerRef = useRef(null);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, [isMobile]);

  // Optimize resize handler with debounce
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimer);
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [handleMouseMove]);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveCard(prev => {
          const next = (prev + 1) % TimeLineData.length;
          return next;
        });
      }, 3000);
    } else if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  const calculateRotation = useCallback((element, index) => {
    if (isMobile || !element || activeCard !== index) return { x: 0, y: 0 };
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRotation = 8;
    const rotateY = ((mousePosition.x - centerX) / (rect.width / 2)) * maxRotation;
    const rotateX = ((centerY - mousePosition.y) / (rect.height / 2)) * maxRotation;
    
    return { x: rotateX, y: rotateY };
  }, [activeCard, isMobile, mousePosition]);

  // Adjust the left position to inset the first and last icons
  const getAdjustedLeftPosition = useCallback((index, totalItems) => {
    const paddingPercentage = isMobile ? 10 : 0; // 10% padding on each side for mobile
    const range = 100 - 2 * paddingPercentage; // Adjusted range after padding
    const position = (index / (totalItems - 1)) * range + paddingPercentage;
    return `${position}%`;
  }, [isMobile]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return (
    <section className="py-20 relative overflow-hidden" id='about'>
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
            className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" 
          />
        </div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">My Journey</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Software engineer based in Bengaluru, India with 1.5 years of industry experience.
            Passionate about frontend development, building websites and mobile apps.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {/* Year slider with interactive controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 w-full timeline-container"
          >
            <div className="relative h-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(activeCard / (TimeLineData.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
              {TimeLineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCard(index);
                    if (isAutoPlaying) setIsAutoPlaying(false);
                  }}
                  className="absolute top-0 transform -translate-y-1/2 -translate-x-1/2 focus:outline-none group timeline-button"
                  style={{ left: getAdjustedLeftPosition(index, TimeLineData.length) }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeCard === index 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 scale-110 ring-2 ring-white/20' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-base md:text-xl">{item.icon}</span>
                  </motion.div>
                  <div className={`absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap font-bold transition-opacity duration-300 year-label ${
                    activeCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                  }`}>
                    <span className="text-xs md:text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{item.year}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Control buttons */}
          <div className="flex justify-center gap-3 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAutoPlay}
              className={`px-3 py-1.5 rounded-full ${isAutoPlaying ? 'bg-blue-500/40 text-blue-100' : 'bg-gray-800/60 text-gray-300'} border border-cyan-500/30 text-sm flex items-center gap-1.5 transition-colors`}
            >
              {isAutoPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Auto Play
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleShowAll}
              className={`px-3 py-1.5 rounded-full ${showAll ? 'bg-blue-500/40 text-blue-100' : 'bg-gray-800/60 text-gray-300'} border border-cyan-500/30 text-sm flex items-center gap-1.5 transition-colors`}
            >
              {showAll ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </svg>
                  Focus View
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                  Show All
                </>
              )}
            </motion.button>
          </div>

          {/* 3D Cards */}
          <div className="relative w-full">
            <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-6">
              {TimeLineData.map((item, index) => {
                // Skip rendering non-active cards when not in showAll mode
                if (!showAll && activeCard !== index) return null;
                
                return (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    isActive={activeCard === index}
                    onClick={() => {
                      setActiveCard(index);
                      if (isAutoPlaying) setIsAutoPlaying(false);
                    }}
                    rotation={calculateRotation(cardsRef.current[index], index)}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex items-center gap-2 text-sm md:text-base"
              onClick={() => {
                setActiveCard(Math.max(0, activeCard - 1));
                if (isAutoPlaying) setIsAutoPlaying(false);
              }}
              disabled={activeCard === 0}
              style={{ opacity: activeCard === 0 ? 0.5 : 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex items-center gap-2 text-sm md:text-base"
              onClick={() => {
                setActiveCard(Math.min(TimeLineData.length - 1, activeCard + 1));
                if (isAutoPlaying) setIsAutoPlaying(false);
              }}
              disabled={activeCard === TimeLineData.length - 1}
              style={{ opacity: activeCard === TimeLineData.length - 1 ? 0.5 : 1 }}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .timeline-container {
          max-width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .year-label {
          bottom: -2rem; /* Default for desktop */
        }
        @media (max-width: 767px) {
          .timeline-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .year-label {
            bottom: -1.5rem; /* Closer to the icon on mobile */
          }
          .year-label span {
            font-size: 0.75rem; /* Smaller year text */
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;