"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/globals.css';

const Timeline = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef([]);

  const TimeLineData = [
    { year: 2019, text: 'Started my journey in Computer Science', icon: '🎓', 
      details: 'Began my undergraduate studies and discovered my passion for building digital experiences.' },
    { year: 2022, text: 'Started writing articles and contributing to open source projects', icon: '💻', 
      details: <>Began publishing tech blogs on hashnode <span className="yearButton">Hashnode</span>, and contribute to a multitue of open source projects like jenkins and eddieHub</>},
    { year: 2023, text: 'Graduated with a degree in Computer Science', icon: '🎓', 
      details: <>Started working in <span className="yearButton">HCLTech</span>as a Software Engineer</> },
    { year: 2024, text: 'Started working in python', icon: '🐍', 
      details: 'Got tasked with writing scripts in python that help automate the testing process, hence enhancing productivity by over 10 folds.' },
    { year: 2025, text: 'Started working on Embedded Systems', icon: '✈️', 
      details: <>Worked on the control panel module of the <span className="yearButton">Airbus A350-1000F</span>, which is responsible for loading and unloading of cargo.</>}
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateRotation = (element, index) => {
    if (isMobile || !element || activeCard !== index) return { x: 0, y: 0 };
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRotation = 8;
    const rotateY = ((mousePosition.x - centerX) / (rect.width / 2)) * maxRotation;
    const rotateX = ((centerY - mousePosition.y) / (rect.height / 2)) * maxRotation;
    
    return { x: rotateX, y: rotateY };
  };

  // Adjust the left position to inset the first and last icons
  const getAdjustedLeftPosition = (index, totalItems) => {
    const paddingPercentage = isMobile ? 10 : 0; // 10% padding on each side for mobile
    const range = 100 - 2 * paddingPercentage; // Adjusted range after padding
    const position = (index / (totalItems - 1)) * range + paddingPercentage;
    return `${position}%`;
  };

  return (
    <section className="py-20 relative overflow-hidden" id='about'>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
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
          {/* Year slider */}
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
                  onClick={() => setActiveCard(index)}
                  className="absolute top-0 transform -translate-y-1/2 -translate-x-1/2 focus:outline-none group timeline-button"
                  style={{ left: getAdjustedLeftPosition(index, TimeLineData.length) }}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    activeCard === index 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 scale-110' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}>
                    <span className="text-base md:text-xl">{item.icon}</span>
                  </div>
                  <div className={`absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap font-bold transition-opacity duration-300 year-label ${
                    activeCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                  }`}>
                    <span className="text-xs md:text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{item.year}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 3D Cards */}
          <div className="relative w-full">
            <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-6">
              {TimeLineData.map((item, index) => (
                <motion.div
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: activeCard === index ? 1 : 0.3,
                    y: 0,
                    scale: activeCard === index ? 1 : 0.85,
                    rotateX: calculateRotation(cardsRef.current[index], index).x,
                    rotateY: calculateRotation(cardsRef.current[index], index).y,
                    z: activeCard === index ? 100 : 0
                  }}
                  transition={{ 
                    duration: 0.5,
                    rotateX: { duration: 0.1 },
                    rotateY: { duration: 0.1 }
                  }}
                  className="perspective-1000 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: activeCard === index ? 1.05 : 0.9 }}
                  onClick={() => setActiveCard(index)}
                >
                  <div 
                    className={`w-full p-4 md:p-8 rounded-2xl backdrop-blur-sm border overflow-hidden ${
                      activeCard === index 
                        ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/20 bg-gradient-to-br from-white/15 to-white/5' 
                        : 'border-white/10 bg-white/5'
                    } transition-all duration-300 cursor-pointer h-full`}
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {activeCard === index && (
                      <>
                        <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-cyan-500/30 blur-xl" />
                        <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-blue-500/30 blur-xl" />
                      </>
                    )}
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4 md:mb-6">
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.text}</h3>
                          <div className="flex items-center gap-2">
                            <div className="yearButton">
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
                      
                      {activeCard === index && (
                        <div className="absolute top-0 right-0 -mt-2 -mr-2">
                          <svg width="40" height="40" md="60" mdHeight="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="2" fill="#06B6D4" fillOpacity="0.5" />
                            <circle cx="20" cy="5" r="1.5" fill="#0EA5E9" fillOpacity="0.4" />
                            <circle cx="35" cy="15" r="1" fill="#06B6D4" fillOpacity="0.3" />
                            <circle cx="50" cy="30" r="1.5" fill="#0EA5E9" fillOpacity="0.4" />
                            <circle cx="40" cy="40" r="2" fill="#06B6D4" fillOpacity="0.3" />
                            <circle cx="15" cy="35" r="1" fill="#0EA5E9" fillOpacity="0.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-12">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex items-center gap-2 text-sm md:text-base"
              onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
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
              onClick={() => setActiveCard(Math.min(TimeLineData.length - 1, activeCard + 1))}
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