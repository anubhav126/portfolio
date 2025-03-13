import { motion } from "framer-motion";
import { useState } from "react";

const CyberGlitchMotionButton = ({ text = "Read More", link = "#", color = "blue", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define animation variants
  const buttonVariants = {
    initial: { scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const arrowVariants = {
    initial: { x: 0, opacity: 0, transition: { duration: 0.3 } },
    hover: { x: 5, opacity: 1, transition: { duration: 0.3 } },
  };

  // Updated color scheme
  const colorSchemes = {
    blue: {
      gradient: "from-cyan-500 to-blue-700",
      shadow: "shadow-cyan-800/20",
      scanline: "bg-cyan-400/20",
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick || (() => window.open(link, "_blank"))}
      className={`cyber-glitch-button px-6 py-2 font-medium rounded-full shadow-lg ${scheme.shadow} relative group overflow-hidden`}
    >
      {/* Background */}
      <div className={`cyber-glitch-bg absolute inset-0 rounded-full bg-gradient-to-r ${scheme.gradient} z-10`} />
      <div className={`cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 animate-scanline ${scheme.scanline} z-20`} />

      {/* Button Text */}
      <div className="cyber-glitch-text relative z-30 flex items-center gap-2 text-white">
        {text}
        <motion.span variants={arrowVariants} className="font-bold">
          →
        </motion.span>
      </div>
    </motion.button>
  );
};

export default CyberGlitchMotionButton;
