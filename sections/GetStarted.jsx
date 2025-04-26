'use client';

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { FaCode, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import { useRef } from 'react';
import styles from '../styles';
import { startingFeatures } from '../constants';
import { StartSteps, TitleText, TypingText } from '../components';
import Image from 'next/image';
import monitorImage from '../public/monitorImage.jpg';
import mobileAppHome from '../public/mobileAppHome.jpg';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import '../constants/index';

// Optimized animation variants with GPU acceleration hints
const scrollVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const imageParallax = {
  hidden: { y: 80, rotate: -5, opacity: 0 },
  show: { 
    y: 0, 
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 20,
      mass: 0.8,
      delay: 0.1
    }
  }
};

const gradientCycle = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'mirror'
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

const glowAnimation = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(147, 51, 234, 0.3)',
      '0 0 20px rgba(147, 51, 234, 0.5)',
      '0 0 10px rgba(147, 51, 234, 0.3)'
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

const GetStarted = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isImageInView = useInView(imageRef, { once: false, amount: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.paddings} relative z-10 overflow-hidden`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-12`}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Enhanced 3D Image Section */}
        <motion.div
          ref={imageRef}
          variants={imageParallax}
          className={`flex-1 ${styles.flexCenter}`}
          style={{ 
            scale, 
            rotate, 
            perspective: 1200, 
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity'
          }}
        >
          <motion.div 
            className="relative w-[90%] h-[90%] flex items-center justify-center"
            variants={floatingAnimation}
            animate="animate"
          >
            <motion.div
              className="relative w-[85%] aspect-square rounded-3xl overflow-hidden 
                        backdrop-blur-lg bg-white/15 border border-white/25"
              whileHover={{ 
                scale: 1.04,
                rotateY: 5,
                rotateX: 2,
                boxShadow: "0 20px 50px rgba(147, 51, 234, 0.5)",
                transition: { 
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }}
              whileTap={{ scale: 0.98 }}
              variants={glowAnimation}
              animate="animate"
              style={{ 
                willChange: 'transform, box-shadow',
                transformStyle: 'preserve-3d' 
              }}
            >
              <Image
                src={monitorImage}
                alt="Get Started Illustration"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ 
                  transform: isImageInView ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  willChange: 'transform'
                }}
              />
              
              {/* Dynamic overlay effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-500/20"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{ 
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut'
                  },
                  backgroundPosition: {
                    duration: 8, 
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
                style={{ 
                  backgroundSize: '200% 200%',
                  willChange: 'opacity, background-position' 
                }}
              />
              
              {/* Corner shine effect */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-white/30 blur-xl rounded-full"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Text Section with staggered animations */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
          style={{ 
            opacity, 
            y: translateY,
            willChange: 'transform, opacity' 
          }}
        >
          <TypingText 
            title="| How Metaverse Works" 
            textStyles="text-[16px] tracking-wider text-gray-300"
          />
          
          <div className="mt-4 overflow-hidden">
            <motion.h2
              variants={gradientCycle}
              animate="animate"
              className="font-extrabold text-[36px] md:text-[48px] lg:text-[68px] text-white leading-tight"
              style={{
                background: 'linear-gradient(90deg, #4b0082, #ff69b4, #87ceeb, #4b0082)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                textShadow: '0 2px 10px rgba(147, 51, 234, 0.3)',
                willChange: 'background-position'
              }}
            >
              What am I working on currently?
            </motion.h2>
          </div>
          
          <motion.div 
            className="mt-[40px] flex flex-col max-w-[400px] gap-[28px]"
            variants={scrollVariants}
          >
            <AnimatePresence>
              {isInView && startingFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ 
                    delay: index * 0.15,
                    type: 'spring',
                    stiffness: 90,
                    damping: 16,
                    restDelta: 0.001
                  }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <StartSteps
                    number={`${index < 10 ? '0' : ''}${index + 1}`}
                    text={feature}
                    icon={
                      index === 0 ? 
                        <motion.div 
                          animate={{ 
                            rotate: [0, 10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                            delay: 0.5
                          }}
                        >
                          <FaCode className="text-purple-400" />
                        </motion.div> :
                      index === 1 ? 
                        <motion.div 
                          animate={{ 
                            y: [0, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                            delay: 1
                          }}
                        >
                          <FaMobileAlt className="text-pink-400" />
                        </motion.div> :
                        <motion.div 
                          animate={{ 
                            x: [0, 5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                            delay: 1.5
                          }}
                        >
                          <FaLaptopCode className="text-sky-400" />
                        </motion.div>
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;