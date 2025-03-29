"use client";
import "../styles/button.css";
import { useEffect, useState } from "react";
import { FileText, ArrowUp, Mail, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, X, Twitch } from "lucide-react";
import PeerlistIcon from "../components/PeerlistIcon";

const socials = [
  {
    name: "GitHub",
    link: "https://github.com/anubhav126",
    icon: Github,
    color: "from-gray-800 to-gray-900",
    hoverColor: "linear-gradient(45deg, #333333, #6e5494)",
    shadowColor: "shadow-gray-800/20",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
    color: "from-blue-700 to-blue-800",
    hoverColor: "linear-gradient(45deg, #0077b5, #00a0dc)",
    shadowColor: "shadow-blue-800/20",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/crasheddfps",
    icon: X,
    color: "from-black to-gray-900",
    hoverColor: "linear-gradient(45deg, #000000, #1da1f2)",
    shadowColor: "shadow-gray-800/20",
  },
  {
    name: "Peerlist",
    link: "https://peerlist.io/anubhav1206", 
    icon: PeerlistIcon,
    color: "from-green-600 to-green-800", 
    hoverColor: "linear-gradient(45deg, #16a34a, #86efac)", 
    shadowColor: "shadow-green-700/20", 
  }
];

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const openResume = () => {
    window.open("https://drive.google.com/file/d/1ekLqeqXB_DeZUAu1nXtVNGyvkdCr1SRq/view?usp=sharing", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendEmail = () => {
    window.location.href = "mailto:aadhikari1248@gmail.com";
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const buttonEffects = {
    glitch: { scale: [1, 1.05, 0.95, 1], x: [0, 5, -5, 0], transition: { duration: 0.3 } },
    pulse: { scale: [1, 1.05, 1], transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const orbs = [
    { size: "w-32 h-32", color: "bg-purple-500/10", x: "left-[10%]", y: "top-[20%]" },
    { size: "w-48 h-48", color: "bg-cyan-500/10", x: "right-[15%]", y: "top-[40%]" },
    { size: "w-24 h-24", color: "bg-pink-500/10", x: "left-[25%]", y: "bottom-[15%]" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 relative bg-gradient-to-b from-[#1a232e] to-[#121a24] text-white overflow-hidden"
      id="footer"
    >
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.color} ${orb.x} ${orb.y} rounded-full blur-xl pointer-events-none`}
          animate={{
            y: [0, Math.sin(Date.now() / 1000 + index) * 20],
            x: [0, Math.cos(Date.now() / 1000 + index) * 15],
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
          animate={{
            x: isHovered ? mousePosition.x * 0.02 : 0,
            y: isHovered ? mousePosition.y * 0.02 : 0,
            opacity: isHovered ? 0.15 : 0.05,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"
          animate={{
            x: isHovered ? -mousePosition.x * 0.01 : 0,
            y: isHovered ? -mousePosition.y * 0.01 : 0,
            opacity: isHovered ? 0.15 : 0.05,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="max-w-6xl mx-auto px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-center md:text-left">
            <motion.h2
              className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-2"
              whileHover={{
                scale: 1.02,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.3 },
              }}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Feel free to reach out for collaborations or just a friendly chat
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.button
                onClick={openResume}
                className="px-6 py-3 font-medium rounded-full shadow-lg shadow-cyan-800/20 relative overflow-hidden group"
                whileHover={{
                  background: "linear-gradient(45deg, #ff00cc, #3333ff)",
                  boxShadow: "0 0 20px rgba(255, 0, 204, 0.7)",
                }}
                animate={buttonEffects.glitch}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                  animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="relative z-20 flex items-center text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  Resume
                </div>
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.button
                onClick={sendEmail}
                className="px-6 py-3 font-medium rounded-full shadow-lg shadow-cyan-800/20 relative overflow-hidden group"
                whileHover={{
                  background: "linear-gradient(45deg, #00ccff, #33ffcc)",
                  boxShadow: "0 0 20px rgba(0, 204, 255, 0.7)",
                }}
                animate={buttonEffects.glitch}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                  animate={{ x: [100, -100], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="relative z-20 flex items-center text-white">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative h-px mb-16 overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
          <motion.div
            className="absolute h-full w-1/3 left-0 top-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            animate={{
              x: ["-100%", "400%"],
              opacity: [0, 1, 0],
              background: ["linear-gradient(90deg, transparent, #00ffff, transparent)", "linear-gradient(90deg, transparent, #ff00ff, transparent)"],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div className="flex flex-col items-center md:items-start gap-4" whileHover={{ scale: 1.01 }}>
            <h3 className="text-2xl font-bold text-white">Find Me Streaming</h3>
            <motion.a
              href="https://twitch.tv/crashedfps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-900/30 to-purple-700/20 p-4 rounded-xl relative overflow-hidden group w-full max-w-md"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(147, 51, 234, 0.7)",
                background: ["linear-gradient(90deg, #4c1d95, #6d28d9)", "linear-gradient(90deg, #6d28d9, #4c1d95)"],
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-purple-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.span
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Twitch className="w-8 h-8 text-purple-500 group-hover:text-purple-400" />
              </motion.span>
              <div className="flex-1">
                <p className="font-bold text-lg text-white">crashedfps</p>
                <p className="text-sm text-gray-400">Watch me live on Twitch</p>
              </div>
              <motion.div
                animate={{
                  x: [0, 10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.div className="flex flex-col items-center md:items-start gap-4" whileHover={{ scale: 1.01 }}>
            <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
            <div className="flex flex-wrap gap-4 w-full max-w-md">
              {socials.map((social) => (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <motion.a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 font-medium rounded-full ${social.shadowColor} relative overflow-hidden group flex items-center`}
                    whileHover={{
                      background: social.hoverColor,
                      boxShadow: `0 0 20px ${social.shadowColor.replace('/20', '/50')}`,
                    }}
                    animate={buttonEffects.glitch}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${social.color}`}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <div className="relative z-20 flex items-center text-white">
                      <social.icon className="w-5 h-5 mr-2" />
                      {social.name}
                    </div>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
          <div className="text-center md:text-left">
            <p className="font-medium text-sm text-gray-400">
              © {currentYear} No rights reserved. Built with passion.
            </p>
            <motion.p
              className="text-xs text-gray-500 mt-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              Last updated: {new Date().toLocaleDateString()}
            </motion.p>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => openModal("privacy")}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <span>🔒</span> Privacy
            </motion.button>
            <motion.button
              onClick={() => openModal("terms")}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <span>📜</span> Terms
            </motion.button>
            <motion.button
              onClick={() => openModal("cookies")}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <span>🍪</span> Cookies
            </motion.button>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full shadow-lg shadow-cyan-800/20 relative overflow-hidden group flex items-center justify-center"
              whileHover={{
                background: "radial-gradient(circle, #ff00cc, #3333ff)",
                boxShadow: "0 0 25px rgba(255, 0, 204, 0.8)",
              }}
              animate={buttonEffects.pulse}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30"
                animate={{ x: [-50, 50], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <div className="relative z-20 flex items-center justify-center text-white">
                <ArrowUp className="w-6 h-6" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;