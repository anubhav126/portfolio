"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Code, X, Menu, FileText, Sun, Zap, Cpu, Send } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const menuRef = useRef(null);

  const menuItems = [
    { label: "About", href: "#about", icon: <Sun className="w-5 h-5" /> },
    { label: "Projects", href: "#explore", icon: <Cpu className="w-5 h-5" /> },
    { label: "Blogs", href: "#blogs", icon: <Zap className="w-5 h-5" /> },
    { label: "Contact", href: "#footer", icon: <Send className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 20);
      setScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
      
      const sections = menuItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);                                                                                  
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const openResume = () => {
    window.open(
      "https://drive.google.com/file/d/1ekLqeqXB_DeZUAu1nXtVNGyvkdCr1SRq/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <nav className="relative w-full">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "backdrop-blur-md bg-black/40 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center group">
            <div className="relative">
              <Code className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-cyan-400/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <span className="ml-2 text-xl font-semibold background-gradient">
              Portfolio
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-item relative text-gray-300 transition-colors duration-300 group flex items-center ${
                  activeSection === item.href.substring(1) ? "text-cyan-400" : ""
                }`}
              >
                <span className="nav-icon-wrapper relative inline-block">
                  {React.cloneElement(item.icon, {
                    className: `w-5 h-5 nav-icon ${
                      activeSection === item.href.substring(1) 
                        ? "text-cyan-400" 
                        : "text-gray-300 group-hover:text-white"
                    }`
                  })}
                  <div className={`absolute inset-0 bg-cyan-400/30 blur-md rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10 ${
                    activeSection === item.href.substring(1) ? "opacity-70" : ""
                  }`}></div>
                </span>
                <span className="ml-2">{item.label}</span>
              </a>
            ))}
            <button
              onClick={openResume}
              className="cyber-glitch-button px-6 py-2 font-medium rounded-full relative group overflow-hidden"
            >
              <div className="cyber-glitch-bg absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"></div>
              <div className="cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100"></div>
              <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                <FileText className="w-5 h-5 inline mr-2" /> Resume
              </div>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-cyan-500/20 transition duration-300 relative overflow-hidden"
          >
            <Menu className="w-6 h-6 z-10 relative" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex items-center justify-center"
          >
            <motion.div
              className="relative w-80 h-80"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 opacity-20 blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="absolute top-1/2 left-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: `${(index - (menuItems.length - 1) / 2) * 60}px`,
                    x: "-50%",
                  }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                >
                  <div className="cyber-glitch-button px-6 py-3 rounded-full relative group overflow-hidden">
                    <div className="cyber-glitch-bg absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"></div>
                    <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
              <motion.button
                onClick={openResume}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 cyber-glitch-button px-6 py-3 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: menuItems.length * 0.2 }}
              >
                <div className="cyber-glitch-bg absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"></div>
                <div className="cyber-glitch-text relative z-20 flex items-center text-white">
                  <FileText className="w-5 h-5 mr-2" /> Resume
                </div>
              </motion.button>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white bg-black/40 rounded-full hover:bg-black/70 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-20" />

      <style jsx global>{`
        /* Custom Colors */
        :root {
          --neon-pink: #f472b6;
          --neon-cyan: #06f6d4;
          --neon-purple: #a855f7;
        }

        /* Desktop Nav Items */
        .nav-item {
          position: relative;
          padding-bottom: 4px;
          transition: all 0.3s ease;
        }
        .nav-item:hover {
          color: white;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, var(--neon-purple), var(--neon-cyan));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-item:hover::after {
          transform: scaleX(1);
        }

        /* Nav Icon Hover Effects */
        .nav-icon-wrapper {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        .nav-icon-wrapper::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, var(--neon-purple), var(--neon-cyan));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .nav-item:hover .nav-icon-wrapper::after {
          transform: scaleX(1);
        }
        .nav-icon {
          transition: all 0.3s ease;
        }

        .cyber-glitch-button {
          position: relative;
          overflow: hidden;
          transition: all 0.2s;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(6, 246, 212, 0.3);
        }
        .cyber-glitch-button:hover {
          transform: scale(1.03);
          border-color: rgba(6, 246, 212, 0.5);
        }
        .cyber-glitch-bg {
          background: linear-gradient(45deg, var(--neon-purple), var(--neon-cyan));
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.2);
          filter: drop-shadow(0 0 6px rgba(6, 246, 212, 0.5));
          opacity: 0.8;
        }
        .cyber-glitch-button:hover .cyber-glitch-bg {
          animation: hue-rotate 3s linear infinite;
          filter: drop-shadow(0 0 10px rgba(6, 246, 212, 0.7));
          opacity: 1;
        }
        .cyber-glitch-text {
          transition: transform 0.2s;
        }
        .cyber-glitch-button:hover .cyber-glitch-text {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) infinite;
        }
        .cyber-glitch-scanline {
          z-index: 15;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 10%,
            transparent 10.5%,
            transparent 90%,
            rgba(255, 255, 255, 0.1) 90.5%,
            transparent 100%
          );
        }
        .cyber-glitch-button:hover .cyber-glitch-scanline {
          animation: scanline 1.5s linear infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          50%, 100% { transform: translateY(100%); }
        }
        @keyframes hue-rotate {
          0% { filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(6, 246, 212, 0.7)); }
          50% { filter: hue-rotate(60deg) drop-shadow(0 0 12px rgba(6, 246, 212, 0.8)); }
          100% { filter: hue-rotate(0deg) drop-shadow(0 0 10px rgba(6, 246, 212, 0.7)); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;