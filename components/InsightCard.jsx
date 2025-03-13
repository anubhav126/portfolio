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
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  }), []);

  const imageVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.5 } },
  }), []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 p-6 hover:border-cyan-400/30 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Container */}
        <motion.div
          className="relative overflow-hidden rounded-2xl flex-shrink-0 shadow-lg"
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <Image
            src={imgUrl}
            alt={`Thumbnail image for ${title}`}
            width={300}
            height={250}
            className="w-full md:w-[300px] h-[250px] object-cover transition-transform duration-700"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
            animate={{ opacity: isHovered ? 0.7 : 0.5 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: isHovered ? "100%" : "0%",
              }}
              transition={{ duration: 1.5 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-gray-300 text-sm md:text-base line-clamp-3"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex justify-left gap-4">
            <CyberGlitchMotionButton text="Continue reading here" color="yellow" link={link} />
          </div>
        </div>
        
      </div>
      {/* Animated accent decoration */}
      {isHovered && (
        <motion.div
          className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};
export default InsightCard;
