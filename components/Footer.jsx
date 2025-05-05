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
    link: "https://linkedin.com/in/anubhav-adhikari-a3565b176",
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

// Modal content for Privacy, Terms, and Cookies
const modalContent = {
  privacy: {
    title: "Privacy Policy",
    content: [
      "We respect your privacy so much we don't even spy on ourselves.",
      "We collect less data than your refrigerator. And definitely less than your smart toaster.",
      "If you choose to contact us, we might remember your name if it's funny enough.",
      "Our cookies don't track you – they're too lazy and prefer to just sit there.",
      "This website knows less about you than your cat does. And that's saying something."
    ],
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNlamU3czA5a2FlcWY0OGNlM2xrY2R6eHFmaGVmMXo2NjBtM3J5ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7KViF6rA4aan5u/giphy.gif" // Ninja hiding gif
  },
  terms: {
    title: "Terms of Service",
    content: [
      "By accessing this website, you agree that you are cooler than the average internet user.",
      "All content is for informational purposes, except the jokes, which are for making you smile awkwardly.",
      "You may not use this website while standing on one foot. We can totally tell if you do.",
      "We reserve the right to modify these terms whenever we're bored or had too much coffee.",
      "In the event of a zombie apocalypse, these terms become void. You're on your own."
    ],
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHo1ZnZ2dzg4aXA3a3dmaXNoZ2RrMTBvemdvOGRzaXA5YmdwNWRtaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fVzkXbxOwGnvBNWO8C/giphy.gif" // Scrolling terms gif
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      "Our cookies are digital, so unfortunately you can't eat them. We've tried.",
      "We use cookies to make your experience better, not because we're nosy. Okay, maybe a little nosy.",
      "You can control cookies through your browser settings. They're like digital pets you can delete.",
      "Essential cookies are necessary for the website to function. They're the responsible adults of the cookie world.",
      "By continuing to use this website, you consent to our cookies. They appreciate the validation."
    ],
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV6N2c2YzE3dGN3N2NkbWwwYnF0ZWd3Y2x0ZndodXR1cWI1a2k2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y09s2Frxp7wpBGXTyt/giphy.gif" // Cookie Monster gif
  }
};

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

  useEffect(() => {
    // Disable scroll when modal is open
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

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
      {/* Grid overlay to match with the other sections */}
      <div className="absolute inset-0 opacity-20 -z-0 bg-[url('/grid-pattern.svg')] bg-repeat bg-center" />

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
              className="font-bold text-4xl md:text-5xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,51,234,0.5)] mb-2"
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
            <motion.button
              onClick={openResume}
              className="cyber-glitch-button px-6 py-3 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
              <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                <FileText className="w-5 h-5 mr-2" />
                Resume
              </div>
            </motion.button>

            <motion.button
              onClick={sendEmail}
              className="cyber-glitch-button px-6 py-3 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
              <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                <Mail className="w-5 h-5 mr-2" />
                Email
              </div>
            </motion.button>
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
              className="flex items-center gap-3 bg-gradient-to-r from-purple-900/30 to-purple-700/20 p-4 rounded-xl border border-purple-500/20 relative overflow-hidden group w-full max-w-md"
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
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-glitch-button px-4 py-2 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
                  <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                    <social.icon className="w-5 h-5 mr-2" />
                    {social.name}
                  </div>
                </motion.a>
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

          <motion.button
            onClick={scrollToTop}
            className="cyber-glitch-button w-12 h-12 rounded-full shadow-lg shadow-neon-purple/20 relative group flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center justify-center text-white">
              <ArrowUp className="w-6 h-6" />
            </div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal System */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl max-w-md w-full mx-auto border border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing edges */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-400/10 opacity-50" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              </div>
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-700/50 flex justify-between items-center relative z-10">
                <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {modalContent[activeModal].title}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="rounded-full p-1 bg-gray-800 text-gray-400 hover:text-white"
                >
                  <CloseIcon className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Modal Content */}
              <div className="p-6 text-gray-300 space-y-4 relative z-10">
                {/* Add the GIF at the top of each modal */}
                <div className="flex justify-center mb-4 overflow-hidden rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/10">
                  <motion.img 
                    src={modalContent[activeModal].gif} 
                    alt={`${modalContent[activeModal].title} illustration`}
                    className="w-full h-48 object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </div>

                {modalContent[activeModal].content.map((paragraph, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, x: -5 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="flex items-start gap-2 group"
                  >
                    <motion.span 
                      className="text-purple-400 mt-0.5"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {index === 0 ? "🚀" : index === 1 ? "😎" : index === 2 ? "🤫" : index === 3 ? "✨" : "🔮"}
                    </motion.span>
                    <p className="text-sm group-hover:text-white transition-colors">
                      {paragraph}
                    </p>
                  </motion.div>
                ))}
                
                {/* Modal grid overlay to match site theme */}
                <div className="absolute inset-0 opacity-5 bg-[url('/grid-pattern.svg')] bg-repeat bg-center pointer-events-none" />
                
                {/* Floating orb */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-purple-500/5 blur-xl pointer-events-none"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              
              {/* Modal Footer */}
              <div className="p-4 bg-gray-900/50 border-t border-gray-700/50 flex justify-end relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="cyber-glitch-button px-4 py-2 text-sm font-medium rounded-full shadow-lg shadow-neon-purple/10 relative group"
                >
                  <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
                  <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                    Close
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;