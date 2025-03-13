'use client';
import '../styles/button.css';
import { useEffect, useState } from 'react';
import { FileText, Code, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, X, Twitch } from 'lucide-react';
// Social icons
const socials = [
  { name: 'GitHub', url: '/github.svg', link: 'https://github.com/yourprofile', icon: Github },
  { name: 'LinkedIn', url: '/linkedin.svg', link: 'https://linkedin.com/in/yourprofile', icon: Linkedin },
  { name: 'Twitter', url: '/twitter.svg', link: 'https://twitter.com/yourprofile', icon: X },
  { name: 'Twitch', url: '/twitch.svg', link: 'https://twitch.tv/yourprofile', icon: Twitch },
];
const styles = {
  paddings: 'sm:px-16 px-6',
  innerWidth: 'lg:w-[80%] w-[95%]',
};
const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openResume = () => {
    window.open('https://drive.google.com/file/d/1ekLqeqXB_DeZUAu1nXtVNGyvkdCr1SRq/view?usp=sharing', '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15
      }
    }
  };
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`${styles.paddings} py-12 relative bg-[#1a232e] text-white overflow-hidden`}
    >
      {/* Animated background glow */}
      <motion.div 
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
        animate={{
          x: isHovered ? mousePosition.x * 0.02 : 0,
          y: isHovered ? mousePosition.y * 0.02 : 0,
          opacity: isHovered ? 0.15 : 0.05,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"
        animate={{
          x: isHovered ? -mousePosition.x * 0.01 : 0,
          y: isHovered ? -mousePosition.y * 0.01 : 0,
          opacity: isHovered ? 0.15 : 0.05,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />    
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${styles.innerWidth} mx-auto flex flex-col gap-12 relative z-10`}
      >
        {/* Connect Section */}
        <motion.div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.h2 
            variants={itemVariants}
            className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg"
          >
            Let's Connect
          </motion.h2>
          <button
            onClick={openResume}
            className="cyber-glitch-button px-6 py-2 font-medium rounded-full shadow-lg shadow-purple-800/20 relative group"
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center text-white">
              <FileText className="w-5 h-5 inline mr-2" /> Resume
            </div>
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent relative"
        >
          <motion.div 
            className="absolute h-full w-1/3 left-0 top-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            animate={{ 
              x: ["0%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "linear",
            }}
          />
        </motion.div>
        {/* Footer Bottom */}
        <motion.div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <h4 className="font-extrabold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            crashedfps on
          </h4>
          <a 
            href="https://twitch.tv/crashedfps" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Twitch className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 hover:text-purple-400 transition-colors" />
          </a>
        </motion.div>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <p className="font-medium text-sm text-gray-300">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  aria-label={social.name}
                >
                  <social.icon
                    alt={social.name}
                    className="w-6 h-6 object-contain fill-current"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>        
        {/* Scroll to top button */}
        <motion.div 
          className="flex justify-center"
          variants={itemVariants}
        >
          <button
            onClick={scrollToTop}
            className="cyber-glitch-button w-12 h-12 font-medium rounded-full shadow-lg shadow-purple-800/20 relative group flex items-center justify-center"
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center text-white">
              <ArrowUp className="w-6 h-6" />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};
export default Footer;