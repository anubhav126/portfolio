'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import styles from '../styles';
import { startingFeatures } from '../constants';
import { StartSteps, TitleText, TypingText } from '../components';
import Image from 'next/image';
import monitorImage from '../public/monitorImage.jpg';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';

const scrollVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1.2
    }
  }
};

const imageParallax = {
  hidden: { y: 100, rotate: -5 },
  show: { 
    y: 0, 
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20
    }
  }
};

// Improved gradient animation for better text readability
const gradientCycle = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'], // More stable position
    transition: {
      duration: 8, // Slower for better readability
      repeat: Infinity,
      ease: 'easeInOut' // Smoother transitions
    }
  }
};

const GetStarted = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={imageParallax}
          className={`flex-1 ${styles.flexCenter}`}
          style={{ 
            scale,
            rotate,
            perspective: 1000
          }}
        >
          <div className="relative w-[90%] h-[90%] flex items-center justify-center">
            <motion.div
              className="relative w-[80%] aspect-square rounded-2xl overflow-hidden 
                        backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)"
              }}
            >
              <Image
                src={monitorImage}
                alt="Get Started Illustration"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
          style={{ opacity }}
        >
          <TypingText title="| How Metaverse Works" />
          
          {/* Fixed TitleText implementation */}
          <div className="mt-2">
            <motion.h2
              variants={gradientCycle}
              animate="animate"
              className="font-bold text-[32px] md:text-[44px] lg:text-[64px] text-white"
              style={{
                background: 'linear-gradient(90deg, #4b0082, #ff69b4, #87ceeb)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block'
              }}
            >
              What am I working on currently?
            </motion.h2>
          </div>
          
          <motion.div 
            className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]"
            variants={scrollVariants}
          >
            {startingFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
              >
                <StartSteps
                  number={`${index < 10 ? '0' : ''} ${index + 1}`}
                  text={feature}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;