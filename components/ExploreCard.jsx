'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExploreCard = ({ 
  id, 
  imgUrl, 
  liveLink, 
  repoLink, 
  title, 
  description, 
  technologies = [], 
  index, 
  active, 
  handleClick 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (cardRef.current && isHovering) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      });
    }
  }, [isHovering]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovering) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const calculateTilt = () => {
    if (!isHovering || !dimensions.width) return { x: 0, y: 0 };
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    const tiltX = ((mousePosition.y - centerY) / centerY) * 5;
    const tiltY = ((centerX - mousePosition.x) / centerX) * 5;
    
    return { x: tiltX, y: tiltY };
  };

  const isActive = active === id;
  const tilt = calculateTilt();
  
  const cardVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: { duration: 0.7, delay: index * 0.15, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: isHovering && !isActive ? 
          `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 
          'rotateX(0deg) rotateY(0deg)'
      }}
      className={`relative rounded-3xl overflow-hidden shadow-2xl
        ${isActive ? 'h-[500px] md:h-[700px]' : 'h-[250px] md:h-[450px]'}
        ${isActive ? 'flex-[10]' : 'flex-[2]'}
        min-w-[250px] md:min-w-[170px] 
        transition-all duration-700 ease-out-flex
        ${isTouching ? 'scale-[0.98]' : 'scale-100'}
        border border-white/10
        backdrop-filter backdrop-blur-sm
        before:absolute before:inset-0 before:opacity-0 before:rounded-3xl
        before:bg-gradient-to-r before:from-purple-500/40 before:to-blue-500/20
        ${isHovering && !isActive ? 'before:opacity-100' : ''}
        before:transition-opacity before:duration-300
        `}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => {
        setIsTouching(false);
        handleClick(id);
      }}
      onClick={() => handleClick(id)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-cyan-400/50 to-blue-600/50 rounded-3xl opacity-0 transition-opacity duration-300 z-0" 
           style={{ opacity: isHovering ? 0.4 : 0 }} />
           
      <motion.div 
        className="absolute inset-0 overflow-hidden rounded-3xl z-10"
        animate={{ scale: isHovering && !isActive ? 1.05 : 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img 
          src={imgUrl} 
          alt={title} 
          className={`absolute w-full h-full object-cover transition-all duration-700
            ${!isActive ? 'brightness-[0.7] blur-[1px]' : 'brightness-110 blur-0 scale-105'}
            `}
          animate={{ 
            scale: isHovering && !isActive ? 1.1 : isActive ? 1.05 : 1,
            filter: isActive ? 'brightness(1.1) contrast(1.05)' : isHovering ? 'brightness(0.8) contrast(1.1)' : 'brightness(0.7) contrast(1)'
          }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
      
      {!isActive && (
        <motion.div 
          animate={{
            background: isHovering 
              ? 'linear-gradient(to right, rgba(76, 29, 149, 0.6), rgba(16, 185, 129, 0.3))'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))'
          }}
          className="absolute inset-0 z-20 backdrop-blur-[2px] transition-all duration-500"
        />
      )}

      <AnimatePresence>
        {!isActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-6 z-30"
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{
                rotateZ: isHovering ? 0 : -90,
                y: isHovering ? -10 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.h3 
                className="font-semibold text-[22px] md:text-[26px] 
                         text-white z-10 drop-shadow-md
                         whitespace-nowrap flex items-center gap-4"
                animate={{
                  scale: isHovering ? 1.1 : 1,
                  letterSpacing: isHovering ? "0.15em" : "0.05em",
                  textShadow: isHovering ? "0 0 15px rgba(255,255,255,0.5)" : "0 0 0px rgba(255,255,255,0)"
                }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0,
                    rotateZ: isHovering ? 360 : 0
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                />
                
                <motion.span className="flex overflow-hidden">
                  {title.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isHovering ? 0 : 20, 
                        opacity: isHovering ? 1 : 0,
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: isHovering ? 0.1 + (i * 0.03) : 0,
                        ease: "easeOut"
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>
                
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0,
                    rotateZ: isHovering ? -360 : 0
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                />
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isHovering ? 1 : 0,
                  y: isHovering ? 0 : 20
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute top-4 right-4 px-2 py-1 rounded-full 
                           bg-gradient-to-r from-emerald-500 to-teal-600 
                           text-white text-xs font-semibold"
              >
                Project
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ 
                  width: isHovering ? "120%" : "0%",
                  x: isHovering ? "-50%" : "0%"
                }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-0 p-8 w-full z-30
                     bg-gradient-to-t from-black/90 via-black/70 to-transparent
                     flex flex-col h-3/5
                     rounded-b-3xl"
            variants={textVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-8 right-8 px-3 py-1 rounded-full 
                         bg-gradient-to-r from-emerald-500 to-teal-600 
                         text-white text-xs font-semibold"
            >
              Project
            </motion.div>

            <motion.div className="space-y-4 mt-auto">
              <motion.p 
                variants={textVariants}
                className="font-medium text-[14px] md:text-[16px] 
                        text-purple-300 uppercase tracking-wider"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "50px" }}
                  className="inline-block h-[1px] bg-purple-400 mr-3 align-middle"
                />
                Featured Project
              </motion.p>
              
              <motion.h2 
                variants={textVariants}
                className="mt-2 font-bold text-[28px] 
                        md:text-[36px] text-white leading-tight
                        bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
              >
                {title}
              </motion.h2>
              
              <motion.p
                variants={textVariants}
                className="mt-3 text-[16px] text-gray-300 max-w-md"
              >
                {description || "Explore this amazing project and discover new possibilities. Click to learn more!"}
              </motion.p>

              <motion.div
                variants={textVariants}
                className="flex flex-wrap gap-2 mt-4"
              >
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs 
                              bg-white/10 text-gray-200 backdrop-blur-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div
                variants={textVariants}
                className="flex gap-4 mt-6"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center justify-center gap-2 px-5 py-3 
                          bg-gradient-to-br from-purple-600 to-blue-500 
                          rounded-full font-medium text-white
                          cursor-pointer transition-all shadow-lg shadow-purple-700/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(liveLink, '_blank');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Live Demo
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center justify-center gap-2 px-5 py-3 
                          bg-gray-800 border border-gray-700
                          rounded-full font-medium text-white
                          cursor-pointer transition-all shadow-lg shadow-black/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(repoLink, '_blank');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[3px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mt-6"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExploreCard;