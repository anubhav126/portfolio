"use client"
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CyberGlitchMotionButton from "../components/ui/CyberGlitchMotionButton";

const InsightCard = ({ imgUrl, title, subtitle, index, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.1
      },
    },
  }), [index]);

  const imageVariants = useMemo(() => ({
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.03, 
      rotate: 0.5,
      transition: { 
        duration: 0.5,
        ease: "backOut"
      } 
    },
  }), []);

  const titleGradientVariants = useMemo(() => ({
    initial: { backgroundPosition: "0%" },
    hover: { 
      backgroundPosition: "100%",
      transition: {
        duration: 1.5,
        ease: "linear"
      }
    }
  }), []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 p-6 hover:border-cyan-400/30 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20 group"
      aria-labelledby={`insight-title-${index}`}
      aria-describedby={`insight-desc-${index}`}
      id="blogs"
    >
      {/* Floating particles effect */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-cyan-400/30 pointer-events-none"
              initial={{ 
                opacity: 0,
                scale: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, Math.random() * 0.5 + 0.5, 0],
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
              }}
            />
          ))}
        </>
      )}

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Image Container with perspective effect */}
        <motion.div
          className="relative overflow-hidden rounded-2xl flex-shrink-0 shadow-lg"
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
        >
          <Image
            src={imgUrl}
            alt={`Thumbnail image for ${title}`}
            width={300}
            height={250}
            className="w-full md:w-[300px] h-[250px] object-cover transition-transform duration-700"
            priority={index < 3} // Only prioritize first few images
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.5 }}
            transition={{ duration: 0.5 }}
          />
          {/* Subtle reflection effect */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent"
            animate={{ opacity: isHovered ? 0.3 : 0.1 }}
          />
        </motion.div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <motion.h3
              id={`insight-title-${index}`}
              className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent bg-[length:200%_auto]"
              variants={titleGradientVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              style={{
                backgroundSize: "200% auto"
              }}
            >
              {title}
              {/* Decorative underline */}
              <motion.span 
                className="block h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 mt-2"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : "30%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.h3>
            <motion.p
              id={`insight-desc-${index}`}
              className="text-gray-300 text-sm md:text-base line-clamp-3"
              animate={{ 
                opacity: isHovered ? 1 : 0.8,
                x: isHovered ? 0 : -5
              }}
              transition={{ duration: 0.3 }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Action Button with enhanced hover */}
          <div className="mt-10 flex justify-left gap-4">
            <CyberGlitchMotionButton 
              text="Continue reading here" 
              color="yellow" 
              link={link}
              className="transform group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      
      {/* Animated accent decorations */}
      <motion.div
        className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-xl pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1 : 0.5
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Corner accents */}
      <motion.div 
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/50"
        animate={{ opacity: isHovered ? 1 : 0.3 }}
      />
      
      {/* Subtle pulse effect */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-3xl border border-cyan-400/10 pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0.5, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default InsightCard;