'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';
import styles from '../styles';
import { startingFeatures } from '../constants';
import { StartSteps, TitleText, TypingText } from '../components';
import Image from 'next/image';
import monitorImage from '../public/monitorImage.jpg';
import mobileAppHome from '../public/mobileAppHome.jpg';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';
import '../constants/index';

// Enhanced animation variants
const scrollVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 1.4,
      ease: 'easeOut'
    }
  }
};

const imageParallax = {
  hidden: { y: 120, rotate: -8, opacity: 0 },
  show: { 
    y: 0, 
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 15,
      mass: 0.8
    }
  }
};

const gradientCycle = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const GetStarted = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [-8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-12`}
      >
        {/* Enhanced Image Section */}
        <motion.div
          variants={imageParallax}
          className={`flex-1 ${styles.flexCenter}`}
          style={{ scale, rotate, perspective: 1200 }}
        >
          <div className="relative w-[90%] h-[90%] flex items-center justify-center">
            <motion.div
              className="relative w-[85%] aspect-square rounded-3xl overflow-hidden 
                        backdrop-blur-lg bg-white/15 border border-white/25 shadow-2xl"
              whileHover={{ 
                scale: 1.08,
                rotate: 3,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={monitorImage}
                alt="Get Started Illustration"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle overlay effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Text Section */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.3, 1.2)}
          className="flex-[0.75] flex justify-center flex-col"
          style={{ opacity }}
        >
          <TypingText 
            title="| How Metaverse Works" 
            textStyles="text-[16px] tracking-wider text-gray-300"
          />
          
          <div className="mt-4">
            <motion.h2
              variants={gradientCycle}
              animate="animate"
              className="font-extrabold text-[36px] md:text-[48px] lg:text-[68px] text-white leading-tight"
              style={{
                background: 'linear-gradient(90deg, #4b0082, #ff69b4, #87ceeb)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                textShadow: '0 2px 10px rgba(147, 51, 234, 0.3)'
              }}
            >
              What am I working on currently?
            </motion.h2>
          </div>
          
          <motion.div 
            className="mt-[40px] flex flex-col max-w-[400px] gap-[28px]"
            variants={scrollVariants}
          >
            {startingFeatures.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                whileHover={{ 
                  x: 10,
                  transition: { duration: 0.2 }
                }}
                transition={{ 
                  delay: index * 0.25,
                  type: 'spring',
                  stiffness: 120,
                  damping: 12
                }}
              >
                <StartSteps
                  number={`${index < 10 ? '0' : ''}${index + 1}`}
                  text={feature}
                  icon={
                    index === 0 ? <FaCode className="text-purple-400" /> :
                    index === 1 ? <FaMobileAlt className="text-pink-400" /> :
                    <FaLaptopCode className="text-sky-400" />
                  }
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