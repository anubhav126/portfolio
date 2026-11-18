'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Navbar, Footer } from '../components';
import { Hero, Explore, World, Insights } from '../sections';
import SearchDialog from '../components/SearchDialog.jsx';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left bg-gradient-to-r from-primary-600 via-primary-500 to-primary-300 shadow-sm shadow-primary-500/50"
      style={{ scaleX }}
    />
  );
};

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: 15 }}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 dark:hover:border-primary-500/50 flex items-center justify-center transition-colors group"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" />
    </motion.button>
  );
};

const Page = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-neutral-50 dark:bg-[#090D16] text-neutral-900 dark:text-neutral-100 min-h-screen relative font-sans selection:bg-primary-100 dark:selection:bg-primary-950 selection:text-primary-700 dark:selection:text-primary-300 transition-colors duration-200">
      {/* Top Scroll Indicator */}
      <ScrollProgressBar />

      {/* Main Navbar */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section with 3D Tilt Card & Interactive Badges */}
        <Hero />

        {/* 01 Featured Projects & Architecture */}
        <Explore />

        {/* 02 Engineering Journey & Timeline */}
        <World />

        {/* 03 Technical Writing & Publications */}
        <Insights />
      </main>

      {/* Footer Section (Matching same bg-neutral-50 color) */}
      <Footer />

      {/* Global Command Palette / Search Dialog */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Single, non-duplicate Back to Top button */}
      <AnimatePresence>
        <BackToTopButton />
      </AnimatePresence>
    </div>
  );
};

export default Page;
